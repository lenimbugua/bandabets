<script setup>
// ShareAnIdea never lived under src/ — it was already a component at
// app/components/ShareAnIdea.vue in Phase 1. Baseline route
// "/share-feedback" is top-level and public (requiresAuth: false); ship
// client-only since the component's own submit flow is client-driven.
//
// KNOWN PRE-EXISTING MISMATCH (predates this migration, not fixed here):
// app/stores/feedback.js's sendFeedback() sends Authorization +
// X-PROFILE-SID from the login store even though this route has no auth
// gate, so an anonymous submit fails. Flagged per plan §8, not silently
// patched.
definePageMeta({
  name: "share-feedback",
  layout: false,
});

useSeoHead({
  title: "Share Feedback | Suggest Features | Bandabets",
  description:
    "We value your input! Share ideas and feedback to help us improve your Bandabets experience.",
  robots: "noindex,nofollow",
});
</script>

<template>
  <ShareAnIdea />
</template>
