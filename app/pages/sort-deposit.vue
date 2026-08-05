<script setup>
// Ported from src/views/SortDeposit.vue. Baseline route "/sort-deposit"
// (git show 81ae85f:src/router/index.js:381-390) is top-level, NOT a child
// of WithSibarAndBetslip, and is requiresAuth: FALSE — the plan's own
// correction to the assignment brief; do not gate this route.
import MobileFooterV2 from "@/components/mobile/MobileFooterV2.vue";
import Goback from "@/components/Goback.vue";

definePageMeta({
  name: "sort-deposit",
  layout: false,
});

useSeoHead({
  title: "Sort Deposit | Bandabets Payment Help",
  description:
    "Resolve deposit delays and confirm your transaction manually with our fast deposit sorting tool.",
  robots: "noindex,nofollow",
});
</script>

<template>
  <h1 class="sr-only">Sort Your Deposit | Bandabets</h1>
  <div class="h-dvh flex flex-col">
    <div>
      <HeaderLinks />
      <div class="flex justify-between items-center dark:text-white py-2">
        <Goback />
        <div></div>
      </div>
    </div>
    <div class="grow max-w-3xl px-1 my-4 md:mx-auto">
      <SortYourDeposit />
    </div>
    <MobileFooterV2 />
    <Footer />
  </div>
</template>
