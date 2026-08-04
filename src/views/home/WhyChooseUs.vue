<template>
  <div class="grid md:grid-cols-3 gap-8">
    <FeatureCard
      title="Best Odds"
      description="We offer the most competitive odds in the market, maximizing your potential winnings."
    >
      <template #icon>
        <TrophyIcon class="w-12 h-12 text-yellow-400" />
      </template>
    </FeatureCard>

    <FeatureCard
      title="Instant Payouts"
      description="Withdraw your winnings instantly. No delays, no hassle."
    >
      <template #icon>
        <CurrencyDollarIcon class="w-12 h-12 text-red-400" />
      </template>
    </FeatureCard>

    <FeatureCard
      title="24/7 Support"
      description="Our dedicated support team is always ready to assist you, anytime, anywhere."
    >
      <template #icon>
        <UsersIcon class="w-12 h-12 text-blue-400" />
      </template>
    </FeatureCard>
  </div>
</template>

<script setup>
import { TrophyIcon, UsersIcon } from "@heroicons/vue/24/outline";
import FeatureCard from "./FeatureCard.vue";
import { CurrencyDollarIcon } from "@heroicons/vue/24/outline";
</script>

<style scoped>
/* Add any custom styles here if needed */
</style>
