<script setup>
import { usePromoStore } from "@/stores/promos";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { usePromos } from "../composables/usePromos";
import { useCasinoStore } from "../stores/casino";

import { useDefaultSport } from "@/composables/useDefaultSport";
import TableLoader from "./TableLoader.vue";

const { initDefaultSport } = useDefaultSport();

const { setLaunchGameId } = useCasinoStore();

const router = useRouter();

const {
  welcomePromos,
  hakiLeaguePromo,
  cashbackPromo,
  bethubPromo,
  multibetBoostPromo,
  twoUpPromo,
  oneCutPromo,
  aviatorWelcomeBonus,
  aviatorKaribuBonus,
  dailyAviatorCashback,
} = usePromos();

const { pending } = storeToRefs(usePromoStore());

const goToSports = () => {
  initDefaultSport(true);
  router.push({ name: "sports", params: { sport: "soccer" } });
};

function launchCasino(gameId, gameName) {
  if (gameName == hakiLeaguePromo) {
    router.push({ name: "pari-league" });
    return;
  }
  if (gameName == cashbackPromo) {
    router.push({ name: "deposit" });
    return;
  }
  if (gameName == aviatorKaribuBonus) {
    router.push({ name: "deposit" });
    return;
  }
  if (gameName == bethubPromo) {
    router.push({ name: "share-bets" });
    return;
  }

  if (gameName == multibetBoostPromo) {
    goToSports();
    return;
  }
  if (gameName == twoUpPromo) {
    goToSports();
    return;
  }
  if (gameName == oneCutPromo) {
    goToSports();
    return;
  }

  if (gameName == dailyAviatorCashback) {
    router.push({ name: "games", params: { name: "aviator" } });
    return;
  }
  if (gameName == aviatorWelcomeBonus) {
    router.push({ name: "games", params: { name: "aviator" } });
    return;
  }
  setLaunchGameId(gameId);
  router.push({ name: "games", params: { name: gameName } });
}
</script>

<template>
  <HeaderLinks />

  <TableLoader v-if="pending" />
  <div v-else class="max-w-6xl flex flex-col mx-auto px-4">
    <div class="flex gap-2 py-3 justify-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="text-amber-500 h-10 w-10"
        viewBox="0 0 24 24"
      >
        <!-- Icon from Material Symbols by Google - https://github.com/google/material-design-icons/blob/master/LICENSE -->
        <path
          fill="currentColor"
          d="m12 22l-9-8.9L8 7h8l5 6.1zM4.575 7L2.45 4.875l1.425-1.4L6 5.6zM11 5V2h2v3zm8.375 2L17.95 5.575l2.125-2.125L21.5 4.875zM12 19.2l5.25-5.2H6.75zM8.95 9l-2.475 3h11.05L15.05 9z"
        />
      </svg>
      <div class="text-gray-900 dark:text-slate-300">
        <h1 class="font-bold text-md md:text-2xl">
          Welcome To <span class="text-brand-bright">Haki</span
          ><span class="text-gold-bright">bets</span>
        </h1>
        <h5
          class="text-sm md:text-xl text-gray-600 dark:text-slate-400 leading-none"
        >
          Explore Our Promotions
        </h5>
      </div>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 lg:gap-8">
      <div
        v-for="promo in welcomePromos"
        :key="promo.id"
        class="rounded-md overflow-clip my-3 border-2 border-amber-500/70"
        @click="launchCasino(promo.id, promo.name)"
      >
        <div class="bg-surface-active aspect-video w-82 relative">
          <img
            class="top-0 w-full h-full object-contain right-0 left-0 bottom-0"
            :src="promo.img"
            :alt="promo.title || 'Welcome promotion'"
            loading="lazy"
          />
          <!-- <img
            :src="promo.img"
            alt="Description"
            class="absolute inset-0 w-full h-full object-contain"
          /> -->
        </div>
        <div class="bg-gray-200 dark:bg-surface-active p-4 py-8">
          <h4
            class="dark:text-slate-300 text-gray-600 font-medium text-lg leading-tight truncate"
          >
            {{ promo.title }}
          </h4>
        </div>
        <!-- <div
            class="relative pb-5/6 bg-black rounded-lg overflow-clip"
            @click="goToPromoDetails(promo)"
          >
            <img
              class="top-0 right-0 left-0 bottom-0 object-contain sm:object-stretch h-full w-full"
              :src="promo.img"
              @click="launchCasino(promo.id, promo.name)"
            />
      
          </div> -->
      </div>
    </div>
  </div>
  <Footer />
</template>
