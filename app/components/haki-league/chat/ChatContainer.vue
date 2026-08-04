<script setup lang="ts">
import ChatAvatar from "./ChatAvatar.vue";
import ChatInput from "./ChatInput.vue";
import ChatLikes from "./ChatLikes.vue";
import ChatTopBar from "./ChatTopBar.vue";
</script>

<template>
  <div
    class="h-full overflow-y-scroll flex flex-col shadow-2xl border border-black/10 dark:border-white/10 rounded-lg overflow-clip w-full"
  >
    <ChatTopBar />
    <div
      class="grow overflow-y-scroll scrollbar-hide px-2 py-4 flex flex-col gap-2  bg-gray-100 dark:bg-surface-sunken"
    >
      <div
        v-for="i in 10"
        :key="i"
        class="flex items-center justify-between gap-3"
      >
        <div class="flex gap-1 items-end">
          <ChatAvatar />
          <ChatBox />
        </div>
        <ChatLikes />
      </div>
    </div>
    <div class="sticky bottom-0"><ChatInput /></div>
  </div>
</template>
