<script setup>
definePageMeta({
  name: "login",
  layout: "auth",
});

useSeoHead({
  title: "Login to Naibet | Access Your Account",
  description:
    "Log in to your Naibet account to continue betting, view your balance, and enjoy personalized promotions.",
  robots: "noindex,nofollow",
});
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
      Welcome back
    </h1>
    <p class="mt-1.5 text-sm text-gray-700 dark:text-gray-400">
      Sign in to your account
    </p>
    <div class="mt-6">
      <TheLogin />
    </div>
  </div>
</template>
