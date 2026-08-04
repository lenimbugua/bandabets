<template>
  <div class="animate-pulse w-full p-4 space-y-2">
    <div class="flex w-full space-x-2">
      <div class="h-4 w-4 rounded-full bg-gray-300 dark:bg-white/10"></div>
      <div class="h-4 w-12 rounded-md bg-gray-300 dark:bg-white/10"></div>
    </div>
    <div class="flex w-full space-x-2">
      <div class="h-4 w-4 rounded-full bg-gray-300 dark:bg-white/10"></div>
      <div class="h-4 w-16 rounded-md bg-gray-300 dark:bg-white/10"></div>
    </div>

    <div class="flex w-full space-x-2">
      <div class="h-7 w-full rounded-md bg-gray-300 dark:bg-white/10"></div>
    </div>
    <div v-for="i in 5" :key="i" class="border dark:border-white/5 w-full px-2 py-1.5 rounded-md">
      <div class="h-4 w-4 rounded-full bg-gray-300 dark:bg-white/10"></div>
      <div class="flex justify-between mt-2">
        <div class="h-2 w-12 rounded-md bg-gray-300 dark:bg-white/10"></div>
        <div class="h-2 w-12 rounded-md bg-gray-300 dark:bg-white/10"></div>
      </div>
      <div class="flex justify-between py-1">
        <div class="h-2 w-8 rounded-md bg-gray-300 dark:bg-white/10"></div>
        <div class="h-2 w-8 rounded-md bg-gray-300 dark:bg-white/10"></div>
      </div>
      <div class="flex justify-between py-1">
        <div class="h-2 w-8 rounded-md bg-gray-300 dark:bg-white/10"></div>
        <div class="h-2 w-8 rounded-md bg-gray-300 dark:bg-white/10"></div>
      </div>
      <div class="flex justify-between py-1">
        <div class="h-2 w-8 rounded-md bg-gray-300 dark:bg-white/10"></div>
        <div class="h-2 w-8 rounded-md bg-gray-300 dark:bg-white/10"></div>
      </div>
      <div class="flex justify-between mt-2">
        <div class="h-2 w-12 rounded-md bg-gray-300 dark:bg-white/10"></div>
        <div class="h-2 w-12 rounded-md bg-gray-300 dark:bg-white/10"></div>
      </div>
    </div>
  </div>
</template>
