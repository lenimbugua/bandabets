<script setup>
import { TabGroup, TabList } from "@headlessui/vue";
import { ref } from "vue";

import { usePopularStore } from "../stores/popular";

import { useGamesMenus } from "../composables/useGamesMenus";

const { getGamesByCategory } = usePopularStore();

const { popular, crash, virtuals, spins } = useGamesMenus();

const tabs = ref([
  {
    name: "all",
    icon: "all",
  },
  {
    name: crash,
    icon: "crash",
  },
  {
    name: virtuals,
    icon: "virtuals",
  },
  {
    name: spins,
    icon: "spins",
  },
]);

getGamesByCategory(popular);
</script>
<template>
  <div
    class="scrollbar-hide items-end flex justify-between space-x-3 lg:space-x-4 whitespace-nowrap no-scrollbar overflow-x-scroll"
  >
    <TabGroup>
      <TabList
        v-for="category in tabs"
        :key="category.name"
        v-slot="{ selected }"
        as="template"
        class="text-center text-slate-500 hover:text-muted-foreground cursor-pointer py-2"
        @click="getGamesByCategory(category.name)"
      >
        <div
          class="flex-col justify-center items-center inline-flex"
          data-state="closed"
        >
          <div
            :class="[
              selected
                ? 'bg-red-500/20  text-md shadow-sm'
                : 'dark:bg-white/10 bg-black/10',
            ]"
            class="w-10 h-10 p-1.5 flex justify-center items-center rounded-lg shadow-sm"
          >
            <CasinoIcons
              :icon-css="'text-gray-700 dark:text-brand-mid h-6 w-6'"
              :icon="category.icon"
            />
          </div>
          <div class="text-xs font-medium mt-1 text-slate-3400">
            {{ category.name }}
          </div>
        </div>
      </TabList>
    </TabGroup>
  </div>
</template>
