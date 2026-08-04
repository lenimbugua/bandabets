<script setup>
import { useLoginStore } from "@/stores/login";
import { storeToRefs } from "pinia";
import { computed } from "vue";
import userIcon from "@/assets/icons/user.svg";

const { msisdn } = storeToRefs(useLoginStore());

const greeting = computed(() => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
});
</script>

<template>
  <div class="rounded-2xl bg-white dark:bg-white/3 border border-gray-200/80 dark:border-white/6 shadow-sm dark:shadow-none overflow-hidden">
    <div class="px-5 py-5 flex items-center gap-4">
      <!-- Avatar -->
      <div class="relative shrink-0">
        <div class="h-14 w-14 rounded-full bg-gradient-to-br from-brand-bright/20 to-brand-bright/5 dark:from-brand-bright/25 dark:to-brand-bright/10 flex items-center justify-center ring-2 ring-brand-bright/20 dark:ring-brand-bright/30">
          <img :src="userIcon" alt="Profile" class="w-10 h-10 object-contain" />
        </div>
        <div class="absolute -bottom-0.5 -right-0.5 h-4 w-4 rounded-full bg-success ring-[2.5px] ring-white dark:ring-background flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-2.5 h-2.5 text-white">
            <path fill-rule="evenodd" d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z" clip-rule="evenodd" />
          </svg>
        </div>
      </div>

      <!-- Info -->
      <div v-if="msisdn" class="flex flex-col min-w-0">
        <span class="text-sm text-gray-500 dark:text-white/40">{{ greeting }} 👋</span>
        <span class="text-base font-bold text-gray-900 dark:text-white tracking-tight">{{ msisdn }}</span>
        <div class="flex items-center gap-1.5 mt-0.5">
          <span class="inline-block w-1.5 h-1.5 rounded-full bg-success"></span>
          <span class="text-xs font-medium text-success">Verified account</span>
        </div>
      </div>
    </div>
  </div>
</template>
