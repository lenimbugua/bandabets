<script setup>
// Minimal placeholder — the real TheRegister.vue lands in Phase 2. This
// shell exists only so RouterLink/router.push({ name: 'signup' }) calls
// from the shared chrome resolve during SSR instead of throwing. Per
// spec §5.3 this route is ssr:false, private and noindex — see
// routeRules in nuxt.config.js.
definePageMeta({
  name: "signup",
  layout: "auth",
});

useSeoHead({
  title: "Register on Naibet – Create Account & Start Betting",
  robots: "noindex,nofollow",
});
</script>

<template>
  <div class="py-10 text-center">
    <h1 class="text-headline-md font-display">Sign Up</h1>
    <p class="text-body-md text-muted-foreground mt-2">Coming in Phase 2.</p>
  </div>
</template>
