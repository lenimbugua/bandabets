<script setup>
// import { useLoginStore } from "@/stores/login.js";
// import { toRefs } from "vue";
import { useCasino } from "../composables/useCasino";
// const { setAfterLoginAction } = useLoginStore();

// const { isAuthenticated } = toRefs(useLoginStore());

defineProps({
  games: {
    type: Object,
    required: true,
  },
  categories: {
    type: Object,
    required: true,
  },
});

const { launchCasino } = useCasino();

// function launchTopGames(gameId, gameName, routeName) {
//   if (!isAuthenticated.value) {
//     const { openLoginModal } = useLoginStore();
//     setAfterLoginAction(launchCasino(gameId, gameName, routeName));
//     openLoginModal();
//     return;
//   }

//   launchCasino(gameId, gameName, routeName);
// }
</script>

<template>
  <!-- <CasinoGridLoader v-if="categoryIsPending" /> -->
  <!-- <div class="text-2xl text-center font-bold text-gray-900 dark:text-white py-4">
    CRASH GAMES
     {{ categories[0].category_name }} 
  </div> -->
  <div class="w-full flex gap-2">
    <div
      class="relative cursor-pointer bg-black w-full h-24 md:h-44 rounded-lg overflow-clip border border-gray-200 dark:border-transparent shadow-sm dark:shadow-none"
      @click="launchCasino(games[0].id, games[0].gameName, games[0].routeName, games[0].providerName)"
    >
      <img
        class="w-full h-full inset-0 absolute object-fit"
        :src="games[0].imgFullUrl"
        :alt="games[0]?.gameName || 'Crash game'"
        loading="lazy"
      />
    </div>
    <!-- <div
      class="relative cursor-pointer bg-black w-1/2 h-24 md:h-44 rounded-md overflow-clip"
      @click="
        launchTopGames(games[1].id, games[1].gameName, games[1].routeName)
      "
    >
      <img
        class="w-full h-full inset-0 absolute object-fit"
        :src="games[1].imgFullUrl"
      />
    </div> -->
  </div>
  <div class="text-2xl text-center font-bold text-gray-900 dark:text-white py-4">
    {{ categories[1].category_name }}
  </div>
  <div class="grid grid-cols-2 lg:grid-cols-3 gap-8 pb-6">
    <div
      v-for="game in games.slice(2, 5)"
      :key="game.id"
      class="w-full cursor-pointer h-44"
      @click="launchCasino(game.id, game.gameName, game.routeName, game.providerName)"
    >
      <div class="relative w-full h-44 rounded-lg overflow-clip border border-gray-200 dark:border-transparent shadow-sm dark:shadow-none transition-shadow hover:shadow-md">
        <img
          class="w-full h-full absolute inset-0 object-cover"
          :src="game.imgFullUrl"
          :alt="game?.gameName || 'Crash game'"
          loading="lazy"
        />
      </div>
    </div>
  </div>

  <div class="text-2xl text-center font-bold text-gray-900 dark:text-white py-4">
    {{ categories[2].category_name }}
  </div>
  <div class="grid grid-cols-2 lg:grid-cols-3 gap-8 pb-6">
    <div
      v-for="game in games.slice(5)"
      :key="game.id"
      class="mb-4"
      @click="launchCasino(game.id, game.gameName, game.routeName, game.providerName)"
    >
      <div class="relative aspect-3/2 rounded-lg overflow-clip border border-gray-200 dark:border-transparent shadow-sm dark:shadow-none transition-shadow hover:shadow-md">
        <img
          class="absolute object-contain h-full w-full top-0 right-0 left-0 bottom-0 rounded-md"
          :src="game.imgFullUrl"
          :alt="game?.gameName || 'Crash game'"
          loading="lazy"
        />
      </div>
    </div>
    <!-- <div class="w-full cursor-pointer h-44">
      <div
        class="relative w-full h-44 rounded-md overflow-clip"
        @click="
          launchTopGames(games[1].id, games[1].gameName, games[1].routeName)
        "
      >
        <img
          class="w-full h-full inset-0 absolute object-fit"
          :src="games[1].imgFullUrl"
        />
      </div>
    </div> -->
  </div>
</template>
