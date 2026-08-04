<script setup>
import { computed } from "vue";
const props = defineProps({
  statusDesc: { type: String, required: true },
  matchState: { type: String, required: true },
  isLive: { type: Boolean, required: true },
  status: { type: Number, required: true },
});

const isEnded = computed(() => props.status !== 1 && props.isLive == 0);
</script>
<template>
  <div class="livebox" :class="'livebox-status-' + status">
    <div v-if="!isEnded">
      <div class="livebox-label">Live</div>
      <div class="livebox-time">{{ statusDesc }}'</div>
      <div class="livebox-state">{{ matchState }}</div>
    </div>
    <div v-else class="livebox-ended">
      Match Ended
    </div>
  </div>
</template>

<style scoped>
.livebox {
  border-radius: 0.375rem;
  overflow: hidden;
  width: 3rem;
  border: 1px solid oklch(0% 0 0 / 0.08);
}
[data-theme="dark"] .livebox {
  border-color: oklch(100% 0 0 / 0.1);
}

/* Live label — red for in-play */
.livebox-label {
  font-size: 0.6rem;
  font-weight: 700;
  text-align: center;
  padding: 0.125rem 0.25rem;
  background: oklch(55% 0.24 25);
  color: oklch(100% 0 0);
}

.livebox-time {
  font-size: 0.6rem;
  font-weight: 700;
  text-align: center;
  padding: 0.0625rem 0.125rem;
  color: oklch(50% 0.22 25);
}
[data-theme="dark"] .livebox-time {
  color: oklch(72% 0.18 25);
}

.livebox-state {
  font-size: 0.55rem;
  font-weight: 500;
  text-align: center;
  padding: 0 0.125rem 0.125rem;
  color: oklch(50% 0 0);
}
[data-theme="dark"] .livebox-state {
  color: oklch(100% 0 0 / 0.45);
}

/* Ended — use status color */
.livebox-ended {
  font-size: 0.55rem;
  font-weight: 600;
  text-align: center;
  padding: 0.375rem 0.125rem;
  color: oklch(50% 0 0);
}
[data-theme="dark"] .livebox-ended {
  color: oklch(100% 0 0 / 0.5);
}

/* Status-colored borders for ended matches */
.livebox-status-5 { border-color: oklch(50% 0.22 155 / 0.3); }
.livebox-status-3 { border-color: oklch(52% 0.24 25 / 0.3); }
.livebox-status-15 { border-color: oklch(50% 0.14 195 / 0.3); }
.livebox-status-10 { border-color: color-mix(in oklch, var(--border) 60%, transparent); }
.livebox-status-2 { border-color: oklch(58% 0.03 55 / 0.3); }
[data-theme="dark"] .livebox-status-5 { border-color: oklch(78% 0.18 155 / 0.25); }
[data-theme="dark"] .livebox-status-3 { border-color: oklch(72% 0.2 25 / 0.25); }
[data-theme="dark"] .livebox-status-15 { border-color: oklch(75% 0.12 195 / 0.25); }
[data-theme="dark"] .livebox-status-10 { border-color: color-mix(in oklch, var(--border) 50%, transparent); }
[data-theme="dark"] .livebox-status-2 { border-color: oklch(65% 0.03 55 / 0.25); }

/* Ended text colored by status */
.livebox-status-5 .livebox-ended { color: oklch(50% 0.22 155); }
.livebox-status-3 .livebox-ended { color: oklch(52% 0.24 25); }
.livebox-status-15 .livebox-ended { color: oklch(50% 0.14 195); }
.livebox-status-10 .livebox-ended { color: var(--muted-foreground); }
[data-theme="dark"] .livebox-status-5 .livebox-ended { color: oklch(78% 0.18 155); }
[data-theme="dark"] .livebox-status-3 .livebox-ended { color: oklch(72% 0.2 25); }
[data-theme="dark"] .livebox-status-15 .livebox-ended { color: oklch(75% 0.12 195); }
[data-theme="dark"] .livebox-status-10 .livebox-ended { color: var(--muted-foreground); }
</style>
