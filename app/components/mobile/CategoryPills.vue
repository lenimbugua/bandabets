<script setup>
import { useHeaderTabs } from "@/composables/useMainNav";

defineProps({
  sticky: { type: Boolean, default: true },
});

// Desktop (lg+) renders its own nav inside the header — see HeaderNavLinks.vue
const { tabs, isActive, handleClick } = useHeaderTabs();
</script>

<template>
  <div
    class="z-50 bg-surface-elevated border-b border-border lg:hidden"
    :class="sticky ? 'sticky top-22 md:top-14' : ''"
  >
    <nav
      aria-label="Main categories"
      class="flex gap-5 overflow-x-auto scrollbar-hide w-full max-w-[1680px] mx-auto px-4"
    >
      <button
        v-for="tab in tabs"
        :key="tab.name"
        type="button"
        class="relative shrink-0 py-3 text-sm font-bold whitespace-nowrap transition-colors duration-150"
        :class="isActive(tab)
          ? 'text-brand-bright'
          : 'text-foreground hover:text-brand-bright'"
        @click="handleClick(tab)"
      >
        {{ tab.displayName }}
        <span
          v-if="isActive(tab)"
          class="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-brand-bright"
          aria-hidden="true"
        ></span>
      </button>
    </nav>
  </div>
</template>
