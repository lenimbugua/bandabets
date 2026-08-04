<script setup>
import SortByTimeAndLeague from "./SortByTimeAndLeague.vue";
</script>

<template>
  <div
    :class="['text-muted-foreground']"
    class="flex justify-between bg-white/5 space-x-2 items-center px-1.5 py-1 sm:py-2 md:px-3 w-full"
  >
    <div class="w-1/2 xl:w-1/3">
      <SortByTimeAndLeague />
    </div>
    <div
      class="w-1/2 xl:w-2/3 pl-0 sm:pl-6 flex space-x-2 lg:pl-0 items-center"
    >
      <div
        :class="['bg-gray-300 dark:bg-surface-active']"
        class="w-full hidden md:flex md:1/3 p-1 rounded-md shadow-lg text-sm text-center"
      >
        1x2
      </div>
      <div
        :class="['bg-gray-300 dark:bg-surface-active']"
        class="hidden md:flex w-full md:1/3 p-1 rounded-md shadow-lg text-sm text-center"
      >
        Double Chance
      </div>
      <MarketSort class="1/3 flex md:hidden xl:flex" />
    </div>
  </div>
</template>
