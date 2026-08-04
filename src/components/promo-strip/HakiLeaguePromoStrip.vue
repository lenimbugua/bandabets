<script setup lang="ts">
import { GiftIcon } from "@heroicons/vue/24/solid";
</script>

<template>
  <RouterLink
    class="px-2.5 py-1 bg-linear-to-r from-gold-muted via-gold-bright to-gold-muted flex items-center justify-between text-foreground font-bold text-xs"
    :to="{ name: 'pari-league' }"
  >
    <div class="flex justify-between w-full items-center">
      <div class="flex space-x-2 items-center">
        <div class="">
          <GiftIcon class="h-5 w-5 text-fuchsia-600" />
        </div>
        <span>Congrats! Free Bet</span>
        <span class="text-fuchsia-600 font-black">KES.20</span>
        <span>Haki League</span>
      </div>
      <div>
        <button
          class="bg-linear-to-r from-indigo-500 via-lime-600 to-fuchsia-500 text-white p-1 px-2 rounded-md flex space-x-1"
        >
          <span>Play Now</span>
        </button>
      </div>
    </div>
  </RouterLink>
</template>
