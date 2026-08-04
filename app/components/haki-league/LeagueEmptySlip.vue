<script setup>
import { TicketIcon } from "@heroicons/vue/24/outline";
</script>

<template>
  <div class="h-full flex flex-col items-center bg-white dark:bg-background p-3">
    <BaseEmptyState
      :icon="TicketIcon"
      title="Your betslip is empty!"
      description="Select matches to place bets."
    />
  </div>
</template>
