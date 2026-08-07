<script setup>
import { ref } from "vue";
const partialCashoutValue = ref(0);
</script>
<template>
  <div class="px-6 py-2 text-gray-600 dark:text-slate-400">
    <div
      class="flex gap-2 items-center w-full justify-center text-gray-700 dark:text-slate-200 text-xl"
    >
      <Icon name="tabler:info-circle" class="h-6 w-6 text-red-600" />
      <Span class="">Partial Cashout</Span>
      <span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-7 w-7 text-red-500"
          viewBox="0 0 24 24"
        >
          <!-- Icon from Material Symbols by Google - https://github.com/google/material-design-icons/blob/master/LICENSE -->
          <path
            fill="currentColor"
            d="M11.475 14.475L7.85 10.85q-.075-.075-.112-.162T7.7 10.5q0-.2.138-.35T8.2 10h7.6q.225 0 .363.15t.137.35q0 .05-.15.35l-3.625 3.625q-.125.125-.25.175T12 14.7t-.275-.05t-.25-.175"
          />
        </svg>
      </span>
      <span class="font-bold text-xl text-gray-700 dark:text-slate-300"
        >427 Ksh</span
      >
    </div>
    <p class="py-2 text-sm">
      Enter below the amount of the stake of your bet you want to cash out, or
      scroll the bar, minimum amount 1.00 Ksh.
    </p>
    <div class="flex items-center gap-2 py-2">
      <label
        for="partialCashoutValue"
        class="block text-md font-semibold leading-6 text-gray-600 dark:text-gray-400"
        >Enter Amount to cahout</label
      >
      <input
        id="partialCashoutValue"
        v-model="partialCashoutValue"
        required
        type="number"
        class="mt-1 appearance-none text-slate-900 dark:text-gray-400 bg-white dark:bg-surface-deepest/50 rounded-md block p-2 sm:text-sm focus:outline-hidden placeholder:text-slate-400 focus:ring-2 shadow-sm focus:ring-ring ring-2 ring-black/20 dark:ring-white/25"
      />
    </div>
    <button class="w-full bg-red-600 p-2 rounded-md text-red-50">
      Partial Cashout
    </button>
  </div>
</template>
