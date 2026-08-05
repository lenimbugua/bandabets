<script setup>
// Ported from src/views/TheBets.vue (replaces the Phase-1 stub). Baseline
// route was a child of WithSibarAndBetslip (now app/layouts/default.vue)
// — layout left at its default here. Private page: ssr:false + noindex
// come from phase2RealStubPaths in nuxt.config.js (my-bets was never in
// phase2Placeholders, so nothing needs removing there — see plan §9).
import MyBets from "@/components/MyBets.vue";

definePageMeta({
  name: "my-bets",
  // Carried requiresAuth: true in the baseline router (git show
  // 81ae85f:src/router/index.js) — see app/middleware/auth.global.js.
  requiresAuth: true,
});

useSeoHead({
  title: "My Bets | Bandabets History & Results",
  description:
    "Track your bet history, view results, and manage open wagers securely on Bandabets Kenya.",
  robots: "noindex,nofollow",
});
</script>

<template>
  <div class="bg-white dark:bg-background">
    <h1 class="sr-only">My Bets | Bandabets</h1>
    <MyBets />
  </div>
</template>
