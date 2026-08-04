<script setup>
import { ClipboardDocumentListIcon } from "@heroicons/vue/24/outline";
import { storeToRefs } from "pinia";
import { useBetsStore } from "../stores/bets";
import BetsLoader from "./BetsLoader.vue";

const { pending, bets } = storeToRefs(useBetsStore());
</script>
<template>
  <BetsLoader v-if="pending" />
  <BaseEmptyState
    v-else-if="!bets.length"
    :icon="ClipboardDocumentListIcon"
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
