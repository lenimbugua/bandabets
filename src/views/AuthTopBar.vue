<script setup>
</script>
<template>
  <h1 class="sr-only">Account</h1>
  <div class="w-full bg-white/95 dark:bg-background/95 backdrop-blur-sm border-b border-gray-200/80 dark:border-white/6 px-3 py-2.5">
    <div class="flex items-center justify-between max-w-[1680px] mx-auto">
      <RouterLink :to="{ name: 'home' }">
        <TheLogo />
      </RouterLink>
      <ThemeSwitch />
    </div>
  </div>
</template>
