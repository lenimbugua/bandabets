<script setup>
import { useHakiLeagueStore } from "@/stores/haki-league";
import { storeToRefs } from "pinia";

const { getLaunchDetail } = useHakiLeagueStore();

getLaunchDetail();

const { launchUrl, pending } = storeToRefs(useHakiLeagueStore());
</script>
<template>
  <h1 class="sr-only">Virtual Sports – Play Virtual Games Online | Naibet</h1>
  <CasinoAnimate v-if="pending" />

  <div v-else class="flex flex-col iframe-container">
    <div class="sticky top-0">
      <CasinoHeader />
    </div>
    <div class="w-full grow max-w-[1680px] mx-auto h-full">
      <iframe
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
</style>T
