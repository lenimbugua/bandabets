<script setup>
import { useModalTypes } from "@/composables/useModalTypes";

import { useModalStore } from "@/stores/modal";

const { openModal } = useModalStore();

const { festiveModal } = useModalTypes();
</script>
<template>
  <div
    class="max-w-xl fixed bottom-20 z-10 md:bottom-0 left-1/2 transform -translate-x-1/2"
  >
    <div class="mx-auto py-3">
      <button
        class="bg-gold-bright font-bold text-lg rounded-full shadow-3xl p-3 whitespace-nowrap text-amber-950"
        @click="openModal(festiveModal)"
      >
        Share With Friends
      </button>
    </div>
  </div>
</template>
