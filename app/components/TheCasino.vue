<script setup>
import { storeToRefs } from "pinia";
import { useCasino } from "../composables/useCasino";
import { useCasinoStore } from "../stores/casino";
import { usePopularStore } from "../stores/popular";

const { launchCasino } = useCasino();
const { games } = storeToRefs(usePopularStore());
const { reset } = usePopularStore();

reset();

const { categoryIsPending } = storeToRefs(useCasinoStore());

</script>

<template>
  <CasinoGridLoader v-if="categoryIsPending" />
  <div v-else class="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8 pb-6">
    <div
      v-for="game in games"
      :key="game.id"
      class="space-y-1 cursor-pointer"
      @click="launchCasino(game.id, game.gameName, game.routeName, game.providerName)"
    >
      <div class="relative aspect-square rounded-lg overflow-clip">
        <img
          class="top-0 right-0 left-0 bottom-0 object-cover h-full w-full"
          :src="`${game.imgFullUrl}`"
          :alt="game.gameName"
          loading="lazy"
        />
      </div>
      <div
        class="flex justify-between text-xs whitespace-nowrap items-center text-gray-700 dark:text-gray-200"
      >
        <p
          class="font-bold text-gray-950 dark:text-gray-400 text-ellipsis overflow-hidden"
        >
          {{ game.gameName }}
        </p>
      </div>
    </div>
  </div>
</template>
