<script setup>
import { useModalTypes } from "@/composables/useModalTypes";
import { useModalStore } from "@/stores/modal";
import { useShareBetStore } from "@/stores/sharebet.js";
import {
  //   ChevronLeftIcon,
  //   ChevronRightIcon,
  //   PlusIcon,
  ShareIcon,
} from "@heroicons/vue/24/outline";
import { useFormatDates } from "../composables/useFormatDates";
import { useTopLeagues } from "../composables/useTopLeagues";
import { useBetslipStore } from "../stores/sports-betslip.js";
import BetBuilderSelections from "./BetBuilderSelections.vue";

const { getTopLeagueImage } = useTopLeagues();

const { humanFriendlyDate } = useFormatDates();

const { shareBet, confirmRemoveSlipModal } = useModalTypes();
const { openModal } = useModalStore();

const { setBookingCode } = useShareBetStore();
const { addBetbuilderToBetslip, setCustomIdToRemove, siblingExists } =
  useBetslipStore();

function addToSlip(item, oddValue) {
  item.isBetBuilder = true;

  const sibling = siblingExists(item);
  if (sibling) {
    setCustomIdToRemove(sibling.customId);
    openModal(confirmRemoveSlipModal);
    return;
  }

  addBetbuilderToBetslip(item, oddValue);
}

const props = defineProps({
  hub: {
    type: Object,
    required: true,
  },
});

function renameSlipToSelections(obj) {
  // Create a shallow copy to avoid mutating the original object
  const newObj = { ...obj };

  // If "slip" exists, rename it to "selections"
  if ("slip" in newObj) {
    newObj.selections = newObj.slip;
    delete newObj.slip;
  }

  return newObj;
}

function openShare() {
  setBookingCode(props.hub.shareBet);
  openModal(shareBet);
}
</script>

<template>
  <div
    class="w-[20.4rem] bg-gray-200 dark:bg-background rounded-md overflow-clip border border-gray-300 dark:border-black/30 shadow-xs hover:shadow-md hover:shadow-gray-500/50 transition-all duration-300"
  >
    <div
      class="dark:bg-linear-to-br border-b border-gray-300 dark:border-black/30 from-purple-950 via-[--background] to-red-950 px-2 py-0.5 pt-1"
    >
      <div class="items-center">
        <div class="flex justify-between">
          <div class="flex gap-1">
            <div
              class="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center overflow-hidden"
            >
              <img
                :src="getTopLeagueImage(hub.competitionName)"
                :alt="hub.competitionName + ' logo'"
                class="w-10 h-10 object-contain"
                loading="lazy"
              />
            </div>
            <div class="flex-1">
              <h3 class="font-semibold text-gray-700 dark:text-white text-sm">
                {{ hub.competitionName }}
              </h3>
              <div
                class="text-gray-600 w-52 dark:text-slate-300 text-xs flex whitespace-nowrap text-ellipsis overflow-clip"
              >
                {{ hub.homeTeam }} vs {{ hub.awayTeam }}
              </div>
              <div class="text-xs text-gray-600 dark:text-slate-400">
                {{ humanFriendlyDate(hub.startTime) }}
              </div>
            </div>
          </div>
          <div class="leading-none">
            <div class="leading-none flex flex-col text-end p-0">
              <span
                class="text-gray-700 dark:text-white font-bold text-lg p-0"
                >{{ hub.oddValue }}</span
              >
              <span class="text-gray-600 dark:text-white/80 text-xs p-0"
                >odds</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="flex items-center justify-between p-2">
      <button class="text-white hover:bg-white/20 disabled:opacity-50">
        <ChevronLeftIcon class="w-4 h-4" />
      </button>
      <div class="text-center">
        <p class="text-white font-medium text-sm">New bet</p>
        <p class="text-white/70 text-xs">1 of 4</p>
      </div>
      <button
        class="text-white hover:bg-white/20 disabled:opacity-50 p-2 rounded-sm"
      >
        <ChevronRightIcon class="w-4 h-4" />
      </button>
    </div> -->

    <BetBuilderSelections :selections="hub.slip" />

    <div
      class="px-2 py-2 bg-gray-200 dark:bg-background border-t border-gray-300 dark:border-black/30"
    >
      <div class="flex justify-between">
        <div class="flex items-center gap-1 text-white">
          <div
            class="rounded-full h-5 w-5 text-center bg-amber-600 text-white text-xs font-bold flex items-center justify-center"
          >
            {{ hub.slip.length }}
          </div>
          <span class="text-gray-600 dark:text-white/80 text-xs"
            >Selections</span
          >
        </div>
        <div class="flex items-center gap-2">
          <button
            class="inline-flex px-2 py-1 max-w-20 items-center gap-1 whitespace-nowrap text-sm font-medium ring-offset-background focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-linear-to-r from-amber-500 to-amber-700 text-white hover:scale-105 shadow-sm hover:shadow-md transition-all duration-200 rounded-md"
            @click="openShare"
          >
            <ShareIcon class="w-4 h-4" />
            Share
          </button>
          <button
            class="inline-flex px-2 py-1 items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-brand-forest text-white hover:scale-105 shadow-sm hover:shadow-md transition-all duration-200 rounded-md"
            @click="addToSlip(renameSlipToSelections(hub), hub.oddValue)"
          >
            <!-- <PlusIcon class="w-4 h-4" /> -->
            Add to Betslip
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
