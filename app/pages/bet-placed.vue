<script setup>
// Ported from src/views/BetPlacedSuccessfully.vue. Not registered anywhere
// in Phase 1 (no placeholder, no real stub, no routeRule) — created from
// scratch here, including its noindex routeRule in nuxt.config.js. See
// plan §9.
//
// Baseline route was top-level (not a child of WithSibarAndBetslip), so it
// renders its own HeaderLinks/MobileFooterV2 -> layout: false.
//
// Explicit import required: Nuxt reserves the "Lazy" component-name
// prefix (<LazyFoo/> = lazy-loaded Foo). Both app/components/
// LazyInfinityScroll.vue and app/components/Lazy.vue exist, so an
// unqualified <LazyInfinityScroll> tag is one InfinityScroll.vue away from
// silently resolving to the wrong (lazy-wrapped) component the moment that
// file is added. Import it explicitly to pin the resolution.
import HeaderLinks from "@/components/HeaderLinks.vue";
import MobileFooterV2 from "@/components/mobile/MobileFooterV2.vue";
import LazyInfinityScroll from "@/components/LazyInfinityScroll.vue";

definePageMeta({
  name: "bet-placed",
  requiresAuth: true,
  layout: false,
});

useSeoHead({
  // Double space preserved verbatim from the baseline meta string.
  title: "Bet Placed successfully |  Bet Slip | Bandabets",
  description:
    "Your bet has been placed successfully. Share your bet with friends and track your progress.",
  robots: "noindex,nofollow",
});
</script>

<template>
  <LazyInfinityScroll>
    <div class="sticky top-0 z-50">
      <HeaderLinks />
      <h1 class="sr-only">Bet Placed Successfully | Bandabets</h1>
    </div>
    <div
      class="h-full flex flex-col bg-white dark:bg-background"
    >
      <div class="">
        <BetPlaced />
      </div>
    </div>
    <MobileFooterV2 />
  </LazyInfinityScroll>
</template>
