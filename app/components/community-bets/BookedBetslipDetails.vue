<script setup>
// import { useMatchDetails } from "@/composables/useMatchDetails";
// import { TraashIcon } from "@heroicons/vue/24/outline";
// import { useRoute, useRouter } from "vue-router";
import { useFormatDates } from "@/composables/useFormatDates";

defineProps({
  item: {
    type: Object,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
  deleteAnItemFromBetslip: {
    type: Function,
    required: true,
  },
});


const { humanFriendlyDate } = useFormatDates();
</script>
<template>
  <div class="w-full px-2 py-2 flex justify-between">
    <div
      :class="['text-gray-700 dark:text-gray-300']"
      class="w-full flex justify-between leading-none space-x-2"
    >
      <div class="flex space-x-2 cursor-pointer">
        <div
          class="flex font-black h-6 w-6 justify-center text-red-600 items-center cursor-pointer rounded-full hover:bg-surface-interactive"
        >
          {{ index + 1 }}
        </div>
        <div class="space-y-1">
          <div class="flex w-full justify-between items-center">
            <div
              class="text-xs font-medium text-gray-600 dark:text-slate-300/90"
            >
              <span>{{ item.homeTeam }}</span> <span>-vs-</span>
              <span>{{ item.awayTeam }}</span>
            </div>
          </div>
          <div
            class="flex space-x-2 items-center font-bold text-gray-950 dark:text-slate-50"
          >
            <div class="text-xs">
              {{ item.oddType }}
            </div>
            <div
              class="h-1.5 w-1.5 rounded-full bg-gray-950 dark:bg-slate-100"
            ></div>
            <div class="text-sm">
              {{ item.outcomeName }}
            </div>
          </div>
          <div class="text-xs font-light text-gray-400 dark:text-slate-400">
            Starts {{ humanFriendlyDate(item.startTime) }}
          </div>
        </div>
      </div>
      <div class="flex flex-col justify-between items-end h-full">
        <div
          class="flex justify-between items-end cursor-pointer rounded-full"
        ></div>
        <div
          :class="['text-gray-950', 'dark:text-gray-300']"
          class="font-black flex items-end text-sm rounded-md cursor-pointer"
        >
          {{ item.oddValue }}
        </div>
      </div>
    </div>
  </div>
</template>
