<script setup>
import { useScreenSizes } from "../composables/useScreenSizes";

definePageMeta({
  name: "leagues",
  layout: "default",
});

useSeoHead({
  title: "Football Leagues & Fixtures | Naibet Sportsbook",
  description:
    "Browse upcoming football leagues and fixtures. Bet pre-match or live on your favorite teams at Naibet Kenya.",
});

const { isLargeScreen } = useScreenSizes();
</script>

<template>
  <!-- Desktop -->
  <DesktopSportsLayout
    v-if="isLargeScreen"
    seo-title="Football Leagues & Fixtures | Naibet Sportsbook"
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
    seo-title="Football Leagues & Fixtures | Naibet Sportsbook"
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
