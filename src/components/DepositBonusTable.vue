<script setup>
const bonusRanges = [
  { deposit: "49 - 99", bonus: "5" },
  { deposit: "100 - 199", bonus: "10" },
  { deposit: "200 - 299", bonus: "15" },
  { deposit: "300 - 399", bonus: "20" },
  { deposit: "400 - 499", bonus: "25" },
  { deposit: "500 - 999", bonus: "30" },
  { deposit: "1000+", bonus: "50" },
];
</script>

<template>
  <div class="rounded-2xl bg-white dark:bg-white/3 border border-gray-200/80 dark:border-white/6 shadow-sm dark:shadow-none overflow-hidden">
    <!-- Header -->
    <div class="px-5 pt-4 pb-3 flex items-center gap-3">
      <div class="w-7 h-7 rounded-lg bg-purple-50 dark:bg-purple-500/10 flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-3.5 h-3.5 text-purple-500">
          <path fill-rule="evenodd" d="M10 2a.75.75 0 0 1 .75.75v.258a33.186 33.186 0 0 1 6.668.83.75.75 0 0 1-.336 1.461 31.28 31.28 0 0 0-1.103-.232l1.702 7.545a.75.75 0 0 1-.387.832A4.981 4.981 0 0 1 15 14c-.825 0-1.606-.2-2.294-.556a.75.75 0 0 1-.387-.832l1.77-7.849a31.743 31.743 0 0 0-3.339-.364v11.851H13a.75.75 0 0 1 0 1.5H7a.75.75 0 0 1 0-1.5h2.25V4.399a31.712 31.712 0 0 0-3.339.364l1.77 7.849a.75.75 0 0 1-.387.832A4.981 4.981 0 0 1 5 14c-.825 0-1.606-.2-2.294-.556a.75.75 0 0 1-.387-.832l1.702-7.545c-.372.06-.742.126-1.103.232a.75.75 0 0 1-.336-1.461 33.186 33.186 0 0 1 6.668-.83V2.75A.75.75 0 0 1 10 2ZM5 12.662l-1.395-6.178A31.8 31.8 0 0 1 5 6.282c.484.04.964.092 1.395.202L5 12.662Zm10 0 1.395-6.178A31.8 31.8 0 0 0 15 6.282a31.67 31.67 0 0 0-1.395.202L15 12.662Z" clip-rule="evenodd" />
        </svg>
      </div>
      <h3 class="text-[0.6rem] font-bold text-gray-400 dark:text-white/25 uppercase tracking-widest">Deposit Bonus Tiers</h3>
    </div>

    <!-- Table -->
    <div class="px-5 pb-5">
      <div class="rounded-xl overflow-hidden border border-gray-200/80 dark:border-white/6">
        <!-- Table header -->
        <div class="grid grid-cols-2 bg-gray-50 dark:bg-white/5">
          <div class="px-4 py-2.5 text-[0.65rem] font-bold text-gray-400 dark:text-white/25 uppercase tracking-widest">Deposit (KES)</div>
          <div class="px-4 py-2.5 text-[0.65rem] font-bold text-gray-400 dark:text-white/25 uppercase tracking-widest">Bonus (KES)</div>
        </div>

        <!-- Rows -->
        <div class="divide-y divide-gray-100 dark:divide-white/5">
          <div
            v-for="(range, index) in bonusRanges"
            :key="index"
            class="grid grid-cols-2 hover:bg-gray-50/50 dark:hover:bg-white/3 transition-colors"
          >
            <div class="px-4 py-3 text-[0.8rem] text-gray-600 dark:text-white/50 tabular-nums">{{ range.deposit }}</div>
            <div class="px-4 py-3 text-[0.8rem] font-semibold text-brand-bright tabular-nums">+{{ range.bonus }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
