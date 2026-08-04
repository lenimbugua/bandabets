<script setup>
// No src/views file for verify-account — VerifyAccount.vue already lives
// under app/components/ (moved there in Phase 1). Thin wrapper page; the
// component has no other importer (grep verified).
definePageMeta({
  name: "verify-account",
  layout: "auth",
});

useSeoHead({
  title: "Verify Account | Naibet Kenya",
  description:
    "Complete your Naibet verification to enable withdrawals, bonuses, and secure transactions.",
  robots: "noindex,nofollow",
});
</script>

<template>
  <VerifyAccount />
</template>
