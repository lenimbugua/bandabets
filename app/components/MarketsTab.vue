<script setup>
import { Tab, TabGroup, TabList } from "@headlessui/vue";
import { storeToRefs } from "pinia";
import { onBeforeMount } from "vue";
import { useMatches2Store } from "../stores/matches2";

const { setSelectedMarket, resetSelectedMarket } = useMatches2Store();
const { markets } = storeToRefs(useMatches2Store());

function fetchMatches(subtype) {
  setSelectedMarket(subtype);
}

onBeforeMount(() => {
  resetSelectedMarket();
});
</script>

<template>
  <TabGroup>
    <!-- Ported from Rada: free-standing pills rather than the dropdown this
         used to be, and rather than a segmented bar — the labels vary from
         "1x2" to "Both Teams To Score", and forcing them to equal widths
         squeezed the long ones. Each chip sizes to its text and the row
         scrolls. -->
    <TabList
      aria-label="Betting markets"
      class="flex w-full items-center gap-2 overflow-x-auto scrollbar-hide py-1"
    >
      <Tab
        v-for="category in markets"
        :key="category.name"
        v-slot="{ selected }"
        as="template"
      >
        <button
          :class="[
            'inline-flex h-7 shrink-0 items-center cursor-pointer whitespace-nowrap rounded-full px-3 text-xs transition-colors',
            'focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary',
            selected
              ? 'bg-primary text-primary-foreground font-semibold'
              : 'bg-surface-interactive text-muted-foreground font-medium hover:text-foreground',
          ]"
          @click="fetchMatches(category.subTypeId)"
        >
          {{ category.oddType }}
        </button>
      </Tab>
    </TabList>
  </TabGroup>
</template>
