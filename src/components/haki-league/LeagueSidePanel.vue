<script setup>
import { Tab, TabGroup, TabList } from "@headlessui/vue";
// import { useLeagueStore } from "../stores/league";

// const { competitionIsLoading, status, liveTimerElapsedSeconds } = storeToRefs(
//   useLeagueStore()
// );

const tabs = ["results", "standings", "My Bets"];
</script>

<template>
  <ThePanel class="w-84 max-h-[calc(100vh-90px)]">
    <!-- <LiveAnimatePulse v-if="competitionIsLoading" /> -->

      <TabGroup>
        <TabList aria-label="League side panel navigation" class="flex rounded-t-md overflow-clip">
          <Tab
            v-for="tab in tabs"
            :key="tab"
            v-slot="{ selected }"
            as="template"
          >
            <button
              class="bg-secondary font-extrabold px-2 w-full whitespace-nowrap hover:bg-opacity-50 capitalize py-2.5 text-sm border-x border-black/20 dark:border-black/40 first:border-l-0 last:border-r-0 focus:outline-hidden"
              :class="[selected ? 'text-accent-500' : 'text-white/80']"
            >
              {{ tab }}
            </button>
          </Tab>
        </TabList>
        <!-- <TabPanels
          class="max-h-[calc(100vh-170px)] overflow-y-scroll scrollbar-hide"
        >
          <TabPanel class="focus:outline-hidden">
            <TheLive v-if="status == 'LIVE' || status == 'ENDED'" />
            <div v-else class="bg-pattern">
              <TheCountDown />
            </div>
          </TabPanel>
          <TabPanel class="focus:outline-hidden">
            <TheResults />
          </TabPanel>
          <TabPanel class="bg-pattern bg-pattern focus:outline-hidden">
            <TheStandings />
          </TabPanel>
        </TabPanels> -->
      </TabGroup>
  </ThePanel>
</template>
