<script setup>
import { useCompetionsStore } from "@/stores/competitions";
import { useCountriesStore } from "@/stores/countries";
import { useSportsQueryParamsStore } from "@/stores/sports-query-params";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/vue/24/outline";
import { computed, onBeforeUnmount, onMounted, toRefs } from "vue";
import { useRoute, useRouter } from "vue-router";
import TableLoader from "./TableLoader.vue";

import { useScrollToViewedMatch } from "../composables/useScrollToViewedMatch";

const route = useRoute();

const { fetchCountries } = useCountriesStore();
const { countries, pending } = toRefs(useCountriesStore());
const { selectedCompetitions } = toRefs(useCompetionsStore());
const { fetchCompetions, selectCompetitions } = useCompetionsStore();
const { setLayout, setDay } = useSportsQueryParamsStore();

fetchCountries();

const router = useRouter();

const showMatches = computed(() => {
  return Object.keys(route.query).length > 0;
});

// Toggle all competitions for a country
const toggleCountry = (country) => {
  const allIds = country.competitions.map((c) => c.competitionId);
  const allSelected = allIds.every((id) =>
    selectedCompetitions.value.includes(id)
  );

  if (allSelected) {
    selectedCompetitions.value = selectedCompetitions.value.filter(
      (id) => !allIds.includes(id)
    );
  } else {
    selectedCompetitions.value = [
      ...new Set([...selectedCompetitions.value, ...allIds]),
    ];
  }
};

// Check if country is fully selected
const isCountryFullySelected = (country) =>
  country.competitions.every((c) =>
    selectedCompetitions.value.includes(c.competitionId)
  );

// Check if country is partially selected
const isCountryPartiallySelected = (country) => {
  const selectedCount = country.competitions.filter((c) =>
    selectedCompetitions.value.includes(c.competitionId)
  ).length;
  return selectedCount > 0 && selectedCount < country.competitions.length;
};

const clear = () => {
  selectedCompetitions.value = [];
};

const fetchCompetitions = () => {
  setLayout("grid");
  setDay("");

  selectCompetitions(selectedCompetitions.value);
  router.replace({
    query: {
      competitionIds: selectedCompetitions.value.join(","),
    },
  });
  showMatches.value = true;
  fetchCompetions();
};

onBeforeUnmount(() => {
  selectCompetitions([]);
  clear();
});

onMounted(async () => {
  const { scrollToViewedMatch } = useScrollToViewedMatch();
  await scrollToViewedMatch();
});
</script>

<template>
  <!-- Country selection view -->
  <div v-if="!showMatches">
    <TableLoader v-if="pending" />
    <div v-else>
      <!-- Sticky breadcrumb + actions -->
      <div class="sticky top-0 bg-white dark:bg-background z-10">
        <div class="px-3 py-2 border-b border-gray-100 dark:border-white/5">
          <div class="text-sm font-medium text-gray-900 dark:text-white">
            <span class="text-gray-400 dark:text-gray-500">Home / Sports / Soccer /</span> Countries
          </div>
        </div>
        <div class="flex gap-3 px-3 py-2 border-b border-gray-100 dark:border-white/5">
          <button
            class="flex-1 h-9 rounded-lg bg-gray-100 dark:bg-white/5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors cursor-pointer"
            @click="clear"
          >
            Clear
          </button>
          <button
            :disabled="selectedCompetitions.length === 0"
            class="flex-1 h-9 rounded-lg bg-brand-bright text-sm font-medium text-primary-foreground hover:bg-brand-bright/90 transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            @click="fetchCompetitions"
          >
            View Matches ({{ selectedCompetitions.length }})
          </button>
        </div>
      </div>

      <!-- Countries list -->
      <div class="p-2 space-y-1.5">
        <div
          v-for="country in countries"
          :key="country"
          class="rounded-lg bg-white dark:bg-white/3 border border-gray-100 dark:border-white/6 overflow-hidden"
        >
          <!-- Country header -->
          <div
            class="flex items-center justify-between px-3 py-2.5"
            :class="country.isOpened ? 'border-b border-gray-100 dark:border-white/5' : ''"
          >
            <label class="flex items-center gap-2.5 cursor-pointer select-none">
              <input
                type="checkbox"
                :checked="isCountryFullySelected(country)"
                :indeterminate="isCountryPartiallySelected(country)"
                class="w-4 h-4 rounded border-gray-300 dark:border-white/20 text-brand-bright focus:ring-brand-bright/40"
                @change="toggleCountry(country)"
              />
              <span class="text-sm font-medium text-gray-900 dark:text-white">{{ country.countryName }}</span>
            </label>
            <div class="flex items-center gap-2">
              <span class="text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-white/5 px-2 py-0.5 rounded-full">
                {{ country.competitionCount }}
              </span>
              <button
                type="button"
                class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors cursor-pointer"
                :aria-label="country.isOpened ? 'Collapse ' + country.countryName : 'Expand ' + country.countryName"
                @click="country.isOpened = !country.isOpened"
              >
                <ChevronUpIcon v-if="country.isOpened" class="h-4.5 w-4.5" />
                <ChevronDownIcon v-else class="h-4.5 w-4.5" />
              </button>
            </div>
          </div>

          <!-- Competitions list -->
          <div v-if="country.isOpened" class="py-1">
            <div
              v-for="competition in country.competitions"
              :key="competition"
              class="flex items-center justify-between px-3 py-1.5"
            >
              <label class="flex items-center gap-2.5 cursor-pointer">
                <input
                  v-model="selectedCompetitions"
                  type="checkbox"
                  :value="competition.competitionId"
                  class="w-4 h-4 rounded border-gray-300 dark:border-white/20 text-brand-bright focus:ring-brand-bright/40"
                />
                <span class="text-sm text-gray-600 dark:text-gray-400">{{ competition.competitionName }}</span>
              </label>
              <span class="text-xs text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-white/5 px-1.5 py-0.5 rounded-full">
                {{ competition.matchCount }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Matches view -->
  <div v-else>
    <div class="sticky z-2 top-0 bg-white/95 dark:bg-background/95 backdrop-blur-sm">
      <div class="px-3 py-2 flex items-center justify-between gap-2">
        <HighlitsTab />
        <div class="flex items-center gap-2 shrink-0">
          <LeaguesButton />
          <CalendarDropdown />
        </div>
      </div>
      <div class="px-3 pb-2">
        <MarketSection />
      </div>
    </div>
    <InfiniteScroll />
  </div>
</template>
