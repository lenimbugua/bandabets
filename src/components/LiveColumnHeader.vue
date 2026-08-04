<script setup>
import { computed, toRefs } from "vue";
import { useNewLiveStore } from "@/stores/new-live";
import ColumnHeaderSearch from "./ColumnHeaderSearch.vue";

const { competitions } = toRefs(useNewLiveStore());

const outcomeLabels = computed(() => {
  if (!competitions.value?.length) return [];
  const firstComp = competitions.value.find((c) => c.matches?.length);
  if (!firstComp) return [];
  const outcomes = firstComp.matches[0]?.markets?.[0]?.matchOutcomes;
  if (!outcomes?.length) return ["1", "X", "2"];
  return outcomes.map((o) => o.outcomeName || "");
});

const flatMatches = computed(() => {
  const result = [];
  for (const comp of competitions.value || []) {
    if (!comp.matches) continue;
    for (const match of comp.matches) {
      result.push({
        ...match,
        competitionName: comp.competitionName,
        countryName: comp.countryName,
        sportName: comp.sportName,
      });
    }
  }
  return result;
});
</script>

<template>
  <ColumnHeaderSearch
    v-if="outcomeLabels.length"
    :matches="flatMatches"
    :outcome-labels="outcomeLabels"
    :is-live="true"
    variant="live"
  />
</template>
