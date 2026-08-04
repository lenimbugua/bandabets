<script setup>
import { storeToRefs } from "pinia";
import { useBetslipStore } from "../stores/sports-betslip.js";
const { totalOdds, betslip, possibleWin } = storeToRefs(useBetslipStore());
</script>
<template>
  <div
    v-if="betslip.length"
    class="flex border-black text-gray-50 text-xs font-black px-2 py-[.15rem] bg-linear-to-r from-red-700 via-red-700 via-50% to-red-700"
  >
    <div class="w-1/2">ODDS {{ totalOdds }}</div>
    <div class="w-1/2 flex justify-end uppercase">PAYOUT KES {{ possibleWin }}</div>
  </div>
</template>
