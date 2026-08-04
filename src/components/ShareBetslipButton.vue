<script setup>
import { ShareIcon } from "@heroicons/vue/20/solid";
import { useBetslipLogin } from "@/composables/useBetslipLogin";
import { useModalTypes } from "@/composables/useModalTypes";
import { useModalStore } from "@/stores/modal";
import { storeToRefs } from "pinia";
import { useLoginStore } from "../stores/login.js";
import { useShareBetStore } from "../stores/sharebet.js";
import { useBetslipStore } from "../stores/sports-betslip.js";

const { openLogin } = useBetslipLogin();

const { showNoBetError } = useBetslipStore();
const { betslip } = storeToRefs(useBetslipStore());
const { shareBetslip } = useShareBetStore();
const { pending } = storeToRefs(useShareBetStore());
const { shareBet } = useModalTypes();
const { openModal } = useModalStore();

const { isAuthenticated } = storeToRefs(useLoginStore());

async function shareYourBet() {
  if (!betslip.value.length) {
    showNoBetError();
    return;
  }
  if (!isAuthenticated.value) {
    openLogin();
    return;
  }
  await shareBetslip(betslip.value);
  openModal(shareBet);
}
</script>
<template>
  <button
    class="flex items-center justify-center  w-10 h-10 rounded-lg bg-gray-100 dark:bg-white/5 border border-gray-200/80 dark:border-white/6 text-brand-bright hover:bg-gray-200 dark:hover:bg-white/8 transition-colors cursor-pointer"
    @click="shareYourBet"
  >
    <TheButtonSpin v-if="pending" />
    <ShareIcon v-else class="w-6 h-6" />
  </button>
</template>
