<script setup>
import { useSportsQueryParamsStore } from "@/stores/sports-query-params";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/vue";
import { useHead } from "@unhead/vue";
import { computed, ref, toRefs } from "vue";
import { onBeforeRouteLeave } from "vue-router";
import { useGeniusGameTracker } from "../composables/useGeniusGameTracker";
import { useIconNames } from "../composables/useIconNames";
import { useMatchesStore } from "../stores/matches";
import BetBuilder from "./BetBuilder.vue";
import { useCompetionsStore } from "@/stores/competitions";
import { ChevronLeftIcon } from "@heroicons/vue/24/outline";
import { useRoute } from "vue-router";
import EmptyState from "./EmptyState.vue";
import AppIcons from "./icons/AppIcons.vue";
import MatchDetails from "./MatchDetails.vue";
import MatchDetailsMatch from "./MatchDetailsMatch.vue";

const route = useRoute();

const matchId = route.params.id;

const { setMatchId } = useSportsQueryParamsStore();
const { selectCompetitions } = useCompetionsStore();
const { isGeniusGameTrackerSport } = useGeniusGameTracker(matchId);

const { betBuilderIcon, solarDocumentTextBroken, statsIcon } = useIconNames();

const prematchTabs = ref([
  {
    name: "Markets",
    alias: "Markets",
    icon: solarDocumentTextBroken,
    isHot: false,
  },
  {
    name: "BetBuilder",
    alias: "Bet Builder",
    icon: betBuilderIcon,
    isHot: true,
  },
  {
    name: "stats",
    alias: "Stats",
    icon: statsIcon,
    isHot: false,
  },
]);

const liveTabs = ref([
  {
    name: "Markets",
    alias: "Markets",
    icon: solarDocumentTextBroken,
    isHot: false,
  },
  {
    name: "stats",
    alias: "Stats",
    icon: statsIcon,
    isHot: false,
  },
]);

const { matchDetails, matchDetailIsLive, pending } = toRefs(useMatchesStore());

const { pollMatchDetails, fetchMatchDetails } = useMatchesStore();

useHead({
  script: [
    {
      type: "application/ld+json",
      key: "match-details-schema",
      children: computed(() => {
        const m = matchDetails.value;
        if (!m) return "{}";
        const baseUrl = "https://naibet.com";
        const slug = m.homeTeam && m.awayTeam
          ? `${m.homeTeam} vs ${m.awayTeam}`
          : "Sports Match";
        return JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SportsEvent",
          name: slug,
          url: `${baseUrl}${route.path}`,
          eventStatus: m.isLiveCoverage
            ? "https://schema.org/EventInProgress"
            : "https://schema.org/EventScheduled",
          startDate: m.startTime ?? new Date().toISOString(),
          competitor: [
            { "@type": "SportsTeam", name: m.homeTeam ?? "Home Team" },
            { "@type": "SportsTeam", name: m.awayTeam ?? "Away Team" },
          ],
          organizer: {
            "@type": "Organization",
            name: "Naibet",
            url: baseUrl,
          },
        });
      }),
    },
  ],
});

function performInitialFetch() {
  if (matchDetailIsLive.value) {
    pollMatchDetails(matchId);
    return;
  }
  console.log(matchId);
  fetchMatchDetails(matchId);
}

performInitialFetch();

const { public: config } = useRuntimeConfig();
const pollFrequency = parseInt(config.livePollInterval)
  ? parseInt(config.livePollInterval)
  : 10000;

let intervalId = null;

intervalId = setInterval(() => {
  if (matchDetails?.value?.isLiveCoverage) {
    pollMatchDetails(matchId);
  }
}, pollFrequency);

onBeforeRouteLeave(() => {
  setMatchId("");
  clearInterval(intervalId);
  selectCompetitions([]);
});
</script>
<template>
  <AnimatePulse v-if="pending" :rows="10" />
  <div v-else>
    <div
      class="view-match-container w-full mt-2 md:mt-0 overflow-hidden rounded-2xl md:rounded-none"
    >
      <!-- Header bar -->
      <div
        class="sticky top-0 z-60 header-bar"
      >
        <div class="flex items-center justify-between px-4 h-12">
          <button
            aria-label="Go back"
            class="p-2 -ml-2 rounded-xl text-gray-500 dark:text-white/65 hover:bg-gray-100 dark:hover:bg-white/5 transition-all duration-200 cursor-pointer active:scale-95"
            @click="$router.go(-1)"
          >
            <ChevronLeftIcon class="w-5 h-5" />
          </button>
          <span class="text-[0.68rem] font-semibold tracking-[0.1em] uppercase text-gray-500 dark:text-white/65">
            Match Details
          </span>
          <div class="w-9"></div>
        </div>
      </div>

      <div v-if="matchDetails">
        <MatchDetailsMatch :match-details />

        <TabGroup>
          <!-- Tab navigation -->
          <TabList
            aria-label="Match detail tabs"
            class="sticky top-12 md:top-24 lg:top-30 z-60 flex gap-2 mx-3 mt-4 mb-3 overflow-x-auto scrollbar-hide"
          >
            <Tab
              v-for="tab in matchDetails.isLiveCoverage
                ? liveTabs
                : prematchTabs"
              :key="tab.name"
              v-slot="{ selected }"
              as="template"
            >
              <button
                :class="[
                  selected
                    ? 'tab-active bg-brand-bright/10 text-brand-bright font-semibold'
                    : 'tab-idle text-gray-500 dark:text-white/65 hover:text-gray-600 dark:hover:text-white/80',
                ]"
                class="relative flex items-center gap-1.5 px-4 py-2 rounded-xl text-[0.65rem] font-medium tracking-[0.02em] whitespace-nowrap transition-all duration-200 cursor-pointer focus:outline-hidden"
              >
                <AppIcons :icon-name="tab.icon" icon-css="h-3.5 w-3.5 opacity-60" />
                <span>{{ tab.alias }}</span>
                <span
                  v-if="tab.isHot"
                  class="px-1.5 py-0.5 rounded-md bg-gold-bright text-[oklch(15%_0.04_258)] text-[0.4rem] font-bold leading-none uppercase tracking-wider"
                >
                  New
                </span>
              </button>
            </Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <MatchDetails />
            </TabPanel>
            <TabPanel v-if="!matchDetails.isLiveCoverage">
              <BetBuilder />
            </TabPanel>
            <TabPanel>
              <GeniusGameTracker v-if="isGeniusGameTrackerSport()" />
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </div>
      <EmptyState v-else />
    </div>
  </div>
</template>

<style scoped>
.view-match-container {
  background: var(--background);
}
[data-theme="dark"] .view-match-container {
  background: var(--background);
}

.header-bar {
  background: oklch(99% 0.002 258 / 0.95);
  backdrop-filter: blur(12px);
}
[data-theme="dark"] .header-bar {
  background: var(--card);
  backdrop-filter: blur(12px);
}

.tab-idle {
  background: oklch(96% 0.005 258 / 0.6);
  box-shadow: 0 1px 2px oklch(0% 0 0 / 0.04);
}
[data-theme="dark"] .tab-idle {
  background: oklch(100% 0 0 / 0.06);
  box-shadow: 0 1px 2px oklch(0% 0 0 / 0.12);
}
.tab-idle:hover {
  background: oklch(93% 0.005 258 / 0.7);
}
[data-theme="dark"] .tab-idle:hover {
  background: oklch(100% 0 0 / 0.1);
}

.tab-active {
  box-shadow: 0 1px 3px oklch(70% 0.19 142 / 0.1);
}
</style>
