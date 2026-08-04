<script setup>
import { useDefaultSport } from "@/composables/useDefaultSport";
import { useMatches2Store } from "@/stores/matches2";
import { useSportsQueryParamsStore } from "@/stores/sports-query-params";
import formatStuff from "@/utilities/format-stuff";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { useTopLeagues } from "@/composables/useTopLeagues";
import { useTopLeaguesStore } from "@/stores/top-leagues";

const { slugify } = formatStuff();
const { getTopLeagueImage } = useTopLeagues();
const { topLeagues } = storeToRefs(useTopLeaguesStore());
const { initDefaultSport } = useDefaultSport();
const { setResource, setCompetition } = useSportsQueryParamsStore();
const { getMatches } = useMatches2Store();
const router = useRouter();

const { fetchTopLeagues } = useTopLeaguesStore();
fetchTopLeagues();

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
  <div
    v-if="topLeagues?.length"
    class="flex gap-1.5 px-3 mt-2 overflow-x-auto scrollbar-hide"
  >
    <button
      v-for="league in topLeagues.slice(0, 8)"
      :key="league.competitionId"
      class="flex items-center gap-1.5 px-2 py-1 rounded-full bg-gray-100 dark:bg-white/5 border border-gray-200/70 dark:border-white/5 cursor-pointer active:scale-[0.97] transition-transform shrink-0 league-pill"
      @click="fetchGame(league)"
    >
      <div
        class="w-5 h-5 rounded-full bg-white dark:bg-white/10 flex items-center justify-center overflow-hidden shrink-0"
      >
        <img
          :src="getTopLeagueImage(league.cbinomen)"
          :alt="league.competitionName"
          class="w-full h-full object-contain"
          loading="lazy"
        />
      </div>
      <span class="text-[0.65rem] font-medium text-gray-700 dark:text-foreground whitespace-nowrap">
        {{ league.competitionName }}
      </span>
    </button>
  </div>
</template>

<style scoped>
[data-theme="light"] .league-pill {
  box-shadow: 0 1px 2px oklch(0% 0 0 / 0.04);
}
</style>
