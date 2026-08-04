<script setup>
import { useOneCut } from "../composables/useOneCut";
import formatStuff from "../utilities/format-stuff";
import OneCutIcon from "./OneCutIcon.vue";
const { formattedNumber } = formatStuff();
const {
  buildLegsMessage,
  oneCutAmout,
  isOneCutQualified,
  oneCutRatio,
} = useOneCut();
</script>

<template>
  <div class="onecut-row">
    <div class="onecut-label">
      <OneCutIcon />
      <span class="onecut-name">1 Cut Win</span>
      <span class="onecut-ratio">{{ oneCutRatio() }}</span>
    </div>
    <span v-if="isOneCutQualified()" class="onecut-ready">Ready</span>
    <span v-else class="onecut-legs">{{ buildLegsMessage() }}</span>
    <div v-if="isOneCutQualified()" class="onecut-value">
      <span class="onecut-amount">{{ formattedNumber(oneCutAmout()) }}</span>
      <span class="onecut-currency">KES</span>
    </div>
  </div>
</template>

<style scoped>
.onecut-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.375rem;
}

.onecut-label {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  color: var(--primary);
}
[data-theme="dark"] .onecut-label {
  color: var(--primary);
}

.onecut-name {
  font-size: 0.65rem;
  font-weight: 700;
}

.onecut-ratio {
  font-size: 0.6rem;
  font-weight: 600;
  padding: 0.0625rem 0.3rem;
  border-radius: 0.25rem;
  background: color-mix(in oklch, var(--primary) 12%, transparent);
  color: var(--primary);
}
[data-theme="dark"] .onecut-ratio {
  background: color-mix(in oklch, var(--primary) 15%, transparent);
  color: var(--primary);
}

.onecut-ready {
  font-size: 0.55rem;
  font-weight: 700;
  color: var(--primary);
}

.onecut-legs {
  font-size: 0.55rem;
  font-weight: 500;
  color: oklch(50% 0 0);
}
[data-theme="dark"] .onecut-legs {
  color: oklch(100% 0 0 / 0.4);
}

.onecut-value {
  display: flex;
  align-items: baseline;
  gap: 0.2rem;
}

.onecut-amount {
  font-size: 0.8rem;
  font-weight: 800;
  color: oklch(20% 0 0);
}
[data-theme="dark"] .onecut-amount {
  color: oklch(100% 0 0 / 0.9);
}

.onecut-currency {
  font-size: 0.55rem;
  font-weight: 500;
  color: oklch(55% 0 0);
}
[data-theme="dark"] .onecut-currency {
  color: oklch(100% 0 0 / 0.3);
}
</style>
