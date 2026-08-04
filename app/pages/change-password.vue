<script setup>
// Do NOT add requiresAuth here — app/stores/login.js:121-132 forces an
// UNAUTHENTICATED user to this route on statusCode "06" (forced password
// change). Gating it with requiresAuth would deadlock every account that
// must change its password before it can log in.
definePageMeta({
  name: "change-password",
  layout: "auth",
});

useSeoHead({
  title: "Change Password | Naibet Security Settings",
  description:
    "Update your password for better account security. Protect your funds and data on Naibet Kenya.",
  robots: "noindex,nofollow",
});
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
      Change your password
    </h1>
    <p class="mt-1.5 text-sm text-gray-700 dark:text-gray-400">
      Set a new secure password for your account
    </p>
    <div class="mt-6">
      <NewPassword />
    </div>
  </div>
</template>
