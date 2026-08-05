<script setup>
// Shared body for the three Kiron Lite routes (plan §F.2/§F.3):
// app/pages/virtual-games/nai-league.vue, nai-turbo.vue,
// nai-virtual-jackpot.vue. Ported from src/views/KironLiteIndex.vue, which
// dispatched purely on `route.name` against the literal strings
// "pari-league"/"pari-turbo"/"pari-virtual-jackpot" from useKiron.js.
//
// This is load-bearing: Nuxt would derive "virtual-games-nai-league" etc.
// from the filename, matching none of these branches — the page would
// mount, never call getLaunchDetail(), and render an iframe with
// src=null, silently. Each thin page sets the correct name via
// definePageMeta before rendering this component, so useRoute().name here
// always matches one of the three branches.
//
// Pre-existing bug carried forward knowingly (plan §F.3): the turbo and
// jackpot branches below call setLaunchGameId() with a route NAME string
// instead of a game ID, and the jackpot branch passes the *turbo* name.
// Not fixed here — flagged, not silently inherited.
import { useKironStore } from "@/stores/kiron";
import { storeToRefs } from "pinia";
import { useKiron } from "@/composables/useKiron";
import { useCasinoStore } from "@/stores/casino";

const route = useRoute();

const {
  hakiLeagueRouteName,
  hakiTurboRouteName,
  hakiJackpotRouteName,
  hakiLeagueGameId,
  hakiTurboGameId,
  hakiJackpotGameId,
} = useKiron();

const { getLaunchDetail } = useKironStore();

function getLaunchUrl() {
  const { setLaunchGameId, setLaunchGameMeta } = useCasinoStore();

  if (route.name === hakiLeagueRouteName) {
    setLaunchGameId(hakiLeagueGameId);
    setLaunchGameMeta("Pari League", "Kiron");
    getLaunchDetail(hakiLeagueGameId);
  }
  if (route.name === hakiTurboRouteName) {
    setLaunchGameId(hakiTurboRouteName);
    setLaunchGameMeta("Pari Turbo", "Kiron");
    getLaunchDetail(hakiTurboGameId);
  }
  if (route.name === hakiJackpotRouteName) {
    setLaunchGameId(hakiTurboRouteName);
    setLaunchGameMeta("Pari Jackpot", "Kiron");
    getLaunchDetail(hakiJackpotGameId);
  }
}

getLaunchUrl();

const { launchUrl, pending } = storeToRefs(useKironStore());
</script>

<template>
  <h1 class="sr-only">Kiron Virtual Games | Bandabets</h1>
  <CasinoAnimate v-if="pending" />

  <div
    v-else
    class="flex flex-col iframe-container bg-gray-100 dark:bg-transparent"
  >
    <div class="sticky top-0">
      <CasinoHeader />
    </div>
    <div class="w-full grow max-w-[1680px] mx-auto h-full p-0 sm:p-2">
      <iframe
        class="w-full the-iframe rounded-none sm:rounded-lg border-0 sm:border sm:border-gray-200 sm:dark:border-transparent sm:shadow-sm sm:dark:shadow-none"
        :src="launchUrl"
        allow="fullscreen; autoplay; encrypted-media; accelerometer; gyroscope"
        allowfullscreen
      ></iframe>
    </div>
  </div>
</template>

<style scoped>
.iframe-container {
  height: 100svh; /* Full viewport height */
  overflow-y: scroll;
  position: relative; /* Needed for proper containment */
}

.the-iframe {
  height: calc(
    100svh - 2.5rem
  ); /* Subtracting the height of the sticky icons container */
  width: 100%;
}
</style>
