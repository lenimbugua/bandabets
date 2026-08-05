<script setup>
import { useDownloadApp } from "@/composables/useDownloadApp";
const { downloadApp } = useDownloadApp();

// import { useGoTogooglePlay } from "@/composables/useGoTogooglePlay";

// const { goToGooglePlay } = useGoTogooglePlay();
</script>
<template>
  <div
    class="cursor-pointer px-1 py-1 bg-linear-to-r from-gold-bright via-gold-deep to-brand-bright flex items-center justify-between text-foreground font-bold text-xs"
    @click="downloadApp()"
  >
    <div class="flex justify-between w-full items-center">
      <div class="flex space-x-1">
        <div class="flex space-x-1 justify-between">
          <span class="animate-pulse">🔥</span>
          <span class="animate-pulse">🔥</span>
        </div>
        <span class="text-xs">Download App Today</span>
        <div class="flex space-x-1 justify-between">
          <span class="animate-pulse">🔥</span>
          <span class="animate-pulse">🔥</span>
        </div>
      </div>
      <div>
        <button
          class="bg-linear-to-r from-gold-650 via-lime-600 to-gold-650 text-white p-1 rounded-md flex space-x-0.5"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-5 fill-current"
            viewBox="0 0 24 24"
          >
            <!-- Icon from Material Symbols by Google - https://github.com/google/material-design-icons/blob/master/LICENSE -->
            <path
              fill="currentColor"
              d="m16 11l-4 4l-4-4l1.4-1.4l1.6 1.55V7h2v4.15l1.6-1.55zm-6 9h4v-1h-4zm-3 3q-.825 0-1.412-.587T5 21V3q0-.825.588-1.412T7 1h10q.825 0 1.413.588T19 3v18q0 .825-.587 1.413T17 23zm0-7h10V6H7z"
            />
          </svg>
          <span class="text-xs">Download Now</span>
        </button>
      </div>
    </div>
  </div>
</template>
