<script setup>
defineProps({
  title: { type: String, default: "" },
  note: { type: String, default: "" },
});
</script>

<template>
  <section class="pcta">
    <div class="pcta__glow" aria-hidden="true"></div>
    <h2 class="pcta__title">{{ title }}</h2>
    <p v-if="$slots.default" class="pcta__sub"><slot name="sub" /><slot /></p>
    <div class="pcta__actions">
      <slot name="actions" />
    </div>
    <p v-if="note" class="pcta__note">{{ note }}</p>
  </section>
</template>

<style scoped>
.pcta {
  position: relative;
  overflow: hidden;
  text-align: center;
  border-radius: 24px;
  padding: clamp(32px, 5vw, 52px) clamp(20px, 4vw, 40px);
  background: var(--brand-forest);
  border: 1px solid color-mix(in oklch, var(--brand-bright) 30%, transparent);
  color: #eafbef;
}
.pcta__glow {
  position: absolute;
  inset: -40% 30% auto;
  height: 240px;
  background: radial-gradient(
    ellipse at top,
    color-mix(in oklch, var(--gold) 28%, transparent),
    transparent 70%
  );
  pointer-events: none;
}
.pcta__title {
  position: relative;
  font-size: clamp(1.5rem, 3.6vw, 2.1rem);
  font-weight: 800;
  letter-spacing: -0.025em;
  line-height: 1.1;
  color: #fff;
}
.pcta__sub {
  position: relative;
  margin-top: 12px;
  font-size: 1rem;
  line-height: 1.55;
  color: color-mix(in oklch, #fff 78%, var(--brand-forest));
  max-width: 52ch;
  margin-left: auto;
  margin-right: auto;
}
.pcta__actions {
  position: relative;
  margin-top: 26px;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
}
.pcta__actions :deep(a),
.pcta__actions :deep(button) {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 13px 28px;
  border-radius: 14px;
  font-weight: 800;
  font-size: 0.95rem;
  letter-spacing: -0.01em;
  background: var(--gold);
  color: var(--gold-foreground);
  box-shadow: 0 8px 24px color-mix(in oklch, var(--gold) 35%, transparent);
  transition: transform 0.18s cubic-bezier(0.22, 1, 0.36, 1), filter 0.18s;
  cursor: pointer;
}
.pcta__actions :deep(a:hover),
.pcta__actions :deep(button:hover) {
  transform: translateY(-2px);
  filter: brightness(1.05);
}
.pcta__note {
  position: relative;
  margin-top: 18px;
  font-size: 0.72rem;
  letter-spacing: 0.04em;
  color: color-mix(in oklch, #fff 55%, var(--brand-forest));
}
</style>
