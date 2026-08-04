<script setup>
import {
  CheckCircleIcon,
  GiftIcon,
  GlobeAltIcon,
  WindowIcon,
  LightBulbIcon,
  ShieldCheckIcon,
  TrophyIcon,
} from "@heroicons/vue/24/outline";

const claimSteps = [
  {
    title: "Sign Up",
    description:
      "Create an account on Naibet website or download the app and complete the registration process.",
  },
  {
    title: "Verify Your Account",
    description:
      "Confirm your account through email or SMS verification for security purposes.",
  },
  {
    title: "Make Your First Deposit",
    description:
      "Deposit funds to qualify for free bet offers. Check current promotions for minimum requirements.",
  },
  {
    title: "Check for Promotions",
    description:
      "Look for banners or visit the promotions page to find current free bet offers.",
  },
];

const tips = [
  "Explore different markets and try new betting options",
  "Stay informed with latest sports news and updates",
  "Always bet responsibly and within your means",
];

const features = [
  {
    icon: WindowIcon,
    title: "User-Friendly Interface",
    description: "Easy navigation for both beginners and experienced bettors",
  },
  {
    icon: GlobeAltIcon,
    title: "Wide Range of Sports",
    description: "Bet on football, basketball, rugby, and many more sports",
  },
  {
    icon: ShieldCheckIcon,
    title: "Secure Transactions",
    description: "Safe and secure payment methods for deposits and withdrawals",
  },
];
</script>
<template>
  <div
    class="bg-white dark:bg-background text-gray-800 dark:text-white"
  >
    <!-- Hero Section -->
    <div
      class="relative overflow-hidden bg-linear-to-br from-gray-50 to-gray-100 dark:from-background dark:to-surface-deepest py-16"
    >
      <div class="absolute inset-0 opacity-10">
        <div class="grid grid-cols-12 gap-2 rotate-12 scale-125">
          <div
            v-for="n in 48"
            :key="n"
            class="h-8 bg-gray-900 dark:bg-white rounded"
          ></div>
        </div>
      </div>

      <div class="container mx-auto px-4 relative">
        <h1
          class="text-4xl md:text-5xl font-bold text-center mb-6 bg-clip-text text-transparent bg-linear-to-r from-purple-600 to-pink-600"
        >
          Elevate Your Betting Experience
        </h1>
        <p class="text-center text-lg md:text-xl max-w-3xl mx-auto opacity-90">
          Discover how Naibet, one of Kenya's leading betting platforms,
          offers incredible opportunities for both new and existing users to
          enjoy free bets.
        </p>
      </div>
    </div>

    <!-- Main Content -->
    <div class="container mx-auto px-4 py-12">
      <div class="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        <!-- What are Free Bets Section -->
        <div
          class="bg-white dark:bg-surface-elevated rounded-2xl shadow-xl p-6 transform transition-all duration-300 hover:scale-[1.02]"
        >
          <GiftIcon class="w-12 h-12 text-purple-600 mb-4" />
          <h2 class="text-2xl font-bold mb-4">What are Free Bets?</h2>
          <p class="text-gray-600 dark:text-gray-300">
            Free bets are promotional offers that allow you to place a bet
            without risking your own money. If your bet wins, you get to keep
            the winnings, but if it loses, you won't lose anything from your own
            pocket.
          </p>
        </div>

        <!-- How to Claim Section -->
        <div class="bg-white dark:bg-surface-elevated rounded-2xl shadow-xl p-6">
          <h2 class="text-2xl font-bold mb-4">How to Claim Free Bets</h2>
          <ul class="space-y-4">
            <li
              v-for="(step, index) in claimSteps"
              :key="index"
              class="flex items-start space-x-3 p-3 rounded-lg transition-colors duration-200 hover:bg-gray-50 dark:hover:bg-background"
            >
              <div
                class="shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 font-bold"
              >
                {{ index + 1 }}
              </div>
              <div>
                <h3 class="font-semibold mb-1">{{ step.title }}</h3>
                <p class="text-gray-600 dark:text-gray-300 text-sm">
                  {{ step.description }}
                </p>
              </div>
            </li>
          </ul>
        </div>

        <!-- Tips Section -->
        <div class="bg-white dark:bg-surface-elevated rounded-2xl shadow-xl p-6">
          <LightBulbIcon class="w-12 h-12 text-yellow-500 mb-4" />
          <h2 class="text-2xl font-bold mb-4">Tips for Using Free Bets</h2>
          <ul class="space-y-3">
            <li
              v-for="(tip, index) in tips"
              :key="index"
              class="flex items-center space-x-3 p-2"
            >
              <CheckCircleIcon class="w-5 h-5 text-red-500" />
              <span class="text-gray-600 dark:text-gray-300">{{ tip }}</span>
            </li>
          </ul>
        </div>

        <!-- Why Choose Naibet -->
        <div class="bg-white dark:bg-surface-elevated rounded-2xl shadow-xl p-6">
          <TrophyIcon class="w-12 h-12 text-yellow-500 mb-4" />
          <h2 class="text-2xl font-bold mb-4">Why Choose Naibet?</h2>
          <div class="grid gap-4">
            <div
              v-for="(feature, index) in features"
              :key="index"
              class="flex items-start space-x-3 p-3 rounded-lg transition-colors duration-200 hover:bg-gray-50 dark:hover:bg-background"
            >
              <div class="p-2 rounded-lg bg-purple-100 dark:bg-purple-900">
                <component
                  :is="feature.icon"
                  class="w-5 h-5 text-purple-600 dark:text-purple-300"
                />
              </div>
              <div>
                <h3 class="font-semibold mb-1">{{ feature.title }}</h3>
                <p class="text-gray-600 dark:text-gray-300 text-sm">
                  {{ feature.description }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer Note -->
      <div class="text-center mt-12 max-w-2xl mx-auto">
        <p class="text-gray-600 dark:text-gray-300">
          Free bets are an excellent way to enhance your betting experience on
          Naibet. Remember to check the promotions regularly to make the most
          of what Naibet has to offer. Happy betting!
        </p>
      </div>
    </div>
  </div>
</template>
