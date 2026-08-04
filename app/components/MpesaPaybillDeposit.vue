<script setup>
import { useModalStore } from "@/stores/modal";

const { closeModal } = useModalStore();

const { public: config } = useRuntimeConfig();
const paybillNo = config.paybillNo;

</script>

<template>
  <div class="rounded-2xl bg-white dark:bg-white/3 border border-gray-200/80 dark:border-white/6 shadow-sm dark:shadow-none overflow-hidden">
    <!-- Header -->
    <div class="px-5 pt-4 pb-3 flex items-center gap-3">
      <div class="w-7 h-7 rounded-lg bg-primary/8 dark:bg-primary/10 flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-3.5 h-3.5 text-primary">
          <path fill-rule="evenodd" d="M2 3.5A1.5 1.5 0 0 1 3.5 2h1.148a1.5 1.5 0 0 1 1.465 1.175l.716 3.223a1.5 1.5 0 0 1-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 0 0 6.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 0 1 1.767-1.052l3.223.716A1.5 1.5 0 0 1 18 15.352V16.5a1.5 1.5 0 0 1-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 0 1 2.43 8.326 13.019 13.019 0 0 1 2 5V3.5Z" clip-rule="evenodd" />
        </svg>
      </div>
      <div class="flex items-baseline gap-2">
        <h3 class="text-[0.6rem] font-bold text-gray-400 dark:text-white/25 uppercase tracking-widest">Paybill</h3>
        <span class="text-sm font-bold text-brand-bright tabular-nums">{{ paybillNo }}</span>
      </div>
    </div>

    <!-- Steps -->
    <div class="px-5 pb-5">
      <div class="space-y-2.5">
        <div class="flex items-start gap-3">
          <span class="shrink-0 w-5 h-5 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center text-[0.6rem] font-bold text-gray-400 dark:text-white/30 tabular-nums">1</span>
          <span class="text-[0.75rem] text-gray-600 dark:text-white/50 leading-relaxed">Go to M-Pesa Menu on your phone</span>
        </div>
        <div class="flex items-start gap-3">
          <span class="shrink-0 w-5 h-5 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center text-[0.6rem] font-bold text-gray-400 dark:text-white/30 tabular-nums">2</span>
          <span class="text-[0.75rem] text-gray-600 dark:text-white/50 leading-relaxed">Select Lipa na M-Pesa</span>
        </div>
        <div class="flex items-start gap-3">
          <span class="shrink-0 w-5 h-5 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center text-[0.6rem] font-bold text-gray-400 dark:text-white/30 tabular-nums">3</span>
          <span class="text-[0.75rem] text-gray-600 dark:text-white/50 leading-relaxed">Choose Paybill</span>
        </div>
        <div class="flex items-start gap-3">
          <span class="shrink-0 w-5 h-5 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center text-[0.6rem] font-bold text-gray-400 dark:text-white/30 tabular-nums">4</span>
          <span class="text-[0.75rem] text-gray-600 dark:text-white/50 leading-relaxed">Enter Business Number <strong class="text-gray-900 dark:text-white font-bold">{{ paybillNo }}</strong></span>
        </div>
        <div class="flex items-start gap-3">
          <span class="shrink-0 w-5 h-5 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center text-[0.6rem] font-bold text-gray-400 dark:text-white/30 tabular-nums">5</span>
          <span class="text-[0.75rem] text-gray-600 dark:text-white/50 leading-relaxed">Enter Account Number <strong class="text-gray-900 dark:text-white font-bold">pari</strong></span>
        </div>
        <div class="flex items-start gap-3">
          <span class="shrink-0 w-5 h-5 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center text-[0.6rem] font-bold text-gray-400 dark:text-white/30 tabular-nums">6</span>
          <span class="text-[0.75rem] text-gray-600 dark:text-white/50 leading-relaxed">Enter Amount</span>
        </div>
        <div class="flex items-start gap-3">
          <span class="shrink-0 w-5 h-5 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center text-[0.6rem] font-bold text-gray-400 dark:text-white/30 tabular-nums">7</span>
          <span class="text-[0.75rem] text-gray-600 dark:text-white/50 leading-relaxed">Enter M-Pesa PIN and Confirm</span>
        </div>
        <div class="flex items-start gap-3">
          <span class="shrink-0 w-5 h-5 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center text-[0.6rem] font-bold text-gray-400 dark:text-white/30 tabular-nums">8</span>
          <span class="text-[0.75rem] text-gray-600 dark:text-white/50 leading-relaxed">You will receive M-Pesa Confirmation</span>
        </div>
      </div>

      <!-- Footer link -->
      <div class="mt-4 pt-3 border-t border-gray-100 dark:border-white/5">
        <RouterLink
          :to="{ name: 'sort-deposit' }"
          class="text-[0.7rem] font-medium text-brand-bright hover:underline"
          @click="closeModal"
        >
          Can't see your deposit? Resolve here
        </RouterLink>
      </div>
    </div>
  </div>
</template>
