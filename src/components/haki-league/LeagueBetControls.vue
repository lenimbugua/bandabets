<script setup>
// import { useModalTypes } from "@/composables/useModalTypes";
// import { useModalStore } from "@/stores/modal";
import { storeToRefs } from "pinia";
import { computed } from "vue";
// import { useScreenSizes } from "../composables/useScreenSizes";
import { useBetslipLogin } from "@/composables/useBetslipLogin.js";
import { useLoginStore } from "@/stores/login.js";
import { useBetslipStore } from "@/stores/sports-betslip.js";

const { placeBet, removeDeactivatedMatches, showNoBetError, setStake } =
  useBetslipStore();
// const { setAfterLoginAction } = useLoginStore();

const { isAuthenticated } = storeToRefs(useLoginStore());
const { betslip, stake, pending, possibleWin, totalOdds } = storeToRefs(
  useBetslipStore()
);

const { openLogin } = useBetslipLogin();
const betslipHasDeactivatedItems = computed(() =>
  betslip.value.some((item) => item.status !== 1)
);

// function afterLoginAction() {
//   const { isLargeScreen } = useScreenSizes();
//   if (isLargeScreen.value) {
//     return;
//   }

//   const { betslip } = useModalTypes();
//   const { openModal } = useModalStore();

//   return openModal(betslip);
// }

async function bet() {
  if (stake.value <= 0) {
    return;
  }

  if (!betslip.value.length) {
    showNoBetError();
    return;
  }

  placeBet();
}

</script>
<template>
  <form
    :class="['bg-gray-100 dark:bg-surface-elevated']"
    class="sticky bottom-0 shadow-md w-full py-2.5 space-y-4 border-t border-gray-200 dark:border-transparent"
    @submit.prevent="bet"
  >
    <TheStake :set-stake :stake :total-odds />
    <div class="px-4">
      <PossibleWin :possible-win :stake :total-odds />
    </div>
    <div class="flex space-x-2 px-4">
      <div class="flex grow">
        <button
          v-if="betslipHasDeactivatedItems"
          class="bg-brand-selected/80 rounded-md text-red-200 capitalize tracking-wide font-extrabold text-sm w-full justify-center items-center rounded-0 shadow-sm px-2 py-2.5"
          @click="removeDeactivatedMatches"
        >
          <TheButtonSpin v-if="pending" />
          <span v-else-if="betslipHasDeactivatedItems"
            >Remove Deactivated Matches</span
          >
        </button>
        <div
          v-else-if="!isAuthenticated"
          class="bg-brand-selected/80 flex cursor-pointer rounded-md hover:bg-brand-bright/70 text-primary-foreground uppercase tracking-wide font-semibold text-sm w-full justify-center items-center rounded-0 shadow-sm px-2 py-2.5"
          @click="openLogin"
        >
          Login To Place Bet
        </div>
        <button
          v-else
          type="submit"
          class="bg-brand-selected/80 rounded-md hover:bg-brand-bright/70 text-primary-foreground uppercase tracking-wide font-extrabold text-sm w-full justify-center items-center rounded-0 shadow-sm px-2 py-2.5"
        >
          <TheButtonSpin v-if="pending" />
          <span v-else>Place Bet</span>
        </button>
      </div>
    </div>
  </form>
</template>
