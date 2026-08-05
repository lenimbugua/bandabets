<script setup>
// Ported from src/views/MatchDetails.vue. Filename is a stand-in — the
// real fused path (/sports/:sport/:country/:league/:matchSlug(.*)-:id)
// has no Nuxt filename equivalent, so nuxt.config.js's "pages:extend" hook
// rewrites this page's `path` after Nuxt discovers it. See
// docs/superpowers/plans/2026-08-04-nuxt-migration-phase-2.md §9.
//
// Baseline route was a child of WithSibarAndBetslip (now app/layouts/
// default.vue), so layout is left at its default ("default") here —
// omitted, not set to false.
//
// The baseline view's own <MobileFooterV2 /> is dropped: default.vue
// already renders MobileFooterV2 in all three responsive branches, so
// keeping it here would double-render it. Its own sr-only <h1> is also
// dropped for the same reason: default.vue already renders exactly one
// (unconditional, sr-only) <h1> — this page must not add a second, since
// this is the app's single most SEO-valuable dynamic page.
import ViewMatch from "@/components/ViewMatch.vue";

definePageMeta({
  name: "match-details",
});

useSeoHead({
  title: "Match Details – Live Stats & Betting Markets | Bandabets",
  description:
    "Get in-depth stats, lineups, and odds for live matches. Bet instantly and follow your team on Bandabets.",
});
</script>

<template>
  <ViewMatch />
</template>
