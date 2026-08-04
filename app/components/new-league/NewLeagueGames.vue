<script setup>
import { Tab, TabGroup, TabList } from "@headlessui/vue";
import { ref } from "vue";

const tabs = ref([
  {
    name: "Scheduled Virtuals",
    icon: "🕒",
  },
  //   {
  //     name: "Turbo",
  //     icon: "⚡",
  //   },
]);
</script>
<template>
  <TabGroup>
    <TabList aria-label="League game markets" class="flex justify-between">
      <Tab
        v-for="tab in tabs"
        :key="tab.name"
        v-slot="{ selected }"
        as="template"
      >
        <div
          :class="[
            'cursor-pointer rounded-md  flex flex-col items-center px-2 text-sm whitespace-nowrap capitalize text-center font-medium',
            ' focus:outline-hidden',
            selected
              ? 'text-red-600 font-semibold'
              : 'dark:text-gray-100/90 text-gray-800',
          ]"
        >
          {{ tab.name }}
        </div>
      </Tab>
    </TabList>
  </TabGroup>
</template>
