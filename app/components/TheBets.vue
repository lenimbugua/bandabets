<script setup>
import { h } from "vue";
import { Icon } from "#components";
import { storeToRefs } from "pinia";
import { useBetsStore } from "../stores/bets";
import BetsLoader from "./BetsLoader.vue";

const { pending, bets } = storeToRefs(useBetsStore());

// BaseEmptyState (out of scope for this migration batch) renders its `icon`
// prop via `<component :is="icon">`, which requires an actual component
// reference rather than a Tabler name string — wrap the Tabler icon in a
// tiny functional component so the existing dynamic-component contract
// keeps working without touching BaseEmptyState.vue.
const noBetsIcon = () => h(Icon, { name: "tabler:clipboard-list" });
</script>
<template>
  <BetsLoader v-if="pending" />
  <BaseEmptyState
    v-else-if="!bets.length"
    :icon="noBetsIcon"
    title="No bets yet"
    description="Your bet history will appear here"
  />
  <div v-else class="space-y-2.5 mt-2">
    <div
      v-for="bet in bets"
      :key="bet.id"
      class="rounded-xl border border-gray-200 dark:border-white/6 bg-white dark:bg-white/2 overflow-hidden"
    >
      <TheBet :bet="bet" />
    </div>
  </div>
</template>
