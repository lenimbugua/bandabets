<script setup>
import { useSupport } from "@/composables/useSupport";
import { useLoginStore } from "@/stores/login";
import { useRouter } from "vue-router";

const router = useRouter();
const { logout } = useLoginStore();

const { openSupportModal } = useSupport();

const signOut = () => {
  router.push({ name: "home" });
  logout();
};
</script>

<template>
  <!-- Account & Activity -->
  <div class="rounded-2xl bg-white dark:bg-white/3 border border-gray-200/80 dark:border-white/6 shadow-sm dark:shadow-none overflow-hidden">
    <div class="px-4 pt-3.5 pb-2">
      <h3 class="text-[0.6rem] font-bold text-gray-400 dark:text-white/25 uppercase tracking-widest">Account & Activity</h3>
    </div>
    <div class="divide-y divide-gray-100 dark:divide-white/5">
      <RouterLink
        :to="{ name: 'my-bets' }"
        class="flex items-center justify-between px-4 py-3 hover:bg-gray-50 dark:hover:bg-white/3 transition-colors"
      >
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4 text-blue-500">
              <path fill-rule="evenodd" d="M15.988 3.012A2.25 2.25 0 0 1 18 5.25v6.5A2.25 2.25 0 0 1 15.75 14H13.5V7A2.5 2.5 0 0 0 11 4.5H8.128a2.252 2.252 0 0 1 1.884-1.488A2.25 2.25 0 0 1 12.25 1h1.5a2.25 2.25 0 0 1 2.238 2.012ZM11.5 3.25a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 .75.75v.25h-3v-.25Z" clip-rule="evenodd" />
              <path fill-rule="evenodd" d="M2 7a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7Zm2 3.25a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1-.75-.75Zm0 3.5a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1-.75-.75Z" clip-rule="evenodd" />
            </svg>
          </div>
          <span class="text-[0.8rem] font-medium text-gray-800 dark:text-gray-200">My Bets</span>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-3.5 h-3.5 text-gray-300 dark:text-white/15">
          <path fill-rule="evenodd" d="M6.22 4.22a.75.75 0 0 1 1.06 0l3.25 3.25a.75.75 0 0 1 0 1.06l-3.25 3.25a.75.75 0 0 1-1.06-1.06L8.94 8 6.22 5.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
        </svg>
      </RouterLink>
      <RouterLink
        :to="{ name: 'sort-deposit' }"
        class="flex items-center justify-between px-4 py-3 hover:bg-gray-50 dark:hover:bg-white/3 transition-colors"
      >
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-lg bg-primary/8 dark:bg-primary/10 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4 text-primary">
              <path fill-rule="evenodd" d="M16.403 12.652a3 3 0 0 0 0-5.304 3 3 0 0 0-3.75-3.751 3 3 0 0 0-5.305 0 3 3 0 0 0-3.751 3.75 3 3 0 0 0 0 5.305 3 3 0 0 0 3.75 3.751 3 3 0 0 0 5.305 0 3 3 0 0 0 3.751-3.75Zm-2.546-4.46a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" clip-rule="evenodd" />
            </svg>
          </div>
          <span class="text-[0.8rem] font-medium text-gray-800 dark:text-gray-200">Sort Deposit (Jisort)</span>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-3.5 h-3.5 text-gray-300 dark:text-white/15">
          <path fill-rule="evenodd" d="M6.22 4.22a.75.75 0 0 1 1.06 0l3.25 3.25a.75.75 0 0 1 0 1.06l-3.25 3.25a.75.75 0 0 1-1.06-1.06L8.94 8 6.22 5.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
        </svg>
      </RouterLink>
    </div>
  </div>

  <!-- Promotions & Rewards -->
  <div class="rounded-2xl bg-white dark:bg-white/3 border border-gray-200/80 dark:border-white/6 shadow-sm dark:shadow-none overflow-hidden">
    <div class="px-4 pt-3.5 pb-2">
      <h3 class="text-[0.6rem] font-bold text-gray-400 dark:text-white/25 uppercase tracking-widest">Promotions & Rewards</h3>
    </div>
    <div class="divide-y divide-gray-100 dark:divide-white/5">
      <RouterLink
        :to="{ name: 'promotions' }"
        class="flex items-center justify-between px-4 py-3 hover:bg-gray-50 dark:hover:bg-white/3 transition-colors"
      >
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-lg bg-amber-50 dark:bg-gold-650/10 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4 text-gold-650">
              <path fill-rule="evenodd" d="M5 2.75C5 1.784 5.784 1 6.75 1h6.5c.966 0 1.75.784 1.75 1.75v3.552c0 .814-.291 1.6-.818 2.217l-2.042 2.39a.75.75 0 0 1-1.14 0L8.958 8.519A3.368 3.368 0 0 1 8.14 6.302V5.151L5 2.75Zm1.5.633 2.14 1.63V6.302c0 .47.168.925.474 1.283L10 8.575l.886-1.037A1.868 1.868 0 0 0 11.36 6.3V5.013L13.5 3.383V2.75a.25.25 0 0 0-.25-.25h-6.5a.25.25 0 0 0-.25.25v.633Z" clip-rule="evenodd" />
              <path d="M6.75 12a.75.75 0 0 0-.75.75v4.5c0 .414.336.75.75.75h6.5a.75.75 0 0 0 .75-.75v-4.5a.75.75 0 0 0-.75-.75h-6.5Zm1.5 2.25a.75.75 0 0 1 .75-.75h2a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75Z" />
            </svg>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-[0.8rem] font-medium text-gray-800 dark:text-gray-200">Promotions</span>
            <span class="px-1.5 py-0.5 rounded-md bg-brand-bright/10 text-[0.55rem] font-bold text-brand-bright uppercase">New</span>
          </div>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-3.5 h-3.5 text-gray-300 dark:text-white/15">
          <path fill-rule="evenodd" d="M6.22 4.22a.75.75 0 0 1 1.06 0l3.25 3.25a.75.75 0 0 1 0 1.06l-3.25 3.25a.75.75 0 0 1-1.06-1.06L8.94 8 6.22 5.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
        </svg>
      </RouterLink>
    </div>
  </div>

  <!-- Help & Support -->
  <div class="rounded-2xl bg-white dark:bg-white/3 border border-gray-200/80 dark:border-white/6 shadow-sm dark:shadow-none overflow-hidden">
    <div class="px-4 pt-3.5 pb-2">
      <h3 class="text-[0.6rem] font-bold text-gray-400 dark:text-white/25 uppercase tracking-widest">Help & Support</h3>
    </div>
    <div class="divide-y divide-gray-100 dark:divide-white/5">
      <RouterLink
        :to="{ name: 'share-feedback' }"
        class="flex items-center justify-between px-4 py-3 hover:bg-gray-50 dark:hover:bg-white/3 transition-colors"
      >
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-lg bg-amber-50 dark:bg-amber-500/10 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4 text-amber-500">
              <path d="M10 1a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 10 1ZM5.05 3.05a.75.75 0 0 1 1.06 0l1.062 1.06A.75.75 0 1 1 6.11 5.173L5.05 4.11a.75.75 0 0 1 0-1.06ZM14.95 3.05a.75.75 0 0 1 0 1.06l-1.06 1.062a.75.75 0 0 1-1.062-1.061l1.061-1.06a.75.75 0 0 1 1.06 0ZM3 8a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 0 1.5h-1.5A.75.75 0 0 1 3 8ZM14 8a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 0 1.5h-1.5A.75.75 0 0 1 14 8ZM7.172 13.172a.75.75 0 0 1 1.06 0l1.768 1.768 1.768-1.768a.75.75 0 1 1 1.06 1.06l-2.297 2.298a.75.75 0 0 1-1.06 0l-2.299-2.298a.75.75 0 0 1 0-1.06Z" />
              <path d="M10 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z" />
            </svg>
          </div>
          <span class="text-[0.8rem] font-medium text-gray-800 dark:text-gray-200">Share Feedback</span>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-3.5 h-3.5 text-gray-300 dark:text-white/15">
          <path fill-rule="evenodd" d="M6.22 4.22a.75.75 0 0 1 1.06 0l3.25 3.25a.75.75 0 0 1 0 1.06l-3.25 3.25a.75.75 0 0 1-1.06-1.06L8.94 8 6.22 5.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
        </svg>
      </RouterLink>
      <div
        class="flex items-center justify-between px-4 py-3 hover:bg-gray-50 dark:hover:bg-white/3 transition-colors cursor-pointer"
        @click="openSupportModal"
      >
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-lg bg-sky-50 dark:bg-sky-500/10 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4 text-sky-500">
              <path fill-rule="evenodd" d="M3.43 2.524A41.29 41.29 0 0 1 10 2c2.236 0 4.43.18 6.57.524 1.437.231 2.43 1.49 2.43 2.902v5.148c0 1.413-.993 2.67-2.43 2.902a41.202 41.202 0 0 1-5.183.501.78.78 0 0 0-.528.224l-3.579 3.58A.75.75 0 0 1 6 17.25v-3.443a41.033 41.033 0 0 1-2.57-.33C1.993 13.244 1 11.986 1 10.573V5.426c0-1.413.993-2.67 2.43-2.902Z" clip-rule="evenodd" />
            </svg>
          </div>
          <span class="text-[0.8rem] font-medium text-gray-800 dark:text-gray-200">Chat with Support</span>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-3.5 h-3.5 text-gray-300 dark:text-white/15">
          <path fill-rule="evenodd" d="M6.22 4.22a.75.75 0 0 1 1.06 0l3.25 3.25a.75.75 0 0 1 0 1.06l-3.25 3.25a.75.75 0 0 1-1.06-1.06L8.94 8 6.22 5.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
        </svg>
      </div>
    </div>
  </div>

  <!-- More -->
  <div class="rounded-2xl bg-white dark:bg-white/3 border border-gray-200/80 dark:border-white/6 shadow-sm dark:shadow-none overflow-hidden">
    <div class="px-4 pt-3.5 pb-2">
      <h3 class="text-[0.6rem] font-bold text-gray-400 dark:text-white/25 uppercase tracking-widest">More</h3>
    </div>
    <div class="divide-y divide-gray-100 dark:divide-white/5">
      <RouterLink
        :to="{ name: 'self-exclusion' }"
        class="flex items-center justify-between px-4 py-3 hover:bg-gray-50 dark:hover:bg-white/3 transition-colors"
      >
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-lg bg-gray-100 dark:bg-white/5 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4 text-gray-400 dark:text-white/40">
              <path fill-rule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM8.28 7.22a.75.75 0 0 0-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 1 0 1.06 1.06L10 11.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L11.06 10l1.72-1.72a.75.75 0 0 0-1.06-1.06L10 8.94 8.28 7.22Z" clip-rule="evenodd" />
            </svg>
          </div>
          <span class="text-[0.8rem] font-medium text-gray-800 dark:text-gray-200">Self Exclusion</span>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-3.5 h-3.5 text-gray-300 dark:text-white/15">
          <path fill-rule="evenodd" d="M6.22 4.22a.75.75 0 0 1 1.06 0l3.25 3.25a.75.75 0 0 1 0 1.06l-3.25 3.25a.75.75 0 0 1-1.06-1.06L8.94 8 6.22 5.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
        </svg>
      </RouterLink>
    </div>
  </div>

  <!-- Logout -->
  <button
    type="button"
    class="w-full flex items-center justify-center gap-2.5 py-3 rounded-2xl bg-red-50 dark:bg-red-500/5 border border-red-200/60 dark:border-red-500/10 hover:bg-red-100 dark:hover:bg-red-500/10 text-[0.8rem] font-semibold text-red-500 dark:text-red-400 transition-all cursor-pointer"
    @click="signOut"
  >
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4">
      <path fill-rule="evenodd" d="M3 4.25A2.25 2.25 0 0 1 5.25 2h5.5A2.25 2.25 0 0 1 13 4.25v2a.75.75 0 0 1-1.5 0v-2a.75.75 0 0 0-.75-.75h-5.5a.75.75 0 0 0-.75.75v11.5c0 .414.336.75.75.75h5.5a.75.75 0 0 0 .75-.75v-2a.75.75 0 0 1 1.5 0v2A2.25 2.25 0 0 1 10.75 18h-5.5A2.25 2.25 0 0 1 3 15.75V4.25Z" clip-rule="evenodd" />
      <path fill-rule="evenodd" d="M19 10a.75.75 0 0 0-.75-.75H8.704l1.048-.943a.75.75 0 1 0-1.004-1.114l-2.5 2.25a.75.75 0 0 0 0 1.114l2.5 2.25a.75.75 0 1 0 1.004-1.114l-1.048-.943h9.546A.75.75 0 0 0 19 10Z" clip-rule="evenodd" />
    </svg>
    Sign Out
  </button>
</template>
