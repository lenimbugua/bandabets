<script setup>
import { storeToRefs } from "pinia";
import { useSearchStore } from "../stores/search";

const { matches, pending } = storeToRefs(useSearchStore());
</script>

<template>
  <AnimatePulse v-if="pending" :rows="10" />

  <Lazy v-if="matches" class="mx-2 rounded-xl overflow-hidden divide-y divide-gray-200/70 dark:divide-white/5">
    <MatchTwo
      v-for="match in matches"
      :key="match.parentMatchId"
      :match="match"
    />
  </Lazy>
  <EmptyState v-if="matches?.length == 0" />
  <AnimatePulse v-if="pending" class="z-1" :rows="7" />
</template>
