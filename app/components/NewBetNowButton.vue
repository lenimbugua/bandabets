<script setup>
import { ref } from "vue";

const outcomeCount = ref(3);
</script>
<template>
  <div class="flex text-center items-center gap-2 lg:gap-3 w-full grid-cols-3">
    <button
      v-for="i in outcomeCount"
      :key="i"
      class=" bg-gray-300/70 dark:bg-surface-interactive flex justify-center items-center p-2 h-10 w-16 sm:w-32  shadow-md rounded-md"
    >
      <svg
        class="text-red-500/50 h-5 w-5 fill-current"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path fill="none" d="M0 0h24v24H0Z"></path>
        <path
          d="M18 8h-1V6c0-2.76-2.24-5-5-5C9.24 1 7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2Zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2 -.9 2-2 2Zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2Z"
        ></path>
      </svg>
    </button>
  </div>
</template>
