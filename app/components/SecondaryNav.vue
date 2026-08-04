<script setup>
import { useModalTypes } from "@/composables/useModalTypes";
import { useLoginStore } from "@/stores/login.js";
import { useModalStore } from "@/stores/modal";
import { toRefs } from "vue";
import { useRouter } from "vue-router";
import { useSecondaryNavGames } from "../composables/useSecondaryNavGames";
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
  <!-- bg-inherit chains the container's own background down to the two sticky
       ends, so the pinned edges read as the same surface instead of a pair of
       lighter translucent panels sitting on top of it. -->
  <div
    class="relative flex items-center whitespace-nowrap overflow-x-auto overflow-y-visible scrollbar-hide bg-inherit lg:justify-between"
  >
    <!-- Pinned games -->
    <div class="flex items-center sticky left-0 z-10 bg-inherit">
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
    <div class="flex items-center gap-0.5 ml-2">
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
      class="sticky right-0 z-10 bg-inherit cursor-pointer"
      @click="openModal(sportsIconsModal)"
    >
      <MoreTab />
    </div>
  </div>
</template>
