<script setup>
defineProps({
  totalOdds: {
    type: Number,
    default: 0,
  },
});
</script>
<template>
  <div class="flex items-center gap-1.5">
    <span class="text-[0.65rem] font-semibold text-brand-bright">Odds</span>
    <span class="text-[0.75rem] font-bold text-gray-800 dark:text-white/70 tabular-nums">
      {{ totalOdds }}
    </span>
  </div>
</template>
