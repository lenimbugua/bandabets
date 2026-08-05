<script setup>
// ProfileIndex never lived under src/ — it was already a component at
// app/components/profile/ProfileIndex.vue in Phase 1. Baseline route
// "/profile" (git show 81ae85f:src/router/index.js:154) is top-level, NOT a
// child of WithSibarAndBetslip, and ProfileIndex renders its own chrome
// (custom sticky header + Footer/MobileFooterV2) — layout: false.
//
// Nesting trap: self-exclusion ("/profile/exclude") must NOT become a child
// of this page. Using app/pages/profile/index.vue (not profile.vue) keeps
// them flat siblings, matching the baseline where self-exclusion is its own
// top-level route, not nested under "/profile".
definePageMeta({
  name: "profile",
  requiresAuth: true,
  layout: false,
});

useSeoHead({
  title: "My Profile – Account, Bets & Settings | Bandabets",
  description:
    "Manage your Bandabets account, update details, track bets, and control preferences securely from your profile.",
  robots: "noindex,nofollow",
});
</script>

<template>
  <ProfileIndex />
</template>
