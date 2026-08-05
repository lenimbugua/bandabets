<script setup>
// Ported from src/views/HakiLeague.vue. Was NEVER registered in Phase 1 at
// all (no placeholder, no routeRule) — /virtual-league 404'd until now.
// Baseline route was top-level -> layout: false. requiresAuth carried true
// in the baseline and is absent from phase2RequiresAuthNames, so it's set
// directly here (plan §F.2 "requiresAuth — set explicitly").
//
// Dropped `lang="ts"` from the original <script setup lang="ts"> — no
// TypeScript in this JS-only project (components.json -> typescript:
// false), same as every other Batch F/E file that carried it.
import ChatContainer from "@/components/haki-league/chat/ChatContainer.vue";
import CompetitionDesktop from "@/components/haki-league/CompetitionDesktop.vue";
import FooterNav from "@/components/haki-league/FooterNav.vue";
// import HakiLeagueBetslip from "@/components/haki-league/HakiLeagueBetslip.vue";
// import LeagueSidePanel from "@/components/haki-league/LeagueSidePanel.vue";
import TheMarkets from "@/components/haki-league/TheMarkets.vue";
import ThePeriods from "@/components/haki-league/ThePeriods.vue";
import ThreeOrLessOutcomes from "@/components/haki-league/ThreeOrLessOutcomes.vue";

definePageMeta({
  name: "virtual-league",
  requiresAuth: true,
  layout: false,
});

useSeoHead({
  title: "Virtual League | Bet on Simulated Matches | Bandabets",
  description:
    "Enjoy nonstop virtual football leagues and tournaments with instant results and fast payouts.",
  robots: "noindex,nofollow",
});
</script>

<template>
  <h1 class="sr-only">Haki League – Virtual Football Betting | Bandabets</h1>
  <HeaderLinks />
  <div class="flex justify-between max-w-[1680px] mx-auto">
      <CompetitionDesktop />
      <div
      class="max-w-3xl relative h-[calc(100vh-6rem)] overflow-y-scroll scrollbar-hide flex flex-col grow bg-white dark:bg-background shadow-sm border dark:border-black/15"
      >
      <div class="flex flex-col gap-2">
          <ThePeriods />
          <TheMarkets />
      </div>
      <ThreeOrLessOutcomes />
      <div class="sticky bottom-0">
        <FooterNav />
      </div>
    </div>
    <ChatContainer />
    <!-- <HakiLeagueBetslip /> -->
    <!-- <LeagueSidePanel /> -->
  </div>
  <Footer />
</template>
