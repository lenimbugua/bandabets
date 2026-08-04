<script setup>
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { useLiveMatchesStore } from "../stores/live-matches";
import { useSportsQueryParamsStore } from "../stores/sports-query-params";
import formatStuff from "@/utilities/format-stuff";

const { slugify } = formatStuff();

const router = useRouter();
const { meta, sports } = storeToRefs(useLiveMatchesStore());
const { getLiveMatches, setPending } = useLiveMatchesStore();
const { setSport } = useSportsQueryParamsStore();

const fetchLiveSports = async (sportId, sportName) => {
  setSport(sportId);
  setPending(true);
  sportName = slugify(sportName);
  router.push({ name: "live", params: { sport: sportName } });
  await getLiveMatches();
  setPending(false);
};
</script>
<template>
  <div
    class="relative z-60 scrollbar-hide justify-start items-end flex space-x-3 lg:space-x-4 whitespace-nowrap no-scrollbar overflow-x-auto mx-3"
  >
    <div
      v-if="meta"
      class="flex justify-start py-3.5 items-center sticky h-full inset-0 bg-white dark:bg-background z-50"
    >
      <div
        class="flex items-center text-slate-500 hover:text-muted-foreground cursor-pointer pl-0 pr-2.5"
      >
        <div class="flex items-center justify-center">
          <div class="rounded-lg hover:bg-secondary">
            <div class="italic text-red-500 text-xs font-semibold">LIVE</div>
          </div>

          <span class="ml-2 relative flex justify-center items-center"
            ><span
              class="animate-ping bg-red-600 absolute inline-flex h-5 w-5 rounded-full"
            ></span
            ><span
              class="text-primary-950 text-[0.6rem] text-white font-bold bg-red-600 relative inline-flex rounded-full justify-center items-center h-5 w-5"
              >{{ meta.total }}</span
            ></span
          >
        </div>
      </div>
      <div
        data-orientation="vertical"
        aria-orientation="vertical"
        role="separator"
        class="shrink-0 w-px h-16 mr-3 bg-slate-200 dark:bg-slate-800"
      ></div>
    </div>

    <div
      v-for="sport in sports"
      :key="sport.sportName"
      class="text-center text-slate-500 hover:text-muted-foreground cursor-pointer py-2"
      @click="fetchLiveSports(sport.sportId, sport.sportName)"
    >
      <div
        class="flex-col justify-center items-center inline-flex"
        data-state="closed"
      >
        <div
          class="w-10 h-10 p-1.5 rounded-lg shadow-sm bg-white/5 hover:bg-white/10"
        >
          <SportsIcons :icon="sport.sportName.toLowerCase()" />
        </div>
        <div
          class="inline-flex text-[0.6rem] items-center border py-0.5 font-semibold transition-colors focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent absolute top-[2px] ml-5 rounded-full text-xs bg-slate-100 dark:dark:bg-red-800 dark:text-white shadow-sm text-slate-800 px-0.5 hover:bg-slate-100"
        >
          <span
            ><span>{{ sport.matchCount }}</span></span
          >
        </div>
        <div class="text-xs font-medium mt-1 text-slate-3400">
          {{ sport.sportName }}
        </div>
      </div>
    </div>
  </div>
</template>
