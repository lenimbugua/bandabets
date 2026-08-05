<script setup>
// Ported from src/views/BonusPage.vue. Baseline route "/bonus"
// (git show 81ae85f:src/router/index.js:94-104) is top-level, requiresAuth
// FALSE (plan's own correction — do not gate) and is NOT registered in
// Phase 1's phase2Placeholders/phase2RealStubPaths/phase2RequiresAuthNames
// at all, so /bonus 404s today and has no generated noindex routeRule; one
// is added from scratch in nuxt.config.js in this same commit.
import MobileFooterV2 from "@/components/mobile/MobileFooterV2.vue";
import { Gift } from "lucide-vue-next";
import BonusHeader from "@/components/bonus/BonusHeader.vue";
import BonusTabs from "@/components/bonus/BonusTabs.vue";
import BonusCard from "@/components/bonus/BonusCard.vue";
import MissionsSection from "@/components/bonus/MissionsSection.vue";
import PromoBanner from "@/components/bonus/PromoBanner.vue";
import DailyRewards from "@/components/bonus/DailyRewards.vue";
import ReferralSection from "@/components/bonus/ReferralSection.vue";

import sportsIcon from "@/assets/bonus/sports-icon.png";
import aviatorIcon from "@/assets/bonus/aviator-icon.png";
import jetxIcon from "@/assets/bonus/jetx-icon.png";
import esportsIcon from "@/assets/bonus/esports-icon.png";

definePageMeta({
  name: "bonus",
  layout: false,
});

useSeoHead({
  title: "My Bonuses | Bandabets",
  description:
    "View and manage your bonuses, daily rewards, missions, and referral program at Bandabets.",
  robots: "noindex,nofollow",
});

const bonusData = [
  {
    id: 1,
    title: "Sports Bonus",
    amount: 500.00,
    expiryDate: "10/02 18:00",
    status: "active",
    icon: sportsIcon,
    iconAlt: "Sports",
    wagerMultiplier: "5x",
    wagerProgress: 150,
    wagerTotal: 2500,
    eligibleGames: ["Premier League", "La Liga", "Champions League", "NBA", "NFL"],
    redemptionSteps: [
      { step: 1, description: "Select 5 games with odds ≥1.5" },
      { step: 2, description: "Place accumulator bet & win!" },
    ],
  },
  {
    id: 2,
    title: "Aviator Freebets",
    amount: 200.00,
    expiryDate: "08/02 12:00",
    status: "active",
    icon: aviatorIcon,
    iconAlt: "Aviator",
    eligibleGames: ["Aviator"],
    redemptionSteps: [
      { step: 1, description: "2 free spins - no wagering!" },
      { step: 2, description: "Play & keep your winnings" },
    ],
  },
  {
    id: 3,
    title: "JetX Bonus",
    amount: 50.00,
    expiryDate: "12/02 20:00",
    status: "active",
    icon: jetxIcon,
    iconAlt: "JetX",
    wagerMultiplier: "5x",
    wagerProgress: 50,
    wagerTotal: 250,
    eligibleGames: ["JetX", "Crash Games"],
    redemptionSteps: [
      { step: 1, description: "Wager bonus 5x on JetX" },
      { step: 2, description: "Complete to withdraw" },
    ],
  },
  {
    id: 4,
    title: "Esports Bonus",
    amount: 150.00,
    expiryDate: "15/02 23:59",
    status: "active",
    icon: esportsIcon,
    iconAlt: "Esports",
    wagerMultiplier: "3x",
    wagerProgress: 0,
    wagerTotal: 450,
    eligibleGames: ["CS2", "Dota 2", "League of Legends", "Valorant"],
    redemptionSteps: [
      { step: 1, description: "Bet on esports (min odds 1.3)" },
      { step: 2, description: "Complete 3x wagering" },
    ],
  },
];

const historyData = [
  {
    id: 5,
    title: "Deposit Bonus",
    amount: 200.00,
    expiryDate: "07/02 16:00",
    status: "expired",
    icon: sportsIcon,
    iconAlt: "Sports",
    wagerMultiplier: "30x",
    wagerProgress: 0,
    wagerTotal: 6000,
    eligibleGames: ["Lucky Poker", "Lucky Soccer"],
    redemptionSteps: [
      { step: 1, description: "This bonus has expired" },
    ],
  },
];

const activeTab = ref("active");
const totalBalance = 900.00;
const ready = ref(false);

const displayedBonuses = computed(() =>
  activeTab.value === "active" ? bonusData : historyData
);

onMounted(() => {
  requestAnimationFrame(() => { ready.value = true; });
});
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-surface-sunken pb-20 lg:pb-0 bonus-gaming-bg relative">
    <!-- Gaming side decorations (desktop only) -->
    <div class="hidden dark:lg:block pointer-events-none fixed inset-0 z-1 overflow-hidden" aria-hidden="true">
      <!-- Left side glowing orbs -->
      <div class="absolute top-[15%] -left-12 w-48 h-48 rounded-full bg-primary/4 blur-[80px] gaming-glow-pulse" />
      <div class="absolute top-[50%] -left-8 w-36 h-36 rounded-full bg-accent/5 blur-[60px] gaming-glow-pulse" style="animation-delay: 2s" />
      <div class="absolute top-[80%] -left-16 w-44 h-44 rounded-full bg-primary/3 blur-[70px] gaming-glow-pulse" style="animation-delay: 1s" />

      <!-- Right side glowing orbs -->
      <div class="absolute top-[10%] -right-12 w-44 h-44 rounded-full bg-accent/5 blur-[80px] gaming-glow-pulse" style="animation-delay: 1.5s" />
      <div class="absolute top-[45%] -right-8 w-40 h-40 rounded-full bg-primary/4 blur-[60px] gaming-glow-pulse" style="animation-delay: 3s" />
      <div class="absolute top-[75%] -right-16 w-48 h-48 rounded-full bg-accent/3 blur-[70px] gaming-glow-pulse" style="animation-delay: 0.5s" />

      <!-- Floating diamond shapes - left side -->
      <div class="absolute top-[25%] left-[6%] w-3 h-3 border border-primary/20 gaming-float" />
      <div class="absolute top-[55%] left-[4%] w-2 h-2 border border-accent/25 gaming-float-reverse" style="animation-delay: 1s" />
      <div class="absolute top-[75%] left-[8%] w-2.5 h-2.5 bg-primary/10 gaming-float" style="animation-delay: 3s" />
      <div class="absolute top-[40%] left-[3%] w-1.5 h-1.5 bg-accent/15 rounded-full gaming-float-reverse" style="animation-delay: 2s" />

      <!-- Floating diamond shapes - right side -->
      <div class="absolute top-[20%] right-[5%] w-2.5 h-2.5 border border-accent/20 gaming-float-reverse" style="animation-delay: 0.5s" />
      <div class="absolute top-[50%] right-[7%] w-3 h-3 border border-primary/20 gaming-float" style="animation-delay: 2.5s" />
      <div class="absolute top-[70%] right-[4%] w-2 h-2 bg-accent/10 gaming-float-reverse" style="animation-delay: 1.5s" />
      <div class="absolute top-[35%] right-[6%] w-1.5 h-1.5 bg-primary/15 rounded-full gaming-float" style="animation-delay: 4s" />

      <!-- Accent line streaks -->
      <div class="absolute top-[30%] left-0 w-24 h-px bg-linear-to-r from-primary/20 to-transparent" />
      <div class="absolute top-[60%] left-0 w-16 h-px bg-linear-to-r from-accent/15 to-transparent" />
      <div class="absolute top-[25%] right-0 w-20 h-px bg-linear-to-l from-accent/20 to-transparent" />
      <div class="absolute top-[55%] right-0 w-28 h-px bg-linear-to-l from-primary/15 to-transparent" />
    </div>

    <!-- Sticky Header -->
    <div
      class="sticky top-0 z-60 bg-white dark:bg-background border-b dark:shadow-xl dark:border-border-darkest rounded-b-xl overflow-clip"
    >
      <HeaderLinks />
    </div>

    <div class="relative z-2 max-w-md md:max-w-4xl mx-auto px-3 py-4 space-y-4">
      <!-- Header with balance -->
      <div :class="['stagger-item', ready && 'stagger-visible']" style="--delay: 0">
        <BonusHeader :total-balance="totalBalance" />
      </div>

      <!-- Daily Rewards - Login & Play -->
      <div :class="['stagger-item', ready && 'stagger-visible']" style="--delay: 1">
        <DailyRewards />
      </div>

      <!-- Promo Banner -->
      <div :class="['stagger-item', ready && 'stagger-visible']" style="--delay: 2">
        <PromoBanner />
      </div>

      <!-- Daily Missions Section -->
      <div :class="['stagger-item', ready && 'stagger-visible']" style="--delay: 3">
        <MissionsSection />
      </div>

      <!-- Active Bonuses Section -->
      <div :class="['stagger-item space-y-2', ready && 'stagger-visible']" style="--delay: 4">
        <div class="flex items-center justify-between gap-2">
          <div class="flex items-center gap-1.5 min-w-0">
            <Gift class="w-4 h-4 text-accent shrink-0" />
            <h2 class="text-xs font-bold text-foreground truncate">Active Bonuses</h2>
            <span class="bg-primary/20 text-primary text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0">
              {{ bonusData.length }}
            </span>
          </div>
          <BonusTabs :active-tab="activeTab" @update:active-tab="activeTab = $event" />
        </div>

        <TransitionGroup
          name="card-list"
          tag="div"
          class="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4"
        >
          <BonusCard
            v-for="bonus in displayedBonuses"
            :key="bonus.id"
            :title="bonus.title"
            :amount="bonus.amount"
            :expiry-date="bonus.expiryDate"
            :status="bonus.status"
            :icon="bonus.icon"
            :icon-alt="bonus.iconAlt"
            :wager-multiplier="bonus.wagerMultiplier"
            :wager-progress="bonus.wagerProgress"
            :wager-total="bonus.wagerTotal"
            :eligible-games="bonus.eligibleGames"
            :redemption-steps="bonus.redemptionSteps"
          />
        </TransitionGroup>

        <!-- Empty state for history -->
        <div
          v-if="displayedBonuses.length === 0"
          class="flex flex-col items-center justify-center py-12 text-center"
        >
          <div class="w-16 h-16 rounded-full bg-secondary/50 flex items-center justify-center mb-3">
            <Gift class="w-8 h-8 text-muted-foreground" />
          </div>
          <p class="text-sm font-semibold text-foreground mb-1">No bonus history yet</p>
          <p class="text-xs text-muted-foreground">Your claimed and expired bonuses will appear here</p>
        </div>
      </div>

      <!-- Referral Program -->
      <div :class="['stagger-item', ready && 'stagger-visible']" style="--delay: 5">
        <ReferralSection />
      </div>

      <!-- Bottom CTA -->
      <div :class="['stagger-item', ready && 'stagger-visible']" style="--delay: 6">
        <div class="bg-linear-to-r from-primary/30 dark:from-primary/20 to-accent/30 dark:to-accent/20 rounded-xl p-4 md:p-6 border border-primary/30 text-center glass-card">
          <p class="text-xs text-muted-foreground mb-2">Need more bonuses?</p>
          <button type="button" class="bg-gradient-gold text-accent-foreground text-sm md:text-base font-bold px-6 py-2.5 rounded-full shadow-glow-gold cta-premium">
            Deposit Now &amp; Earn More!
          </button>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <Footer />

    <!-- Bottom Navigation (small screens only) -->
    <div class="lg:hidden">
      <MobileFooterV2 />
    </div>
  </div>
</template>

<style scoped>
/* Staggered entrance animation */
.stagger-item {
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 0.5s ease, transform 0.5s ease;
  transition-delay: calc(var(--delay, 0) * 80ms);
}
.stagger-visible {
  opacity: 1;
  transform: translateY(0);
}

/* Tab-switch card transitions */
.card-list-enter-active {
  transition: all 0.35s ease;
}
.card-list-leave-active {
  transition: all 0.25s ease;
  position: absolute;
}
.card-list-enter-from {
  opacity: 0;
  transform: translateY(12px);
}
.card-list-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
.card-list-move {
  transition: transform 0.35s ease;
}
</style>
