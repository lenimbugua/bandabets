<script setup>
defineProps({
  tone: { type: String, default: "neutral" }, // neutral | elevated | forest | gold
  eyebrow: { type: String, default: "" },
  eyebrowTone: { type: String, default: "emerald" }, // emerald | gold
  title: { type: String, default: "" },
  align: { type: String, default: "left" }, // left | center
});
</script>

<template>
  <section class="psec" :class="[`psec--${tone}`, `psec--${align}`]">
    <header v-if="eyebrow || title || $slots.header" class="psec__head">
      <slot name="header">
        <p v-if="eyebrow" class="psec__eyebrow" :class="`psec__eyebrow--${eyebrowTone}`">
          {{ eyebrow }}
        </p>
        <h2 v-if="title" class="psec__title">{{ title }}</h2>
      </slot>
    </header>
    <div class="psec__body">
      <slot />
    </div>
  </section>
</template>

<style scoped>
.psec {
  position: relative;
  border-radius: 22px;
  border: 1px solid var(--border);
  background: var(--card);
  padding: clamp(20px, 3.5vw, 34px);
  box-shadow: 0 1px 2px oklch(0% 0 0 / 0.04);
}
[data-theme="dark"] .psec {
  box-shadow: inset 0 1px 0 oklch(100% 0 0 / 0.02);
}

/* ── Tonal variants (subtle bg shades) ── */
.psec--elevated {
  background: var(--surface-elevated);
}
.psec--forest {
  background: color-mix(in oklch, var(--brand-forest) 12%, var(--card));
  border-color: color-mix(in oklch, var(--brand-bright) 26%, var(--border));
}
.psec--gold {
  background: color-mix(in oklch, var(--gold) 9%, var(--card));
  border-color: color-mix(in oklch, var(--gold) 32%, var(--border));
}

/* ── Header ── */
.psec__head {
  margin-bottom: clamp(14px, 2vw, 20px);
}
.psec--center .psec__head,
.psec--center .psec__body {
  text-align: center;
}
.psec--center .psec__eyebrow {
  justify-content: center;
}

.psec__eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  margin-bottom: 10px;
}
.psec__eyebrow--emerald {
  color: var(--brand-bright);
}
[data-theme="light"] .psec__eyebrow--emerald {
  color: var(--primary);
}
.psec__eyebrow--gold {
  color: var(--gold-deep);
}
[data-theme="dark"] .psec__eyebrow--gold {
  color: var(--gold-bright);
}

.psec__title {
  font-size: clamp(1.35rem, 3vw, 1.85rem);
  font-weight: 800;
  letter-spacing: -0.022em;
  line-height: 1.12;
  color: var(--foreground);
}

.psec__body {
  color: var(--muted-foreground);
  line-height: 1.65;
  font-size: 0.95rem;
}
.psec__body :deep(p) {
  max-width: 68ch;
}
.psec--center .psec__body :deep(p) {
  margin-left: auto;
  margin-right: auto;
}
.psec__body :deep(strong) {
  color: var(--foreground);
  font-weight: 700;
}

/* Premium bullet lists */
.psec__body :deep(ul.plist) {
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 70ch;
}
.psec__body :deep(ul.plist > li) {
  position: relative;
  padding-left: 28px;
  font-size: 0.9rem;
  line-height: 1.6;
}
.psec__body :deep(ul.plist > li)::before {
  content: "";
  position: absolute;
  left: 4px;
  top: 0.55em;
  width: 7px;
  height: 7px;
  border-radius: 2px;
  background: var(--brand-bright);
  transform: rotate(45deg);
}
[data-theme="light"] .psec__body :deep(ul.plist > li)::before {
  background: var(--primary);
}
</style>
