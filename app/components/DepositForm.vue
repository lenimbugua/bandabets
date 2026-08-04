<script setup>
import { usePoll } from "@/composables/usePoll";
import { useLoginStore } from "@/stores/login";
import { storeToRefs } from "pinia";
import { onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { useDepositStore } from "../stores/deposit.js";
import DepositInput from "./DepositInput.vue";

const router = useRouter();

const { isAuthenticated } = storeToRefs(useLoginStore());

const { performDeposit } = useDepositStore();

const { pollingInterval } = usePoll();

function makeDeposit() {
  performDeposit(router);
}

// Ensure the interval is cleared when the component is unmounted
onUnmounted(() => {
  if (pollingInterval) {
    clearInterval(pollingInterval);
  }
});
</script>

<template>
  <NotAuthenicated v-if="!isAuthenticated" />

  <div v-else class="rounded-2xl bg-white dark:bg-white/3 border border-gray-200/80 dark:border-white/6 shadow-sm dark:shadow-none overflow-hidden">
    <!-- Card header -->
    <div class="px-5 pt-4 pb-2">
      <div class="flex items-center gap-2">
        <div class="w-7 h-7 rounded-lg bg-brand-bright/10 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-3.5 h-3.5 text-brand-bright">
            <path fill-rule="evenodd" d="M1 4a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4Zm12 4a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM4 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm13-1a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM1.75 14.5a.75.75 0 0 0 0 1.5c4.417 0 8.693.603 12.749 1.73 1.111.309 2.251-.512 2.251-1.696v-.784a.75.75 0 0 0-1.5 0v.784a.272.272 0 0 1-.35.25A49.043 49.043 0 0 0 1.75 14.5Z" clip-rule="evenodd" />
          </svg>
        </div>
        <h3 class="text-[0.6rem] font-bold text-gray-400 dark:text-white/25 uppercase tracking-widest">M-Pesa Deposit</h3>
      </div>
    </div>

    <!-- Form body -->
    <form class="px-5 pb-5 space-y-3" @submit.prevent="makeDeposit">
      <DepositAmounts />
      <DepositInput />
      <MakeDepositButton />
    </form>
  </div>
</template>
