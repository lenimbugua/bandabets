<script setup>
// Minimal placeholder — the real CasinoHome.vue lands in Phase 2. This
// shell exists only so RouterLink/router.push({ name: 'casino-home' })
// calls from the shared chrome (HotSection, MainCategories, TheSidebar,
// Footer, ...) resolve during SSR instead of throwing. Per spec §5.3
// this route is ssr:false, private and noindex — see routeRules in
// nuxt.config.js.
definePageMeta({
  name: "casino-home",
});

useSeoHead({
  title: "Bandabets Casino",
  robots: "noindex,nofollow",
});
</script>

<template>
  <div class="py-10 text-center">
    <h1 class="text-headline-md font-display">Casino</h1>
    <p class="text-body-md text-muted-foreground mt-2">Coming in Phase 2.</p>
  </div>
</template>
