<script setup>
import { storeToRefs } from "pinia";
import { useAffiliateStore } from "../../stores/affiliate";

const { earnings } = storeToRefs(useAffiliateStore());
</script>

<template>
  <div class="w-full rounded-lg border border-border/50 overflow-hidden">
    <table class="w-full">
      <thead>
        <tr class="bg-accent/50">
          <th class="py-2.5 px-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Week</th>
          <th class="py-2.5 px-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Players</th>
          <th class="py-2.5 px-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Revenue</th>
          <th class="py-2.5 px-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Status</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="payment in earnings?.payments"
          :key="payment.week"
          class="border-t border-border/30 last:border-0 hover:bg-accent/30 transition-colors"
        >
          <td class="py-2.5 px-3 text-sm text-foreground">{{ payment.week }}</td>
          <td class="py-2.5 px-3 text-sm text-foreground tabular-nums">{{ payment.players }}</td>
          <td class="py-2.5 px-3 text-sm font-medium text-foreground tabular-nums">{{ payment.revenue }}</td>
          <td class="py-2.5 px-3 text-sm text-muted-foreground">{{ payment.status }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
