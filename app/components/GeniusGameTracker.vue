<script setup lang="js">
// import { Tab, TabGroup, TabList } from "@headlessui/vue";
import { useSportsQueryParamsStore } from "@/stores/sports-query-params";
import { onMounted, toRefs } from "vue";
import { useGeniusGameTracker } from "../composables/useGeniusGameTracker";

const { matchId } = toRefs(useSportsQueryParamsStore());



const {
  //   isGeniusScoreBoardSport,
  isGeniusGameTrackerSport,
  //   formScoreBoardUrl,
  formGameTrackerUrl,
  widgets,
  currentTrackerUrl,
} = useGeniusGameTracker(matchId.value);

onMounted(() => {
  formGameTrackerUrl(widgets[0]);
});
</script>
<template>
  <div v-if="isGeniusGameTrackerSport() && currentTrackerUrl" class="">
    <iframe
      id="gsm-game-tracker"
      class="w-full min-h-[250px] overflow-hidden"
      :src="currentTrackerUrl"
      allow="fullscreen; autoplay; encrypted-media"
      allowfullscreen
    ></iframe>
  </div>
  <!-- <TabGroup>
    <TabList class="flex justify-between rounded-md p-0.5 py-2.5">
      <Tab
        v-for="widget in widgets"
        :key="widget"
        v-slot="{ selected }"
        as="template"
        @click="formGameTrackerUrl(widget)"
      >
        <div
          :class="[
            'cursor-pointer   py-0 px-1 text-xs whitespace-nowrap text-center uppercase font-medium',
            ' focus:outline-hidden',
            selected
              ? 'border-b-2 border-brand-mid text-brand-mid font-semibold'
              : 'dark:text-gray-300 text-gray-800',
          ]"
        >
          {{ widget }}
        </div>
      </Tab>
    </TabList>
  </TabGroup> -->
</template>
