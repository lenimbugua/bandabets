<script setup>
import { onBeforeUnmount, onMounted } from "vue";
import HeaderLinks from "@/components/HeaderLinks.vue";
import NewLive3 from "@/components/NewLive3.vue";
import CategoryPills from "@/components/mobile/CategoryPills.vue";
import MobileFooterV2 from "@/components/mobile/MobileFooterV2.vue";
import { useScreenSizes } from "@/composables/useScreenSizes";
import { useLiveMatchesStore } from "@/stores/live-matches";
import { useNewLiveStore } from "@/stores/new-live";

const route = useRoute();

definePageMeta({ name: "live", layout: "default" });

const sportName = computed(() =>
  String(route.params.sport || "")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase()),
);

const { getSportMeta } = useSportMeta();
const sportMeta = computed(() => getSportMeta(route.params.sport));

useSeoHead({
  title:
    sportMeta.value?.title ??
    `Live ${sportName.value} Betting – Real-Time Odds & Matches | Naibet`,
  description:
    sportMeta.value?.description ??
    `Follow live ${sportName.value} games and place in-play bets with dynamic odds. Experience real-time sports betting excitement on Naibet.`,
});

const { pollLiveMatches } = useNewLiveStore();
const { pollLiveMatches: pollLiveMatches2 } = useLiveMatchesStore();

const config = useRuntimeConfig().public;
const pollFrequency = parseInt(config.livePollInterval)
  ? parseInt(config.livePollInterval)
  : 10000;

let intervalId = null;

onMounted(() => {
  pollLiveMatches2();
  intervalId = setInterval(() => {
    pollLiveMatches();
  }, pollFrequency);
});

onBeforeUnmount(() => {
  clearInterval(intervalId);
});

const { isLargeScreen } = useScreenSizes();
</script>
<template>
  <div>
    <h1 class="sr-only">Live Betting – Real-Time Odds & Matches | Naibet</h1>
    <div v-if="isLargeScreen">
      <HeaderLinks />
      <div class="max-w-[1680px] mx-auto px-3">
        <div class="w-full pt-4 flex justify-between gap-5">
          <div class="sticky bottom-0">
            <TheSidebar />
          </div>
          <div class="flex-1 min-w-0 max-w-[800px] 2xl:max-w-[1000px]">
            <!-- Main category nav now lives in the header (HeaderNavLinks) at lg+ -->
            <NewLive3 />
          </div>
          <div class="flex sticky">
            <SportsBetslipPanel />
          </div>
        </div>
      </div>
      <Footer />
    </div>

    <div
      v-else
      class="matches-scroll-container max-h-dvh flex flex-col overflow-scroll"
    >
      <div class="grow live-page-bg">
        <div class="sticky top-0 pb-2 live-page-bg z-40">
          <TheDepositBar />
          <HeaderLinks />
          <CategoryPills :sticky="false" />
        </div>
        <NewLive3 />
      </div>
      <MobileFooterV2 />
      <Footer />
    </div>
  </div>
</template>

<style scoped>
.live-page-bg {
  background: var(--background);
}
[data-theme="dark"] .live-page-bg {
  background: var(--background);
}
</style>
