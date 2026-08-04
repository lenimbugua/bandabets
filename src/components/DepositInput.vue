<script setup>
import { MAX_DEPOSIT, MIN_DEPOSIT } from "@/composables/useDefinedConstants";
import { useDepositStore } from "@/stores/deposit.js";
import { storeToRefs } from "pinia";
import { ref } from "vue";

const { deposit } = storeToRefs(useDepositStore());
const { setDeposit } = useDepositStore();
const selectedDepositAmount = ref(deposit);
</script>

<template>
  <div class="space-y-1.5">
    <label for="deposit-amount" class="text-xs font-medium text-gray-600 dark:text-gray-400">
      Enter amount
    </label>
    <div
      class="flex items-center h-10 rounded-xl overflow-hidden border border-gray-200 dark:border-white/10 focus-within:border-brand-bright/50 focus-within:ring-2 focus-within:ring-brand-bright/15 transition-all bg-white dark:bg-white/[0.03]"
    >
      <div class="flex items-center justify-center h-full px-3 bg-gray-50 dark:bg-white/[0.04] border-r border-gray-200 dark:border-white/10">
        <span class="text-xs font-semibold text-gray-500 dark:text-gray-400">KES</span>
      </div>
      <input
        id="deposit-amount"
        v-model="selectedDepositAmount"
        :max="MAX_DEPOSIT"
        :min="MIN_DEPOSIT"
        type="number"
        aria-label="Deposit amount in KES"
        class="flex-1 h-full px-3 text-sm font-semibold bg-transparent text-gray-900 dark:text-white ring-0 outline-hidden placeholder:text-gray-400 dark:placeholder:text-gray-500 tabular-nums"
        placeholder="0"
        name="deposit"
        required
        @input="setDeposit(selectedDepositAmount)"
      />
    </div>
  </div>
</template>
