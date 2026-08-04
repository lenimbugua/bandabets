<script setup>
import MobileFooterV2 from "../components/mobile/MobileFooterV2.vue";
import { useSportsQueryParamsStore } from "@/stores/sports-query-params";
import { useDark } from "@vueuse/core";
import { storeToRefs } from "pinia";
import { onBeforeUnmount, onMounted } from "vue";
import DarkBorderDivider from "../components/DarkBorderDivider.vue";
import InfinityScrollLive from "../components/InfinityScrollLive.vue";
import MainCategories from "../components/MainCategories.vue";
import TheSports from "../components/TheSportsTab.vue";
import { useScreenSizes } from "../composables/useScreenSizes";
import { useLiveMatchesStore } from "../stores/live-matches";
const { setResource } = useSportsQueryParamsStore();
const { pollLiveMatches, getLiveMatches } = useLiveMatchesStore();
const { matches, pending } = storeToRefs(useLiveMatchesStore());

const pollFrequency = parseInt(import.meta.env.VITE_LIVE_POLL_INTERVAL)
  ? parseInt(import.meta.env.VITE_LIVE_POLL_INTERVAL)
  : 10000;

let intervalId = null;

onMounted(() => {
  getLiveMatches();
  intervalId = setInterval(() => {
    pollLiveMatches();
  }, pollFrequency);
});

onBeforeUnmount(() => {
  clearInterval(intervalId);
});

const isDark = useDark();
const { isSmallScreen, isMediumScreen, isLargeScreen } = useScreenSizes();
onBeforeUnmount(() => {
  setResource("");
});
</script>
<template>
  <h1 class="sr-only">Live Betting – In-Play Odds & Matches | Naibet</h1>
  <div v-if="isLargeScreen">
    <HeaderLinks />
    <div class="max-w-[1680px] mx-auto px-3">
      <div class="w-full pt-4 flex justify-between">
        <div class="sticky bottom-0">
          <TheSidebar />
        </div>
        <div class="w-full max-w-[800px] lg:max-w-1000 mx-8 flex-col">
          <div
            class="rounded-t-md border shadow-sm overflow-clip dark:border-border"
          >
            <div class="bg-white dark:bg-background">
              <div
                class="sticky z-2 top-20 bg-white dark:bg-background pb-2 rounded-b-md"
              >
                <div class="border-b dark:border-black">
                  <TheSports />
                </div>
                <div v-if="matches?.length && !pending">
                  <MarketSection />
                </div>
              </div>
              <InfinityScrollLive class="w-full" />
            </div>
          </div>
          <SEOMarkupContent />
        </div>
        <div class="flex sticky">
          <SportsBetslipPanel />
        </div>
      </div>
    </div>
    <Footer />
  </div>
  <div v-else-if="isMediumScreen" class="min-h-dvh bg-gray-50 dark:bg-background">
    <HeaderLinks />
    <div
      class="w-full max-w-9xl flex mx-auto gap-4 px-6 pt-4"
    >
      <div class="shrink-0">
        <TheSidebar />
      </div>
      <div class="flex-1 min-w-0 flex flex-col">
        <div
          :class="[
            'bg-white dark:bg-background',
            isDark ? 'dark-border' : 'custom-border',
          ]"
          class="max-w-5xl flex flex-col mx-auto rounded-t-lg"
        >
          <MainCategories class="p-2 mb-2 bg-surface-sunken" />
          <DarkBorderDivider />
          <div :class="['bg-white dark:bg-background']">
            <div
              :class="['bg-white dark:bg-background']"
              class="sticky top-12 z-50"
            >
              <TheSports />
            </div>
            <div v-if="matches?.length && !pending">
              <MarketSection />
            </div>
            <SortSection class="w-full" />
            <DarkBorderDivider border-size="1px" />
            <div>
              <InfinityScrollLive />
            </div>
          </div>
        </div>
      </div>
    </div>
    <MobileFooterV2 />
    <Footer />
  </div>
  <div v-else-if="isSmallScreen" class="flex flex-col h-dvh">
    <div class="grow bg-white dark:bg-background">
      <div class="sticky top-0 pb-2 bg-white dark:bg-background">
        <TheDepositBar />
        <HeaderLinks />
        <MainCategories class="py-3 px-2" />
        <div
          :class="['bg-white dark:bg-background']"
          class="flex space-x-2 w-full z-99 px-2 items-center border-t dark:border-black bg-background"
        >
          <TheSports />
        </div>
        <div v-if="matches?.length && !pending">
          <MarketSection />
        </div>
      </div>
      <DarkBorderDivider border-size="1px" />
      <InfinityScrollLive />
    </div>
    <MobileFooterV2 />
    <Footer />
  </div>
</template>
