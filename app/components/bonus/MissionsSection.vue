<script setup>
import { Zap, Clock, Flame, ChevronRight, Plane, Trophy, TrendingUp, Gamepad2, Wallet, ArrowRight } from "lucide-vue-next"
import { cn } from "@/lib/utils"

const missions = [
  {
    id: 1,
    title: "Aviator Freebets",
    depositAmount: 500,
    reward: "5 Freebets",
    rewardType: "Aviator",
    gameIcon: "aviator",
    urgency: "2h left",
    hot: true,
  },
  {
    id: 2,
    title: "Sports Bonus",
    depositAmount: 200,
    reward: "+200 KES",
    rewardType: "Sports",
    gameIcon: "sports",
    urgency: "Today",
  },
  {
    id: 3,
    title: "Weekly Cashback",
    depositAmount: 1000,
    reward: "10% Back",
    rewardType: "All Games",
    gameIcon: "cashback",
  },
  {
    id: 4,
    title: "Esports Bonus",
    depositAmount: 300,
    reward: "+150 KES",
    rewardType: "Esports",
    gameIcon: "esports",
    hot: true,
  },
]

const gameIconMap = {
  aviator: { icon: Plane, color: "text-primary bg-primary/20 border-primary/30" },
  sports: { icon: Trophy, color: "text-accent bg-accent/20 border-accent/30" },
  cashback: { icon: TrendingUp, color: "text-success bg-success/15 border-success/25" },
  esports: { icon: Gamepad2, color: "text-amber-700 dark:text-amber-400 bg-gold-650/15 dark:bg-amber-400/20 border-gold-650/25 dark:border-amber-400/30" },
}
</script>

<template>
  <div class="space-y-2">
    <!-- Section Header -->
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-1.5">
        <Zap class="w-4 h-4 text-accent" />
        <h2 class="text-xs font-bold text-foreground">Deposit &amp; Win</h2>
        <span class="text-[9px] bg-primary/10 dark:bg-primary/20 text-primary px-1.5 py-0.5 rounded-full font-bold">MISSIONS</span>
      </div>
      <div class="flex items-center gap-1 text-accent text-[9px] font-semibold">
        <Flame class="w-3 h-3" />
        <span>4 Active</span>
      </div>
    </div>

    <!-- Compact Horizontal Scroll Missions -->
    <div class="relative">
    <div class="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-hide md:grid md:grid-cols-2 lg:grid-cols-4 md:overflow-x-visible md:mx-0 md:px-0 md:pb-0 snap-x snap-mandatory md:snap-none">
      <div
        v-for="mission in missions"
        :key="mission.id"
        :class="cn(
          'relative shrink-0 w-[150px] md:w-auto bg-gradient-card rounded-xl border p-2.5 card-hover-lift snap-start shadow-md dark:shadow-none',
          mission.hot ? 'border-accent/40 dark:border-accent/50' : 'border-gray-200 dark:border-border'
        )"
      >
        <!-- Hot Badge -->
        <div
          v-if="mission.hot"
          class="absolute -top-1.5 -right-1 bg-destructive text-[8px] font-bold text-destructive-foreground px-1.5 py-0.5 rounded-full flex items-center gap-0.5"
        >
          <Flame class="w-2 h-2" /> HOT
        </div>

        <!-- Header: Icon + Title -->
        <div class="flex items-center gap-2 mb-2">
          <div :class="cn('w-8 h-8 rounded-lg flex items-center justify-center border', gameIconMap[mission.gameIcon].color)">
            <component :is="gameIconMap[mission.gameIcon].icon" class="w-4 h-4" />
          </div>
          <div class="flex-1 min-w-0">
            <h3 class="text-[11px] font-bold text-foreground truncate">{{ mission.title }}</h3>
            <span class="text-[9px] text-foreground/60">{{ mission.rewardType }}</span>
          </div>
        </div>

        <!-- Deposit Flow -->
        <div class="bg-gray-50 dark:bg-secondary/50 rounded-lg p-2 mb-2 border border-gray-200/80 dark:border-border/50">
          <div class="flex items-center justify-between">
            <!-- Deposit -->
            <div class="flex items-center gap-1">
              <Wallet class="w-3 h-3 text-muted-foreground" />
              <div>
                <p class="text-[9px] text-foreground/70 uppercase font-semibold">Deposit</p>
                <p class="text-[11px] font-bold text-foreground">{{ mission.depositAmount }} KES</p>
              </div>
            </div>

            <!-- Arrow -->
            <ArrowRight class="w-3.5 h-3.5 text-primary mx-1" />

            <!-- Reward -->
            <div class="text-right">
              <p class="text-[9px] text-foreground/70 uppercase font-semibold">Get</p>
              <p class="text-[11px] font-bold text-primary">{{ mission.reward }}</p>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="flex items-center justify-between">
          <span
            v-if="mission.urgency"
            class="text-[9px] bg-destructive/20 text-destructive font-semibold px-1.5 py-0.5 rounded-full flex items-center gap-0.5"
          >
            <Clock class="w-2 h-2" /> {{ mission.urgency }}
          </span>
          <span v-else class="text-[9px] text-foreground/70">No expiry</span>
          <button type="button" class="bg-gradient-gold text-accent-foreground text-[9px] font-bold px-2.5 py-1 rounded-full flex items-center gap-0.5 shadow-glow-gold cta-premium">
            Deposit <ChevronRight class="w-2.5 h-2.5" />
          </button>
        </div>
      </div>
    </div>
    <!-- Fade edge hint (mobile only) -->
    <div class="absolute right-0 top-0 bottom-1 w-8 bg-linear-to-l from-white dark:from-background to-transparent pointer-events-none md:hidden" />
    </div>
  </div>
</template>
