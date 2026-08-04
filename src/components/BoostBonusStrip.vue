<script setup>
import { useBetslip } from "@/composables/useBetslip";
import { useMultibetBonus } from "@/composables/useMultibetBonus";

import { useModalTypes } from "@/composables/useModalTypes";
import { toRefs } from "vue";
import { useBetslipStore } from "../stores/sports-betslip";

import { useModalStore } from "@/stores/modal";

const { multibetBoostModal } = useModalTypes();

const { openModal } = useModalStore();

const { betslip, stake } = toRefs(useBetslipStore());

const { calculatePossibleWin } = useBetslip();

const {
  getNextBoost,
  getCurrentBoost,
  getLegsToNextBonus,
  calculateBoostBonus,
} = useMultibetBonus();
</script>
<template>
  <div class="strip" @click="openModal(multibetBoostModal)">
    <span v-if="getCurrentBoost() > 0" class="strip-current">
      {{ getCurrentBoost() }}% Boost KSH {{ calculateBoostBonus(calculatePossibleWin(betslip, stake)).toFixed("2") }}
    </span>
    <span v-if="getCurrentBoost() > 0" class="strip-sep">&middot;</span>
    <span class="strip-next">Add {{ getLegsToNextBonus() }} more get {{ getNextBoost() }}% boost</span>
  </div>
</template>

<style scoped>
.strip {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.375rem 0.625rem;
  border-radius: 0.5rem 0.5rem 0 0;
  background: var(--primary);
  cursor: pointer;
  transition: background 0.15s;
}
.strip:hover {
  background: var(--secondary);
}

.strip-current {
  font-size: 0.65rem;
  font-weight: 700;
  color: oklch(100% 0 0);
  white-space: nowrap;
}

.strip-sep {
  font-size: 0.65rem;
  color: oklch(100% 0 0 / 0.5);
}

.strip-next {
  font-size: 0.65rem;
  font-weight: 600;
  color: oklch(100% 0 0 / 0.85);
  white-space: nowrap;
}
</style>
