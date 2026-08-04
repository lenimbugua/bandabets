<script setup>
// The landing content is shared with app/pages/sports/[sport].vue (which
// toggles between the "sport" and "landing" views via useSportsStore), so
// it lives in app/components/TheLanding.vue rather than directly in this
// page file. This page just supplies the route meta and SEO tags.
definePageMeta({
  name: "home",
  layout: false,
});

useSeoHead({
  title: "Best online sports betting in Kenya – Naibet",
  description:
    "Experience the best online sports betting and casino games with Naibet. Fast payouts, live odds, and instant deposits.",
});
</script>

<template>
  <h1 class="sr-only">Best Online Sports Betting in Kenya – Naibet</h1>
  <TheLanding />
</template>
