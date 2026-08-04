<script setup>
import { useKironStore } from "@/stores/kiron";
import { storeToRefs } from "pinia";
import { useKiron } from "../composables/useKiron";
import { useCasinoStore } from "../stores/casino";

import { useRoute } from "vue-router";

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
  <h1 class="sr-only">Kiron Virtual Games | Naibet</h1>
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
