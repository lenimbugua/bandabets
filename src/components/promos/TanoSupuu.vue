<template>
  <div
    class="min-h-dvh bg-white dark:bg-background text-primary-foreground dark:text-white p-6 md:p-10"
  >
    <!-- Header -->
    <div class="text-center mb-10">
      <h1 class="text-3xl md:text-4xl font-bold mb-2">
        Stay Consistent & Get Rewarded
      </h1>
      <p class="text-lg opacity-80">
        Bet 5 days in a row and earn your KSh 50 streak bonus every Monday.
      </p>
    </div>

    <!-- Promo Highlight -->
    <div
      class="bg-gold-bright dark:bg-brand-forest text-black dark:text-white p-6 rounded-2xl shadow-xl mb-10"
    >
      <h2 class="text-2xl font-semibold text-center">
        Weekly Streak Challenge
      </h2>
      <p class="text-center text-base mt-2 opacity-90">
        Place 1 qualifying bet daily, keep the streak alive, get rewarded.
      </p>
    </div>

    <!-- How It Works Section -->
    <div
      class="bg-white dark:bg-surface-elevated border border-gray-200 dark:border-gray-700 p-6 rounded-2xl shadow-md mb-10"
    >
      <h3 class="text-xl font-bold mb-4">How It Works</h3>
      <ul class="space-y-3 list-disc pl-6">
        <li>
          Place <span class="font-semibold">1 or more bets daily</span> for 5
          consecutive days
        </li>
        <li>
          Each bet must be <span class="font-semibold">KSh 49 or more</span>
        </li>
        <li>
          Keep your streak alive within the week
          <span class="font-semibold">(Monday → Sunday)</span>
        </li>
        <li>Minimum odds: <span class="font-semibold">4.99</span></li>
        <li>
          Qualify for a <span class="font-semibold">KSh 50 bonus</span>, paid
          every Monday
        </li>
      </ul>
    </div>

    <!-- Example Section -->
    <div
      class="bg-gold-bright/10 dark:bg-brand-forest/20 border border-gold-bright dark:border-brand-forest p-6 rounded-2xl mb-10"
    >
      <h3 class="text-xl font-bold mb-4">Example</h3>
      <p class="leading-relaxed">
        Bet from <span class="font-semibold">Monday to Friday</span> (KSh 49+
        each day). You’ll receive a
        <span class="font-semibold">KSh 50 bonus</span> the following Monday.
      </p>
    </div>

    <!-- Table: Requirements -->
    <div class="overflow-x-auto mb-10">
      <table
        class="w-full border-collapse rounded-xl overflow-hidden shadow-md text-sm"
      >
        <thead
          class="bg-gold-bright dark:bg-brand-forest text-black dark:text-white"
        >
          <tr>
            <th class="py-3 px-4 text-left font-semibold">Requirement</th>
            <th class="py-3 px-4 text-left font-semibold">Details</th>
          </tr>
        </thead>
        <tbody class="bg-white dark:bg-surface-elevated">
          <tr class="border-b border-gray-200 dark:border-gray-700">
            <td class="py-3 px-4">Minimum Stake</td>
            <td class="py-3 px-4 font-semibold">KSh 49+</td>
          </tr>
          <tr class="border-b border-gray-200 dark:border-gray-700">
            <td class="py-3 px-4">Bet Types</td>
            <td class="py-3 px-4 font-semibold">Singles & Multibets</td>
          </tr>
          <tr class="border-b border-gray-200 dark:border-gray-700">
            <td class="py-3 px-4">Consecutive Days</td>
            <td class="py-3 px-4 font-semibold">5 Days (Mon–Sun)</td>
          </tr>
          <tr>
            <td class="py-3 px-4">Bonus Payout</td>
            <td class="py-3 px-4 font-semibold">Every Monday</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Terms & Conditions -->
    <div
      class="bg-white dark:bg-surface-elevated border border-gray-200 dark:border-gray-700 p-6 rounded-2xl shadow-md mb-10"
    >
      <h3 class="text-xl font-bold mb-4">Terms & Conditions</h3>
      <ul class="space-y-3 list-disc pl-6 text-[15px] leading-relaxed">
        <li>
          Minimum stake per bet: <span class="font-semibold">KSh 49</span>
        </li>
        <li>
          Valid for <span class="font-semibold">single and multibets</span>
        </li>
        <li>
          Bets must be placed on
          <span class="font-semibold"
            >5 consecutive days within the same week</span
          >
        </li>
        <li>
          <span class="font-semibold">Only settled bets</span> count towards the
          streak
        </li>
        <li>Bonus is credited every Monday</li>
      </ul>
    </div>

    <!-- CTA Section -->
    <div class="text-center mt-12">
      <RouterLink
        :to="{ name: 'home' }"
        class="px-8 py-3 rounded-full text-lg font-semibold bg-brand-forest hover:bg-brand-dark text-white shadow-lg transition-all dark:bg-gold-bright dark:hover:bg-gold-bright dark:text-black"
      >
        Keep Your Streak Alive — Bet Now
      </RouterLink>

      <p class="text-sm opacity-70 mt-4">⚠ 18+ only. Bet Responsibly.</p>
    </div>
  </div>
</template>
