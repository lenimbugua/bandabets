<script setup>
// Minimal placeholder — the real TheBets.vue lands in Phase 2. This
// shell exists only so RouterLink/router.push({ name: 'my-bets' }) calls
// from the shared chrome (SportsBetslipPanel, ProfileLinks,
// MobileFooterV2) resolve during SSR instead of throwing. Per spec
// §5.3 this route is ssr:false, private and noindex — see routeRules
// in nuxt.config.js.
definePageMeta({
  name: "my-bets",
  // Carried requiresAuth: true in the baseline router (git show
  // 81ae85f:src/router/index.js) — see app/middleware/auth.global.js.
  requiresAuth: true,
});

useSeoHead({
  title: "My Bets | Bandabets History & Results",
  robots: "noindex,nofollow",
});
</script>

<template>
  <div class="py-10 text-center">
    <h1 class="text-headline-md font-display">My Bets</h1>
    <p class="text-body-md text-muted-foreground mt-2">Coming in Phase 2.</p>
  </div>
</template>
