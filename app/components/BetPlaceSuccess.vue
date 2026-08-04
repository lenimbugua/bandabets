<script setup>
import { useModalStore } from "@/stores/modal";
import { XMarkIcon } from "@heroicons/vue/24/solid";
const { closeModal } = useModalStore();
</script>
<template>
  <div class="relative">
    <!-- Close button -->
    <button
      class="absolute top-0 right-0 p-1.5 rounded-full text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors z-10"
      @click="closeModal"
    >
      <XMarkIcon class="w-5 h-5" />
    </button>

    <!-- Green checkmark — overlapping top of card -->
    <div class="flex justify-center -mt-12 mb-3">
      <div class="rounded-full bg-white dark:bg-card p-1.5 shadow-lg">
        <div class="w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-[0_0_20px_oklch(55%_0.2_145/0.4)]">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-9 h-9 text-white">
            <path fill-rule="evenodd" d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z" clip-rule="evenodd" />
          </svg>
        </div>
      </div>
    </div>

    <!-- Title -->
    <h3 class="text-xl font-bold text-center text-gray-900 dark:text-white mb-4">
      Successful!
    </h3>

    <!-- Bet details -->
    <BetPlaced />
  </div>
</template>
