<script setup>
import { useDefaultSport } from "@/composables/useDefaultSport";
import { useRoute, useRouter } from "vue-router";

const { initDefaultSport } = useDefaultSport();
const router = useRouter();
const route = useRoute();

const logoSrc =
  "https://imagedelivery.net/ZY5OwFLlTE2ePHl_IE20jg/ed1dd1cc-ec1e-4ad5-d96a-283842f08900/public";

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
    aria-label="Return to Naibet home page"
    tabindex="0"
    @click="goHome"
  >
    <img
      :src="logoSrc"
      alt="Naibet"
      class="h-10 lg:h-12 max-h-full w-auto object-contain"
      loading="eager"
      decoding="async"
    />
  </div>
</template>
