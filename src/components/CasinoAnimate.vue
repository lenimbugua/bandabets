<template>
  <div class="w-full h-full max-w-[1680px] mx-auto p-3 space-y-3 animate-pulse">
    <!-- Top bar skeleton -->
    <div class="h-8 rounded-lg bg-white/5"></div>

    <!-- Main content area -->
    <div class="flex gap-3">
      <!-- Sidebar skeleton (desktop only) -->
      <div class="hidden lg:block w-56 shrink-0 space-y-2">
        <div v-for="i in 12" :key="i" class="h-7 rounded-md bg-white/5"></div>
      </div>

      <!-- Game area skeleton -->
      <div class="flex-1 space-y-3">
        <div class="aspect-video rounded-xl bg-white/5"></div>
        <div class="h-10 rounded-lg bg-white/5"></div>
        <div class="grid grid-cols-3 sm:grid-cols-4 gap-2">
          <div v-for="i in 8" :key="i" class="aspect-square rounded-lg bg-white/5"></div>
        </div>
      </div>
    </div>
  </div>
</template>
