<script setup>
import { casinoGamesRouteName, useCasino } from "@/composables/useCasino";
import { useLeaderboardStore } from "@/stores/leaderboard";
import { toRefs } from "vue";

const { launchCasino } = useCasino();
const { games, pending } = toRefs(useLeaderboardStore());
</script>

<template>
  <CasinoGridLoader v-if="pending" />
  <div v-else class="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4 pb-6">
    <button
      v-for="game in games"
      :key="game.id"
      class="group text-left"
      @click="launchCasino(game.id, game.gameName, casinoGamesRouteName, game.providerName)"
    >
      <div class="relative aspect-square rounded-xl overflow-hidden bg-muted">
        <img
          class="absolute inset-0 object-cover w-full h-full group-hover:scale-105 transition-transform duration-200"
          :src="game.imgFullUrl"
          :alt="game.gameName"
          loading="lazy"
        />
      </div>
      <p class="text-xs font-medium text-foreground mt-1.5 truncate">
        {{ game.gameName }}
      </p>
    </button>
  </div>
</template>
