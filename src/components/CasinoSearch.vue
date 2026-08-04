<script setup>
import { MagnifyingGlassIcon } from "@heroicons/vue/24/outline";
import { useCasinoStore } from "../stores/casino";
import { storeToRefs } from "pinia";

const { searchTerm: term } = storeToRefs(useCasinoStore());
const { setSearchTerm } = useCasinoStore();
const searchTerm = term;

function filterCasino(term) {
  setSearchTerm(term);
}
</script>
<template>
  <div class="w-full relative px-1 sm:px-0">
    <input
      v-model="searchTerm"
      type="search"
      aria-label="Search casino games"
      class="w-full py-2 z-50 dark:text-slate-100 bg-gray-200 dark:bg-white/5 pl-10 pr-3 text-gray-900 rounded-md outline-hidden focus:ring-2 ring-white/10"
      placeholder="Search any game..."
      required
      @keyup="filterCasino(searchTerm)"
    />
    <div class="absolute -top-1 flex items-center justify-between p-3">
      <MagnifyingGlassIcon class="w-5 h-5 dark:text-white" />
    </div>
  </div>
</template>
