<script setup>
import { useModalTypes } from "@/composables/useModalTypes";
import { useBetsStore } from "@/stores/bets";
import { useModalStore } from "@/stores/modal";

import { storeToRefs } from "pinia";
import { ref } from "vue";
import { useShareBetStore } from "../stores/sharebet.js";
const { openModal } = useModalStore();
const { betslip } = useModalTypes();

const { selectedId } = storeToRefs(useBetsStore());

const props = defineProps({
  betId: {
    type: Number,
    required: true,
  },
});
const { responseOK } = storeToRefs(useShareBetStore());
const { rebet, loadBetslip } = useShareBetStore();

const rebetPending = ref(false);

const doRebet = async () => {
  rebetPending.value = true;
  await rebet(props.betId);
  if (!responseOK.value) {
    rebetPending.value = false;
    return;
  }
  openModal(betslip);
  loadBetslip();
  rebetPending.value = false;
};
</script>
<template>
  <div
    class="flex space-x-1 items-center font-bold cursor-pointer p-1 rounded-md"
    @click="doRebet"
  >
    <svg
      class="w-4 h-4"
      :class="{ 'animate-spin': rebetPending && selectedId === props.betId }"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <polyline points="17 1 21 5 17 9" /><path d="M3 11V9a4 4 0 0 1 4-4h14" /><polyline points="7 23 3 19 7 15" /><path d="M21 13v2a4 4 0 0 1-4 4H3" />
    </svg>
    <span>Rebet</span>
  </div>
</template>
