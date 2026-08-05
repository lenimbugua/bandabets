<script setup>
import { onBeforeUnmount } from "vue";
import { useScreenSizes } from "@/composables/useScreenSizes";
import { useSportsQueryParamsStore } from "@/stores/sports-query-params";
// Explicit import required: `Lazy` is a reserved Nuxt prefix, so a bare
// <LazyInfinityScroll> tag resolves to nothing and the wrapped content
// silently disappears.
import LazyInfinityScroll from "@/components/LazyInfinityScroll.vue";

const { resetToDefaults } = useSportsQueryParamsStore();
const { isLargeScreen } = useScreenSizes();

onBeforeUnmount(() => {
  resetToDefaults();
});
</script>

<template>
  <!-- ==================== LARGE SCREEN (1024px+) ==================== -->
  <LazyInfinityScroll
    v-if="isLargeScreen"
    class="bg-gray-50 dark:bg-background"
  >
    <DesktopSportsLayout
      seo-title="Sports Betting – Prematch Odds & Fixtures | Bandabets"
    />
  </LazyInfinityScroll>

  <!-- ==================== SMALL SCREEN (<768px) ==================== -->
  <MobileSportsLayout
    v-else
    seo-title="Sports Betting – Prematch Odds & Fixtures | Bandabets"
  />
</template>
