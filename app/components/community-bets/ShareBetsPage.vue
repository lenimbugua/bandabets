<script setup>
// Shared body for app/pages/share-bets/index.vue and
// app/pages/share-bets/[code].vue — see plan §9. vue-router's optional
// param (":code?") has no Nuxt filename equivalent, so the route is split
// into two files that both render this component. Safe split: route.params
// .code is undefined on the index route, and openBetslipModal() below
// already guards on `if (code)`.
//
// Ported from src/views/BookedBets.vue. Baseline route was top-level (not
// a child of WithSibarAndBetslip), so it renders its own
// HeaderLinks/Footer/MobileFooterV2 — the page wrapping this component
// sets layout: false.
//
// SSR hazards (kept client-only via routeRules, per plan §9):
// - openBetslipModal() below awaits loadSharedBetslip(code) then mutates
//   the global modal store — unsafe under SSR.
// - fetchBethub() sets store.pending and does a network call in setup.
import MobileFooterV2 from "@/components/mobile/MobileFooterV2.vue";
import BookedBetsTab from "@/components/community-bets/BookedBetsTab.vue";
import { useModalTypes } from "@/composables/useModalTypes";
import { useBookedBetsStore } from "@/stores/booked-bets.js";
import { useModalStore } from "@/stores/modal";
import { useShareBetStore } from "@/stores/sharebet.js";
import { storeToRefs } from "pinia";

const { loadSharedBetslip, loadBetslip } = useShareBetStore();
const { fetchBethub } = useBookedBetsStore();
const { pending } = storeToRefs(useBookedBetsStore());
const { responseOK } = storeToRefs(useShareBetStore());

const { betslip } = useModalTypes();
const { openModal } = useModalStore();

const route = useRoute();
const code = route.params.code;

async function openBetslipModal() {
  if (code) {
    await loadSharedBetslip(code);
    if (!responseOK.value) return;
    openModal(betslip);
    loadBetslip();
  }
}
openBetslipModal();
fetchBethub();
</script>

<template>
  <HeaderLinks />
  <div v-if="pending" class="p-4 max-w-4xl mx-auto">
    <BetsLoader />
  </div>

  <div v-else>
    <div class="px-4 py-4 space-y-4 max-w-4xl mx-auto">
      <BookedBetsTab />
    </div>
  </div>
  <MobileFooterV2 />
  <Footer />
</template>
