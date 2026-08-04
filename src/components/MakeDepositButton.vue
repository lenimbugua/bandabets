<script setup>
import { useDepositStore } from "@/stores/deposit.js";
import { useModalStore } from "@/stores/modal";
import { storeToRefs } from "pinia";

const { closeModal } = useModalStore();
const { pending } = storeToRefs(useDepositStore());
</script>

<template>
  <div class="space-y-2.5">
    <!-- Deposit button -->
    <button
      class="deposit-btn w-full py-2.5 font-semibold text-sm text-white rounded-xl transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      type="submit"
      :disabled="pending"
    >
      <TheButtonSpin v-if="pending" />
      <span v-else class="flex items-center justify-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4">
          <path fill-rule="evenodd" d="M2 4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4Zm2.22 1.97a.75.75 0 0 0 0 1.06L6.44 9.25H5a.75.75 0 0 0 0 1.5h3.5a.75.75 0 0 0 .75-.75V6.5a.75.75 0 0 0-1.5 0v1.44L5.53 5.72a.75.75 0 0 0-1.06.25Z" clip-rule="evenodd" />
        </svg>
        Deposit Now
      </span>
    </button>

    <!-- Bonus caption -->
    <div class="flex items-center justify-center gap-1.5 text-[0.65rem] text-gray-500 dark:text-gray-400">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-3.5 h-3.5 text-brand-bright">
        <path fill-rule="evenodd" d="M8 1.75a.75.75 0 0 1 .692.462l1.41 3.393 3.664.293a.75.75 0 0 1 .428 1.317l-2.791 2.39.853 3.58a.75.75 0 0 1-1.12.814L8 12.07l-3.136 1.929a.75.75 0 0 1-1.12-.814l.853-3.58-2.791-2.39a.75.75 0 0 1 .428-1.317l3.664-.293 1.41-3.393A.75.75 0 0 1 8 1.75Z" clip-rule="evenodd" />
      </svg>
      <span>Bonus on first deposit</span>
    </div>

    <!-- Failed deposit link -->
    <div class="text-center">
      <RouterLink
        :to="{ name: 'sort-deposit' }"
        class="text-xs text-brand-bright hover:underline"
        @click="closeModal"
      >
        Failed deposit? Resolve here
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
.deposit-btn {
  background: linear-gradient(135deg, oklch(55% 0.2 145), oklch(50% 0.18 155));
  box-shadow: 0 2px 8px oklch(55% 0.2 145 / 0.3);
}
.deposit-btn:hover:not(:disabled) {
  box-shadow: 0 4px 16px oklch(55% 0.2 145 / 0.4);
  filter: brightness(1.05);
}
.deposit-btn:active:not(:disabled) {
  transform: scale(0.98);
}
</style>
