<script setup>
import { Squares2X2Icon } from "@heroicons/vue/24/outline";
import { Tab, TabGroup, TabList } from "@headlessui/vue";
import { ref } from "vue";
import CasinoIcons from "./CasinoIcons.vue";

import { usePopularStore } from "@/stores/popular";

const { getGamesByCategory } = usePopularStore();

const selectedCategory = ref("All Games");

defineProps({
  categories: { type: Array, required: true },
});

function isSelected(id) {
  if (!selectedCategory.value) return false;
  return selectedCategory.value.category_id === id;
}

function selectCategory(category) {
  selectedCategory.value = category;
  getGamesByCategory(category.category_id);
}
</script>
<template>
  <TabGroup v-if="categories" vertical>
    <TabList aria-label="Casino game categories" class="flex flex-col">
      <Tab
        v-for="category in categories"
        :key="category.category_id"
        as="template"
      >
        <button
          :class="[
            'w-full flex items-center space-x-2  p-2.5 text-sm font-medium rounded-md leading-5',
            ' focus:outline-hidden',
            isSelected(category.category_id)
              ? 'dark:bg-black/50 dark:text-red-500 bg-primary/10 text-primary shadow-sm border border-primary/20 dark:border-transparent'
              : 'text-gray-600 dark:text-slate-500 hover:bg-gray-100 dark:hover:bg-white/12 hover:text-gray-900 dark:hover:text-red-600/90',
          ]"
          @click="selectCategory(category)"
        >
          <CasinoIcons
            :icon-css="'text-gray-950 dark:text-brand-mid h-4 w-4'"
            :icon="category.category_name"
          />
          <div>{{ category.category_name }}</div>
        </button>
      </Tab>
    </TabList>
  </TabGroup>
  <BaseEmptyState
    v-if="!categories || !categories.length"
    :icon="Squares2X2Icon"
    title="No categories"
    description="Categories unavailable"
    size="sm"
    compact
  />
</template>
