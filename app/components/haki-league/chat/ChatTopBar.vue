<script setup lang="ts">
import { XMarkIcon } from "@heroicons/vue/24/solid";
import { useChatsStore } from "@/stores/chats";
const { setDisplayChat } = useChatsStore();
</script>

<template>
  <div
    class="sticky flex justify-center bg-gray-100 dark:bg-surface-sunken items-center top-0 shadow-sm py-1.5"
  >
    <!-- <InformationCircleIcon class="h-6 w-6" /> -->
    <div class="w-full flex items-center justify-between text-red-600">
      <span class="relative flex size-2">
        <!-- <span
          class="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"
        ></span> -->
        <!-- <span
          class="relative inline-flex size-2 rounded-full bg-red-500"
        ></span> -->
      </span>
      <span>124</span>
      <button aria-label="Close chat" @click="setDisplayChat(false)">
        <XMarkIcon class="h-4 w-6 text-slate-500 dark:text-slate-400" />
      </button>
    </div>
  </div>
</template>
