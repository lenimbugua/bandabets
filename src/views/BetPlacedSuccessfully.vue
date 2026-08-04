<script setup lang="ts">
import HeaderLinks from "../components/HeaderLinks.vue";
import MobileFooterV2 from "../components/mobile/MobileFooterV2.vue";
</script>

<template>
  <LazyInfinityScroll>
    <div class="sticky top-0 z-50">
      <HeaderLinks />
      <h1 class="sr-only">Bet Placed Successfully | Naibet</h1>
    </div>
    <div
      class="h-full flex flex-col bg-white dark:bg-background"
    >
      <div class="">
        <BetPlaced />
      </div>
    </div>
    <MobileFooterV2 />
  </LazyInfinityScroll>
</template>
