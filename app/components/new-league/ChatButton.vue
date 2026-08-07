<script setup>
import { useChatsStore } from "@/stores/chats";

const { setDisplayChat } = useChatsStore();
</script>
<template>
  <button aria-label="Open chat" class="flex rounded-md justify-end" @click="setDisplayChat(true)">
    <Icon name="tabler:messages" class="w-6 h-6 text-red-600" />
  </button>
</template>
