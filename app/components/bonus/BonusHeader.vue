<script setup>
defineProps({
  totalBalance: { type: Number, required: true },
  currency: { type: String, default: "KES" },
});

const userName = "Amos";
const vipLevel = "Silver";
</script>

<template>
  <div class="space-y-3">
    <!-- Top Bar -->
    <div class="flex items-center justify-between">
      <button
        type="button"
        class="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
      >
        <div
          class="w-7 h-7 rounded-full bg-gray-100 dark:bg-secondary/50 flex items-center justify-center"
        >
          <Icon name="tabler:chevron-left" class="w-4 h-4" />
        </div>
      </button>

      <div class="flex items-center gap-1">
        <Icon name="tabler:sparkles" class="w-4 h-4 text-accent" />
        <h1 class="text-sm font-bold text-foreground">My Bonuses</h1>
      </div>

      <button
        type="button"
        class="relative w-7 h-7 rounded-full bg-gray-100 dark:bg-secondary/50 flex items-center justify-center"
      >
        <Icon name="tabler:bell" class="w-4 h-4 text-muted-foreground" />
        <span
          class="absolute -top-0.5 -right-0.5 w-4 h-4 bg-destructive text-destructive-foreground text-[8px] font-bold rounded-full flex items-center justify-center animate-pulse"
        >
          3
        </span>
      </button>
    </div>

    <!-- Main Balance Card -->
    <div
      class="relative overflow-hidden rounded-2xl bg-linear-to-br from-primary/10 dark:from-primary/30 via-card to-accent/8 dark:to-accent/20 border border-primary/20 dark:border-primary/40 p-4 animate-border-glow shadow-lg dark:shadow-none"
    >
      <!-- Animated background pattern -->
      <div class="absolute inset-0 opacity-20 pointer-events-none" aria-hidden="true">
        <Icon name="tabler:sparkles" class="absolute top-3 left-5 w-6 h-6 text-accent" />
        <Icon name="tabler:gift" class="absolute top-8 right-8 w-5 h-5 text-primary" />
        <Icon name="tabler:bolt" class="absolute bottom-12 right-5 w-5 h-5 text-accent" />
      </div>

      <!-- User greeting -->
      <div class="relative flex items-center justify-between mb-4">
        <div class="flex items-center gap-3">
          <div class="relative">
            <div
              class="w-12 h-12 rounded-full bg-gradient-gold flex items-center justify-center text-xl font-bold text-accent-foreground shadow-glow-gold ring-2 ring-accent/50 ring-offset-1 ring-offset-card"
            >
              {{ userName.charAt(0) }}
            </div>
            <div
              class="absolute -bottom-1 -right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center ring-2 ring-card"
            >
              <Icon name="tabler:bolt" class="w-3 h-3 text-primary-foreground" />
            </div>
          </div>
          <div>
            <p class="text-[11px] text-foreground/60">Welcome back,</p>
            <p class="text-base font-bold text-foreground">
              {{ userName }}!
            </p>
          </div>
        </div>

        <!-- VIP Badge -->
        <div class="flex flex-col items-end gap-1">
          <div
            class="flex items-center gap-1 bg-gradient-gold px-3 py-1.5 rounded-full shadow-glow-gold"
          >
            <Icon name="tabler:crown" class="w-4 h-4 text-accent-foreground" />
            <span class="text-xs font-bold text-accent-foreground">{{
              vipLevel
            }}</span>
          </div>
          <span class="text-[9px] text-foreground/70 font-medium">VIP Member</span>
        </div>
      </div>

      <!-- Balance Section - Premium Style -->
      <div
        class="relative overflow-hidden rounded-xl border border-accent/40 mb-4 glass-card"
      >
        <!-- Gradient Background -->
        <div
          class="absolute inset-0 bg-linear-to-br from-accent/30 dark:from-accent/20 via-primary/15 dark:via-primary/10 to-secondary/80"
        />

        <!-- Content -->
        <div class="relative p-4">
          <!-- Badge -->
          <div class="flex items-center justify-between mb-2">
            <div
              class="flex items-center gap-1.5 bg-accent/25 dark:bg-accent/20 backdrop-blur-xs px-2 py-1 rounded-full border border-accent/40 dark:border-accent/30"
            >
              <Icon name="tabler:gift" class="w-3 h-3 text-accent" />
              <span class="text-[10px] font-bold text-accent"
                >BONUS BALANCE</span
              >
            </div>
            <div class="flex items-center gap-1 text-[10px] font-medium text-success">
              <div
                class="w-1.5 h-1.5 rounded-full bg-success animate-pulse"
              />
              Active
            </div>
          </div>

          <!-- Amount Display -->
          <div class="flex items-center gap-3">
            <div class="flex-1">
              <div class="flex items-baseline">
                <span class="text-sm font-bold text-accent mr-1">{{
                  currency
                }}</span>
                <span
                  class="text-3xl md:text-4xl font-black text-foreground tracking-tight"
                  >{{ totalBalance.toLocaleString() }}</span
                >
                <span class="text-lg text-foreground/65">.00</span>
              </div>

              <!-- Status Pills -->
              <div class="flex items-center gap-2 mt-2">
                <div
                  class="flex items-center gap-1 bg-primary/20 px-2 py-0.5 rounded-full"
                >
                  <Icon name="tabler:trending-up" class="w-2.5 h-2.5 text-primary" />
                  <span class="text-[9px] font-bold text-primary"
                    >Ready to bet</span
                  >
                </div>
                <div
                  class="flex items-center gap-1 bg-secondary/50 px-2 py-0.5 rounded-full"
                >
                  <Icon name="tabler:clock" class="w-2.5 h-2.5 text-muted-foreground" />
                  <span class="text-[9px] text-foreground/60 font-medium"
                    >7 days left</span
                  >
                </div>
              </div>
            </div>

            <!-- Icon -->
            <div class="relative">
              <div
                class="w-14 h-14 rounded-xl bg-gradient-gold flex items-center justify-center shadow-glow-gold"
              >
                <Icon name="tabler:diamond" class="w-7 h-7 text-accent-foreground" />
              </div>
              <Icon
                name="tabler:sparkles"
                class="absolute -top-1 -right-1 w-4 h-4 text-accent"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Decorative elements -->
      <div
        class="absolute -top-16 -right-16 w-40 h-40 bg-primary/10 blur-3xl rounded-full"
      />
      <div
        class="absolute -bottom-16 -left-16 w-32 h-32 bg-accent/10 blur-3xl rounded-full"
      />
    </div>
  </div>
</template>
