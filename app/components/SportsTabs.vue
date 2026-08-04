<script setup>
import { useScrollToSelected } from "@/composables/useScrollToSelectedSport";
import { useSports } from "@/composables/useSports";
import { Tab, TabGroup, TabList } from "@headlessui/vue";
import { toRefs } from "vue";
import { useSportsStore } from "../stores/sports";
import { useSportsNavigationStore } from "../stores/sports-navigation";
import SportsIcons from "./SportsIcons.vue";


const { selectedSportId } = toRefs(useSportsNavigationStore());
const { setSelectedSportId } = useSportsNavigationStore();
const { elementRefs: sportRefs } = useScrollToSelected(selectedSportId);

const { setViewToDisplay } = useSportsStore();
const { fetchMatches, games } = useSports();



const getMatches = (sportId, name, icon, goToSports) => {
  setViewToDisplay("sport");
  setSelectedSportId(sportId);
  fetchMatches(sportId, name, icon, goToSports);
};
const isSelected = (id) => {
  return selectedSportId.value == id;
};
</script>

<template>
  <TabGroup>
    <!-- w-max, not justify-between: the row scrolls inside SportsFilterBar, and a
         distributed row would squeeze the tabs instead of letting them overflow. -->
    <TabList aria-label="Sports categories" class="flex items-center gap-1.5 w-max">
      <Tab
        v-for="thisSport in games"
        :key="thisSport.id"
        as="template"
        @click="getMatches(thisSport.id, thisSport.name, thisSport.icon, false)"
      >
        <div
          :ref="(el) => (sportRefs[thisSport.id] = el)"
          :class="[
            'cursor-pointer rounded-full border flex flex-row items-center gap-1.5 shrink-0 h-7 px-2.5 text-sm whitespace-nowrap capitalize font-medium transition-all duration-150',
            'focus:outline-hidden',
            isSelected(thisSport.id)
              ? 'bg-brand-bright border-transparent text-primary-foreground font-semibold [&_svg]:text-primary-foreground'
              : 'bg-surface-interactive border-border shadow-sm text-muted-foreground hover:text-foreground hover:shadow-md',
          ]"
        >
          <!-- Icon -->
          <SportsIcons :icon="thisSport.icon" size="h-3.5 w-3.5" />

          <!-- Sport name -->
          <span class="text-[11px] leading-none">{{ thisSport.name }}</span>
        </div>
      </Tab>
    </TabList>
  </TabGroup>
</template>
