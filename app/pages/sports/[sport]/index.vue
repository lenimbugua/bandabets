<script setup>
import { onBeforeUnmount, toRefs } from "vue";
import { useSportsStore } from "@/stores/sports";

const route = useRoute();

definePageMeta({ name: "sports", layout: "default" });

const sportName = computed(() =>
  String(route.params.sport || "")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase()),
);

const { getSportMeta } = useSportMeta();
const sportMeta = computed(() => getSportMeta(route.params.sport));

useSeoHead({
  title:
    sportMeta.value?.title ??
    `${sportName.value} Betting in Kenya – Odds & Live Markets | Naibet`,
  description:
    sportMeta.value?.description ??
    `Bet on ${sportName.value} at Naibet Kenya. Competitive odds, live markets and instant M-Pesa deposits.`,
});

const { viewToDisplay } = toRefs(useSportsStore());
const { setViewToDisplay } = useSportsStore();

onBeforeUnmount(() => {
  setViewToDisplay("sport");
});
</script>
<template>
  <h1 class="sr-only">Sports Betting – Live Odds & Fixtures | Naibet</h1>
  <TheSports v-if="viewToDisplay === 'sport'" />
  <TheLanding v-else-if="viewToDisplay === 'landing'" />
</template>
