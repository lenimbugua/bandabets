<script setup>
import { MagnifyingGlassIcon } from "@heroicons/vue/24/outline";
</script>

<template>
  <BaseEmptyState
    :icon="MagnifyingGlassIcon"
    title="No matches found"
    description="Check back soon or explore what's live right now"
    size="lg"
  >
    <template #action>
      <div class="flex items-center gap-2">
        <RouterLink
          to="/"
          class="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors"
        >
          Browse matches
        </RouterLink>
        <RouterLink
          to="/sports/live/soccer"
          class="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg border border-gray-200 dark:border-white/10 text-gray-600 dark:text-white/60 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
        >
          Live now
        </RouterLink>
      </div>
    </template>
  </BaseEmptyState>
</template>
