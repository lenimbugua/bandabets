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

<template>
    <Card class="bg-surface-sunken/30 border-none shadow-lg hover:shadow-xl transition-shadow">
      <CardContent class="p-6">
        <div class="flex items-center space-x-4">
          <div class="bg-background p-3 rounded-full">
            <slot name="icon"></slot>
          </div>
          <div>
            <h3 class="text-xl font-semibold text-white mb-2">{{ title }}</h3>
            <p class="text-gray-300">{{ description }}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  </template>
  
  
  
  <style scoped>
  /* Add any additional styling here if necessary */
  