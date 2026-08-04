<script setup>
import { Sparkles } from "lucide-vue-next";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { useCasinoStore } from "../stores/casino";
import { usePopularStore } from "../stores/popular";

const router = useRouter();

const { newGames } = storeToRefs(usePopularStore());
const { reset } = usePopularStore();

reset();

const { categoryIsPending } = storeToRefs(useCasinoStore());

const { setLaunchGameId } = useCasinoStore();

async function goToCasinoGames(game) {
  if (game.gameName == "Pari League") {
    await router.push({ name: "pari-league" });
    return;
  }
  if (game.gameName == "Pari Turbo") {
    await router.push({ name: "pari-turbo" });
    return;
  }
  if (game.gameName == "Pari Jackpot") {
    await router.push({ name: "pari-virtual-jackpot" });
    return;
  }
  setLaunchGameId(game.id);
  router.push({ name: "games", params: { name: game.gameName } });
}
</script>

<template>
  <CasinoGridLoader v-if="categoryIsPending" />
  <div v-else class="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8 pb-6">
    <div
      v-for="game in newGames"
      :key="game.id"
      class="space-y-1 cursor-pointer"
      @click="goToCasinoGames(game)"
    >
      <div class="relative aspect-3/2 rounded-lg overflow-clip border border-gray-100 dark:border-transparent shadow-sm dark:shadow-none">
        <img
          class="top-0 right-0 left-0 bottom-0 object-cover h-full w-full"
          :src="`${game.imgFullUrl}`"
          :alt="game.gameName"
          loading="lazy"
        />
        <!-- <div class="absolute top-0 left-0  text-2xl text-white font-black">{{ game.gameName }}</div> -->
      </div>
      <div
        class="flex justify-between text-xs whitespace-nowrap items-center text-gray-700 dark:text-gray-200"
      >
        <p
          class="font-bold text-gray-950 dark:text-gray-400 text-ellipsis overflow-hidden"
        >
          {{ game.gameName }}
        </p>
        <!-- <StarIcon class="w-4 h-4" /> -->
      </div>
    </div>
  </div>
  <BaseEmptyState
    v-if="!categoryIsPending && (!newGames || !newGames.length)"
    :icon="Sparkles"
    title="No new games yet"
    description="Fresh games added regularly"
  />
</template>
