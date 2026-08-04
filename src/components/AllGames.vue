<script setup>
import { Gamepad2 } from "lucide-vue-next";
import { storeToRefs } from "pinia";
import { usePopular } from "../composables/usePopular";
import { useCasinoStore } from "../stores/casino";
import { usePopularStore } from "../stores/popular";

import { useCasino } from "../composables/useCasino";

const { launchCasino } = useCasino();

const { allGames } = usePopular();
const { reset } = usePopularStore();

reset();

const { categoryIsPending } = storeToRefs(useCasinoStore());
</script>

<template>
  <CasinoGridLoader v-if="categoryIsPending" />
  <div v-else class="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8 pb-6">
    <div
      v-for="game in allGames"
      :key="game.id"
      class="space-y-1 cursor-pointer"
      @click="launchCasino(game.id, game.gameName, game.routeName, game.providerName)"
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
    v-if="!categoryIsPending && (!allGames || !allGames.length)"
    :icon="Gamepad2"
    title="No games available"
    description="Check back soon for new games"
  />
</template>
