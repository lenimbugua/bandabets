<script setup>
defineProps({
  icon: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  isNew: {
    type: Boolean,
    required: true,
  },
});
</script>

<template>
  <div class="cursor-pointer overflow-clip">
    <div>
      <div
        class="w-10 h-10 flex flex-col items-center rounded-lg bg-gray-100 dark:bg-white/6 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors overflow-clip"
      >
        <div class="relative flex items-center rounded-full h-full w-full">
          <img
            :src="icon"
            class="inset-0 h-full w-full absolute object-cover rounded-lg"
            :alt="name || 'Game icon'"
            loading="lazy"
          />
          <span v-if="isNew" class="block absolute right-0 top-0 p-0.5 px-1 rounded-bl-lg bg-red-500 text-[0.4rem] font-bold leading-none text-white">NEW</span>
        </div>
      </div>
      <div
        class="text-xs font-medium mt-1 w-12  text-ellipsis whitespace-nowrap overflow-hidden text-gray-700 dark:text-white/60"
      >
        {{ name }}
      </div>
    </div>
  </div>
</template>
