<script setup>
// See app/components/kiron/KironLiteEmbed.vue for the shared body and full
// porting notes. Baseline route was top-level -> layout: false.
import KironLiteEmbed from "@/components/kiron/KironLiteEmbed.vue";

definePageMeta({
  name: "pari-virtual-jackpot",
  requiresAuth: true,
  layout: false,
});

useSeoHead({
  title: "Pari Virtual Jackpot | Bet & Win Big | Bandabets",
  description:
    "Join Pari Virtual Jackpot and stand a chance to win massive rewards. Fast results, endless fun!",
  robots: "noindex,nofollow",
});
</script>

<template>
  <KironLiteEmbed />
</template>
