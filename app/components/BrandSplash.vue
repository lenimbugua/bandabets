<script setup>
import BandaLogo from "./logos/BandaLogo.vue";

const isVisible = ref(true);
const hasEntered = ref(false);

// Two beats, not one: the mark settles first, then the rule under it draws.
// Sequencing reads as deliberate; everything arriving at once reads as a
// page that simply appeared.
onMounted(() => {
  requestAnimationFrame(() => {
    hasEntered.value = true;
  });
  setTimeout(() => {
    isVisible.value = false;
  }, 1800);
});
</script>

<template>
  <Transition name="splash">
    <div
      v-if="isVisible"
      class="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-background"
      role="status"
      aria-label="Bandabets is loading"
    >
      <BandaLogo
        class="splash-mark h-9 w-auto md:h-11"
        :class="{ 'is-in': hasEntered }"
      />

      <!-- A hairline that draws to full width, then holds. It reads as
           progress without pretending to measure anything it cannot know. -->
      <span
        class="splash-rule mt-6 block h-px w-32 origin-left bg-primary md:w-40"
        :class="{ 'is-in': hasEntered }"
        aria-hidden="true"
      />
    </div>
  </Transition>
</template>

<style scoped>
/* ease-out-expo. The mark decelerates hard into place and stops — no
   overshoot, no settle wobble. The previous splash bounced each glyph on a
   springy cubic-bezier, which read as a game, not a sportsbook. */
.splash-mark {
  opacity: 0;
  transform: translateY(6px) scale(0.985);
  transition:
    opacity 620ms cubic-bezier(0.16, 1, 0.3, 1),
    transform 620ms cubic-bezier(0.16, 1, 0.3, 1);
}

.splash-mark.is-in {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.splash-rule {
  transform: scaleX(0);
  opacity: 0.9;
  transition: transform 900ms cubic-bezier(0.16, 1, 0.3, 1) 180ms;
}

.splash-rule.is-in {
  transform: scaleX(1);
}

/* Exit lifts very slightly as it fades, so the splash feels lifted away
   rather than switched off. */
.splash-leave-active {
  transition:
    opacity 420ms cubic-bezier(0.16, 1, 0.3, 1),
    transform 420ms cubic-bezier(0.16, 1, 0.3, 1);
}

.splash-leave-to {
  opacity: 0;
  transform: scale(1.012);
}

/* Reduced motion: keep the brand, drop the movement. The mark is present
   immediately and only the fade-out remains. */
@media (prefers-reduced-motion: reduce) {
  .splash-mark,
  .splash-rule {
    opacity: 1;
    transform: none;
    transition: none;
  }

  .splash-leave-active {
    transition: opacity 200ms linear;
  }

  .splash-leave-to {
    transform: none;
  }
}
</style>
