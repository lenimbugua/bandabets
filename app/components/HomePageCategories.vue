<script setup>
import { useRouter } from "vue-router";
import { useMainCategories } from "../composables/useMainCategories";
import { useLiveMatchesStore } from "../stores/live-matches";
import { useSportsQueryParamsStore } from "@/stores/sports-query-params";
import { useDefaultSport } from "@/composables/useDefaultSport";

const { initDefaultSport } = useDefaultSport();

const { setResource, resetToDefaults } = useSportsQueryParamsStore();

const { getLiveMatches, emptyLiveMatches } = useLiveMatchesStore();

const router = useRouter();
const casinoCategoryMap = {
  crash: "crash",
  virtuals: "virtuals",
  "popular-games": "top",
};

async function goToLink(params) {
  if (params == "live") {
    emptyLiveMatches();
    resetToDefaults();
    setResource("live");
    getLiveMatches();
    router.push({ name: "live" });
    return;
  }

  if (params == "sport") {
    initDefaultSport(true);
    router.push({ name: "sports", params: { sport: "soccer" } });
    return;
  }
  if (casinoCategoryMap[params]) {
    router.push({ name: "casino-home", query: { category: casinoCategoryMap[params] } });
    return;
  }
  router.push({ name: params });
}

const { categories } = useMainCategories();
</script>
<template>
  <div
    class="grid grid-cols-2 bg-black px-4 p-8 gap-4 lg:grid-cols-4 items-center w-full justify-between max-w-screen overflow-x-scroll scrollbar-hide"
  >
    <div
      v-for="category in categories"
      :key="category.name"
      role="button"
      :aria-label="`Explore ${category.name} betting`"
      tabindex="0"
      class="cursor-pointer bg-white/20 w-full flex p-2 justify-center rounded-md shadow-sm"
      @click="goToLink(category.path)"
    >
      <div class="block w-20 mx-auto">
        <img class="w-16 h-16" src="/soccer.png" :alt="category.name + ' betting category'" loading="lazy" />
        <div class="text-center">{{ category.name }}</div>
      </div>
    </div>
  </div>
</template>
