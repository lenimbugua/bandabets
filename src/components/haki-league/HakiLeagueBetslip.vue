<script setup lang="ts">
import LeagueEmptySlip from "./LeagueEmptySlip.vue";
</script>

<template>
  <div class="relative w-84">
    <div
      class="w-full sticky top-20 rounded-t-lg overflow-clip sm:px-0 border border-gray-200 dark:border-white/5 shadow-premium dark:shadow-none"
    >
      <div
        class="h-[calc(100vh-6rem)] flex flex-col bg-white dark:bg-black/15 rounded-t-lg border-b border-gray-200 dark:border-black"
      >
        <div
          :class="[
            'w-full cursor-pointer py-2 text-lg text-center font-extrabold',
            'focus:outline-hidden',
            'dark:bg-muted bg-gray-200 dark:text-gray-200 text-gray-900 shadow-sm',
          ]"
        >
          Betslip
        </div>
        <div class="grow overflow-y-scroll scrollbar-hide">
          <LeagueEmptySlip />
        </div>
        <LeagueBetControls />
      </div>
    </div>
  </div>
</template>
