<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>

<template>
  <section
    class="bg-white dark:bg-background text-gray-800 dark:text-gray-100 p-6 rounded-lg shadow-lg space-y-6"
  >
    <!-- Main Title -->
    <h2 class="text-2xl font-bold text-center text-brand-dark">
      🎉 NAIBET AVIATOR KARIBU BONUS
    </h2>
    <p class="text-center text-lg">
      Register today and get up to
      <strong class="text-gold-bright">50 FREE Aviator Bets!</strong>
    </p>

    <!-- Steps -->
    <div class="space-y-2">
      <h3 class="text-xl font-semibold text-brand-dark">How to Claim</h3>
      <ul class="list-disc pl-6 space-y-1">
        <li>✅ Create an account</li>
        <li>✅ Make your first deposit</li>
        <li>✅ Enjoy free Naibet Aviator Bets instantly</li>
      </ul>
    </div>

    <!-- How It Works -->
    <div>
      <h3 class="text-xl font-semibold text-brand-dark">💰 How It Works</h3>
      <table
        class="w-full border-collapse border border-gray-300 dark:border-gray-700 mt-3"
      >
        <thead>
          <tr class="bg-brand-dark text-white">
            <th class="p-2 text-left">Deposit Amount</th>
            <th class="p-2 text-left">Free Aviator Bets</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-b border-gray-300 dark:border-gray-700">
            <td class="p-2">Ksh 100 – 500</td>
            <td class="p-2">5 Free Bets</td>
          </tr>
          <tr class="border-b border-gray-300 dark:border-gray-700">
            <td class="p-2">Ksh 501 – 1,000</td>
            <td class="p-2">10 Free Bets</td>
          </tr>
          <tr class="border-b border-gray-300 dark:border-gray-700">
            <td class="p-2">Ksh 1,001 – 5,000</td>
            <td class="p-2">20 Free Bets</td>
          </tr>
          <tr>
            <td class="p-2">Ksh 5,001+</td>
            <td class="p-2">50 Free Bets</td>
          </tr>
        </tbody>
      </table>
      <ul class="list-disc pl-6 mt-3 space-y-1">
        <li>👉 Each free bet is worth <strong>Ksh 10</strong></li>
        <li>👉 Winnings are real cash (no wagering required!)</li>
      </ul>
    </div>

    <!-- CTA Button -->
    <div class="flex justify-center">
      <RouterLink
        :to="{ name: 'deposit' }"
        class="bg-brand-dark hover:bg-brand-dark/90 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition"
      >
        🚀 Deposit Now & Claim Your Bonus
      </RouterLink>
    </div>

    <!-- Terms & Conditions -->
    <div>
      <h3 class="text-xl font-semibold text-brand-dark">
        ⚡ Terms & Conditions
      </h3>

      <h4 class="text-lg font-semibold text-gold-bright mt-4">Eligibility</h4>
      <p>
        This bonus is only available to new NAIBET customers who register and
        make their first deposit.
      </p>

      <h4 class="text-lg font-semibold text-gold-bright mt-4">Bonus Details</h4>
      <ul class="list-disc pl-6 space-y-1">
        <li>
          Free Aviator Bets are awarded based on your first deposit amount only.
        </li>
        <li>Each free bet is worth <strong>Ksh 10</strong>.</li>
        <li>
          Winnings from free bets are credited as real cash (no wagering
          requirements).
        </li>
      </ul>

      <h4 class="text-lg font-semibold text-gold-bright mt-4">Usage Rules</h4>
      <ul class="list-disc pl-6 space-y-1">
        <li>Free bets apply only to the Aviator game.</li>
        <li>
          Free bets are non-transferable and cannot be exchanged for cash.
        </li>
      </ul>

      <h4 class="text-lg font-semibold text-gold-bright mt-4">Fair Play</h4>
      <p>
        Any attempt to cheat the system (e.g., using bots, scripts, or other
        automated tools) will result in immediate disqualification.
      </p>

      <h4 class="text-lg font-semibold text-gold-bright mt-4">General</h4>
      <p>
        NAIBET reserves the right to suspend, modify, or cancel this promotion
        at any time without prior notice. By taking part, you agree to all the
        above terms.
      </p>
    </div>
  </section>
  <!-- CTA Button -->
  <div class="flex justify-center py-3">
    <RouterLink
      :to="{ name: 'deposit' }"
      class="bg-brand-dark hover:bg-brand-dark/90 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition"
    >
      🚀 Deposit Now & Claim Your Bonus
    </RouterLink>
  </div>
</template>
