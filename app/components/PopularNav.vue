<script setup>
import { ref } from "vue";
import ArrowRightSolid from "./ArrowRightSolid.vue";
import ThePopular from "./ThePopular.vue";

const categories = ref([
  "English Premier League",
  "Laliga",
  "Serie A",
  "Bundesliga",
  "Ligue 1",
  "Uefa Champions League",
  "Europa League",
  "FA Cup",
  "Copa del Rey",
  "EFL Cup",
]);

const isOpened = ref(false);
</script>
<template>
  <ThePopular v-if="isOpened" />
  <div v-else class="text-text-subtle p-3 h-full">
    <div class="font-bold">Top Leagues</div>
    <div
      v-for="category in categories"
      :key="category"
      class="flex cursor-pointer text-white p-3 text-sm flex-col"
      @click="isOpened = !isOpened"
    >
      <div class="flex justify-between items-center">
        <div>{{ category }}</div>
        <ArrowRightSolid class="h-5 w-5" />
      </div>
    </div>
  </div>
</template>
