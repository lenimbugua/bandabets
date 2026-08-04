<template>
  <div class="rounded-2xl bg-white dark:bg-white/3 border border-gray-200/80 dark:border-white/6 shadow-sm dark:shadow-none overflow-hidden">
    <!-- Header -->
    <div class="px-5 pt-4 pb-3 flex items-center gap-3">
      <div class="w-7 h-7 rounded-lg bg-sky-50 dark:bg-sky-500/10 flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-3.5 h-3.5 text-sky-500">
          <path fill-rule="evenodd" d="M4.5 2A1.5 1.5 0 0 0 3 3.5v13A1.5 1.5 0 0 0 4.5 18h11a1.5 1.5 0 0 0 1.5-1.5V7.621a1.5 1.5 0 0 0-.44-1.06l-4.12-4.122A1.5 1.5 0 0 0 11.378 2H4.5Zm2.25 8.5a.75.75 0 0 0 0 1.5h6.5a.75.75 0 0 0 0-1.5h-6.5Zm0 3a.75.75 0 0 0 0 1.5h6.5a.75.75 0 0 0 0-1.5h-6.5Z" clip-rule="evenodd" />
        </svg>
      </div>
      <h3 class="text-[0.6rem] font-bold text-gray-400 dark:text-white/25 uppercase tracking-widest">Terms & Conditions</h3>
    </div>

    <!-- Terms list -->
    <div class="px-5 pb-5">
      <div class="space-y-3">
        <div class="flex gap-3">
          <span class="shrink-0 w-5 h-5 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center text-[0.6rem] font-bold text-gray-400 dark:text-white/30 tabular-nums">1</span>
          <p class="text-[0.75rem] text-gray-600 dark:text-white/50 leading-relaxed">
            Available exclusively to <strong class="text-gray-900 dark:text-white font-semibold">active, registered</strong> Naibet users.
          </p>
        </div>
        <div class="flex gap-3">
          <span class="shrink-0 w-5 h-5 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center text-[0.6rem] font-bold text-gray-400 dark:text-white/30 tabular-nums">2</span>
          <p class="text-[0.75rem] text-gray-600 dark:text-white/50 leading-relaxed">
            Valid only for the <strong class="text-gray-900 dark:text-white font-semibold">first qualifying deposit(s)</strong> made each calendar day (00:00 to 23:59).
          </p>
        </div>
        <div class="flex gap-3">
          <span class="shrink-0 w-5 h-5 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center text-[0.6rem] font-bold text-gray-400 dark:text-white/30 tabular-nums">3</span>
          <p class="text-[0.75rem] text-gray-600 dark:text-white/50 leading-relaxed">
            Bonus amounts are credited <strong class="text-gray-900 dark:text-white font-semibold">instantly</strong> to your account wallet upon a successful deposit match.
          </p>
        </div>
        <div class="flex gap-3">
          <span class="shrink-0 w-5 h-5 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center text-[0.6rem] font-bold text-gray-400 dark:text-white/30 tabular-nums">4</span>
          <p class="text-[0.75rem] text-gray-600 dark:text-white/50 leading-relaxed">
            Naibet reserves the right to modify or terminate this transaction-fee refund program at any time.
          </p>
        </div>
      </div>

      <!-- Disclaimer -->
      <div class="mt-4 pt-3 border-t border-gray-100 dark:border-white/5">
        <p class="text-[0.65rem] text-gray-400 dark:text-white/20 leading-relaxed">
          This product is provided "as is" without any warranties, whether express or implied. Only warranties implied by law and that cannot be excluded will apply, as stated in Naibet's General Terms and Conditions and Privacy Policy.
        </p>
      </div>
    </div>
  </div>
</template>
