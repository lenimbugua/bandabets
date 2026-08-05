<script setup>
// Ported from src/views/DepositFunds.vue. Baseline route "/deposit"
// (git show 81ae85f:src/router/index.js:369) is top-level, not a child of
// WithSibarAndBetslip — renders its own HeaderLinks/Footer/MobileFooterV2,
// so layout: false.
import MobileFooterV2 from "@/components/mobile/MobileFooterV2.vue";

definePageMeta({
  name: "deposit",
  requiresAuth: true,
  layout: false,
});

useSeoHead({
  title: "Deposit Funds | Instant M-Pesa Payments | Bandabets",
  description:
    "Deposit instantly via M-Pesa and start betting today. Secure, fast, and reliable deposits at Bandabets.",
  robots: "noindex,nofollow",
});

const activeTab = ref("deposit");

const tabs = [
  { id: "deposit", label: "Deposit" },
  { id: "jisort", label: "Jisort" },
  { id: "bonuses", label: "Bonuses" },
  { id: "terms", label: "Terms" },
];
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
        <h1 class="text-lg font-bold text-gray-900 dark:text-white tracking-tight">Deposit Funds</h1>
      </div>

      <!-- Tabs -->
      <div class="flex gap-1 p-1 rounded-xl bg-gray-100 dark:bg-white/5">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          :class="activeTab === tab.id
            ? 'bg-white dark:bg-white/10 text-gray-900 dark:text-white shadow-sm'
            : 'text-gray-600 dark:text-white/50 hover:text-gray-800 dark:hover:text-white/70'"
          class="flex-1 py-2 rounded-lg text-xs font-semibold transition-all"
          @click="activeTab = tab.id"
        >
          {{ tab.label }}
        </button>
      </div>

      <!-- Deposit Tab -->
      <template v-if="activeTab === 'deposit'">
        <DepositForm />
        <SortYourDeposit class="sm:hidden" />
      </template>

      <!-- Paybill Tab -->
      <template v-else-if="activeTab === 'paybill'">
        <MpesaPaybillDeposit />
      </template>

      <!-- Jisort Tab -->
      <template v-else-if="activeTab === 'jisort'">
        <SortYourDeposit />
      </template>

      <!-- Bonuses Tab -->
      <template v-else-if="activeTab === 'bonuses'">
        <DepositBonusTable />
      </template>

      <!-- Terms Tab -->
      <template v-else-if="activeTab === 'terms'">
        <DepositBonusTerms />
      </template>
    </div>

    <div class="mt-auto">
      <MobileFooterV2 />
      <Footer />
    </div>
  </div>
</template>
