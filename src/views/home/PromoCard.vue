<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div
    class="rounded-md bg-white/10 border-none shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 max-w-xs mx-auto"
  >
    <div>
      <div
        class="w-10 h-10 bg-purple-900 rounded-full flex items-center justify-center mb-4"
      >
        <div class="w-8 h-8 text-yellow-300">
          <slot name="icon"></slot>
        </div>
      </div>
      <div class="pb-4 text-2xl font-bold text-white">{{ title }}</div>
    </div>
    <div>
      <p class="text-gray-200 mb-4">{{ description }}</p>
      <div class="bg-purple-900 p-2 rounded text-center mb-4">
        <span class="text-yellow-300 font-bold"> {{ code }}</span>
      </div>
    </div>
    <div>
      <button
        class="p-2 w-full bg-yellow-400 hover:bg-yellow-500 text-purple-900 font-bold"
      >
        Claim Now
      </button>
    </div>
  </div>
</template>
