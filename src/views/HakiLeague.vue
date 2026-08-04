<script setup lang="ts">
import ChatContainer from "../components/haki-league/chat/ChatContainer.vue";
import CompetitionDesktop from "../components/haki-league/CompetitionDesktop.vue";
import FooterNav from "../components/haki-league/FooterNav.vue";
// import HakiLeagueBetslip from "../components/haki-league/HakiLeagueBetslip.vue";
// import LeagueSidePanel from "../components/haki-league/LeagueSidePanel.vue";
import TheMarkets from "../components/haki-league/TheMarkets.vue";
import ThePeriods from "../components/haki-league/ThePeriods.vue";
import ThreeOrLessOutcomes from "../components/haki-league/ThreeOrLessOutcomes.vue";
</script>

<template>
  <h1 class="sr-only">Haki League – Virtual Football Betting | Naibet</h1>
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
