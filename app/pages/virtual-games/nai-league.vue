<script setup>
// See app/components/kiron/KironLiteEmbed.vue for the shared body and full
// porting notes (this view backs three routes, dispatching purely on
// route.name — plan §F.3). Baseline route was top-level -> layout: false.
// requiresAuth carried true in the baseline and used to come from
// phase2RequiresAuthNames while this was a placeholder; now set directly,
// same pattern as my-bets/bet-details in Batch E.
import KironLiteEmbed from "@/components/kiron/KironLiteEmbed.vue";

definePageMeta({
  name: "pari-league",
  requiresAuth: true,
  layout: false,
});

useSeoHead({
  title: "Pari League | Virtual Football Betting | Bandabets",
  description:
    "Play Pari League virtual football and enjoy realistic matches, live stats, and instant payouts.",
  robots: "noindex,nofollow",
});
</script>

<template>
  <KironLiteEmbed />
</template>
