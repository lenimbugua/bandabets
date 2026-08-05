<script setup>
// Ported from src/views/WithdrawFunds.vue. Baseline route "/withdraw"
// (git show 81ae85f:src/router/index.js:393) is top-level, not a child of
// WithSibarAndBetslip — layout: false.
//
// Name shadowing: the source view imports a DIFFERENT component of the same
// name (app/components/WithdrawFunds.vue). Kept explicit and this page file
// is deliberately NOT named WithdrawFunds.vue to avoid confusion.
import MobileFooterV2 from "@/components/mobile/MobileFooterV2.vue";
import WithdrawFunds from "@/components/WithdrawFunds.vue";

definePageMeta({
  name: "withdraw",
  requiresAuth: true,
  layout: false,
});

useSeoHead({
  title: "Withdraw Winnings | Instant M-Pesa Cashouts | Bandabets",
  description:
    "Withdraw your Bandabets winnings instantly to M-Pesa. Quick, secure, and hassle-free payouts anytime.",
  robots: "noindex,nofollow",
});
</script>

<template>
  <div class="flex flex-col min-h-dvh bg-gray-50 dark:bg-background">
    <HeaderLinks />

    <div class="w-full max-w-lg mx-auto px-4 pt-4 pb-8 space-y-4">
      <!-- Header -->
      <div class="flex items-center gap-3">
        <button
          class="p-1.5 -ml-1.5 rounded-xl hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
          aria-label="Go back"
          @click="$router.go(-1)"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 text-gray-600 dark:text-gray-300">
            <path fill-rule="evenodd" d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z" clip-rule="evenodd" />
          </svg>
        </button>
        <h1 class="text-lg font-bold text-gray-900 dark:text-white tracking-tight">Withdraw Funds</h1>
      </div>

      <!-- Free banner -->
      <div class="flex items-center gap-2 px-3 py-2 rounded-lg bg-brand-bright/8 dark:bg-brand-bright/10 border border-brand-bright/15">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-3.5 h-3.5 text-brand-bright shrink-0"><path fill-rule="evenodd" d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z" clip-rule="evenodd" /></svg>
        <span class="text-[0.7rem] font-semibold text-brand-bright">Withdrawals are 100% free — no charges, no fees</span>
      </div>

      <WithdrawFunds />
    </div>

    <div class="mt-auto">
      <MobileFooterV2 />
      <Footer />
    </div>
  </div>
</template>
