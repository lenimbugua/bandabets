<script setup>
import { useLoginStore } from "@/stores/login";
import { ExclamationCircleIcon } from "@heroicons/vue/24/solid";
const { openLoginModal } = useLoginStore();

</script>
<template>
  <div class="py-20 px-2 w-full max-w-lg">
    <div class="px-3 relative space-y-3">
      <div class="flex w-full justify-center">
        <div
          style="z-index: 999"
          class="p-1 absolute -top-10 mx-auto bg-red-50 dark:bg-brand-bright/20 rounded-full"
        >
          <ExclamationCircleIcon
            style="z-index: 100"
            class="w-16 h-16 mx-auto text-red-500"
          />
        </div>
      </div>
      <div
        class="shadow-sm relative border border-gray-200 dark:border-border rounded-xl overflow-clip"
      >
        <div class="dark:bg-card bg-gray-50 p-3 w-full border-b border-gray-100 dark:border-white/5">
          <div class="w-full flex justify-center items-center">
            <div
              class="text-sm font-semibold py-3 flex items-center space-x-2 text-gray-900 dark:text-gray-50"
            >
              Your session has expired
            </div>

        </div>
        </div>
        <div class="w-full bg-white dark:bg-background p-4 text-gray-900 dark:text-gray-50">
          <div class="flex w-full">
            <button
              type="button"
              class="w-full block text-center p-3 text-white uppercase bg-brand-dark hover:opacity-90 rounded-lg font-semibold transition-colors cursor-pointer"
              @click="openLoginModal"
            >
              Login to continue
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
