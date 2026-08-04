<script setup>
defineProps({
  badge: { type: [String, Number], default: "" }, // number or emoji
  title: { type: String, default: "" },
  tone: { type: String, default: "emerald" }, // emerald | gold
});
</script>

<template>
  <div class="pstep">
    <span class="pstep__badge" :class="`pstep__badge--${tone}`">{{ badge }}</span>
    <div class="pstep__text">
      <p v-if="title" class="pstep__title">{{ title }}</p>
      <p v-if="$slots.default" class="pstep__desc"><slot /></p>
    </div>
  </div>
</template>

<style scoped>
.pstep {
  display: flex;
  gap: 14px;
  align-items: flex-start;
  padding: 16px;
  border-radius: 16px;
  background: color-mix(in oklch, var(--foreground) 3%, transparent);
  border: 1px solid color-mix(in oklch, var(--border) 60%, transparent);
}

.pstep__badge {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border-radius: 11px;
  font-size: 0.95rem;
  font-weight: 800;
  font-variant-numeric: tabular-nums;
}
.pstep__badge--emerald {
  background: color-mix(in oklch, var(--brand-bright) 16%, transparent);
  color: var(--brand-bright);
}
[data-theme="light"] .pstep__badge--emerald {
  background: color-mix(in oklch, var(--primary) 12%, transparent);
  color: var(--primary);
}
.pstep__badge--gold {
  background: color-mix(in oklch, var(--gold) 16%, transparent);
  color: var(--gold-deep);
}
[data-theme="dark"] .pstep__badge--gold {
  color: var(--gold-bright);
}

.pstep__text {
  min-width: 0;
}
.pstep__title {
  font-size: 0.95rem;
  font-weight: 700;
  letter-spacing: -0.01em;
  color: var(--foreground);
  line-height: 1.3;
}
.pstep__desc {
  margin-top: 4px;
  font-size: 0.82rem;
  line-height: 1.55;
  color: var(--muted-foreground);
}
</style>
