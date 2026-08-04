<template>
  <div
    class="bg-background p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
  >
    <div class="mb-4">
      <slot name="icon"></slot>
    </div>
    <h3 class="text-2xl font-semibold mb-2 w-full">{{ title }}</h3>
    <p class="text-gray-300">{{ description }}</p>
  </div>
</template>

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
});
</script>

<style scoped>
/* Add any custom styles here if needed */
</style>
