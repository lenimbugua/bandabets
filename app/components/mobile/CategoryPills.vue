<script setup>
import { useMainNav } from "@/composables/useMainNav";

defineProps({
  sticky: { type: Boolean, default: true },
});

// Desktop (lg+) renders these same links inside the header — see HeaderNavLinks.vue
const { categories, iconMap, isActive, handleClick, openMenu } = useMainNav();
</script>

<template>
  <div
    class="z-50 py-3 bg-surface-elevated border-b border-border lg:hidden"
    :class="sticky ? 'sticky top-22 md:top-14' : ''"
  >
    <div class="flex gap-1.5 overflow-x-auto scrollbar-hide w-full max-w-[1680px] mx-auto px-4">
      <button
        v-for="cat in categories"
        :key="cat.name"
        class="shrink-0 px-3 py-2 rounded-md text-center font-semibold text-xs transition-all duration-200 whitespace-nowrap"
        :class="isActive(cat)
          ? 'bg-primary text-primary-foreground'
          : 'text-muted-foreground hover:bg-surface-interactive hover:text-foreground'"
        @click="handleClick(cat)"
      >
        <!-- The icon set has mixed aspect ratios (0.83–1.33). A square box would
             letterbox the wide ones, leaving them visibly shorter than the rest.
             Pin the height and let width follow so every glyph sits on one line. -->
        <img
          v-if="iconMap[cat.icon]"
          :src="iconMap[cat.icon]"
          :alt="`${cat.displayName} icon`"
          class="block mx-auto h-5 w-auto max-w-7 mb-1"
        />
        <span class="block font-bold">{{ cat.displayName }}</span>
      </button>

      <button
        type="button"
        class="sticky right-0 ml-auto shrink-0 px-3 py-2 rounded-md text-center font-semibold text-xs whitespace-nowrap bg-surface-elevated text-muted-foreground hover:text-foreground shadow-[-8px_0_8px_-4px_rgba(0,0,0,0.25)]"
        aria-label="Open menu"
        @click="openMenu()"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="block mx-auto w-5 h-5 mb-1">
          <line x1="3" y1="6" x2="21" y2="6"/>
          <line x1="3" y1="12" x2="21" y2="12"/>
          <line x1="3" y1="18" x2="21" y2="18"/>
        </svg>
        <span class="block font-bold">MENU</span>
      </button>
    </div>
  </div>
</template>
