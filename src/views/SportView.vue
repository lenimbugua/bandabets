<script setup>
import { onBeforeUnmount, toRefs } from "vue";
import { useSportsStore } from "../stores/sports";
import TheLanding from "./TheLanding.vue";
import TheSports from "./TheSports.vue";
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
