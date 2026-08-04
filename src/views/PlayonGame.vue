<script setup>
import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";
import API, { virtualLeaguesBaseURL } from "../services/API";
import { useCasinoStore } from "../stores/casino";
import { useLoginStore } from "../stores/login";
import { useScreenSizes } from "../composables/useScreenSizes";

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
  <h1 class="sr-only">Playon | Naibet</h1>
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
