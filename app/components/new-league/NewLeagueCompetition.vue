<script setup>
import { useCompetitions } from "@/composables/haki-league/useCompetitions.js";
const { competitions, formFlagUrl } = useCompetitions();
</script>

<template>
  <div class="flex max-w-md gap-2">
    <div v-for="competition in competitions" :key="competition.name">
      <div class="h-6 w-10 relative overflow-clip">
        <img
          :src="formFlagUrl(competition.flag)"
          :alt="competition.name"
          class="absolute inset-0 h-full w-full object-cover rounded-sm"
          loading="lazy"
        />
      </div>
    </div>
  </div>
</template>
