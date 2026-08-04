<script setup>
import { crashGamesRouteName, useCasino } from "@/composables/useCasino";
import { useDefaultSport } from "@/composables/useDefaultSport";
import formatStuff from "@/utilities/format-stuff";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/vue";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useCasinoStore } from "@/stores/casino";

const { launchCasino } = useCasino();
const { formCloudflareImage } = formatStuff();
const { initDefaultSport } = useDefaultSport();
const { setLaunchGameId } = useCasinoStore();
const router = useRouter();

const modules = [Autoplay];

const { public: config } = useRuntimeConfig();
const aviatorGameId = config.aviatorGameId;
const depositId = 1000;
const homeId = 100001777;
const affiliateId = 1000014;
const leaderboardId = 1000015;
const liveBetId = 1000016;
const redBarronId = 1000017;
const oneCutId = 1000018;

const items = [
  { name: "100% Bonus", id: depositId, image: "6f1180d7-1fef-49bc-029a-91377d293f00", routeName: "" },
  { name: "2 Up", id: homeId, image: "14dd1e57-99b4-436b-b1ed-45a3b5f13600", routeName: "" },
  { name: "Aviator Cashback", id: aviatorGameId, image: "e638e866-4d7d-4cec-aa02-62ad80334700", routeName: crashGamesRouteName },
  { name: "Cashout", id: homeId, image: "daec1adf-ef1a-4de7-8869-555a6c834600", routeName: "" },
  { name: "Refer and Earn", id: affiliateId, image: "3a5c088d-c397-4cbb-0974-c7965a51b900", routeName: "" },
  { name: "Red Barron", id: redBarronId, image: "ea1d6f5c-0d5f-437c-ed2e-02318b031900", routeName: crashGamesRouteName },
  { name: "Live Bet", id: liveBetId, image: "ff56e597-aec5-40ca-5d6e-106ec367b900", routeName: "" },
  { name: "Leaderboard", id: leaderboardId, image: "e833c717-fbfe-49e2-daf7-688c0681ff00", routeName: "" },
  { name: "Karibu Bonus Aviator", id: aviatorGameId, image: "077b46dd-3233-49db-11a8-40b945e1e400", routeName: crashGamesRouteName },
  { name: "Aviator Freebet", id: aviatorGameId, image: "28e3760a-4810-45a4-6f42-879f39744b00", routeName: crashGamesRouteName },
  { name: "Affiliate", id: affiliateId, image: "ae03187e-682e-48a4-9c85-6a8f6ea99400", routeName: "" },
  { name: "Deposit Bonus", id: depositId, image: "7fad299a-e610-43d1-6f64-385f88a1b700", routeName: "" },
  { name: "One Cut", id: oneCutId, image: "4b1550b7-24fd-49b2-ae55-bb440bc59400", routeName: crashGamesRouteName },
  { name: "Chagua Bonus Yako", id: depositId, image: "97438509-2554-4c84-ee65-08ed146edc00", routeName: "" },
];

const goToSports = () => {
  initDefaultSport(true);
  router.push({ name: "sports", params: { sport: "soccer" } });
};

function launchGame(gameId, gameName, routeName) {
  if (gameId === affiliateId) { router.push({ name: "join-affiliate" }); return; }
  if (gameId === leaderboardId) { router.push({ name: "leaderboard" }); return; }
  if (gameId === homeId) { goToSports(); return; }
  if (gameId === depositId) { router.push({ name: "deposit" }); return; }
  if (gameId === liveBetId) { router.push({ name: "live", params: { sport: "soccer" } }); return; }
  setLaunchGameId(gameId);
  launchCasino(gameId, gameName, routeName);
}

const autoplayDelay = 4000;
const loader = ref(null);
const loaderStyle = ref({ width: "0%", transition: "none" });

const startLoader = () => {
  loaderStyle.value = { width: "0%", transition: "none" };
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      loaderStyle.value = { width: "100%", transition: `width ${autoplayDelay}ms linear` };
    });
  });
};

onMounted(() => { startLoader(); });
</script>

<template>
  <div class="mx-3 mt-2 rounded-xl overflow-hidden shadow-premium dark:shadow-lg border border-gray-200 dark:border-transparent">
    <div class="relative w-full overflow-clip">
      <swiper
        :space-between="30"
        :centered-slides="true"
        :autoplay="{ delay: autoplayDelay, disableOnInteraction: false }"
        :navigation="false"
        :modules="modules"
      >
        <swiper-slide v-for="item in items" :key="item.image">
          <img
            :src="formCloudflareImage(item.image)"
            class="w-full h-[83px] cursor-pointer object-cover"
            :alt="item.name + ' game banner'"
            @click="launchGame(item.id, item.name, item.routeName)"
          />
        </swiper-slide>
      </swiper>
      <div class="absolute z-10 bottom-0 w-full h-0.5 bg-gray-400 dark:bg-white/30">
        <div ref="loader" class="h-full bg-brand-bright" :style="loaderStyle"></div>
      </div>
    </div>
  </div>
</template>
