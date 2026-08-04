<script setup>
import { onBeforeUnmount } from "vue";
import { useScreenSizes } from "@/composables/useScreenSizes";
import { useSportsQueryParamsStore } from "@/stores/sports-query-params";

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
