<template>
  <div class="relative overflow-hidden h-6 w-4 inline-block">
    <div
      class="absolute transition-transform duration-700 ease-out"
      :style="{ transform: `translateY(-${digit * 100}%)` }"
    >
      <div
        v-for="n in 10"
        :key="n"
        class="h-6 flex items-center justify-center font-bold"
      >
        {{ (n - 1) % 10 }}
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  digit: { type: Number, required: true },
});
</script>
