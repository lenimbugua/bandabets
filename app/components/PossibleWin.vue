<script setup>
import { ref } from "vue";
import formatStuff from "../utilities/format-stuff";
const { formattedNumber } = formatStuff();

defineProps({
  totalOdds: {
    type: Number,
    default: 0,
  },
  possibleWin: {
    type: Number,
    default: 0,
  },
  stake: {
    type: Number,
    default: 0,
  },
});

const showTax = ref(false);
</script>
<template>
  <div
    class="flex items-center justify-between cursor-pointer"
    role="button"
    aria-label="Toggle tax details"
    tabindex="0"
    @click="showTax = !showTax"
  >
    <span class="text-[0.7rem] font-semibold text-brand-bright">
      Potential Win
    </span>
    <div class="flex items-center gap-1">
      <span class="text-[0.85rem] font-black text-gray-900 dark:text-white">
        {{ formattedNumber(possibleWin) }}
      </span>
      <span class="text-[0.6rem] text-gray-400 dark:text-white/30">KES</span>
    </div>
  </div>
</template>
