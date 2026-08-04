<script setup>
import { ref } from "vue";
const markets = ref([
  {
    sub_type_id: "1X2",
    odd_type: "1X2",
  },
  {
    sub_type_id: "GG",
    odd_type: "GG/NG",
  },
  {
    sub_type_id: "TG15",
    odd_type: "OV/UN 1.5",
  },
  {
    sub_type_id: "DC",
    odd_type: "Double Chance",
  },
  {
    sub_type_id: "TG35",
    odd_type: "OV/UN 3.5",
  },
  {
    sub_type_id: "TG25",
    odd_type: "OV/UN 2.5",
  },
  {
    sub_type_id: "1X2OU15",
    odd_type: "1X2 and OV/UN 1.5",
  },
  {
    sub_type_id: "1X2OU25",
    odd_type: "1X2 and OV/UN 2.5",
  },
  {
    sub_type_id: "1X2OU35",
    odd_type: "1X2 and OV/UN 3.5",
  },
  {
    sub_type_id: "1X2OU45",
    odd_type: "1X2 and OV/UN 4.5",
  },
  {
    sub_type_id: "1X2OU55",
    odd_type: "1X2 and OV/UN 5.5",
  },
  {
    sub_type_id: "CS",
    odd_type: "Correct Score",
  },
  {
    sub_type_id: "HS",
    odd_type: "Half-Time",
  },
  {
    sub_type_id: "DCH",
    odd_type: "Double Chance (H/T)",
  },
  {
    sub_type_id: "H1X2",
    odd_type: "Half-Time Result",
  },
  {
    sub_type_id: "TG",
    odd_type: "Total Goals",
  },
  {
    sub_type_id: "TGOE",
    odd_type: "Total Goals Odd/Even",
  },
  {
    sub_type_id: "TFG",
    odd_type: "Time of First Goal",
  },
  {
    sub_type_id: "T2OU15",
    odd_type: "Team 2 Over/Under 1.5",
  },
  {
    sub_type_id: "T2G",
    odd_type: "Team 2 Goal/No Goal",
  },
  {
    sub_type_id: "T1OU15",
    odd_type: "Team 1 Over/Under 1.5",
  },
  {
    sub_type_id: "T1G",
    odd_type: "Team 1 Goal/No Goal",
  },
  {
    sub_type_id: "MG",
    odd_type: "Multi-Goals",
  },
  {
    sub_type_id: "HX2",
    odd_type: "Handicap -2",
  },
  {
    sub_type_id: "HX1",
    odd_type: "Handicap -1",
  },
  {
    sub_type_id: "HGG",
    odd_type: "Goal:Goal Half Time",
  },
  {
    sub_type_id: "FTS",
    odd_type: "First Team to Score",
  },
  {
    sub_type_id: "DR",
    odd_type: "Half Time / Full Time",
  },
  {
    sub_type_id: "1X2G",
    odd_type: "1X2&NG",
  },
]);
</script>
<template>
  <div class="flex overflow-scroll scrollbar-hide gap-1">
    <div
      v-for="market in markets"
      :key="market.sub_type_id"
      class="bg-gray-50 dark:bg-surface-active text-xs text-gray-600 h-6 dark:text-slate-400 whitespace-nowrap text-center flex items-center px-2 rounded-md shadow-xs border border-gray-200 dark:border-transparent"
    >
      {{ market.odd_type }}
    </div>
  </div>
</template>
