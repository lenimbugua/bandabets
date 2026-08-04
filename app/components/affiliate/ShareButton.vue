<script setup>
import { useModalTypes } from "@/composables/useModalTypes";
import { useModalStore } from "@/stores/modal";
import { ShareIcon } from "@heroicons/vue/20/solid";

const { openModal } = useModalStore();
const { socialIconsModal } = useModalTypes();
</script>

<template>
  <div class="fixed bottom-24 md:bottom-6 left-1/2 -translate-x-1/2 z-40">
    <button
      class="flex items-center gap-2 bg-primary text-primary-foreground font-semibold text-sm rounded-full px-6 py-3 shadow-lg hover:bg-primary/90 active:scale-95 transition-all duration-150"
      @click="openModal(socialIconsModal)"
    >
      <ShareIcon class="w-4 h-4" />
      Share With Friends
    </button>
  </div>
</template>
