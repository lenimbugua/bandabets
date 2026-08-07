<script setup>
import { h } from "vue";
import { Icon } from "#components";

// BaseEmptyState (out of scope for this migration batch) renders its `icon`
// prop via `<component :is="icon">`, which requires an actual component
// reference rather than a Tabler name string — wrap the Tabler icon in a
// tiny functional component so the existing dynamic-component contract
// keeps working without touching BaseEmptyState.vue.
const noMatchesIcon = () => h(Icon, { name: "tabler:search" });
</script>

<template>
  <BaseEmptyState
    :icon="noMatchesIcon"
    title="No matches found"
    description="Check back soon or explore what's live right now"
    size="lg"
  >
    <template #action>
      <div class="flex items-center gap-2">
        <RouterLink
          to="/"
          class="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
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
