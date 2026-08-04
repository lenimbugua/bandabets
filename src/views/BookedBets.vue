<script setup>
import MobileFooterV2 from "../components/mobile/MobileFooterV2.vue";
import BookedBetsTab from "@/components/community-bets/BookedBetsTab.vue";
import { useModalTypes } from "@/composables/useModalTypes";
import { useBookedBetsStore } from "@/stores/booked-bets.js";
import { useModalStore } from "@/stores/modal";
import { useShareBetStore } from "@/stores/sharebet.js";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";

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
    <!-- Hero -->
    <!-- <div class="relative overflow-hidden bg-linear-to-br from-brand-bright/10 via-brand-bright/5 to-transparent dark:from-brand-bright/15 dark:via-brand-bright/5 dark:to-background">
      <div class="absolute -right-16 -top-16 w-52 h-52 rounded-full bg-brand-bright/5 blur-3xl"></div>
      <div class="absolute -left-10 -bottom-10 w-40 h-40 rounded-full bg-gold-bright/5 blur-3xl"></div>

      <div class="relative max-w-4xl mx-auto px-4 py-8 md:py-12 text-center">
        <div class="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-brand-bright/10 border border-brand-bright/20 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 text-brand-bright">
            <path fill-rule="evenodd" d="M15.75 4.5a3 3 0 1 1 .825 2.066l-8.421 4.679a3.002 3.002 0 0 1 0 1.51l8.421 4.679a3 3 0 1 1-.729 1.31l-8.421-4.678a3 3 0 1 1 0-4.132l8.421-4.679a3 3 0 0 1-.096-.755Z" clip-rule="evenodd" />
          </svg>
        </div>

        <h1 class="text-2xl md:text-4xl font-bold text-foreground mb-2">
          Code Center
        </h1>
        <p class="text-sm md:text-base text-muted-foreground max-w-md mx-auto leading-relaxed">
          Share your betslips, load winning codes, and celebrate together.
        </p>
      </div>
    </div> -->

    <!-- Content -->
    <div class="px-4 py-4 space-y-4 max-w-4xl mx-auto">
      <BookedBetsTab />
    </div>
  </div>
  <MobileFooterV2 />
  <Footer />
</template>
