<script setup>
import { useMatches2Store } from "../stores/matches2";
import { useScreenSizes } from "../composables/useScreenSizes";

const { getMatches } = useMatches2Store();
const { isLargeScreen } = useScreenSizes();

getMatches();
</script>

<template>
  <DesktopSportsLayout
    v-if="isLargeScreen"
    seo-title="Sports Betting by Country"
  />
  <MobileSportsLayout
    v-else
    seo-title="Sports Betting by Country"
  />
</template>
