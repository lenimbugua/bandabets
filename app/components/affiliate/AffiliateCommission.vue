<script setup>
import formatStuff from "@/utilities/format-stuff";
import { storeToRefs } from "pinia";
import { useAffiliateStore } from "../../stores/affiliate";

const { formattedNumber } = formatStuff();
const { earnings } = storeToRefs(useAffiliateStore());
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
    <!-- Commission 1 -->
    <div class="bg-card rounded-xl p-4 space-y-3">
      <div class="flex items-center gap-2.5">
        <span
          class="w-7 h-7 rounded-lg bg-brand-bright/10 text-brand-bright text-xs font-bold flex items-center justify-center"
        >
          1
        </span>
        <h3 class="text-sm font-semibold text-foreground">Per Referral</h3>
      </div>

      <p class="text-sm text-muted-foreground leading-relaxed">
        Get
        <span class="text-brand-bright font-bold">KSH 30</span> instantly for
        every friend you refer who wagers KSH 30.
      </p>

      <div class="pt-2 border-t border-border/50">
        <p class="text-base font-bold tabular-nums text-foreground">
          KSH
          {{ formattedNumber(earnings?.earnings?.totalPlayerRegisteredEarnings) }}
        </p>
        <p class="text-xs text-muted-foreground">Revenue earned</p>
      </div>
    </div>

    <!-- Commission 2 -->
    <div class="bg-card rounded-xl p-4 space-y-3">
      <div class="flex items-center gap-2.5">
        <span
          class="w-7 h-7 rounded-lg bg-gold-bright/10 text-gold-bright text-xs font-bold flex items-center justify-center"
        >
          2
        </span>
        <h3 class="text-sm font-semibold text-foreground">Revenue Share</h3>
      </div>

      <p class="text-sm text-muted-foreground leading-relaxed">
        Earn
        <span class="text-gold-bright font-bold">30%</span> commission on
        net-positive revenue from your referred users.
      </p>

      <div class="pt-2 border-t border-border/50">
        <p class="text-base font-bold tabular-nums text-foreground">
          KSH
          {{ formattedNumber(earnings?.earnings?.totalPlayerRevenueEarnings) }}
        </p>
        <p class="text-xs text-muted-foreground">Revenue earned</p>
      </div>
    </div>
  </div>
</template>
