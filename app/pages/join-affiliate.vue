<script setup>
// Ported from src/views/JoinAffiliate.vue. Baseline route "/join-affiliate"
// (git show 81ae85f:src/router/index.js:357-366) is top-level, and
// AffiliateIndex renders its own chrome (MobileFooterV2 + NotAuthenicated
// gate) — layout: false.
definePageMeta({
  name: "join-affiliate",
  requiresAuth: true,
  layout: false,
});

useSeoHead({
  title: "Affiliate Program | Earn with Bandabets",
  description:
    "Join the Bandabets Affiliate Program and earn commission promoting Kenya’s leading sports betting platform.",
  robots: "noindex,nofollow",
});
</script>

<template>
  <h1 class="sr-only">Affiliate Program | Earn with Bandabets</h1>
  <AffiliateIndex />
</template>
