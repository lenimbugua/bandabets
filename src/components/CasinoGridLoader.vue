<template>
  <div class="grid grid-cols-3 lg:grid-cols-7">
    <div v-for="i in 24" :key="i" class="space-y-1 mx-1 mb-1">
      <div
        class="w-full h-32 animate-pulse dark:bg-black/30 bg-black/20 rounded-md"
      ></div>
      <div
        class="flex justify-between text-xs whitespace-nowrap items-center text-gray-700 dark:text-gray-200"
      >
        <p
          class="w-2/3 h-4 animate-pulse dark:bg-black/30 bg-black/20 rounded-md"
        ></p>
      </div>
      <p
        class="w-full h-4 animate-pulse dark:bg-black/30 bg-black/20 rounded-md"
      ></p>
    </div>
  </div>
</template>
