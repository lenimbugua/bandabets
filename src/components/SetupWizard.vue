<script setup>
const props = defineProps({
  step: {
    type: Number,
    required: true,
  },
});

function stepIsActive(step) {
  return props.step >= step;
}
</script>
<template>
  <div class="py-4">
    <hr class="border-gray-300" />
    <div class="w-full relative">
      <div class="w-full -top-3 absolute">
        <div class="w-full flex justify-around">
          <button
            :class="[
              stepIsActive(1)
                ? 'bg-red-500 text-white'
                : 'bg-gray-300 text-gray-800',
            ]"
            class="h-6 w-6 flex justify-center items-center rounded-full"
          >
            1
          </button>
          <button
            :class="[
              stepIsActive(2)
                ? 'bg-red-500 text-white'
                : 'bg-gray-300 text-gray-800',
            ]"
            class="h-6 w-6 flex justify-center items-center rounded-full"
          >
            2
          </button>
          <button
            :class="[
              stepIsActive(3)
                ? 'bg-red-500 text-white'
                : 'bg-gray-300 text-gray-800',
            ]"
            class="h-6 w-6 flex justify-center items-center rounded-full"
          >
            3
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
