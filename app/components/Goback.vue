<template>
  <button aria-label="Go back" class="flex items-center space-x-2" @click="$router.go(-1)">
    <ChevronLeftIcon
      class="w-7 h-7 cursor-pointer text-black dark:text-white"
    />
    <div class="text-black dark:text-white">Back</div>
  </button>
</template>
