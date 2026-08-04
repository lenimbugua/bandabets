<script setup>
import { timestamp } from "@vueuse/core";
import { storeToRefs } from "pinia";
import { computed } from "vue";
import { useBetslipStore } from "../stores/sports-betslip.js";
import OddChangeArrow from "./OddChangeArrow.vue";
import ThePadlock from "./ThePadlock.vue";

import { useFlyToBetslip } from "@/composables/useFlyToBetslip";
import { useToast } from "@/composables/useToast";

import { MAX_GAMES } from "../composables/useDefinedConstants";

const props = defineProps({
  outcome: {
    type: Object,
    required: true,
  },
  seasonId: {
    type: String,
    required: true,
  },
  homeTeam: {
    type: String,
    required: true,
  },
  customId: {
    type: String,
    required: true,
  },
  awayTeam: {
    type: String,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  competitionId: {
    type: Number,
    required: true,
  },
  subTypeId: {
    type: Number,
    required: true,
  },
  parentMatchId: {
    type: String,
    required: true,
  },
  isMatchDetail: {
    type: Boolean,
    required: false,
    default: false,
  },
  sportId: {
    type: String,
    required: true,
  },
  competitionName: {
    type: String,
    required: true,
  },
  countryName: {
    type: String,
    required: true,
  },
  sportName: {
    type: String,
    required: true,
  },
  twoGoalUpActive: {
    type: Boolean,
    required: true,
  },
  live: {
    type: Number,
    required: false,
    default: 0,
  },
});

const { betslip } = storeToRefs(useBetslipStore());
const { addAnItemToBetslip } = useBetslipStore();

const { fireErrorToast } = useToast();
const { triggerFlyAnimation } = useFlyToBetslip();

const outcomeIsSelected = computed(() => {
  return betslip.value.some((item) => item.customId === props.customId);
});

function handleSelect(event) {
  const clickIsToSelectOutcome = !outcomeIsSelected.value;
  if (clickIsToSelectOutcome) triggerFlyAnimation(event);
  const outcome = props.outcome;
  const payload = {
    live: props.live,
    customId: props.customId,
    seasonId: props.seasonId,
    homeTeam: props.homeTeam,
    awayTeam: props.awayTeam,
    oddType: outcome.oddType,
    startTime: props.startTime,
    twoGoalUpActive: props.twoGoalUpActive,
    oddValue: outcome.oddValue,
    outcomeId: outcome.outcomeId,
    subTypeId: props.subTypeId,
    specifiers: outcome.specifiers,
    status: outcome.status,
    sportId: props.sportId,
    prevOddValue: outcome.preOddValue,
    outcomeName: outcome.outcomeName,
    competitionId: props.competitionId,
    parentMatchId: props.parentMatchId,
    competitionName: props.competitionName,
    countryName: props.countryName,
    sportName: props.sportName,
    timestamp: timestamp().toString(),
    clickIsToSelectOutcome,
  };

  if (betslip.value.length >= MAX_GAMES && clickIsToSelectOutcome) {
    fireErrorToast("Betslip limit reached");
    return;
  }

  addAnItemToBetslip(payload);
}

function outcomeIsLocked() {
  return props.outcome.status === -1;
}
</script>
<template>
  <button
    v-if="!isMatchDetail"
    :disabled="outcomeIsLocked()"
    :class="[
      outcomeIsLocked() ? 'cursor-not-allowed' : 'cursor-pointer',
      outcomeIsSelected
        ? 'bg-brand-selected/80'
        : 'bg-gray-300/70 dark:bg-surface-interactive',
    ]"
    class="flex justify-center items-center p-1 h-full shadow-md rounded-md"
    @click="handleSelect($event)"
  >
    <ThePadlock v-if="outcomeIsLocked()" />
    <div v-else class="flex-col justify-center items-center">
      <div
        :class="[
          outcomeIsSelected
            ? 'text-lime-50'
            : 'dark:text-slate-400 text-gray-950',
        ]"
        class="text-xs"
      >
        {{ outcome.outcomeName }}
        <OddChangeArrow
          :pre-odd-value="outcome.preOddValue"
          :odd-value="outcome.oddValue"
          :selected="outcomeIsSelected"
        />
      </div>
      <div
        :class="[
          outcomeIsSelected ? 'text-white' : 'dark:text-white text-gray-950',
        ]"
        class="text-[0.7rem] font-bold"
      >
        {{ outcome.oddValue }}
      </div>
    </div>
  </button>
  <button
    v-else
    :disabled="outcomeIsLocked()"
    :class="[
      outcomeIsLocked() ? 'cursor-not-allowed' : 'cursor-pointer',
      outcomeIsSelected
        ? 'bg-brand-selected/80'
        : 'bg-gray-300/80 dark:bg-surface-interactive',
    ]"
    class="p-2 text-sm font-extrabold w-full rounded-md"
    @click="handleSelect($event)"
  >
    <div v-if="outcomeIsLocked()" class="flex justify-center items-center">
      <ThePadlock />
    </div>

    <div v-else class="flex flex-col justify-center items-center">
      <div
        :class="[
          outcomeIsSelected
            ? 'text-lime-100'
            : 'dark:text-slate-400 text-gray-700',
        ]"
        class="text-xs"
      >
        {{ outcome.outcomeNameAlias
        }}<OddChangeArrow
          :pre-odd-value="outcome.preOddValue"
          :odd-value="outcome.oddValue"
        />
      </div>
      <div
        :class="[
          outcomeIsSelected ? 'text-white' : 'dark:text-white text-gray-950',
        ]"
        class="text-[1rem] font-black"
      >
        {{ outcome.oddValue }}
      </div>
    </div>
  </button>
</template>
