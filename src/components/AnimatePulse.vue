<script setup>
defineProps({
  rows: {
    type: Number,
    required: true,
  },
});
</script>
<template>
  <div class="w-full bg-white dark:bg-background">
    <div
      v-for="i in rows"
      :key="i"
      class="px-3 py-2.5 border-b border-gray-100 dark:border-white/3"
    >
      <!-- Meta row: Competition + Time -->
      <div class="flex items-center justify-between pt-2 pb-1 mb-1">
        <div class="h-2 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-white/8 dark:via-white/5 dark:to-white/8 rounded-md w-32 shimmer"></div>
        <div class="h-2 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-white/8 dark:via-white/5 dark:to-white/8 rounded-md w-20 shimmer" style="animation-delay: 0.1s;"></div>
      </div>

      <!-- Teams row: Home - Away -->
      <div class="flex items-center gap-1 pb-2">
        <div class="h-3.5 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-white/8 dark:via-white/5 dark:to-white/8 rounded-md flex-1 shimmer" style="animation-delay: 0.05s;"></div>
        <div class="h-2 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-white/8 dark:via-white/5 dark:to-white/8 rounded-md w-1 shimmer" style="animation-delay: 0.1s;"></div>
        <div class="h-3.5 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-white/8 dark:via-white/5 dark:to-white/8 rounded-md flex-1 shimmer" style="animation-delay: 0.15s;"></div>
      </div>

      <!-- Odds buttons row: Centered -->
      <div class="flex items-center justify-center gap-1.5 pb-2.5">
        <div class="h-10 w-14 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-white/8 dark:via-white/5 dark:to-white/8 rounded-lg shimmer" style="animation-delay: 0.1s;"></div>
        <div class="h-10 w-14 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-white/8 dark:via-white/5 dark:to-white/8 rounded-lg shimmer" style="animation-delay: 0.15s;"></div>
        <div class="h-10 w-14 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-white/8 dark:via-white/5 dark:to-white/8 rounded-lg shimmer" style="animation-delay: 0.2s;"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes shimmer {
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
}

.shimmer {
  background-size: 1000px 100%;
  animation: shimmer 2s infinite;
}
</style>
