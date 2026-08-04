<script setup>
import { useMainNav } from "@/composables/useMainNav";

const { categories, iconMap, isActive, handleClick } = useMainNav();

// No HOME here — the logo to the left of this nav already routes home.
// The mobile pill bar keeps it, since it has no logo alongside it.
const links = categories.filter((cat) => cat.name !== "Home");
</script>

<template>
  <nav
    aria-label="Main navigation"
    class="flex-1 min-w-0 flex overflow-x-auto scrollbar-hide"
  >
    <!-- mx-auto rather than justify-center: a centred flex row clips its leading
         items once it overflows, whereas auto margins collapse and scroll cleanly. -->
    <div class="flex items-stretch gap-0.5 mx-auto">
      <button
        v-for="cat in links"
        :key="cat.name"
        type="button"
        :aria-current="isActive(cat) ? 'page' : undefined"
        class="group relative shrink-0 px-1.5 xl:px-2.5 h-16 flex flex-row items-center gap-1.5 text-label-sm font-bold uppercase tracking-wide whitespace-nowrap transition-colors duration-150"
        :class="isActive(cat)
          ? 'text-foreground'
          : 'text-muted-foreground hover:text-foreground'"
        @click="handleClick(cat)"
      >
        <!-- The icon set has mixed aspect ratios (0.83–1.33). A square box would
             letterbox the wide ones, leaving them visibly shorter than the rest.
             Pin the height and let width follow so every glyph sits on one line. -->
        <img
          v-if="iconMap[cat.icon]"
          :src="iconMap[cat.icon]"
          :alt="`${cat.displayName} icon`"
          class="block h-5 w-auto max-w-7 shrink-0 transition-opacity duration-150"
          :class="isActive(cat) ? 'opacity-100' : 'opacity-70 group-hover:opacity-100'"
        />
        <span class="block leading-none">{{ cat.displayName }}</span>
        <span
          v-if="isActive(cat)"
          class="absolute inset-x-1 bottom-0 h-0.5 rounded-full bg-primary"
        ></span>
      </button>
    </div>
  </nav>
</template>
