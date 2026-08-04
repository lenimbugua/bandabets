<script setup>
import { storeToRefs } from "pinia";
import { useBetslipStore } from "../stores/sports-betslip.js";
import BetslipMatchDetails from "./BetslipMatchDetails.vue";
import EmptyBetslip from "./EmptyBetslip.vue";
import MultibetBoost from "./MultibetBoost.vue";

const { betslip, betslipLength } = storeToRefs(useBetslipStore());
const { deleteAnItemFromBetslip } = useBetslipStore();

function showStatusBar(deviation, status) {
  if (status !== 1) return true;
  if (typeof deviation === "undefined") return false;
  if (deviation !== 0) return true;
  return false;
}

function getDeviationCssClass(prevOddValue, currentOddValue) {
  const deviation = currentOddValue - prevOddValue;
  if (deviation > 0) return "bg-brand-bright/8 text-brand-bright";
  if (deviation < 0) return "bg-red-500/8 text-red-500";
  return "";
}
</script>

<template>
  <EmptyBetslip v-if="betslipLength === 0" />
  <div v-else class="w-full flex flex-col min-h-0 flex-1">
    <!-- Multibet boost -->
    <div class="shrink-0 p-1.5">
      <MultibetBoost />
    </div>

    <!-- Betslip items — scrollable -->
    <div class="flex-1 min-h-0 overflow-y-auto scrollbar-hide px-2 py-1.5 space-y-1.5">
      <div
        v-for="(item, index) in betslip"
        :key="item.customId"
        :class="[
          'rounded-lg overflow-hidden border transition-colors duration-150',
          item.status !== 1
            ? 'border-red-500/30 opacity-60'
            : 'border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/15 bg-white dark:bg-white/6',
        ]"
      >
        <BetslipBetbuilderDetails
          v-if="item.isBetBuilder"
          :item
          :index
          :delete-an-item-from-betslip="deleteAnItemFromBetslip"
        />
        <BetslipMatchDetails
          v-else
          :item
          :index
          :delete-an-item-from-betslip="deleteAnItemFromBetslip"
        />
        <div v-if="showStatusBar(item.deviation, item.status)" class="w-full">
          <div
            v-if="item.status !== 1"
            class="w-full text-[10px] font-medium px-3 py-1 bg-red-500/8 text-red-500"
          >
            Odds for this match have been deactivated
          </div>
          <div
            v-else
            :class="getDeviationCssClass(item.prevOddValue, item.oddValue)"
            class="w-full text-[10px] font-medium px-3 py-1"
          >
            Odds {{ item.oddValue > item.prevOddValue ? 'boosted' : 'dropped' }} from {{ item.prevOddValue }} to
            {{ item.oddValue }}
          </div>
        </div>
      </div>
    </div>

    <!-- BetControls — always pinned at bottom -->
    <div class="shrink-0">
      <BetControls />
    </div>
  </div>
</template>
