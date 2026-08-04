<template>
  <div
    class="w-full h-8 bg-background flex items-center justify-center relative overflow-hidden shadow-2xl"
  >
    <div
      class="top-lights absolute top-0 left-0 w-full h-[4px] flex justify-between px-1.5"
    >
      <div class="light light-1 amber-500"></div>
      <div class="light light-2 fuchsia-500"></div>
      <div class="light light-3 red-500"></div>
      <div class="light light-4 red-500"></div>
      <div class="light light-5 sky-500"></div>
      <div class="light light-6 teal-500"></div>
      <div class="light light-7 amber-500"></div>
      <div class="light light-8 fuchsia-500"></div>
      <div class="light light-9 red-500"></div>
      <div class="light light-10 red-500"></div>
      <div class="light light-11 sky-500"></div>
      <div class="light light-12 teal-500"></div>
      <div class="light light-13 amber-500"></div>
      <div class="light light-14 fuchsia-500"></div>
      <div class="light light-15 red-500"></div>
      <div class="light light-16 red-500"></div>
      <div class="light light-17 sky-500"></div>
      <div class="light light-18 teal-500"></div>
      <div class="light light-19 amber-500"></div>
      <div class="light light-20 fuchsia-500"></div>
      <div class="light light-21 red-500"></div>
      <div class="light light-22 red-500"></div>
      <div class="light light-23 sky-500"></div>
      <div class="light light-24 teal-500"></div>
      <div class="light light-25 amber-500"></div>
    </div>

    <div
      class="bottom-lights absolute bottom-0 left-0 w-full h-[4px] flex justify-between px-1.5"
    >
      <div class="light light-b1 red-500"></div>
      <div class="light light-b2 sky-500"></div>
      <div class="light light-b3 teal-500"></div>
      <div class="light light-b4 amber-500"></div>
      <div class="light light-b5 fuchsia-500"></div>
      <div class="light light-b6 red-500"></div>
      <div class="light light-b7 red-500"></div>
      <div class="light light-b8 sky-500"></div>
      <div class="light light-b9 teal-500"></div>
      <div class="light light-b10 amber-500"></div>
      <div class="light light-b11 fuchsia-500"></div>
      <div class="light light-b12 red-500"></div>
      <div class="light light-b13 red-500"></div>
      <div class="light light-b14 sky-500"></div>
      <div class="light light-b15 teal-500"></div>
      <div class="light light-b16 amber-500"></div>
      <div class="light light-b17 fuchsia-500"></div>
      <div class="light light-b18 red-500"></div>
      <div class="light light-b19 red-500"></div>
      <div class="light light-b20 sky-500"></div>
      <div class="light light-b21 teal-500"></div>
      <div class="light light-b22 amber-500"></div>
      <div class="light light-b23 fuchsia-500"></div>
      <div class="light light-b24 red-500"></div>
      <div class="light light-b25 red-500"></div>
    </div>

    <p
      class="relative z-20 text-2xl font-black text-gold-bright tracking-wider animate-pulse"
      style="text-shadow: 0 0 5px rgba(255, 255, 255, 0.6)"
    >
      Sambaza Krisii na mabeste!
    </p>
  </div>
</template>

<style scoped>
/* --- Twinkling Light CSS (Optimized for h-8) --- */

/* Base Light Style */
.light {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  /* Stronger, more focused glow for visibility on a small strip */
  box-shadow: 0 0 3px 1px rgba(255, 255, 255, 0.8);

  /* Twinkle animation definition */
  animation: twinkle 3s infinite alternate;
  z-index: 10;
}

/* Base colors using RGB Tailwind values for consistency */
.amber-500 {
  background-color: rgb(245 158 11);
}
.fuchsia-500 {
  background-color: rgb(217 70 239);
}
.red-500 {
  background-color: var(--brand-bright);
}
.red-500 {
  background-color: rgb(239 68 68);
}
.sky-500 {
  background-color: rgb(14 165 233);
}
.teal-500 {
  background-color: rgb(20 184 166);
}

/* Applying unique animation delays for non-synchronous twinkle */
/* This pattern ensures the lights twinkle randomly, not all at once */
.light:nth-child(5n + 1) {
  animation-delay: 0.1s;
}
.light:nth-child(5n + 2) {
  animation-delay: 0.8s;
}
.light:nth-child(5n + 3) {
  animation-delay: 1.5s;
}
.light:nth-child(5n + 4) {
  animation-delay: 2.2s;
}
.light:nth-child(5n + 5) {
  animation-delay: 2.9s;
}

/* The Twinkle Animation */
@keyframes twinkle {
  0% {
    opacity: 0.2; /* Dimmest state */
    transform: scale(0.7);
  }
  50% {
    opacity: 1; /* Brightest state (the "on" moment) */
    transform: scale(1.1);
  }
  100% {
    opacity: 0.2; /* Return to dim state */
    transform: scale(0.7);
  }
}
</style>
