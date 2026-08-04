<script setup>
// Shared component for every route registered in nuxt.config.js's
// `pages:extend` hook (the Phase 1 route-name scaffold). Each of those
// routes points here instead of getting its own .vue file — see the hook
// for why. Renders client-only (mode: "client" on the registered page), so
// this never appears in SSR output; it exists purely so vue-router's
// resolve() has somewhere to land for names the shared chrome references.
const route = useRoute();

const label = computed(() => {
  const raw = String(route.name || "page").replace(/-/g, " ");
  return raw.replace(/\b\w/g, (c) => c.toUpperCase());
});

useSeoHead({
  title: `${label.value} | Bandabets`,
  robots: "noindex,nofollow",
});
</script>

<template>
  <div class="py-16 px-4 text-center">
    <h1 class="text-headline-md font-display">{{ label }}</h1>
    <p class="text-body-md text-muted-foreground mt-2">Coming in Phase 2.</p>
  </div>
</template>
