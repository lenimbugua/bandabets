<script setup>
import { Users, Gift, Copy, Check, Share2, ChevronRight, Sparkles, TrendingUp } from "lucide-vue-next"
import { ref } from "vue"

const referralCode = "AMOS2024"
const totalEarnings = 12500
const friendsReferred = 8
const weeklyPotential = 300000

const copied = ref(false)

function handleCopyCode() {
  navigator.clipboard.writeText(referralCode)
  copied.value = true
  setTimeout(() => { copied.value = false }, 2000)
}

function handleShare() {
  if (navigator.share) {
    navigator.share({
      title: "Join LakiBets!",
      text: `Use my referral code ${referralCode} and get a bonus when you sign up!`,
      url: window.location.origin,
    })
  } else {
    handleCopyCode()
  }
}
</script>

<template>
  <div class="bg-card rounded-xl border border-gray-200 dark:border-border overflow-hidden card-hover-lift shadow-md dark:shadow-none">
    <!-- Header Banner -->
    <div class="relative bg-linear-to-r from-primary/10 dark:from-primary/30 via-accent/8 dark:via-accent/20 to-primary/10 dark:to-primary/30 p-3 border-b border-gray-200 dark:border-border">
      <div class="absolute inset-0 overflow-hidden">
        <Sparkles class="absolute top-1 left-6 w-3 h-3 text-accent" />
        <Sparkles class="absolute bottom-1 right-6 w-3 h-3 text-primary" />
      </div>

      <div class="relative flex items-center justify-between">
        <div class="flex items-center gap-2">
          <div class="w-9 h-9 rounded-xl bg-bet flex items-center justify-center shadow-glow-gold">
            <Users class="w-5 h-5 text-bet-foreground" />
          </div>
          <div>
            <div class="flex items-center gap-1.5">
              <h3 class="text-sm font-bold text-foreground">Invite &amp; Earn</h3>
              <span class="text-[8px] bg-destructive text-destructive-foreground px-1.5 py-0.5 rounded font-bold">NEW</span>
            </div>
            <p class="text-[9px] text-muted-foreground">Share &amp; win big every week!</p>
          </div>
        </div>

        <div class="text-right">
          <p class="text-[9px] text-foreground/60">Earn up to</p>
          <p class="text-sm font-black text-accent">{{ weeklyPotential.toLocaleString() }} KES</p>
          <p class="text-[9px] text-primary font-bold">WEEKLY!</p>
        </div>
      </div>
    </div>

    <!-- Content -->
    <div class="p-3 space-y-3">
      <!-- Stats Row -->
      <div class="grid grid-cols-2 gap-2">
        <div class="bg-gray-50 dark:bg-secondary/40 rounded-lg p-2 border border-gray-200/80 dark:border-border/50 text-center">
          <p class="text-[9px] text-foreground/70 uppercase font-semibold">Your Earnings</p>
          <p class="text-base font-bold text-primary">{{ totalEarnings.toLocaleString() }} KES</p>
          <div class="flex items-center justify-center gap-0.5 text-[9px] text-success font-medium">
            <TrendingUp class="w-2.5 h-2.5" /> +2,500 this week
          </div>
        </div>
        <div class="bg-gray-50 dark:bg-secondary/40 rounded-lg p-2 border border-gray-200/80 dark:border-border/50 text-center">
          <p class="text-[9px] text-foreground/70 uppercase font-semibold">Friends Joined</p>
          <p class="text-base font-bold text-foreground">{{ friendsReferred }}</p>
          <p class="text-[9px] text-accent font-medium">3 active today</p>
        </div>
      </div>

      <!-- Referral Code -->
      <div class="bg-gray-50 dark:bg-secondary/30 rounded-lg p-2.5 border border-primary/15 dark:border-primary/20">
        <div class="flex items-center justify-between mb-2">
          <p class="text-[9px] text-muted-foreground">Your Referral Code</p>
          <span class="text-[9px] bg-primary/20 text-primary px-1.5 py-0.5 rounded-full font-bold">
            +100 KES per friend
          </span>
        </div>
        <div class="flex items-center gap-2">
          <div class="flex-1 bg-gray-100 dark:bg-secondary/60 rounded-lg px-3 py-2 border border-gray-200 dark:border-primary/20 font-mono text-sm font-bold text-foreground tracking-wider select-all">
            {{ referralCode }}
          </div>
          <button
            :class="[
              'w-10 h-10 rounded-lg flex items-center justify-center border transition-all duration-300',
              copied
                ? 'bg-primary/15 dark:bg-primary/30 border-primary/40 dark:border-primary/50 scale-95'
                : 'bg-primary/10 dark:bg-primary/20 hover:bg-primary/15 dark:hover:bg-primary/30 border-primary/20 dark:border-primary/30'
            ]"
            @click="handleCopyCode"
          >
            <Transition name="icon-swap" mode="out-in">
              <Check v-if="copied" class="w-4 h-4 text-primary" />
              <Copy v-else class="w-4 h-4 text-primary" />
            </Transition>
          </button>
          <button
            class="w-10 h-10 rounded-lg bg-bet flex items-center justify-center shadow-glow-gold cta-premium"
            @click="handleShare"
          >
            <Share2 class="w-4 h-4 text-bet-foreground" />
          </button>
        </div>
        <Transition name="fade">
          <p v-if="copied" class="text-[9px] text-primary font-semibold mt-1.5 text-center">Copied to clipboard!</p>
        </Transition>
      </div>

      <!-- How it Works - Compact -->
      <div class="flex items-center gap-1 text-[9px]">
        <div class="flex-1 flex items-center gap-1.5 bg-gray-50 dark:bg-secondary/30 rounded-lg px-2 py-1.5 border border-gray-200/80 dark:border-border/50">
          <span class="w-4.5 h-4.5 rounded-full bg-primary flex items-center justify-center text-[8px] font-bold text-primary-foreground shrink-0">1</span>
          <span class="text-foreground/70">Share code</span>
        </div>
        <ChevronRight class="w-3 h-3 text-primary shrink-0" />
        <div class="flex-1 flex items-center gap-1.5 bg-gray-50 dark:bg-secondary/30 rounded-lg px-2 py-1.5 border border-gray-200/80 dark:border-border/50">
          <span class="w-4.5 h-4.5 rounded-full bg-primary flex items-center justify-center text-[8px] font-bold text-primary-foreground shrink-0">2</span>
          <span class="text-foreground/70">Friend deposits</span>
        </div>
        <ChevronRight class="w-3 h-3 text-primary shrink-0" />
        <div class="flex-1 flex items-center gap-1.5 bg-accent/10 dark:bg-accent/20 rounded-lg px-2 py-1.5 border border-accent/20 dark:border-accent/30">
          <Gift class="w-3.5 h-3.5 text-accent" />
          <span class="text-accent font-bold">You earn!</span>
        </div>
      </div>

      <!-- CTA -->
      <button type="button" class="w-full bg-bet text-bet-foreground text-xs font-bold py-2.5 rounded-xl shadow-glow-gold flex items-center justify-center gap-1.5 cta-premium">
        <Users class="w-4 h-4" />
        Invite Friends Now
        <ChevronRight class="w-4 h-4" />
      </button>
    </div>
  </div>
</template>

<style scoped>
.icon-swap-enter-active,
.icon-swap-leave-active {
  transition: all 0.15s ease;
}
.icon-swap-enter-from {
  opacity: 0;
  transform: scale(0.8);
}
.icon-swap-leave-to {
  opacity: 0;
  transform: scale(0.8);
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
