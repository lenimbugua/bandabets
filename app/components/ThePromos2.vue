<script setup>
import { usePromoStore } from "@/stores/promos";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { useCasino } from "../composables/useCasino";

const { launchCasino } = useCasino();

// import { usePromos } from "../composables/usePromos";
// import { useCasinoStore } from "../stores/casino";

import { useDefaultSport } from "@/composables/useDefaultSport";

const { initDefaultSport } = useDefaultSport();

// const { setLaunchGameId } = useCasinoStore();

const router = useRouter();

const { selectPromo, fetchPromotions } = usePromoStore();
fetchPromotions();
// const {
//   hakiLeaguePromo,
//   cashbackPromo,
//   bethubPromo,
//   multibetBoostPromo,
//   twoUpPromo,
//   oneCutPromo,
//   aviatorWelcomeBonus,
//   dailyAviatorCashback,
// } = usePromos();

const { promotions, pending } = storeToRefs(usePromoStore());

const goToSports = () => {
  initDefaultSport(true);
  router.push({ name: "sports", params: { sport: "soccer" } });
};

function goToRoute(promo) {
  if (promo.app_route_name === "sports") {
    goToSports();
    return;
  }

  if (!promo.game_id.Valid) {
    router.push({ name: promo.app_route_name });
    return;
  }
  launchCasino(promo.game_id.String, promo.game_name.String);
}

// function launchCasino(gameId, gameName) {
//   if (gameName == hakiLeaguePromo) {
//     router.push({ name: "pari-league" });
//     return;
//   }
//   if (gameName == cashbackPromo) {
//     router.push({ name: "deposit" });
//     return;
//   }
//   if (gameName == bethubPromo) {
//     router.push({ name: "share-bets" });
//     return;
//   }

//   if (gameName == multibetBoostPromo) {
//     goToSports();
//     return;
//   }
//   if (gameName == twoUpPromo) {
//     goToSports();
//     return;
//   }
//   if (gameName == oneCutPromo) {
//     goToSports();
//     return;
//   }

//   if (gameName == dailyAviatorCashback) {
//     router.push({ name: "games", params: { name: "aviator" } });
//     return;
//   }
//   if (gameName == aviatorWelcomeBonus) {
//     router.push({ name: "games", params: { name: "aviator" } });
//     return;
//   }
//   setLaunchGameId(gameId);
//   router.push({ name: "games", params: { name: gameName } });
// }

function goToPromoDetails(promo) {
  selectPromo(promo);
  router.push({ name: "promotion-details", params: { name: promo } });
}
</script>
<template>
  <div class="pt-4 px-3 md:px-10 w-full max-w-6xl mx-auto">
    <h1 class="font-black text-3xl dark:text-gray-50 pb-4">Promotions</h1>

    <BetsLoader v-if="pending" />

    <div v-else>
      <div
        v-if="promotions && promotions.length > 0"
        class="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:px-0"
      >
        <div v-for="promo in promotions" :key="promo.name" class="space-y-1">
          <div
            class="shadow-sm border dark:border-border rounded-md overflow-clip bg-white dark:bg-surface-interactive"
          >
            <div class="cursor-pointer">
              <img
                class="top-0 w-full h-full object-contain right-0 left-0 bottom-0"
                :src="promo.image_url"
                :alt="promo.title || 'Promotion'"
                loading="lazy"
              />
            </div>
            <div class="px-3 py-5">
              <div
                class="flex py-3 justify-between text-xs items-center text-gray-700 dark:text-gray-200"
              >
                <p
                  class="font-semibold text-lg text-gray-600 dark:text-slate-400"
                >
                  {{ promo.name }}
                </p>
              </div>
              <!-- <div class="py-4">
                <p class="font-light text-gray-950 dark:text-gray-400">
                  {{ promo.samary }}
                </p>
              </div> -->
              <div class="flex justify-between">
                <button
                  class="bg-brand-dark shadow-sm w-1/2 px-2 py-1 text-white uppercase font-bold tracking-wide rounded-md"
                  @click="goToRoute(promo)"
                >
                  Play Now
                </button>
                <div
                  v-if="promo.name != 'aviatrix' && promo.name != 'bethub'"
                  class="button bg-brand-bright/90 cursor-pointer text-red-50 font-medium border border-brand-bright rounded-full flex justify-center items-center p-2 px-3 capitalize text-sm"
                  @click="goToPromoDetails(promo)"
                >
                  View Offer
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
