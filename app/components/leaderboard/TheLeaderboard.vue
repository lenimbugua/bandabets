<script setup>
import { useLeaderboardStore } from "@/stores/leaderboard";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/vue";
import { TrophyIcon, PuzzlePieceIcon } from "@heroicons/vue/24/outline";
import { ref, toRefs } from "vue";
import EligibleCasinoGame from "./EligibleCasinoGame.vue";

const { isSelected, categories } = toRefs(useLeaderboardStore());

const casinoTabs = ref([
  { name: "Leaderboard", icon: TrophyIcon },
  { name: "Eligible Games", icon: PuzzlePieceIcon },
]);

const selectedCasinoTab = ref(casinoTabs.value[0].name);
const isSelectedCasinoTab = (tab) => selectedCasinoTab.value === tab;
const setSelectedCasinoTab = (tab) => (selectedCasinoTab.value = tab);
</script>

<template>
  <div class="bg-card rounded-xl overflow-hidden border border-border/50">
    <!-- Sport header -->
    <div
      v-if="isSelected(categories[0])"
      class="flex items-center justify-between px-4 py-3 border-b border-border/50"
    >
      <h2 class="text-base md:text-lg font-bold text-foreground">
        Current Standings
      </h2>
      <span class="text-xs text-muted-foreground font-medium">Sport</span>
    </div>

    <!-- Casino tabs -->
    <TabGroup v-if="isSelected(categories[1])">
      <div class="flex items-center justify-between border-b border-border/50 px-4 py-2">
        <TabList class="flex gap-1">
          <Tab
            v-for="tab in casinoTabs"
            :key="tab.name"
            as="template"
          >
            <button
              :class="[
                'flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors',
                isSelectedCasinoTab(tab.name)
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-accent',
              ]"
              @click="setSelectedCasinoTab(tab.name)"
            >
              <component :is="tab.icon" class="w-3.5 h-3.5" />
              {{ tab.name }}
            </button>
          </Tab>
        </TabList>
        <span class="text-xs text-muted-foreground font-medium">Casino</span>
      </div>

      <TabPanels>
        <TabPanel>
          <LeaderboardTable />
        </TabPanel>
        <TabPanel class="p-3">
          <EligibleCasinoGame />
        </TabPanel>
      </TabPanels>
    </TabGroup>

    <!-- Sport table -->
    <div v-if="isSelected(categories[0])">
      <LeaderboardTable />
    </div>
  </div>
</template>
