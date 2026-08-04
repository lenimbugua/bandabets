<script setup>
import { RouterLink } from "vue-router";

const boostTable = [
  { selections: 2, boost: 5 },
  { selections: 3, boost: 7 },
  { selections: 4, boost: 8 },
  { selections: 5, boost: 10 },
  { selections: 7, boost: 15 },
  { selections: 8, boost: 20 },
  { selections: 9, boost: 25 },
  { selections: 10, boost: 30 },
  { selections: 11, boost: 35 },
  { selections: 12, boost: 40 },
  { selections: 13, boost: 45 },
  { selections: 14, boost: 50 },
  { selections: 15, boost: 55 },
  { selections: 16, boost: 60 },
  { selections: 17, boost: 70 },
  { selections: 18, boost: 75 },
  { selections: 19, boost: 85 },
  { selections: 20, boost: 90 },
  { selections: "21+", boost: 100 },
];

const steps = [
  {
    num: 1,
    title: "Select Your Picks",
    desc: "Build your multi-bet with selections from any NaiLeague event.",
  },
  {
    num: 2,
    title: "Meet the Odds",
    desc: "Ensure each selection has a minimum odd of 1.01.",
  },
  {
    num: 3,
    title: "Watch the Boost Grow",
    desc: "Your bonus percentage increases automatically with every extra game you add.",
  },
  {
    num: 4,
    title: "Win Big",
    desc: "If your bet wins, we add the boost percentage to your winnings!",
  },
];

const rules = [
  "Minimum odds: 1.01 per selection.",
  "The 100% maximum boost is reached at 21 selections.",
  "T&Cs apply. Gambling is addictive. Please bet responsibly. (18+)",
];
</script>

<template>
  <div class="max-w-6xl mx-auto  py-6 space-y-6">
    <!-- Hero section -->
    <div class="relative bg-card rounded-xl overflow-hidden border border-border/30">
      <div class="relative px-5 pt-6 pb-5 bg-gradient-to-br from-brand-bright/12 via-brand-bright/5 to-transparent dark:from-brand-bright/18 dark:via-brand-bright/6 dark:to-transparent">
        <div class="absolute top-0 right-0 w-40 h-40 bg-brand-bright/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
        <div class="relative">
          <div class="inline-flex items-center gap-1.5 rounded-full bg-brand-bright/10 dark:bg-brand-bright/15 px-3 py-1 mb-3">
            <span class="text-sm">🚀</span>
            <span class="text-[11px] font-bold text-brand-bright uppercase tracking-wider">Win Boost</span>
          </div>
          <h1 class="text-2xl font-bold text-foreground leading-tight">
            Double Your Wins with the 100% Win Boost!
          </h1>
          <p class="text-sm text-muted-foreground mt-2 leading-relaxed max-w-md">
            With NaiLeague, the more selections you add to your bet slip, the bigger your bonus. Boost your payout by up to <span class="font-bold text-brand-bright">100%</span>!
          </p>
        </div>
      </div>
    </div>

    <!-- How it works -->
    <div class="bg-card rounded-xl border border-border/30 overflow-hidden">
      <div class="px-5 py-3.5 border-b border-border/30">
        <h2 class="text-sm font-bold text-foreground flex items-center gap-2">
          <span class="text-base">💰</span>
          How It Works
        </h2>
      </div>
      <div class="p-5 space-y-4">
        <div
          v-for="step in steps"
          :key="step.num"
          class="flex gap-3.5"
        >
          <div class="flex items-center justify-center w-8 h-8 rounded-lg bg-brand-bright/10 dark:bg-brand-bright/15 text-brand-bright font-bold text-sm shrink-0">
            {{ step.num }}
          </div>
          <div class="pt-0.5">
            <p class="text-sm font-semibold text-foreground">{{ step.title }}</p>
            <p class="text-xs text-muted-foreground mt-0.5 leading-relaxed">{{ step.desc }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Boost table -->
    <div class="bg-card rounded-xl border border-border/30 overflow-hidden">
      <div class="px-5 py-3.5 border-b border-border/30">
        <h2 class="text-sm font-bold text-foreground flex items-center gap-2">
          <span class="text-base">📈</span>
          The NaiLeague Boost Table
        </h2>
        <p class="text-xs text-muted-foreground mt-0.5">Add more selections to maximize your payout</p>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-border/30">
              <th class="text-left px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Selections</th>
              <th class="text-right px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Win Boost</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(row, idx) in boostTable"
              :key="idx"
              :class="[
                'border-b border-border/20 last:border-0 transition-colors',
                idx % 2 === 0 ? 'bg-transparent' : 'bg-muted/30 dark:bg-white/[0.015]',
                row.boost === 100 ? 'bg-brand-bright/5 dark:bg-brand-bright/8' : '',
              ]"
            >
              <td class="px-5 py-2.5 text-foreground font-medium tabular-nums">
                {{ row.selections }} {{ typeof row.selections === 'number' ? 'Selections' : 'Selections' }}
              </td>
              <td class="px-5 py-2.5 text-right tabular-nums font-bold" :class="row.boost >= 50 ? 'text-brand-bright' : 'text-foreground'">
                {{ row.boost }}%
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Rules -->
    <div class="bg-card rounded-xl border border-border/30 overflow-hidden">
      <div class="px-5 py-3.5 border-b border-border/30">
        <h2 class="text-sm font-bold text-foreground flex items-center gap-2">
          <span class="text-base">⚠️</span>
          Important Rules
        </h2>
      </div>
      <ul class="p-5 space-y-2.5">
        <li
          v-for="(rule, idx) in rules"
          :key="idx"
          class="flex items-start gap-2.5 text-sm text-muted-foreground"
        >
          <span class="w-1.5 h-1.5 rounded-full bg-brand-bright shrink-0 mt-1.5"></span>
          <span>{{ rule }}</span>
        </li>
      </ul>
    </div>

    <!-- CTA -->
    <div class="text-center py-2">
      <RouterLink
        :to="{ name: 'pari-league' }"
        class="inline-flex items-center gap-2 bg-brand-bright text-primary-foreground font-bold text-sm px-8 py-3 rounded-xl hover:bg-brand-bright/90 active:scale-[0.98] transition-all shadow-sm"
      >
        🚀 Play Now
      </RouterLink>
    </div>
  </div>
</template>
