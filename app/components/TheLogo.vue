<script setup>
import { useDefaultSport } from "@/composables/useDefaultSport";
import { useRoute, useRouter } from "vue-router";
import BandaLogo from "./logos/BandaLogo.vue";

const { initDefaultSport } = useDefaultSport();
const router = useRouter();
const route = useRoute();

function shouldFetch() {
  return route.name == "home";
}

const goHome = () => {
  initDefaultSport(shouldFetch());
  router.push({ name: "home" });
};
</script>

<template>
  <div
    class="cursor-pointer flex items-center"
    role="button"
    aria-label="Return to Bandabets home page"
    tabindex="0"
    @click="goHome"
  >
    <BandaLogo class="h-6 lg:h-7 max-h-full w-auto" />
  </div>
</template>
