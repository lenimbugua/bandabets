<script setup>
import { useProfileStore } from "@/stores/profile";
import { ref } from "vue";
import { storeToRefs } from "pinia";

const { balance, bonus, pending } = storeToRefs(useProfileStore());
const { getProfileInfo } = useProfileStore();

getProfileInfo();

const showBalance = ref(true);
</script>

<template>
  <div v-if="balance" class="rounded-2xl bg-white dark:bg-white/3 border border-gray-200/80 dark:border-white/6 shadow-sm dark:shadow-none overflow-hidden">
    <!-- Header -->
    <div class="px-5 pt-4 pb-3">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <span class="text-[0.65rem] font-bold text-gray-400 dark:text-white/30 uppercase tracking-widest">Total Balance</span>
          <button
            type="button"
            class="p-0.5 rounded-md text-gray-400 dark:text-white/30 hover:text-gray-600 dark:hover:text-white/50 hover:bg-gray-100 dark:hover:bg-white/5 transition-all cursor-pointer"
            :aria-label="showBalance ? 'Hide balance' : 'Show balance'"
            @click="showBalance = !showBalance"
          >
            <!-- Eye open -->
            <svg v-if="showBalance" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-3.5 h-3.5">
              <path d="M10 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
              <path fill-rule="evenodd" d="M.664 10.59a1.651 1.651 0 0 1 0-1.186A10.004 10.004 0 0 1 10 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0 1 10 17c-4.257 0-7.893-2.66-9.336-6.41ZM14 10a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" clip-rule="evenodd" />
            </svg>
            <!-- Eye closed -->
            <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-3.5 h-3.5">
              <path fill-rule="evenodd" d="M3.28 2.22a.75.75 0 0 0-1.06 1.06l14.5 14.5a.75.75 0 1 0 1.06-1.06l-1.745-1.745a10.029 10.029 0 0 0 3.3-4.38 1.651 1.651 0 0 0 0-1.185A10.004 10.004 0 0 0 9.999 3a9.956 9.956 0 0 0-4.744 1.194L3.28 2.22ZM7.752 6.69l1.092 1.092a2.5 2.5 0 0 1 3.374 3.373l1.092 1.092a4 4 0 0 0-5.558-5.558Z" clip-rule="evenodd" />
              <path d="M10.748 13.93l2.523 2.523a9.987 9.987 0 0 1-3.27.547c-4.258 0-7.894-2.66-9.337-6.41a1.651 1.651 0 0 1 0-1.186A10.007 10.007 0 0 1 2.839 6.02L6.07 9.252a4 4 0 0 0 4.678 4.678Z" />
            </svg>
          </button>
        </div>
        <button
          type="button"
          class="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[0.65rem] font-semibold text-gray-500 dark:text-white/40 hover:text-gray-700 dark:hover:text-white/60 hover:bg-gray-100 dark:hover:bg-white/5 transition-all cursor-pointer"
          aria-label="Refresh balance"
          @click="getProfileInfo()"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-3 h-3" :class="{ 'animate-spin': pending }">
            <path fill-rule="evenodd" d="M13.836 2.477a.75.75 0 0 1 .75.75v3.182a.75.75 0 0 1-.75.75h-3.182a.75.75 0 0 1 0-1.5h1.37l-.84-.841a4.5 4.5 0 0 0-7.08.681.75.75 0 0 1-1.264-.808 6 6 0 0 1 9.44-.908l.84.84V3.227a.75.75 0 0 1 .75-.75Zm-.911 7.5A.75.75 0 0 1 13.199 11a6 6 0 0 1-9.44.908l-.84-.84v1.836a.75.75 0 0 1-1.5 0v-3.182a.75.75 0 0 1 .75-.75h3.182a.75.75 0 0 1 0 1.5h-1.37l.84.841a4.5 4.5 0 0 0 7.08-.681.75.75 0 0 1 1.274.273Z" clip-rule="evenodd" />
          </svg>
          Refresh
        </button>
      </div>

      <!-- Big balance -->
      <div class="mt-2">
        <span v-if="showBalance" class="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          KES <span class="tabular-nums">{{ balance }}</span>
        </span>
        <span v-else class="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          KES ******
        </span>
      </div>
    </div>

    <!-- Main + Bonus split -->
    <div class="mx-5 mb-4 rounded-xl bg-gray-50 dark:bg-white/3 border border-gray-100 dark:border-white/4 grid grid-cols-2">
      <div class="px-4 py-3 text-center border-r border-gray-100 dark:border-white/4">
        <div class="text-[0.6rem] font-bold text-gray-400 dark:text-white/25 uppercase tracking-widest">Main</div>
        <div class="mt-1 text-lg font-bold text-gray-900 dark:text-white tabular-nums">
          <span v-if="showBalance">{{ balance }}</span>
          <span v-else>****</span>
        </div>
      </div>
      <div class="px-4 py-3 text-center">
        <div class="text-[0.6rem] font-bold text-gray-400 dark:text-white/25 uppercase tracking-widest">Bonus</div>
        <div class="mt-1 text-lg font-bold text-brand-bright tabular-nums">
          <span v-if="showBalance">{{ bonus }}</span>
          <span v-else>****</span>
        </div>
      </div>
    </div>
  </div>
</template>
