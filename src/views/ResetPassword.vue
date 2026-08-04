<script setup>
import NewPassword from "../components/NewPassword.vue";
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
      Reset password
    </h1>
    <p class="mt-1.5 text-sm text-gray-700 dark:text-gray-400">
      Enter your OTP and set a new password
    </p>
    <div class="mt-6">
      <NewPassword />
    </div>
    <p class="mt-5 text-sm text-gray-700 dark:text-gray-400">
      Remember your password?
      <RouterLink class="font-medium text-brand-bright hover:text-brand-bright/80 transition-colors" :to="{ name: 'login' }">Login</RouterLink>
    </p>
  </div>
</template>
