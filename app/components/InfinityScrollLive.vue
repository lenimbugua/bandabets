<script setup>
import { useLiveMatchesStore } from "../stores/live-matches";
import { storeToRefs } from "pinia";

const { matches, pending } = storeToRefs(useLiveMatchesStore());
</script>

<template>
  <AnimatePulse v-if="pending" :rows="8" />

  <Lazy v-else class="divide-y divide-gray-200/70 dark:divide-white/5">
    <LiveMatchTwo v-for="match in matches" :key="match.parentMatchId" :match="match" />
  </Lazy>
  <!-- <AnimatePulse v-if="pending" class="z-1" :rows="8" /> -->
</template>
