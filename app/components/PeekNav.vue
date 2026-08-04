<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
import { useSportsStore } from "@/stores/sports";

import { useMatchesStore } from "../stores/matches";
import { useSportsQueryParamsStore } from "@/stores/sports-query-params";

const { setResource } = useSportsQueryParamsStore();

const { fetchSportMatches, fetchLiveMatches } = useMatchesStore();

const { setSelectedSport } = useSportsStore();

const menuItems = ref([
  {
    name: "soccer",
    img: "soccer-ball.svg",
    bgColor: "",
    isSport: true,
    routeName: "sports",
  },
  {
    name: "live",
    img: "live.svg",
    isSport: false,
    isLive: true,
    bgColor: "bg-destructive",
    routeName: "live",
  },
  {
    name: "aviator",
    img: "aviator.svg",
    isSport: false,
    bgColor: "bg-surface-deepest",
    routeName: "aviator",
  },
  {
    name: "casino",
    img: "casino.svg",
    isSport: false,
    bgColor: "bg-surface-deepest",
    routeName: "casino-home",
  },
  {
    name: "virtuals",
    img: "league.svg",
    isSport: false,
    bgColor: "bg-background",
    routeName: "virtuals",
  },
  {
    name: "countries",
    img: "a2z-countries.png",
    isSport: false,
    bgColor: "bg-background",
    routeName: "countries",
  },
  {
    name: "rugby",
    img: "rugby.svg",
    isSport: true,
    bgColor: "bg-primary/20",
    routeName: "sports",
  },
  {
    name: "tennis",
    img: "tennis2.svg",
    bgColor: "",
    isSport: true,
    routeName: "sports",
  },
  {
    name: "Spin2Win",
    img: "spin2win.svg",
    isSport: false,
    bgColor: "bg-brand-teal",
    routeName: "",
  },
  {
    name: "Rocket Man",
    img: "rocketman.svg",
    isSport: false,
    bgColor: "bg-black",
    routeName: "",
  },
  {
    name: "Jackpot",
    img: "jackpot.svg",
    isSport: false,
    bgColor: "bg-black",
    routeName: "",
  },
]);
const imageBasePath = "/peeknavicons/";
function getFullImagePath(img) {
  return new URL(`${imageBasePath}${img}`, import.meta.url).href;
}

const goToLink = (routeName, param, isSport, isLive) => {
  if (isSport) {
    fetchSportMatches(param);
  }
  if (isLive) {
    setResource("live");
    fetchLiveMatches("");
  }
  if (routeName) {
    setSelectedSport(param);
    router.push({ name: routeName, params: { sport: param } });
  }
};
</script>
<template>
  <div
    class="flex w-full space-x-3 justify-between overflow-x-scroll scrollbar-hide sm:rounded-t-lg"
  >
    <div
      v-for="item in menuItems"
      :key="item.routeName"
      role="button"
      :aria-label="`Navigate to ${item.name}`"
      tabindex="0"
      class="flex cursor-pointer items-center justify-center"
      @click="goToLink(item.routeName, item.name, item.isSport, item.isLive)"
    >
      <div class="flex-col items-center justify-center h-full w-full">
        <div
          :class="item.bgColor"
          class="flex h-10 w-10 sm:h-12 sm:w-12 aspect-square items-center justify-center rounded-md"
        >
          <svg
            v-if="item.name === 'live'"
            class="fill-current text-black"
            xmlns="http://www.w3.org/2000/svg"
            fill=""
            viewBox="0 0 30 20"
          >
            <path
              d="M27 0c1.657 0 3 1.343 3 3v14c0 1.657-1.343 3-3 3h-24c-1.657 0-3-1.343-3-3v-14c0-1.657 1.343-3 3-3h24zM5.837 6.25h-1.971v7.75h5.264v-1.627h-3.292v-6.123zM12.134 6.25h-1.971v7.75h1.971v-7.75zM15.301 6.25h-2.261l2.498 7.75h2.492l2.433-7.75h-2.127l-1.445 5.704h-0.102l-1.488-5.704zM26.68 6.25h-5.312v7.75h5.312v-1.584h-3.341v-1.584h3.142v-1.45h-3.142v-1.547h3.341v-1.584z"
            />
          </svg>
          <img v-else class="h-full w-full" :src="getFullImagePath(item.img)" :alt="item.name" />
        </div>
        <div
          class="text-xs mt-1 flex capitalize items-center justify-center font-semibold sm:text-xs whitespace-nowrap text-gray-900 dark:text-white"
        >
          {{ item.name }}
        </div>
      </div>
    </div>
  </div>
</template>
