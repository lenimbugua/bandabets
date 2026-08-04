<template>
  <section
    class="w-full min-h-screen bg-white dark:bg-background text-gray-900 dark:text-white py-10 px-4 sm:px-6 lg:px-10"
  >
    <div class="max-w-6xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-10">
        <h1 class="text-3xl sm:text-4xl font-extrabold tracking-tight">
          Leaderboards
        </h1>
        <p class="mt-2 text-gray-700 dark:text-gray-300">
          Compete for the top spot and win prizes!
        </p>
      </div>

      <!-- Tabs -->
      <div class="flex justify-center mb-8">
        <div
          class="relative bg-gray-100 dark:bg-surface-elevated rounded-full p-1 flex gap-1 shadow-inner"
        >
          <input
            id="sports"
            type="radio"
            name="tab"
            checked
            class="peer/sports hidden"
          />
          <input
            id="casino"
            type="radio"
            name="tab"
            class="peer/casino hidden"
          />

          <label
            for="sports"
            class="cursor-pointer px-6 py-2 rounded-full text-sm font-semibold peer-checked/sports:bg-white peer-checked/sports:text-primary-foreground dark:peer-checked/sports:bg-background dark:peer-checked/sports:text-white transition-all"
          >
            Sports
          </label>

          <label
            for="casino"
            class="cursor-pointer px-6 py-2 rounded-full text-sm font-semibold peer-checked/casino:bg-white peer-checked/casino:text-primary-foreground dark:peer-checked/casino:bg-background dark:peer-checked/casino:text-white transition-all"
          >
            Casino
          </label>
        </div>
      </div>

      <!-- Info Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <div class="bg-white dark:bg-surface-elevated rounded-xl p-5 shadow-sm">
          <p class="text-sm text-gray-700 dark:text-gray-300">Period</p>
          <p class="mt-1 font-bold text-lg">2026 Week 06</p>
        </div>

        <div class="bg-white dark:bg-surface-elevated rounded-xl p-5 shadow-sm">
          <p class="text-sm text-gray-700 dark:text-gray-300">
            Minimum Points to Win
          </p>
          <p class="mt-1 font-bold text-lg">5 Points</p>
        </div>

        <div
          class="bg-linear-to-r from-purple-600 to-indigo-600 rounded-xl p-5 shadow-sm text-white"
        >
          <p class="text-sm opacity-80">Weekly Prize</p>
          <p class="mt-1 font-extrabold text-2xl">KES 30,000.00</p>
        </div>
      </div>

      <!-- Points Info -->
      <div class="bg-white dark:bg-surface-elevated rounded-xl p-6 mb-10 shadow-sm">
        <div class="flex items-start gap-3">
          <div class="text-xl">💡</div>
          <div>
            <h3 class="font-semibold mb-1">How Points Are Calculated</h3>
            <p class="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              Earn <strong>1 point</strong> for every
              <strong>KES 20</strong> wagered on qualifying bets. To qualify,
              place a <strong>multibet with 3 or more games</strong>, each with
              minimum odds of <strong>1.6</strong>.
            </p>
          </div>
        </div>
      </div>

      <!-- Leaderboard Table -->
      <div
        class="bg-white dark:bg-surface-elevated rounded-2xl shadow-sm overflow-hidden"
      >
        <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 class="font-bold text-lg">Current Standings</h2>
        </div>

        <div class="divide-y divide-gray-200 dark:divide-gray-700">
          <div
            class="grid grid-cols-4 px-6 py-3 text-sm font-semibold text-gray-700 dark:text-gray-300"
          >
            <span>Rank</span>
            <span class="col-span-2">Player</span>
            <span class="text-right">Points</span>
          </div>

          <!-- Row -->
          <div
            class="grid grid-cols-4 px-6 py-4 items-center hover:bg-gray-50 dark:hover:bg-surface-interactive transition"
          >
            <span class="font-bold text-yellow-500">1</span>
            <span class="col-span-2 font-semibold">25474*****17</span>
            <span class="text-right font-bold">76</span>
          </div>

          <div class="grid grid-cols-4 px-6 py-4 items-center">
            <span>2</span>
            <span class="col-span-2">25470*****18</span>
            <span class="text-right">51</span>
          </div>

          <div class="grid grid-cols-4 px-6 py-4 items-center">
            <span>3</span>
            <span class="col-span-2">25472*****76</span>
            <span class="text-right">51</span>
          </div>

          <div class="grid grid-cols-4 px-6 py-4 items-center">
            <span>4</span>
            <span class="col-span-2">25474*****54</span>
            <span class="text-right">50</span>
          </div>

          <div class="grid grid-cols-4 px-6 py-4 items-center">
            <span>5</span>
            <span class="col-span-2">25479*****82</span>
            <span class="text-right">49</span>
          </div>

          <div class="grid grid-cols-4 px-6 py-4 items-center">
            <span>6</span>
            <span class="col-span-2">25479*****02</span>
            <span class="text-right">19</span>
          </div>

          <div class="grid grid-cols-4 px-6 py-4 items-center">
            <span>7</span>
            <span class="col-span-2">25472*****70</span>
            <span class="text-right">15</span>
          </div>

          <div class="grid grid-cols-4 px-6 py-4 items-center">
            <span>8</span>
            <span class="col-span-2">25474*****48</span>
            <span class="text-right">10</span>
          </div>

          <div class="grid grid-cols-4 px-6 py-4 items-center">
            <span>9</span>
            <span class="col-span-2">25471*****85</span>
            <span class="text-right">6</span>
          </div>

          <div
            class="grid grid-cols-4 px-6 py-4 items-center bg-red-50 dark:bg-red-900/20"
          >
            <span class="font-semibold">10</span>
            <span class="col-span-2 font-semibold">25411*****17</span>
            <span
              class="text-right font-bold text-red-600 dark:text-red-400"
            >
              5
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
