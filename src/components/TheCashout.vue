<script setup>
import { useModalStore } from "@/stores/modal";
import { storeToRefs } from "pinia";
import { onBeforeUnmount, onMounted, ref } from "vue";
import { useCashoutStore } from "../stores/cashout.js";

const { closeModal } = useModalStore();

const { getCashoutValue, reset, cashoutNow, setBetId } = useCashoutStore();

const { cashoutData, pending, betId, responseOK } = storeToRefs(
  useCashoutStore()
);

const cashoutExpiry = ref(10);
const pollingInterval = ref(null);
const cashoutExpired = ref(false);

function stopPolling() {
  clearInterval(pollingInterval.value);
}
function startPolling() {
  pollingInterval.value = setInterval(() => {
    if (cashoutExpiry.value === 0) {
      cashoutExpired.value = true;
      stopPolling();
      return;
    }
    cashoutExpiry.value--;
  }, 1000);
}

const autoplayDelay = 10000; // ms
const loader = ref(null);
const loaderStyle = ref({
  width: "100%",
  transition: "none",
});

const startLoader = () => {
  // Reset instantly
  loaderStyle.value = {
    width: "100%",
    transition: "none",
  };

  // Trigger animation after a tick
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      loaderStyle.value = {
        width: "0%",
        transition: `width ${autoplayDelay}ms linear`,
      };
    });
  });
};

// Run once on mount
onMounted(() => {
  startLoader();
  startPolling();
});

// Stop polling on unmount
onBeforeUnmount(() => {
  stopPolling();
  setBetId(null);
});

async function resetCashout() {
  reset();
  await getCashoutValue(betId.value);
  if (!responseOK.value) {
    closeModal();
    return;
  }
  cashoutExpiry.value = 10;
  cashoutExpired.value = false;
  startLoader();
  startPolling();
}
</script>
<template>
  <div v-if="cashoutData" class="space-y-3 dark:bg-black/20 p-3">
    <h1
      class="text-lg leading-tight text-center font-bold text-gray-600 dark:text-slate-500"
    >
      Cashout
    </h1>
    <div class="bg-gray-200 dark:bg-black/15 rounded-md">
      <div class="bg-white/5 rounded-t-md p-2 flex justify-center leading-none">
        <div v-if="!cashoutExpired" class="leading-none">
          <div>
            <span class="leading-none text-brand-bright font-semibold text-lg">{{
              cashoutData.cashOutValue
            }}</span
            ><span class="text-xs text-gray-600 dark:text-slate-600"> KES</span>
          </div>
          <div>
            <span class="text-left text-gray-600 dark:text-slate-400 text-xs"
              >To Cashout</span
            >
          </div>
        </div>
        <div v-else class="text-destructive font-semibold text-lg">Expired</div>
      </div>
      <div
        v-if="!cashoutExpired"
        class="flex py-2 px-8 justify-between space-x-5 text-center text-xs"
      >
        <div>
          <div class="text-gray-950 dark:text-slate-400">
            <span>{{ cashoutData.betAmount }}</span
            ><span class="text-xs text-gray-600 dark:text-slate-600"> KES</span>
          </div>
          <div class="text-gray-600 dark:text-slate-400">
            <span>Stake</span>
          </div>
        </div>
        <div>
          <div class="text-gray-950 dark:text-slate-400">
            <span>{{ cashoutData.possibleWin }}</span
            ><span class="text-xs text-gray-600 dark:text-slate-600"> KES</span>
          </div>
          <div class="text-gray-600 dark:text-slate-400">
            <span>To win</span>
          </div>
        </div>
      </div>
      <div
        v-else
        class="flex py-2 px-8 justify-between space-x-5 text-center text-xs dark:text-slate-400"
      >
        Click the buttton below to request another cashout.
      </div>
    </div>
    <div v-if="!cashoutExpired" class="bg-gray-200 dark:bg-black/15 rounded-md">
      <div class="bg-white/5 rounded-t-md p-1 flex justify-center leading-none">
        <div class="leading-none">
          <div class="flex justify-between space-x-2">
            <span class="text-left text-gray-600 dark:text-slate-400 text-xs"
              >Expires In</span
            >
            <span
              class="text-left text-gray-600 dark:text-slate-300 font-bold text-xs"
              >{{ cashoutExpiry }}</span
            >
          </div>
        </div>
      </div>
      <div class="flex p-1 py-2 justify-between space-x-5 text-center text-xs">
        <div class="z-50 w-full h-1 bg-gray-400 dark:bg-white">
          <div
            ref="loader"
            class="h-full bg-gold-bright"
            :style="loaderStyle"
          ></div>
        </div>
      </div>
    </div>
    <button
      v-if="!cashoutExpired"
      class="bg-brand-selected/80 w-full flex items-center justify-center rounded-md text-gray-50 px-3 py-2"
      @click="cashoutNow(betId)"
    >
      <div v-if="pending" class="px-3 text-black">
        <TheButtonSpin />
      </div>
      <span v-else>Cashout</span>
    </button>
    <button
      v-else
      class="bg-brand-selected/80 w-full flex items-center justify-center rounded-md text-gray-50 px-3 py-2"
      @click="resetCashout"
    >
      <div v-if="pending" class="px-3 text-black">
        <TheButtonSpin />
      </div>
      <div v-else class="flex space-x-1">
        <div><span class="text-xs tracking-wide">Request Cashout</span></div>
      </div>
    </button>
  </div>
</template>
