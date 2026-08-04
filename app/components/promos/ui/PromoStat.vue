<script setup>
defineProps({
  label: { type: String, default: "" },
  value: { type: String, default: "" },
  accent: { type: String, default: "neutral" }, // neutral | emerald | gold | bronze | diamond
});
</script>

<template>
  <div class="pstat" :class="`pstat--${accent}`">
    <p v-if="label" class="pstat__label">{{ label }}</p>
    <p v-if="value" class="pstat__value">{{ value }}</p>
    <div v-if="$slots.default" class="pstat__body"><slot /></div>
  </div>
</template>

<style scoped>
.pstat {
  position: relative;
  padding: 20px;
  border-radius: 18px;
  background: var(--surface-elevated);
  border: 1px solid var(--border);
  overflow: hidden;
}
[data-theme="light"] .pstat {
  background: #fff;
}
/* top accent rule (full width, not a side stripe) */
.pstat::before {
  content: "";
  position: absolute;
  inset: 0 0 auto 0;
  height: 3px;
  background: var(--border-strong);
}
.pstat--emerald::before {
  background: var(--brand-bright);
}
.pstat--gold::before {
  background: var(--gold);
}
.pstat--bronze::before {
  background: #c08442;
}
.pstat--diamond::before {
  background: color-mix(in oklch, var(--brand-teal) 60%, #6ad0ff);
}

.pstat__label {
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--muted-foreground);
}
.pstat--emerald .pstat__label {
  color: var(--brand-bright);
}
.pstat--gold .pstat__label,
.pstat--diamond .pstat__label,
.pstat--bronze .pstat__label {
  color: var(--foreground);
}
[data-theme="dark"] .pstat--gold .pstat__label {
  color: var(--gold-bright);
}

.pstat__value {
  margin-top: 8px;
  font-size: clamp(1.5rem, 3.4vw, 2rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1;
  color: var(--foreground);
  font-variant-numeric: tabular-nums;
}
.pstat--gold .pstat__value {
  color: var(--gold-deep);
}
[data-theme="dark"] .pstat--gold .pstat__value {
  color: var(--gold-bright);
}

.pstat__body {
  margin-top: 12px;
  font-size: 0.85rem;
  line-height: 1.6;
  color: var(--muted-foreground);
}
.pstat__body :deep(strong) {
  color: var(--foreground);
  font-weight: 700;
}
</style>
