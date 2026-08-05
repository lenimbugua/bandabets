<script setup>
// No src/views file to port — the baseline route "/sports/soccer/countries"
// (git show 81ae85f:src/router/index.js:279-290) reused LeaguesView, the
// SAME component already shipped as app/pages/leagues.vue. app/pages/
// leagues.vue is one of the six protected SEO pages (Global Constraints
// / hard rules: must not be altered), so its body cannot be extracted into
// a shared component without touching that file — duplicated here instead.
// This is a deliberate, flagged drift risk: keep the two pages' markup in
// sync by hand if either changes.
//
// Duplicate-content mitigation: this page points its canonical at /leagues
// (byte-identical body, different title) via useSeoHead's canonicalPath
// override, per the plan's own recommendation.
import { useScreenSizes } from "@/composables/useScreenSizes";

definePageMeta({
  name: "countries",
  layout: false,
});

useSeoHead({
  title: "All Sports Countries | Bandabets",
  description:
    "Explore betting markets by country. Bet on leagues and matches across Kenya, Europe, and worldwide.",
  canonicalPath: "/leagues",
});

const { isLargeScreen } = useScreenSizes();
</script>

<template>
  <h1 class="sr-only">All Sports Countries | Bandabets</h1>

  <!-- Desktop -->
  <DesktopSportsLayout
    v-if="isLargeScreen"
    seo-title="All Sports Countries | Bandabets"
  >
    <template #content>
      <div class="rounded-xl leagues-card overflow-hidden">
        <LeagueCard />
      </div>
    </template>
  </DesktopSportsLayout>

  <!-- Mobile -->
  <MobileSportsLayout
    v-else
    seo-title="All Sports Countries | Bandabets"
  >
    <template #content>
      <div class="px-2">
        <LeagueCard />
      </div>
    </template>
  </MobileSportsLayout>
</template>

<style scoped>
.leagues-card {
  background: white;
  border: 1px solid oklch(0% 0 0 / 0.06);
  box-shadow:
    0 1px 3px oklch(0% 0 0 / 0.05),
    0 4px 16px oklch(0% 0 0 / 0.04);
}
[data-theme="dark"] .leagues-card {
  background: var(--surface-elevated);
  border-color: transparent;
  box-shadow:
    0 1px 3px oklch(0% 0 0 / 0.12),
    0 4px 16px oklch(0% 0 0 / 0.2);
}
</style>
