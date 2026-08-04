<script setup>
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/vue";
import LeaderboardPlayers from "./LeaderboardPlayers.vue";
import LeaderboardPrizes from "./LeaderboardPrizes.vue";
</script>
<template>
  <TabGroup>
    <TabList
      aria-label="Leaderboard filters"
      class="flex justify-between gap-2 p-1 bg-white border border-gray-300 dark:border-0 dark:bg-surface-sunken rounded-lg shadow-inner w-full mx-auto mb-2"
    >
      <Tab v-slot="{ selected }" as="template">
        <button
          :class="[
            'relative flex items-center justify-center px-16 py-1 transition-all duration-300 outline-hidden whitespace-nowrap text-sm',
            selected
              ? 'bg-gray-300 dark:bg-surface-elevated text-gray-600 dark:text-white font-bold rounded-full shadow-lg '
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-600 font-medium rounded-lg',
          ]"
        >
          <span>Players</span>
        </button>
      </Tab>

      <Tab v-slot="{ selected }" as="template">
        <button
          :class="[
            'relative flex items-center justify-center px-16 py-1 transition-all duration-300 outline-hidden whitespace-nowrap text-sm',
            selected
              ? 'bg-gray-300 dark:bg-surface-elevated text-gray-600 dark:text-white font-bold rounded-full shadow-lg '
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-600 font-medium rounded-lg',
          ]"
        >
          <span>Prizes</span>
        </button>
      </Tab>
    </TabList>

    <div class="overflow-y-auto scrollbar-hide max-h-[calc(100vh-4rem)]">
      <TabPanels>
        <TabPanel class="w-full">
          <LeaderboardPlayers/>
        </TabPanel>

        <TabPanel class="w-full">
          <LeaderboardPrizes/>
        </TabPanel>
      </TabPanels>
    </div>
  </TabGroup>
</template>

<script setup></script>

<style scoped>
.animate-fade-in-up {
  animation: fade-in-up 0.3s ease-out forwards;
}
@keyframes fade-in-up {
  0% {
    opacity: 0;
    transform: translateY(5px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
