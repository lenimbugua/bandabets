<script setup>
import { storeToRefs } from "pinia";
const props = defineProps({
  index: {
    type: Number,
    required: true,
  },
  competitionId: {
    type: Number,
    required: true,
  },
  countryName: {
    type: String,
    required: true,
  },

  competitionName: {
    type: String,
    required: true,
  },
  matchCount: {
    type: Number,
    required: true,
  },
  store: {
    type: Function,
    required: true,
  },
});
const { fetchCompetitionMatches } = props.store();
const { competitions } = storeToRefs(props.store());

function fetchMatches() {
  fetchCompetitionMatches(props.competitionId, props.index);
}

function isOpened() {
  const competition = competitions.value[props.index];
  if (!competition) {
    return false;
  }

  if (competition["isOpened"]) {
    return competition.isOpened;
  }

  const matches = competition?.matches;

  if (!matches) {
    return false;
  }

  return matches.length > 0;
}
</script>

<template>
  <button
    class="group w-full flex items-center justify-between px-3 py-2.5 bg-gray-50 dark:bg-white/3 hover:bg-gray-100 dark:hover:bg-white/5 transition-all duration-200 cursor-pointer"
    @click="fetchMatches()"
  >
    <div class="flex items-center gap-2 min-w-0">
      <span class="text-[0.8rem] font-bold text-gray-800 dark:text-white/70 truncate">
        {{ competitionName }}
      </span>
      <span
        v-if="matchCount"
        class="shrink-0 px-1.5 py-0.5 rounded-full bg-gray-200 dark:bg-white/8 text-[0.6rem] font-bold text-gray-500 dark:text-white/35"
      >
        {{ matchCount }}
      </span>
    </div>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill="currentColor"
      class="w-3.5 h-3.5 shrink-0 ml-2 text-gray-300 dark:text-white/20 group-hover:text-brand-bright transition-all duration-200"
      :class="isOpened() ? 'rotate-180' : ''"
    >
      <path fill-rule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
    </svg>
  </button>
</template>
