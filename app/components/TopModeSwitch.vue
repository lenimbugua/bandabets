<script setup>
import { useAppMode } from "@/composables/useAppMode";

const {
  currentMode,
  // showSwitch,
  switchTo,
} = useAppMode();
</script>

<template>
  <div
    v-if="false"
    class="inline-flex items-center bg-card border border-border rounded-full p-0.5 text-xs font-semibold select-none"
    role="tablist"
    aria-label="Section mode"
  >
    <button
      type="button"
      role="tab"
      :aria-selected="currentMode === 'casino'"
      class="px-2.5 py-1 rounded-full transition-colors"
      :class="
        currentMode === 'casino'
          ? 'bg-gold text-gold-foreground'
          : 'text-muted-foreground hover:text-foreground'
      "
      @click="switchTo('casino')"
    >
      Casino
    </button>
    <button
      type="button"
      role="tab"
      :aria-selected="currentMode === 'sports'"
      class="px-2.5 py-1 rounded-full transition-colors"
      :class="
        currentMode === 'sports'
          ? 'bg-gold text-gold-foreground'
          : 'text-muted-foreground hover:text-foreground'
      "
      @click="switchTo('sports')"
    >
      Sports
    </button>
  </div>
</template>
