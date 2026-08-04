<script setup>
import MobileFooterV2 from "../components/mobile/MobileFooterV2.vue";
import PromoIndex from "@/components/promos/PromoIndex.vue";
// import PromotionDetails from "../components/promos/PromotionDetails.vue";
</script>
<template>
  <HeaderLinks />
  <h1 class="sr-only">Promotion Details | Naibet</h1>
  <div class="max-w-6xl mx-auto sm:px-12 px-3">
    <!-- <PromotionDetails /> -->
    <PromoIndex />
  </div>
  <!-- <ThePromos /> -->
  <Footer />
  <MobileFooterV2 />
</template>
