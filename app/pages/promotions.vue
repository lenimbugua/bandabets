<script setup>
import CategoryPills from "@/components/mobile/CategoryPills.vue";

definePageMeta({
  name: "promotions",
  layout: false,
});

useSeoHead({
  title: "Bandabets Promotions – Free Bets, Cashbacks & Bonuses",
  description:
    "Discover exciting Bandabets offers including free bets, cashback, and deposit bonuses. Claim rewards every week.",
});
</script>

<template>
  <div class="flex flex-col h-dvh overflow-scroll">
    <HeaderLinks />
    <div class="w-full">
      <CategoryPills :sticky="false" />
    </div>
    <h1 class="sr-only">Promotions – Free Bets, Cashbacks & Bonuses | Bandabets</h1>
    <div class="flex-col grow">
      <!-- <ThePromos2 /> -->
      <ThePromos />
    </div>
    <MobileFooterV2 />
    <Footer />
  </div>
</template>
