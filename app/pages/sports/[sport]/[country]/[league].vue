<script setup>
import { useMatches2Store } from "@/stores/matches2";
import { useScreenSizes } from "@/composables/useScreenSizes";

const route = useRoute();

definePageMeta({ name: "country", layout: false });

const countryName = computed(() =>
  String(route.params.country || "")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase()),
);
const leagueName = computed(() =>
  String(route.params.league || "")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase()),
);

useSeoHead({
  title: `${countryName.value} Sports Betting – Leagues & Fixtures | Naibet`,
  description: `Bet on ${leagueName.value} and other ${countryName.value} leagues and matches with top odds and live stats only on Naibet.`,
});

const { getMatches } = useMatches2Store();
const { isLargeScreen } = useScreenSizes();

getMatches();
</script>

<template>
  <h1 class="sr-only">{{ leagueName }}{{ leagueName && countryName ? " – " : "" }}{{ countryName }} Sports Betting – Leagues &amp; Fixtures | Naibet</h1>
  <DesktopSportsLayout
    v-if="isLargeScreen"
    seo-title="Sports Betting by Country"
  />
  <MobileSportsLayout
    v-else
    seo-title="Sports Betting by Country"
  />
</template>
