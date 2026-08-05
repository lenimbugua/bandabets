<script setup>
// See app/components/community-bets/ShareBetsPage.vue for the shared body
// and full porting notes. This file backs /share-bets/:code. Nuxt derives
// the route name "share-bets-code" from this filename, which is fine —
// the only consumer of the :code form (useShareToSocials.js) builds a
// plain string URL and never resolves by name.
import ShareBetsPage from "@/components/community-bets/ShareBetsPage.vue";

definePageMeta({
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
