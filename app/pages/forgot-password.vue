<script setup>
// No src/views file for forgot-password — ForgotPassword.vue already lives
// under app/components/ (moved there in Phase 1). Thin wrapper page; the
// component has no other importer (grep verified).
definePageMeta({
  name: "forgot-password",
  layout: "auth",
});

useSeoHead({
  title: "Forgot Password | Naibet Account Recovery",
  description:
    "Reset your Naibet password easily and regain secure access to your betting account in minutes.",
  robots: "noindex,nofollow",
});
</script>

<template>
  <ForgotPassword />
</template>
