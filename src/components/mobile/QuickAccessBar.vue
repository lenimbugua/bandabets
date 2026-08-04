<script setup>
import { useModalTypes } from "@/composables/useModalTypes";
import { useLoginStore } from "@/stores/login.js";
import { useModalStore } from "@/stores/modal";
import { toRefs } from "vue";
import { useRouter } from "vue-router";
import { useSecondaryNavGames } from "@/composables/useSecondaryNavGames";

const { sportsIconsModal } = useModalTypes();
const { openModal } = useModalStore();

const router = useRouter();
const { games, launchGame } = useSecondaryNavGames();

function loginBeforeLaunching(router, game) {
  const { isAuthenticated } = toRefs(useLoginStore());
  const { gameId } = game;
  if (parseInt(gameId) === 2184 && !isAuthenticated.value) {
    const { setAfterLoginAction } = useLoginStore();
    const { openLoginModal } = useLoginStore();
    setAfterLoginAction(() => launchGame(router, game));
    openLoginModal();
    return;
  }
  launchGame(router, game);
}
</script>

<template>
  <div class="mx-3 mt-2 p-2 rounded-xl bg-gray-100 dark:bg-card overflow-hidden">
    <div
      class="relative flex items-center whitespace-nowrap overflow-x-auto overflow-y-visible scrollbar-hide"
    >
      <!-- Pinned games -->
      <div
        class="flex items-center bg-gray-100 dark:bg-card sticky left-0 z-10"
      >
        <GameLinkIconLayout
          v-for="game in games.slice(0, 2)"
          :key="game.gameName"
          :icon="game.imgUrl"
          :name="game.gameName"
          :is-new="game.new"
          @click="loginBeforeLaunching(router, game)"
        />
      </div>

      <!-- Scrollable games -->
      <div class="flex items-center gap-0.5">
        <GameLinkIconLayout
          v-for="game in games.slice(2)"
          :key="game.gameName"
          :icon="game.imgUrl"
          :name="game.gameName"
          :is-new="game.new"
          @click="loginBeforeLaunching(router, game)"
        />
      </div>

      <SportsGamesLink />

      <!-- More button -->
      <div
        class="sticky -right-1 z-10  bg-gray-100 dark:bg-card cursor-pointer"
        @click="openModal(sportsIconsModal)"
      >
        <MoreTab />
      </div>
    </div>
  </div>
</template>
