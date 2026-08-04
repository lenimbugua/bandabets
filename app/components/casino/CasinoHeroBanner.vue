<script setup>
import { onMounted, onUnmounted, ref } from "vue";

const currentSlide = ref(0);
const touchStartX = ref(0);
const touchEndX = ref(0);
let interval = null;

const slides = [
  {
    title: "Bandabets Aviator Karibu Bonus",
    subtitle: "UP TO 50 FREE BETS",
    description: "Register today and get up to 50 FREE Aviator Bets instantly!",
    cta: "Claim Now",
    ctaRoute: "aviator",
    gradient: "from-brand-forest via-brand-selected to-brand-teal",
    accent: "var(--primary)",
    badge: "NEW",
    icon: "plane",
  },
  {
    title: "Aviator Welcome Bonus!",
    subtitle: "25 FREE BETS WORTH KES 250",
    description:
      "Earn up to 25 free bets worth KES 10 each on Aviator during your first 5 days!",
    cta: "Get Bonus",
    ctaRoute: "aviator",
    gradient: "from-destructive via-destructive to-card",
    accent: "var(--destructive)",
    badge: "WELCOME",
    icon: "gift",
  },
  {
    title: "BANDABETS AVIATOR FREE RAINS",
    subtitle: "WIN OVER KSH 200,000",
    description:
      "Daily opportunity to win over KSH 200,000 in free bets on Aviator!",
    cta: "Play Aviator",
    ctaRoute: "aviator",
    gradient: "from-surface-deepest via-card to-surface-elevated",
    accent: "var(--muted-foreground)",
    badge: "DAILY",
    icon: "rain",
  },
  {
    title: "Daily Aviator Cashback",
    subtitle: "SURPRISE REWARDS DAILY",
    description:
      "Every day, our system randomly rewards loyal Aviator players with surprise cashback!",
    cta: "Play Now",
    ctaRoute: "aviator",
    gradient: "from-brand-teal via-brand-forest to-surface-deepest",
    accent: "var(--brand-teal)",
    badge: "CASHBACK",
    icon: "cash",
  },
];

function nextSlide() {
  currentSlide.value = (currentSlide.value + 1) % slides.length;
}

function prevSlide() {
  currentSlide.value = (currentSlide.value - 1 + slides.length) % slides.length;
}

function goToSlide(index) {
  currentSlide.value = index;
  resetInterval();
}

function resetInterval() {
  clearInterval(interval);
  interval = setInterval(nextSlide, 5000);
}

function onTouchStart(e) {
  touchStartX.value = e.changedTouches[0].screenX;
}

function onTouchEnd(e) {
  touchEndX.value = e.changedTouches[0].screenX;
  handleSwipe();
}

function onMouseDown(e) {
  touchStartX.value = e.screenX;
}

function onMouseUp(e) {
  touchEndX.value = e.screenX;
  handleSwipe();
}

function handleSwipe() {
  const delta = touchStartX.value - touchEndX.value;
  if (delta > 50) {
    nextSlide();
    resetInterval();
  } else if (delta < -50) {
    prevSlide();
    resetInterval();
  }
}

onMounted(() => {
  interval = setInterval(nextSlide, 5000);
});

onUnmounted(() => {
  clearInterval(interval);
});
</script>

<template>
  <div
    class="relative w-full overflow-hidden rounded-xl md:rounded-2xl mb-3 md:mb-5"
    @touchstart="onTouchStart"
    @touchend="onTouchEnd"
    @mousedown="onMouseDown"
    @mouseup="onMouseUp"
  >
    <!-- Slides -->
    <div
      class="flex transition-transform duration-500 ease-out"
      :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
    >
      <div v-for="(slide, index) in slides" :key="index" class="min-w-full">
        <div
          :class="[
            'relative rounded-xl md:rounded-2xl overflow-hidden',
            'h-24 md:h-48',
          ]"
        >
          <!-- Gradient background -->
          <div
            :class="['absolute inset-0 bg-linear-to-br', slide.gradient]"
          />

          <!-- Grid pattern overlay -->
          <div
            class="absolute inset-0 opacity-[0.04]"
            style="
              background-image: radial-gradient(
                circle,
                white 1px,
                transparent 1px
              );
              background-size: 20px 20px;
            "
          />

          <!-- Large decorative icon on the right -->
          <div
            class="absolute right-2 sm:right-8 top-1/2 -translate-y-1/2 opacity-[0.08]"
          >
            <!-- Plane -->
            <svg
              v-if="slide.icon === 'plane'"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              class="w-16 h-16 md:w-40 md:h-40 text-white"
            >
              <path
                d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"
              />
            </svg>
            <!-- Gift -->
            <svg
              v-else-if="slide.icon === 'gift'"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              class="w-16 h-16 md:w-40 md:h-40 text-white"
            >
              <path
                d="M20 6h-2.18c.11-.31.18-.65.18-1 0-1.66-1.34-3-3-3-1.05 0-1.96.54-2.5 1.35l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm11 15H4v-2h16v2zm0-5H4V8h5.08L7 10.83 8.62 12 12 7.4l3.38 4.6L17 10.83 14.92 8H20v6z"
              />
            </svg>
            <!-- Rain / Cloud -->
            <svg
              v-else-if="slide.icon === 'rain'"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              class="w-16 h-16 md:w-40 md:h-40 text-white"
            >
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.22.21-1.79L11 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"
              />
            </svg>
            <!-- Cash -->
            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              class="w-16 h-16 md:w-40 md:h-40 text-white"
            >
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.94s4.18 1.36 4.18 3.85c0 1.89-1.44 2.98-3.12 3.19z"
              />
            </svg>
          </div>

          <!-- Accent glow orbs -->
          <div
            class="absolute -left-4 -top-4 w-20 h-20 md:w-44 md:h-44 rounded-full blur-2xl md:blur-3xl opacity-25"
            :style="{ backgroundColor: slide.accent }"
          />
          <div
            class="absolute right-1/4 -bottom-6 w-16 h-16 md:w-28 md:h-28 rounded-full blur-2xl md:blur-3xl opacity-15"
            :style="{ backgroundColor: slide.accent }"
          />

          <!-- Diagonal accent line -->
          <div
            class="absolute top-0 right-[30%] w-px h-full opacity-10 origin-top rotate-15"
            :style="{ backgroundColor: slide.accent }"
          />

          <!-- Content -->
          <div
            class="relative z-10 h-full flex flex-col justify-center px-3 sm:px-8 md:px-10"
          >
            <!-- Badge + Subtitle row (mobile: single line) -->
            <div class="flex items-center gap-1.5 mb-0.5 md:mb-1.5">
              <span
                class="px-1.5 py-px md:px-2.5 md:py-0.5 rounded text-[7px] md:text-[10px] font-black tracking-wider backdrop-blur-xs shrink-0"
                :style="{
                  backgroundColor: slide.accent + '25',
                  color: slide.accent,
                  border: '1px solid ' + slide.accent + '40',
                }"
              >
                {{ slide.badge }}
              </span>
              <p
                class="text-[8px] md:text-xs font-bold uppercase tracking-widest md:tracking-[0.2em] truncate"
                :style="{ color: slide.accent }"
              >
                {{ slide.subtitle }}
              </p>
            </div>

            <!-- Title -->
            <h2
              class="text-white text-[13px] sm:text-lg md:text-2xl font-black leading-tight mb-0.5 md:mb-1.5 max-w-lg truncate"
            >
              {{ slide.title }}
            </h2>

            <!-- Description — hidden on mobile -->
            <p
              class="hidden md:block text-white/50 text-sm max-w-md mb-2 leading-relaxed truncate"
            >
              {{ slide.description }}
            </p>

            <!-- CTA button -->
            <RouterLink
              :to="{ name: slide.ctaRoute }"
              class="inline-flex items-center self-start gap-1 text-white text-[10px] md:text-sm font-bold px-3 md:px-5 py-1 md:py-2 rounded-full transition-all hover:brightness-110 hover:scale-[1.02] active:scale-[0.98] shadow-lg mt-0.5 md:mt-0"
              :style="{ backgroundColor: slide.accent }"
            >
              {{ slide.cta }}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2.5"
                stroke="currentColor"
                class="w-2.5 h-2.5 md:w-3.5 md:h-3.5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m8.25 4.5 7.5 7.5-7.5 7.5"
                />
              </svg>
            </RouterLink>
          </div>
        </div>
      </div>
    </div>

    <!-- Navigation arrows — hidden on mobile, shown on md+ -->
    <button
      aria-label="Previous slide"
      class="hidden md:flex absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 backdrop-blur-xs hover:bg-black/60 text-white/80 hover:text-white items-center justify-center transition-all z-10"
      @click="prevSlide"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="2.5"
        stroke="currentColor"
        class="w-3.5 h-3.5"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M15.75 19.5 8.25 12l7.5-7.5"
        />
      </svg>
    </button>
    <button
      aria-label="Next slide"
      class="hidden md:flex absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 backdrop-blur-xs hover:bg-black/60 text-white/80 hover:text-white items-center justify-center transition-all z-10"
      @click="nextSlide"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="2.5"
        stroke="currentColor"
        class="w-3.5 h-3.5"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="m8.25 4.5 7.5 7.5-7.5 7.5"
        />
      </svg>
    </button>

    <!-- Progress dots -->
    <div
      class="absolute bottom-1 md:bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1 md:gap-1.5 z-10"
    >
      <button
        v-for="(slide, index) in slides"
        :key="index"
        :aria-label="'Go to slide ' + (index + 1) + ': ' + slide.title"
        :class="[
          'rounded-full transition-all duration-300',
          currentSlide === index
            ? 'h-1 w-3.5 md:h-1.5 md:w-6'
            : 'h-1 w-1 md:h-1.5 md:w-1.5 hover:opacity-80',
        ]"
        :style="{
          backgroundColor:
            currentSlide === index
              ? slides[currentSlide].accent
              : 'rgba(255,255,255,0.3)',
        }"
        @click="goToSlide(index)"
      />
    </div>
  </div>
</template>
