<script setup>
</script>

<template>
  <div class="grid grid-cols-2 gap-3">
    <RouterLink
      :to="{ name: 'deposit' }"
      class="flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-bold text-primary-foreground bg-brand-bright hover:bg-brand-bright/90 shadow-sm shadow-brand-bright/20 transition-all"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4">
        <path fill-rule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-11.25a.75.75 0 0 0-1.5 0v2.5h-2.5a.75.75 0 0 0 0 1.5h2.5v2.5a.75.75 0 0 0 1.5 0v-2.5h2.5a.75.75 0 0 0 0-1.5h-2.5v-2.5Z" clip-rule="evenodd" />
      </svg>
      Deposit
    </RouterLink>
    <RouterLink
      :to="{ name: 'withdraw' }"
      class="flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-bold text-gray-700 dark:text-white bg-white dark:bg-white/5 border border-gray-200/80 dark:border-white/6 hover:bg-gray-50 dark:hover:bg-white/8 shadow-sm dark:shadow-none transition-all"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4">
        <path fill-rule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM6.75 9.25a.75.75 0 0 0 0 1.5h6.5a.75.75 0 0 0 0-1.5h-6.5Z" clip-rule="evenodd" />
      </svg>
      Withdraw
    </RouterLink>
  </div>
</template>
