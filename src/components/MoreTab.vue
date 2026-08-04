<script setup></script>
<template>
  <div class="text-center cursor-pointer">
    <div class="flex-col justify-end items-center inline-flex">
      <div
        class="w-5 h-10 flex flex-col items-center rounded-lg bg-gray-100 dark:bg-white/6 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
      >
        <div
          class="relative flex items-center justify-center rounded-full h-full w-full"
        >
          <SecondaryNavIcons icon="more" />
        </div>
      </div>
      <div
        class="text-xs font-medium mt-1 w-10 text-ellipsis whitespace-nowrap overflow-hidden text-gray-700 dark:text-white/60"
      >
        more
      </div>
    </div>
  </div>
</template>
