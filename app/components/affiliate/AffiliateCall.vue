<script setup>
import { BoltIcon, UserGroupIcon } from "@heroicons/vue/24/solid";
</script>

<template>
  <div
    class="relative h-32 md:h-48 rounded-md overflow-hidden bg-linear-to-br from-brand-bright/10 via-gold-bright/10 to-brand-bright/5 dark:from-brand-bright/20 dark:via-gold-bright/10 dark:to-background"
  >
    <!-- Subtle decorative accent -->
    <div
      class="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-gold-bright/10 blur-3xl"
    ></div>
    <div
      class="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-brand-bright/10 blur-3xl"
    ></div>

    <div class="relative z-10 flex flex-col items-center justify-center h-full px-4">
      <h2
        class="text-lg md:text-3xl font-bold text-foreground text-center leading-tight"
      >
        Make Money
        <span class="text-gold-bright">Weekly!</span>
        <br />
        <span class="text-sm md:text-xl font-semibold text-muted-foreground">
          Up to
        </span>
        <span class="text-brand-bright font-extrabold"> KES 300,000</span>
      </h2>

      <div
        class="flex items-center gap-4 md:gap-6 mt-2 md:mt-4"
      >
        <div class="flex items-center gap-1.5">
          <BoltIcon class="w-4 h-4 md:w-5 md:h-5 text-gold-bright" />
          <span class="text-xs md:text-sm text-muted-foreground">Instant Payouts</span>
        </div>
        <div class="flex items-center gap-1.5">
          <UserGroupIcon class="w-4 h-4 md:w-5 md:h-5 text-brand-bright" />
          <span class="text-xs md:text-sm text-muted-foreground">50K+ Members</span>
        </div>
      </div>

      <p class="text-xs md:text-sm text-muted-foreground/80 mt-2 text-center max-w-md">
        Earn up to KES 200 for every referred user and a percentage of all
        their future earnings.
      </p>
    </div>
  </div>
</template>
