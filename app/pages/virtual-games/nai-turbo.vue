<script setup>
// See app/components/kiron/KironLiteEmbed.vue for the shared body and full
// porting notes. Baseline route was top-level -> layout: false.
import KironLiteEmbed from "@/components/kiron/KironLiteEmbed.vue";

definePageMeta({
  name: "pari-turbo",
  requiresAuth: true,
  layout: false,
});

useSeoHead({
  title: "Pari Turbo | Fast Virtual Betting | Bandabets",
  description:
    "Experience Pari Turbo – fast, exciting virtual betting rounds with quick results on Bandabets Kenya.",
  robots: "noindex,nofollow",
});
</script>

<template>
  <KironLiteEmbed />
</template>
