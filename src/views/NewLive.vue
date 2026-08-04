<script setup>
import MobileFooterV2 from "../components/mobile/MobileFooterV2.vue";
import { useSportsQueryParamsStore } from "@/stores/sports-query-params";
import { ChevronDownIcon, FunnelIcon } from "@heroicons/vue/24/outline";
import { storeToRefs } from "pinia";
import { onBeforeUnmount, onMounted } from "vue";
import DarkBorderDivider from "../components/DarkBorderDivider.vue";
import HeaderLinks from "../components/HeaderLinks.vue";
import InfinityScrollLive from "../components/InfinityScrollLive.vue";
import CompetitionsCard from "../components/live/CompetitionsCard.vue";
import LiveSportsTabs from "../components/LiveSportsTabs.vue";
import OddChangeArrow from "../components/OddChangeArrow.vue";
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

const {  isLargeScreen } = useScreenSizes();
onBeforeUnmount(() => {
  setResource("");
});
</script>
<template>
  <h1 class="sr-only">Live Betting – Real-Time Odds & Scores | Naibet</h1>
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
  
  <div v-else class="flex flex-col h-dvh">
    <div class="grow bg-white dark:bg-background">
      <div class="sticky top-0 pb-2 bg-white dark:bg-background">
        <TheDepositBar />
        <HeaderLinks />
        <LiveSportsTabs />
        <div class="bg-white dark:bg-background">
          <div
            class="bg-gray-200 dark:bg-surface-active flex justify-between items-center text-gray-600 dark:text-slate-300 text-sm py-1 px-2"
          >
            <div class="flex items-center">
              <FunnelIcon class="h-6 w-6" />
              <span>Filters</span>
              <ChevronDownIcon class="h-5 w-5" />
            </div>
            <div class="flex items-center gap-4">
              <div
                class="flex items-center gap-0.5 border border-gray-300 dark:border-0 bg-white dark:bg-card p-1 rounded-md"
              >
                <span>Highlits</span>
                <ChevronDownIcon class="h-5 w-5" />
              </div>
              <div class="flex items-center gap-0.5">
                <span>Markets</span>
                <ChevronDownIcon class="h-5 w-5" />
              </div>
            </div>
          </div>
        </div>
        <div class="bg-white dark:bg-background p-2">
          <div class="flex text-gray-700 dark:text-slate-200 items-center">
            <div class="w-1/2">Teams</div>
            <div class="w-1/2 flex items-center">
              <div>1</div>
              <div>x</div>
              <div>2</div>
            </div>
          </div>
          <div class="py-2">
            <div
              class="flex items-center text-gray-700 dark:text-slate-200 gap-0.5"
            >
              <OddChangeArrow />
              <div class="w-4 h-4">
                <img
                  src="https://imagedelivery.net/ZY5OwFLlTE2ePHl_IE20jg/c99ed514-0bae-419e-8226-b816e34e7e00/public"
                  alt="Premier League logo"
                  loading="lazy"
                />
              </div>
              <div class="text-sm font-semibold">Eglish Premier League</div>
            </div>
          </div>
        </div>
      </div>
      <DarkBorderDivider border-size="1px" />
      <CompetitionsCard />
    </div>
    <MobileFooterV2 />
    <Footer />
  </div>
</template>
