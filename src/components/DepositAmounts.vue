<script setup>
import { storeToRefs } from "pinia";
import { useDepositStore } from "../stores/deposit";
const { depositAmounts, deposit } = storeToRefs(useDepositStore());

const { setDeposit } = useDepositStore();
</script>

<template>
  <div class="space-y-1.5">
    <span class="text-xs font-medium text-gray-600 dark:text-gray-400">
      Quick select
    </span>
    <div class="grid grid-cols-4 gap-1.5">
      <button
        v-for="(item, index) in depositAmounts"
        :key="item.amount"
        type="button"
        class="relative flex items-center justify-center h-9 rounded-lg text-sm font-semibold tabular-nums transition-all cursor-pointer border"
        :class="
          deposit === item.amount
            ? 'bg-brand-bright/15 dark:bg-brand-bright/20 border-brand-bright/40 text-brand-bright'
            : 'bg-gray-50 dark:bg-white/[0.03] border-gray-200 dark:border-white/8 text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-white/15'
        "
        @click="setDeposit(item.amount)"
      >
        {{ item.amount }}<span v-if="index + 1 === depositAmounts.length">+</span>
        <span
          v-if="item.bonus"
          class="absolute -top-2 -right-1.5 px-1.5 py-0.5 rounded-full text-[0.5rem] font-bold leading-none bg-brand-bright text-primary-foreground dark:text-brand-forest shadow-sm"
        >
          +{{ item.bonus }}
        </span>
      </button>
    </div>
  </div>
</template>
