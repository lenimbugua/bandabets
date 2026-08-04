<script setup>
import { onMounted, ref } from 'vue';

const isVisible = ref(true);
const letters = [..."Naibet"];

onMounted(() => {
  // Hide splash after 2 seconds
  setTimeout(() => {
    isVisible.value = false;
  }, 2000);
});
</script>

<template>
  <transition name="fade">
    <div v-if="isVisible" class="fixed inset-0 bg-background z-9999 flex items-center justify-center">
      <!-- One word, one letter per dancer. It used to stack three lines that
           all read "nai" — a leftover from the rebrand — so the splash never
           spelled the brand out. -->
      <div
        class="flex items-end text-center text-6xl md:text-7xl font-display font-bold tracking-tight"
        role="img"
        aria-label="Naibet"
      >
        <span
          v-for="(letter, i) in letters"
          :key="i"
          class="animate-dance"
          :class="i % 2 === 0 ? 'text-primary' : 'text-secondary'"
          :style="{ animationDelay: `${i * 0.08}s` }"
          aria-hidden="true"
          >{{ letter }}</span
        >
      </div>
    </div>
  </transition>
</template>

<style scoped>
@keyframes siakaDance {
  0% {
    transform: translateY(0) rotateZ(0deg) scale(1);
  }
  10% {
    transform: translateY(-15px) rotateZ(-2deg) scale(1.08);
  }
  20% {
    transform: translateY(0) rotateZ(2deg) scale(1);
  }
  30% {
    transform: translateY(-10px) rotateZ(-1deg) scale(1.05);
  }
  40% {
    transform: translateY(0) rotateZ(1deg) scale(1);
  }
  50% {
    transform: translateY(-20px) rotateZ(0deg) scale(1.1);
  }
  60% {
    transform: translateY(0) rotateZ(-2deg) scale(1);
  }
  70% {
    transform: translateY(-12px) rotateZ(2deg) scale(1.06);
  }
  80% {
    transform: translateY(0) rotateZ(-1deg) scale(1);
  }
  90% {
    transform: translateY(-8px) rotateZ(1deg) scale(1.03);
  }
  100% {
    transform: translateY(0) rotateZ(0deg) scale(1);
  }
}

.animate-dance {
  display: inline-block;
  animation: siakaDance 1.2s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite;
}

/* The per-letter offsets are set inline; honour a reduced-motion preference
   by holding the word still rather than bouncing six glyphs. */
@media (prefers-reduced-motion: reduce) {
  .animate-dance {
    animation: none;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
