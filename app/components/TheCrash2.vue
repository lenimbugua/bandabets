<script setup>
import { useCasino } from "../composables/useCasino";

defineProps({
  games: {
    type: Object,
    required: true,
  },
});

const { launchCasino } = useCasino();
</script>

<template>
  <div
    v-for="gameCategory in games.gameCategories"
    :key="gameCategory.game_category"
    class="mb-4"
  >
    <div class="text-2xl text-center font-bold text-gray-900 dark:text-white py-4">
      {{ gameCategory.name }}
    </div>

    <div
      :class="[
        'gap-4 pb-6',
        gameCategory.Games.length === 1
          ? 'mx-auto'
          : gameCategory.Games.length === 2
          ? 'grid grid-cols-2 sm:grid-cols-2 max-w-3xl mx-auto'
          : 'grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 ',
      ]"
    >
      <div v-if="gameCategory.Games.length === 1">
        <div
          v-for="game in gameCategory.Games"
          :key="game.id"
          class="relative cursor-pointer bg-black w-full h-24 md:h-44 rounded-lg overflow-clip border border-gray-200 dark:border-transparent shadow-sm dark:shadow-none"
          @click="launchCasino(game.game_id, game.game_name)"
        >
          <img
            class="w-full h-full inset-0 absolute object-fit sm:object-cover"
            :src="game.img_full_url"
            :alt="game.game_name"
            loading="lazy"
          />
        </div>
      </div>
      <div
        v-for="game in gameCategory.Games"
        v-else
        :key="game.id"
        class="space-y-1 cursor-pointer group transform transition-transform duration-200 hover:scale-105"
        @click="goToCasinoGames(game)"
      >
        <div
          class="relative rounded-lg overflow-hidden border border-gray-200 dark:border-transparent shadow-md dark:shadow-none"
          @click="launchCasino(game.game_id, game.game_name)"
        >
          <img
            class="object-contain w-full h-full"
            :src="game.img_full_url"
            :alt="game.game_name"
            loading="lazy"
          />
          <div
            class="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white text-sm p-2 truncate"
          >
            {{ game.game_name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
