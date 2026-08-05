<script setup>
// Ported from src/views/PlayonGame.vue — simplest view in the batch (plan
// §F.2). Baseline route was top-level -> layout: false. requiresAuth
// carried true in the baseline; set directly now (was previously
// satisfied by phase2RequiresAuthNames while this was a placeholder).
//
// useScreenSizes() at setup is correct only because app/layouts/default.vue
// runs first and seeds the per-request cache (plan §F.6 / PHASE-2-NOTES
// §e) — this page uses layout:false so it does NOT get that seeding, but
// this route is ssr:false anyway, so useScreenSizes() only ever runs
// client-side here regardless.
import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";
import API, { virtualLeaguesBaseURL } from "@/services/API";
import { useCasinoStore } from "@/stores/casino";
import { useLoginStore } from "@/stores/login";
import { useScreenSizes } from "@/composables/useScreenSizes";

definePageMeta({
  name: "playon",
  requiresAuth: true,
  layout: false,
});

useSeoHead({
  title: "Playon | Virtual Football Betting | Bandabets",
  description:
    "Play Playon virtual football and enjoy realistic matches, live stats, and instant payouts.",
  robots: "noindex,nofollow",
});

const launchUrl = ref(null);
const pending = ref(false);
const responseOK = ref(false);

const { token, profileSid } = storeToRefs(useLoginStore());
const { setLaunchGameMeta } = useCasinoStore();
const { isMediumScreen, isLargeScreen } = useScreenSizes();

async function fetchLaunchUrl() {
  const isMobile = isMediumScreen.value || isLargeScreen.value ? "0" : "1";
  const profileId = profileSid.value ? profileSid.value : "";
  const headers = {
    Authorization: `Bearer ${token.value}`,
    "x-profile-sid": profileSid.value,
  };

  try {
    pending.value = true;
    responseOK.value = false;
    const response = await API(virtualLeaguesBaseURL).get(
      `/v1/lite/virtuals/auth?profileSid=${profileId}&gameId=1&isMobile=${isMobile}&isDemo=0`,
      { headers }
    );
    launchUrl.value = response.data.launchUrl;
    responseOK.value = true;
  } catch (err) {
    responseOK.value = false;
  } finally {
    pending.value = false;
  }
}

onMounted(() => {
  setLaunchGameMeta("Playon", "Playon");
  fetchLaunchUrl();
});
</script>
<template>
  <h1 class="sr-only">Playon | Bandabets</h1>
  <CasinoAnimate v-if="pending" />

  <div v-else class="flex flex-col iframe-container">
    <div class="sticky top-0">
      <CasinoHeader />
    </div>
    <div class="w-full grow max-w-[1680px] mx-auto h-full">
      <iframe
        v-if="launchUrl"
        class="w-full the-iframe"
        :src="launchUrl"
        allow="fullscreen; autoplay; encrypted-media; accelerometer; gyroscope"
        allowfullscreen
      ></iframe>
    </div>
  </div>
</template>

<style scoped>
.iframe-container {
  height: 100svh;
  overflow-y: scroll;
  position: relative;
}

.the-iframe {
  height: calc(100svh - 2.5rem);
  width: 100%;
}
</style>
