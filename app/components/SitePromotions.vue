<script setup>
</script>
<template>
  <div class="w-64 rounded-xl bg-white dark:bg-white/3 border border-gray-200/80 dark:border-white/6 overflow-hidden">
    <div class="px-4 py-2.5 bg-gray-50/80 dark:bg-white/[0.03] border-b border-gray-100 dark:border-white/5">
      <span class="text-sm font-semibold text-gray-900 dark:text-white">Promotions</span>
    </div>
    <div class="p-4 flex flex-col gap-3">
      <RouterLink
        :to="{ name: 'promotions' }"
        class="block p-3 rounded-lg bg-brand-bright/5 dark:bg-brand-bright/10 hover:bg-brand-bright/10 dark:hover:bg-brand-bright/15 transition-colors"
      >
        <span class="text-sm font-medium text-brand-bright">View all promotions</span>
      </RouterLink>
      <RouterLink
        :to="{ name: 'join-affiliate' }"
        class="block p-3 rounded-lg bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
      >
        <div class="text-sm font-medium text-gray-900 dark:text-white">Join Affiliate</div>
        <div class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Earn up to KES 50,000 weekly</div>
      </RouterLink>
    </div>
  </div>
</template>
