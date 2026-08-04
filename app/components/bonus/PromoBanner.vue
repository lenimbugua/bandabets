<script setup>
import { Gift, Sparkles, ArrowRight, Clock } from "lucide-vue-next"
import { ref, onMounted, onUnmounted } from "vue"

const userName = "Amos"

// Live countdown — 2 hours from now
const targetTime = Date.now() + 2 * 60 * 60 * 1000
const countdown = ref("")
let timer = null

function updateCountdown() {
  const diff = Math.max(0, targetTime - Date.now())
  const h = Math.floor(diff / 3600000)
  const m = Math.floor((diff % 3600000) / 60000)
  const s = Math.floor((diff % 60000) / 1000)
  countdown.value = `${h}h ${String(m).padStart(2, "0")}m ${String(s).padStart(2, "0")}s`
}

onMounted(() => {
  updateCountdown()
  timer = setInterval(updateCountdown, 1000)
})

onUnmounted(() => {
  clearInterval(timer)
})
</script>

<template>
  <div class="relative overflow-hidden rounded-xl bg-linear-to-r from-accent/12 dark:from-accent/30 via-primary/8 dark:via-primary/20 to-accent/12 dark:to-accent/30 border border-accent/30 dark:border-accent/50 p-3 shadow-md dark:shadow-none">
    <!-- Animated background shimmer -->
    <div class="absolute inset-0 bg-linear-to-r from-transparent via-white/40 dark:via-white/5 to-transparent animate-shimmer bg-size-[200%_100%]" />

    <!-- Personal badge -->
    <div class="absolute top-0 right-0 bg-destructive text-destructive-foreground text-[9px] font-bold px-2 py-0.5 rounded-bl-lg flex items-center gap-1">
      <Clock class="w-2.5 h-2.5" />
      <span class="tabular-nums">{{ countdown }}</span>
    </div>

    <div class="relative">
      <!-- Personal greeting -->
      <div class="flex items-center gap-1 mb-1">
        <Sparkles class="w-3 h-3 text-accent" />
        <span class="text-[10px] font-bold text-accent">
          Hey {{ userName }}! Just for YOU
        </span>
      </div>

      <div class="flex items-center gap-3">
        <div class="w-12 h-12 rounded-xl bg-gradient-gold flex items-center justify-center shadow-glow-gold shrink-0">
          <Gift class="w-6 h-6 text-accent-foreground" />
        </div>

        <div class="flex-1 min-w-0">
          <p class="text-sm text-foreground font-bold mb-0.5">
            Deposit <span class="text-accent">1,000 KES</span>
          </p>
          <p class="text-xs text-primary font-semibold">
            Get <span class="text-lg font-bold">100%</span> Match Bonus!
          </p>
          <p class="text-[10px] text-foreground/60">
            That's <span class="text-foreground font-bold">2,000 KES</span> to play with!
          </p>
        </div>

        <button type="button" class="bg-gradient-gold text-accent-foreground text-xs font-bold px-4 py-2.5 rounded-lg flex flex-col items-center shadow-glow-gold shrink-0 cta-premium">
          <span>CLAIM</span>
          <ArrowRight class="w-3 h-3" />
        </button>
      </div>
    </div>
  </div>
</template>
