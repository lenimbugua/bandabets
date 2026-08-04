<script setup>
import NewLeagueCompetition from "@/components/new-league/NewLeagueCompetition.vue";
import NewLeagueGames from "@/components/new-league/NewLeagueGames.vue";
import NewLeagueMarkets from "@/components/new-league/NewLeagueMarkets.vue";
import NewLeagueThreeOrLessOutcomes from "@/components/new-league/NewLeagueThreeOrLessOutcomes.vue";
import TimeCountDown from "@/components/new-league/TimeCountDown.vue";
import { useChatsStore } from "@/stores/chats";
import { toRefs } from "vue";

const { displayChat } = toRefs(useChatsStore());
</script>
<template>
  <h1 class="sr-only">New League – Virtual Football Betting | Naibet</h1>
  <div
    class="relative h-dvh overflow-y-scroll scrollbar-hide rounded-md overflow-clip"
  >
    <HeaderLinks />
    <div
      v-if="!displayChat"
      class="max-w-md mx-auto border dark:border-black/20 rounded-lg shadow-lg"
    >
      <div>
        <div
          class="flex p-2 mb-1.5 justify-between bg-linear-to-br border-b border-gray-300 dark:border-black/30 from-purple-950 via-background to-red-950"
        >
          <div class="flex flex-col">
            <TimeCountDown />
            <NewLeagueCompetition />
          </div>
          <div class="flex flex-col justify-between">
            <NewLeagueGames />
            <ChatButton />
          </div>
        </div>
        <div class="px-2">
          <NewLeagueMarkets />
        </div>
        <NewLeagueThreeOrLessOutcomes />
        <div class="sticky bottom-0">
          <FooterNav />
        </div>
      </div>
    </div>
    <div class="max-w-md mx-auto">
      <ChatContainer v-if="displayChat" />
    </div>
  </div>
</template>
