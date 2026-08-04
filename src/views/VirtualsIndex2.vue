<script setup>
import MobileFooterV2 from "../components/mobile/MobileFooterV2.vue";
import {  toRefs } from "vue";

import { useGamesStore } from "../stores/games";

import { useGamesMenus } from "../composables/useGamesMenus";

const { fetchGames } = useGamesStore();

const { pending, games } = toRefs(useGamesStore());

const { virtuals } = useGamesMenus();



fetchGames(virtuals);

</script>
<template>
  <h1 class="sr-only">Virtual Games – Play Online Virtuals | Naibet</h1>
  <TheDepositBar class="md:hidden" />
  <HeaderLinks />
  <div class="w-full h-full max-w-[1680px] sm:px-3 mx-auto overflow-scroll bg-gray-50/50 dark:bg-transparent">
    <CasinoAnimate v-if="pending" />

    <div v-else class="flex w-full px-3 space-x-4 lg:px-0 lg:pt-3">
      <div class="w-full rounded-md">
        <div class="md:hidden w-full overflow-x-scroll">
          <MainCategories class="p-2 mb-2" />
        </div>

        <div class="md:max-w-[1000px] mx-auto">
          <TheCrash2 :games  />
        </div>
      </div>
    </div>
  </div>
  <MobileFooterV2 />
  <Footer />
</template>
