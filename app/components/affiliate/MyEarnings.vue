<script setup>
import formatStuff from "@/utilities/format-stuff";
import { ArrowTrendingUpIcon } from "@heroicons/vue/24/solid";
import { storeToRefs } from "pinia";
import { useAffiliateStore } from "../../stores/affiliate";
import TheButtonSpin from "../TheButtonSpin.vue";

const { formattedNumber } = formatStuff();
const { earnings, withdrawPending } = storeToRefs(useAffiliateStore());
const { withdrawAffiliateEarnings } = useAffiliateStore();
</script>

<template>
  <div class="bg-linear-to-br from-brand-bright to-brand-bright/80 rounded-xl p-5 text-white">
    <!-- Header -->
    <div class="flex items-center justify-between mb-4">
      <div class="flex items-center gap-2">
        <ArrowTrendingUpIcon class="w-5 h-5 text-white/80" />
        <h2 class="text-sm font-semibold text-white/90 uppercase tracking-wider">My Stats</h2>
      </div>
    </div>

    <!-- Total earnings — primary focus -->
    <div class="text-center mb-5">
      <p class="text-3xl md:text-4xl font-extrabold tabular-nums">
        {{ formattedNumber(earnings?.earnings?.totalEarnings) }}
      </p>
      <p class="text-sm text-white/70 mt-1">Total Earnings</p>
    </div>

    <!-- Secondary stats row -->
    <div class="flex items-center justify-between gap-4 pt-4 border-t border-white/20">
      <div>
        <p class="text-lg font-bold tabular-nums">
          {{ formattedNumber(earnings?.earnings?.currentWeekEarnings) }}
        </p>
        <p class="text-xs text-white/60">This Week</p>
      </div>

      <div class="text-right">
        <p class="text-lg font-bold tabular-nums">
          {{ formattedNumber(earnings?.earnings?.availableForWithdraw) }}
        </p>
        <button
          class="mt-1 bg-white/20 hover:bg-white/30 text-white text-xs font-semibold px-4 py-1.5 rounded-lg transition-colors"
          @click="withdrawAffiliateEarnings"
        >
          <TheButtonSpin v-if="withdrawPending" />
          <span v-else>Withdraw</span>
        </button>
      </div>
    </div>
  </div>
</template>
