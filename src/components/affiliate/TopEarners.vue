<script setup>
import formatStuff from "@/utilities/format-stuff";
import { storeToRefs } from "pinia";
import { useAffiliateStore } from "../../stores/affiliate";

const { formattedNumber } = formatStuff();
const { earnings } = storeToRefs(useAffiliateStore());

const getRankStyle = (rank) => {
  switch (rank) {
    case 1:
      return "text-gold-bright";
    case 2:
      return "text-slate-400 dark:text-slate-300";
    case 3:
      return "text-amber-700 dark:text-amber-600";
    default:
      return "text-muted-foreground";
  }
};

const getPodiumHeight = (rank) => {
  switch (rank) {
    case 1:
      return "h-16 md:h-24";
    case 2:
      return "h-12 md:h-18";
    case 3:
      return "h-10 md:h-14";
    default:
      return "h-8 md:h-12";
  }
};
</script>

<template>
  <div
    class="relative h-32 md:h-48 rounded-md overflow-hidden bg-linear-to-br from-gold-bright/5 via-transparent to-brand-bright/5 dark:from-gold-bright/10 dark:via-background dark:to-brand-bright/10"
  >
    <!-- Subtle decorative accents -->
    <div
      class="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-24 rounded-full bg-gold-bright/8 blur-3xl"
    ></div>

    <div class="relative z-10 flex flex-col h-full px-4 pt-2 md:pt-3">
      <h3 class="text-center text-sm md:text-lg font-bold text-gold-bright mb-2 md:mb-3">
        Top Earners
      </h3>

      <div class="flex justify-center items-end gap-3 md:gap-4 flex-1 pb-2">
        <div
          v-for="topEarner in earnings?.topEarners"
          :key="topEarner?.position"
          class="flex flex-col items-center"
        >
          <!-- Trophy icon -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            :class="getRankStyle(topEarner.position)"
            class="w-8 h-8 md:w-12 md:h-12 mb-1"
            viewBox="0 0 576 512"
          >
            <path
              fill="currentColor"
              d="M400 0H176c-26.5 0-48.1 21.8-47.1 48.2c.2 5.3.4 10.6.7 15.8H24C10.7 64 0 74.7 0 88c0 92.6 33.5 157 78.5 200.7c44.3 43.1 98.3 64.8 138.1 75.8c23.4 6.5 39.4 26 39.4 45.6c0 20.9-17 37.9-37.9 37.9H192c-17.7 0-32 14.3-32 32s14.3 32 32 32h192c17.7 0 32-14.3 32-32s-14.3-32-32-32h-26.1c-20.9 0-37.9-17-37.9-37.9c0-19.6 15.9-39.2 39.4-45.6c39.9-11 93.9-32.7 138.2-75.8C542.5 245 576 180.6 576 88c0-13.3-10.7-24-24-24H446.4c.3-5.2.5-10.4.7-15.8C448.1 21.8 426.5 0 400 0M48.9 112h84.4c9.1 90.1 29.2 150.3 51.9 190.6c-24.9-11-50.8-26.5-73.2-48.3c-32-31.1-58-76-63-142.3zm415.2 142.3c-22.4 21.8-48.3 37.3-73.2 48.3c22.7-40.3 42.8-100.5 51.9-190.6h84.4c-5.1 66.3-31.1 111.2-63 142.3z"
            />
          </svg>

          <!-- Podium bar -->
          <div
            :class="getPodiumHeight(topEarner.position)"
            class="w-14 md:w-20 rounded-t-lg bg-linear-to-t from-brand-bright/80 to-brand-bright/30 dark:from-brand-bright/60 dark:to-brand-bright/20 flex items-end justify-center pb-1"
          >
            <span class="text-[10px] md:text-xs font-bold text-foreground tabular-nums">
              {{ formattedNumber(topEarner?.amount) }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
