<script setup>
// Ported from src/views/PromotionDetails.vue. Public, indexable — removed
// from phase2Placeholders in the same commit that adds this page.
//
// Name override is mandatory: Nuxt would derive "promotion-details-name"
// from this filename; app/components/ThePromos2.vue:94 pushes
// { name: "promotion-details" } and app/composables/useMainNav.js:31 lists
// it in activeOn — both require the exact baseline name.
import MobileFooterV2 from "@/components/mobile/MobileFooterV2.vue";
import PromoIndex from "@/components/promos/PromoIndex.vue";

definePageMeta({
  name: "promotion-details",
  layout: false,
});

const route = useRoute();
const { promos } = usePromos();

// The baseline used one static title for every :name. Improve on that where
// possible by deriving a per-promo title from usePromos() (a pure factory,
// no module-scope state, safe to call again here) — falls back to the
// static baseline copy for promos not present in the current line-up.
const matchedPromo = promos.find((promo) => promo.name === route.params.name);

useSeoHead({
  title: matchedPromo
    ? `${matchedPromo.title} | Bandabets Promotions`
    : "Promotion Details – Exclusive Offers | Bandabets",
  description:
    matchedPromo?.samary ||
    "View full details of Bandabets promotions and learn how to qualify for bonuses, free bets, and jackpots.",
});
</script>
<template>
  <HeaderLinks />
  <!-- No page-level h1 here: PromoIndex.vue already renders its own
       visible "Promotion Details" h1 (app/components/promos/PromoIndex.vue:89).
       The baseline view added a second, sr-only h1 on top of it — dropped
       here to keep exactly one h1 per page. -->
  <div class="max-w-6xl mx-auto sm:px-12 px-3">
    <PromoIndex />
  </div>
  <Footer />
  <MobileFooterV2 />
</template>
