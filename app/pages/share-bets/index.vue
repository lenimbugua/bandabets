<script setup>
// See app/components/community-bets/ShareBetsPage.vue for the shared body
// and full porting notes. This file backs bare /share-bets (no code).
// Baseline route was top-level -> layout: false.
import ShareBetsPage from "@/components/community-bets/ShareBetsPage.vue";

definePageMeta({
  name: "share-bets",
  layout: false,
});

useSeoHead({
  title: "Share Bets | Bet Slip Code | Bandabets",
  description:
    "Share your Bandabets bet slip using a unique code. Let friends view or play the same selections easily.",
});
</script>

<template>
  <ShareBetsPage />
</template>
