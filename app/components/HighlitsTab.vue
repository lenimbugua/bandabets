<script setup>
import { useCompetionsStore } from "@/stores/competitions";
import { useMatches2Store } from "@/stores/matches2";
import { useSportsQueryParamsStore } from "@/stores/sports-query-params";
import { Tab, TabGroup, TabList } from "@headlessui/vue";
import { ref, toRefs } from "vue";

const { fetchCompetions, selectCompetitions } = useCompetionsStore();

/* Ported from Rada: three tabs, with the resource name used directly as the
   layout value. Countries is no longer a fourth tab — it sits beside these as
   its own chip (LeaguesButton), matching Rada. */
const highlights = ref([
  { name: "highlight" },
  { name: "upcoming" },
  { name: "grid" },
]);

const { setResource, setDay, setLayout } = useSportsQueryParamsStore();
const { layout } = toRefs(useSportsQueryParamsStore());
const { markets } = toRefs(useCompetionsStore());

const { getMatches, emptyMatches, setCalendarIsPending, setMarkets } =
  useMatches2Store();

const fetchCompetitions = async () => {
  selectCompetitions([]);
  await fetchCompetions();
  setMarkets(markets.value);
};

async function fetchMatches(resource) {
  setLayout(resource);
  if (resource === "grid") {
    fetchCompetitions();
    return;
  }
  emptyMatches();
  setDay("");
  setResource(resource);
  setCalendarIsPending(true);
  await getMatches();
  setCalendarIsPending(false);
}

function isSelected(selected) {
  if (layout.value) {
    return selected === layout.value;
  }
  // Default to highlights on first load, so one tab always reads as active.
  return selected === "highlight";
}
</script>

<template>
  <div class="flex items-center justify-between text-sm text-foreground">
    <div class="flex items-center">
      <TabGroup>
        <TabList
          aria-label="Match highlight filters"
          class="flex w-full overflow-x-auto scrollbar-hide"
        >
          <Tab
            v-for="category in highlights"
            :key="category.name"
            as="template"
            @click="fetchMatches(category.name)"
          >
            <button
              :class="[
                'inline-flex h-9 shrink-0 items-center justify-center px-2 sm:px-4',
                // first:pl-0 keeps the leading label flush with the row gutter
                // without reaching outside this component to do it
                'first:pl-0',
                'text-[0.95rem] font-bold whitespace-nowrap capitalize',
                'border-b-2 transition-colors focus:outline-hidden',
                isSelected(category.name)
                  ? 'border-selected text-selected'
                  : 'border-transparent text-foreground hover:text-selected',
              ]"
            >
              <div v-if="category.name === 'grid'">Popular</div>
              <span v-else>{{ category.name }}</span>
            </button>
          </Tab>
        </TabList>
      </TabGroup>
    </div>
  </div>
</template>
