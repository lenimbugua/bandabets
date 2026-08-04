<script setup>
import { useModalTypes } from "@/composables/useModalTypes";
import { ref } from "vue";
import { useBetsStore } from "../stores/bets";
import { useModalStore } from "../stores/modal.js";
import { useShareBetStore } from "../stores/sharebet.js";
import TheButtonSpin from "./TheButtonSpin.vue";

const { setSelectedBet } = useBetsStore();

const props = defineProps({
  betId: {
    type: Number,
    required: true,
  },
});

const pending = ref(false);

const { shareBet } = useModalTypes();
const { openModal } = useModalStore();

const { shareBet: doShareBet } = useShareBetStore();
async function shareYourBet() {
  setSelectedBet(props.betId, useBetsStore().selectedBet);
  pending.value = true;
  await doShareBet(props.betId);
  pending.value = false;
  openModal(shareBet);
}
</script>
<template>
  <div
    class="cursor-pointer flex items-center gap-2"
    @click="shareYourBet"
  >
    <slot /> <TheButtonSpin v-if="pending" />
  </div>
</template>
