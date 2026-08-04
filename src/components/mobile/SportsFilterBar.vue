<script setup>
import { storeToRefs } from "pinia";
import { computed } from "vue";
import { useRouter } from "vue-router";
import { ChevronRightIcon } from "@heroicons/vue/20/solid";
import { useMatches2Store } from "@/stores/matches2";
import CalendarDropdown from "../CalendarDropdown.vue";
import ColumnHeaderSearch from "../ColumnHeaderSearch.vue";
import HighlitsTab from "../HighlitsTab.vue";
import MarketsTab from "../MarketsTab.vue";
import SportsTabs from "../SportsTabs.vue";

defineProps({
  sticky: { type: Boolean, default: true },
  // Offset from the top of the scroll container when sticky (height of the
  // pinned header block above it). Falls back to the legacy 8rem value.
  stickyTop: { type: String, default: "8rem" },
  containerClass: { type: String, default: "" },
});

const router = useRouter();
const { matches, getDefaultMarket } = storeToRefs(useMatches2Store());

const goToSports = () => {
  router.push({ name: "sports", params: { sport: "soccer" } });
};

const outcomeLabels = computed(() => {
  if (!matches.value?.length) return ["1", "X", "2"];
  const marketId = "" + getDefaultMarket.value;
  for (const match of matches.value) {
    if (!match?.markets?.length) continue;
    const market = match.markets.find((m) => m.subTypeId === marketId);
    if (market?.matchOutcomes?.length) {
      return market.matchOutcomes.map((o) => o.outcomeName || "");
    }
  }
  return ["1", "X", "2"];
});
</script>

<template>
  <div
    :class="[
      'sports-filter-bar',
      sticky ? 'sticky z-40' : '',
      containerClass || 'mx-3 rounded-t-xl',
    ]"
    :style="sticky ? { top: stickyTop } : null"
  >
    <!-- Row 1: Sports title + View All -->
    <div class="flex items-center justify-between px-3 pt-3 pb-1">
      <span class="text-base font-bold text-gray-900 dark:text-white italic">
        Sports
      </span>
      <button
        @click="goToSports"
        class="flex items-center gap-0.5 text-xs font-medium text-brand-bright hover:text-gold transition-colors"
      >
        View All
        <ChevronRightIcon class="w-3 h-3" />
      </button>
    </div>

    <!-- Row 2: Sport tabs -->
    <div class="flex items-center gap-3 px-3 pb-1.5 overflow-x-auto scrollbar-hide">
      <SportsTabs />
    </div>

    <!-- Row 3: View mode tabs -->
    <div class="flex items-center gap-2 px-3 pb-2">
      <div class="flex-1 min-w-0 overflow-x-auto scrollbar-hide">
        <HighlitsTab />
      </div>
    </div>

    <!-- Row 4: Calendar + Markets -->
    <div class="flex items-center justify-between gap-2 px-3 pb-2.5">
      <div class="flex items-center gap-1.5 shrink-0">
        <CalendarDropdown />
      </div>
      <div class="flex items-center gap-1.5 shrink-0">
        <MarketsTab />
      </div>
    </div>

    <!-- Column header with search -->
    <ColumnHeaderSearch
      v-if="matches?.length"
      :matches="matches"
      :outcome-labels="outcomeLabels"
    />
  </div>
</template>

<style scoped>
.sports-filter-bar {
  background: white;
  border: 1px solid oklch(0% 0 0 / 0.06);
  border-bottom: none;
  box-shadow:
    0 1px 3px oklch(0% 0 0 / 0.05),
    0 4px 16px oklch(0% 0 0 / 0.04);
}
[data-theme="dark"] .sports-filter-bar {
  background: var(--surface-elevated);
  border-color: transparent;
  box-shadow:
    0 1px 3px oklch(0% 0 0 / 0.12),
    0 4px 16px oklch(0% 0 0 / 0.2);
}
</style>
