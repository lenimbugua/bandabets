<script setup>
import { useMultibetBonus } from "@/composables/useMultibetBonus";
import { useBetslip } from "@/composables/useBetslip";
import { toRefs } from "vue";
import { useBetslipStore } from "../stores/sports-betslip";

const { calculatePossibleWin } = useBetslip();
const { betslip, stake } = toRefs(useBetslipStore());

const {
  getCurrentBoost,
  getNextBoost,
  getLegsToNextBonus,
  calculateBoostBonus,
} = useMultibetBonus();
</script>

<template>
  <div class="pb-1.5 -mx-1.5 px-1.5 border-b border-border/50">
    <div class="px-2.5 py-2 rounded-lg border border-gold-bright/20 bg-gold-bright/5">
      <!-- Boost info -->
      <div class="flex items-center gap-1.5">
        <svg class="w-3.5 h-3.5 text-gold-bright shrink-0" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M12.577 4.878a.75.75 0 0 1 .919-.53l4.78 1.281a.75.75 0 0 1 .531.919l-1.281 4.78a.75.75 0 0 1-1.449-.387l.81-3.022a19.407 19.407 0 0 0-5.594 5.203.75.75 0 0 1-1.139.093L7 10.06l-4.72 4.72a.75.75 0 0 1-1.06-1.061l5.25-5.25a.75.75 0 0 1 1.06 0l3.074 3.073a20.923 20.923 0 0 1 5.545-4.931l-3.042.815a.75.75 0 0 1-.53-.919Z" clip-rule="evenodd" />
        </svg>
        <span
          v-if="getCurrentBoost() > 0"
          class="text-xs font-bold text-gold-bright tabular-nums"
        >
          {{ getCurrentBoost() }}% Boost KSH {{ calculateBoostBonus(calculatePossibleWin(betslip, stake)).toFixed("2") }}
        </span>
      </div>

      <!-- Progress track -->
      <div class="mt-1.5 h-1 rounded-full bg-gold-bright/15 overflow-hidden">
        <div
          class="h-full rounded-full bg-gold-bright transition-all duration-300"
          :style="{ width: Math.min(getCurrentBoost() * 2, 100) + '%' }"
        ></div>
      </div>

      <!-- Sub text -->
      <div class="flex items-center gap-1 mt-1">
        <span class="text-[10px] text-muted-foreground">
          Add {{ getLegsToNextBonus() }} more to unlock <strong class="font-bold text-gold-bright">{{ getNextBoost() }}%</strong> boost
        </span>
        <span class="text-[10px] text-muted-foreground/40">&middot;</span>
        <span class="text-[10px] text-muted-foreground">Min 1.30 odds</span>
      </div>
    </div>
  </div>
</template>
