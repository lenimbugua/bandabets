<script setup>
import { useCompetitions } from "@/composables/haki-league/useCompetitions.js";
const { competitions, formFlagUrl } = useCompetitions();
</script>

<template>
  <div class="flex justify-between max-w-md">
    <div v-for="competition in competitions" :key="competition.name">
      <div class="h-8 w-12 relative">
        <img
          :src="formFlagUrl(competition.flag)"
          :alt="competition.name"
          class="absolute inset-0 h-full w-full object-cover rounded-sm"
          loading="lazy"
        />
      </div>
      <div class="text-gray-600 text-start dark:text-slate-400 text-xs pt-0.5">
        {{ competition.name }}
      </div>
    </div>
  </div>
</template>
