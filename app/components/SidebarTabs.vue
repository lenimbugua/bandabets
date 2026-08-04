<script setup>
import { useDefaultSport } from "@/composables/useDefaultSport";
import { useMatches2Store } from "@/stores/matches2";
import { useSportsQueryParamsStore } from "@/stores/sports-query-params";
import formatStuff from "@/utilities/format-stuff";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useTopLeaguesStore } from "../stores/top-leagues";

const { slugify } = formatStuff();

const { setResource, setCompetition } = useSportsQueryParamsStore();
const { initDefaultSport } = useDefaultSport();

const router = useRouter();

const { getMatches } = useMatches2Store();

const topLeaguesStore = useTopLeaguesStore();
const { topLeagues } = storeToRefs(topLeaguesStore);

// Fetch if not already loaded (sidebar may mount before landing page)
onMounted(() => {
  if (!topLeagues.value?.length) {
    topLeaguesStore.fetchTopLeagues();
  }
});

function fetchGame(competition) {
  initDefaultSport();
  setCompetition(competition.competitionId);
  setResource("");
  getMatches();
  router.push({
    name: "country",
    params: {
      sport: "soccer",
      country: slugify(competition.countryName),
      league: slugify(competition.competitionName),
    },
  });
}
</script>

<template>
  <div class="h-full flex flex-col rounded-xl bg-white dark:bg-white/2 border border-gray-200/80 dark:border-white/6 shadow-sm dark:shadow-none overflow-hidden">
    <!-- Header -->
    <div class="shrink-0 flex items-center gap-2 px-3.5 py-2.5">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        fill="currentColor"
        class="w-3.5 h-3.5 text-brand-bright"
      >
        <path d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14Zm.75-10.25v2.5h2.5a.75.75 0 0 1 0 1.5h-2.5v2.5a.75.75 0 0 1-1.5 0v-2.5h-2.5a.75.75 0 0 1 0-1.5h2.5v-2.5a.75.75 0 0 1 1.5 0Z" />
      </svg>
      <h3 class="text-[0.65rem] font-bold uppercase tracking-widest text-gray-400 dark:text-white/30">
        Top Leagues
      </h3>
    </div>

    <!-- League list — scrollable -->
    <div v-if="topLeagues?.length" class="flex-1 min-h-0 overflow-y-auto scrollbar-hide px-1.5 pb-1.5">
      <button
        v-for="league in topLeagues"
        :key="league.competitionId"
        class="group w-full flex items-center justify-between px-2.5 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-white/3 transition-all duration-200 cursor-pointer"
        :aria-label="'View ' + league.competitionName + ' matches'"
        @click="fetchGame(league)"
      >
        <span class="text-[0.75rem] font-medium text-gray-700 dark:text-white/50 group-hover:text-gray-900 dark:group-hover:text-white/70 truncate transition-colors">
          {{ league.competitionName }}
        </span>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-3.5 h-3.5 text-gray-300 dark:text-white/15 group-hover:text-brand-bright transition-colors shrink-0 ml-2">
          <path fill-rule="evenodd" d="M6.22 4.22a.75.75 0 0 1 1.06 0l3.25 3.25a.75.75 0 0 1 0 1.06l-3.25 3.25a.75.75 0 0 1-1.06-1.06L8.94 8 6.22 5.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
        </svg>
      </button>
    </div>

    <!-- Empty state -->
    <div v-else class="flex-1 flex flex-col items-center justify-center px-4 py-6">
      <div class="w-10 h-10 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center mb-2">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-5 h-5 text-gray-300 dark:text-white/20">
          <path d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14Zm.75-10.25v2.5h2.5a.75.75 0 0 1 0 1.5h-2.5v2.5a.75.75 0 0 1-1.5 0v-2.5h-2.5a.75.75 0 0 1 0-1.5h2.5v-2.5a.75.75 0 0 1 1.5 0Z" />
        </svg>
      </div>
      <p class="text-[0.7rem] text-gray-400 dark:text-white/25">Loading leagues...</p>
    </div>
  </div>
</template>
