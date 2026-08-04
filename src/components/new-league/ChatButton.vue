<script setup>
import { useChatsStore } from "@/stores/chats";

import { ChatBubbleLeftRightIcon } from "@heroicons/vue/24/solid";
const { setDisplayChat } = useChatsStore();
</script>
<template>
  <button aria-label="Open chat" class="flex rounded-md justify-end" @click="setDisplayChat(true)">
    <ChatBubbleLeftRightIcon class="w-6 h-6 text-red-600" />
  </button>
</template>
