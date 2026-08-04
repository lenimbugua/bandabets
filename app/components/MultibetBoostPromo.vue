<template>
  <div
    class="min-h-dvh bg-white text-primary-foreground dark:bg-background dark:text-white"
  >
    <!-- Hero -->
    <header class="relative overflow-hidden">
      <div
        class="absolute inset-0 opacity-10 pointer-events-none"
        :style="{
          background: `radial-gradient(1200px 400px at 50% -10%, var(--gold) 0%, transparent 60%), radial-gradient(800px 300px at 100% 0%, var(--primary) 0%, transparent 60%)`
        }"
      ></div>
      <div class="max-w-6xl mx-auto px-4 py-16 md:py-20 relative">
        <div class="text-center space-y-4">
          <span
            class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-dark text-white text-sm font-semibold shadow-sm"
          >
            ⚡ Promotion
          </span>
          <h1 class="text-3xl md:text-5xl font-extrabold leading-tight">
            Bandabets Multibet Boost –
            <span class="text-gold-bright">Supercharge Your Wins!</span>
          </h1>
          <p class="text-base md:text-lg opacity-90 max-w-3xl mx-auto">
            Maximize your winning potential with our tiered boost system that
            rewards bigger combinations with even bigger returns.
          </p>
        </div>
      </div>
    </header>

    <main class="max-w-6xl mx-auto px-4 pb-20 space-y-12">
      <!-- Overview -->
      <section class="grid md:grid-cols-3 gap-6">
        <div
          class="md:col-span-2 bg-gray-50 dark:bg-surface-sunken rounded-2xl p-6 shadow-sm"
        >
          <h2 class="text-2xl font-bold mb-2">Promotion Overview</h2>
          <p class="leading-relaxed">
            Transform your strategy from single bets to powerful combinations
            that multiply your excitement and potential rewards. Whether you’re
            backing your favorite football teams or mixing sports entirely, our
            boost system ensures maximum value from your multi-selection
            expertise.
          </p>
          <div
            class="mt-4 p-4 rounded-xl bg-white/60 dark:bg-white/5 border border-black/5 dark:border-white/10"
          >
            <p class="font-semibold">The More You Combine, The More You Gain</p>
            <p class="text-sm opacity-90">
              As you add more selections to your multibet, your bonus percentage
              increases – rewarding your confidence and knowledge with extra
              winnings on top of your regular odds.
            </p>
          </div>
        </div>

        <div
          class="bg-brand-dark text-white rounded-2xl p-6 shadow-sm flex flex-col justify-between"
        >
          <div>
            <h3 class="text-xl font-bold">Quick Facts</h3>
            <ul class="mt-3 space-y-2 text-sm">
              <li class="flex items-start gap-2">
                <span>✅</span
                ><span>Minimum stake: <strong>KES 10</strong></span>
              </li>
              <li class="flex items-start gap-2">
                <span>✅</span><span>Min selections: <strong>3+</strong></span>
              </li>
              <li class="flex items-start gap-2">
                <span>✅</span
                ><span>Min odds per leg: <strong>1.30</strong></span>
              </li>
              <li class="flex items-start gap-2">
                <span>✅</span><span>Min total odds: <strong>3.0</strong></span>
              </li>
            </ul>
          </div>
          <div class="mt-6">
            <div class="h-2 w-full rounded-full bg-white/30 overflow-hidden">
              <div class="h-full w-2/3 bg-gold-bright"></div>
            </div>
            <p class="text-xs mt-2 opacity-90">Boost meter (illustrative)</p>
          </div>
        </div>
      </section>

      <!-- Boost Structure / Matrix -->
      <section class="space-y-6">
        <div class="flex items-center justify-between">
          <h2 class="text-2xl font-bold">Boost Structure</h2>
          <span
            class="inline-flex items-center gap-2 text-sm px-3 py-1 rounded-full bg-gold-bright text-primary-foreground font-semibold"
          >
            📈 Progressive Boost Matrix
          </span>
        </div>

        <div class="grid md:grid-cols-3 gap-6">
          <!-- Tier card: Example 5 selections -->
          <div class="rounded-2xl p-6 shadow-sm bg-gray-50 dark:bg-surface-sunken">
            <div class="flex items-center justify-between">
              <h3 class="text-lg font-bold">5 Selections</h3>
              <span
                class="px-3 py-1 rounded-full bg-gold-bright text-primary-foreground text-xs font-bold"
                >+7%</span
              >
            </div>
            <p class="text-sm mt-2 opacity-90">
              Bigger combo, bigger boost. Great entry to feel the boost kick in.
            </p>
          </div>

          <!-- Tier card: Example 15 selections -->
          <div class="rounded-2xl p-6 shadow-sm bg-gray-50 dark:bg-surface-sunken">
            <div class="flex items-center justify-between">
              <h3 class="text-lg font-bold">15 Selections</h3>
              <span
                class="px-3 py-1 rounded-full bg-gold-bright text-primary-foreground text-xs font-bold"
                >+34%</span
              >
            </div>
            <p class="text-sm mt-2 opacity-90">
              Advanced level – serious boost potential for seasoned bettors.
            </p>
          </div>

          <!-- Tier card: Ultimate Challenge -->
          <div
            class="rounded-2xl p-6 shadow-sm bg-gradient-gold text-accent-foreground"
          >
            <div class="flex items-center justify-between">
              <h3 class="text-lg font-extrabold">30-Selection Ultimate</h3>
              <span
                class="px-3 py-1 rounded-full bg-white text-primary-foreground text-xs font-extrabold"
                >+100%</span
              >
            </div>
            <p class="text-sm mt-2">
              The Crown Jewel: Successfully predict 30 selections and
              <strong>DOUBLE YOUR WINNINGS!</strong>
            </p>
          </div>
        </div>

        <!-- Calculation Examples -->
        <div class="grid md:grid-cols-3 gap-6">
          <div
            class="rounded-2xl p-6 shadow-sm bg-white dark:bg-surface-sunken border border-black/5 dark:border-white/10"
          >
            <h4 class="font-semibold">5-Selection (7% Boost)</h4>
            <ul class="text-sm mt-2 space-y-1 opacity-90">
              <li>Odds: 2.0 × 1.8 × 2.2 × 1.9 × 2.1 = <strong>30.3</strong></li>
              <li>Stake: <strong>KES 100</strong></li>
              <li>Standard payout: <strong>KES 3,030</strong></li>
              <li>With 7%: <strong>KES 3,242.10</strong> (+KES 212.10)</li>
            </ul>
          </div>

          <div
            class="rounded-2xl p-6 shadow-sm bg-white dark:bg-surface-sunken border border-black/5 dark:border-white/10"
          >
            <h4 class="font-semibold">15-Selection (34% Boost)</h4>
            <ul class="text-sm mt-2 space-y-1 opacity-90">
              <li>Combined odds: <strong>1,250.0</strong></li>
              <li>Stake: <strong>KES 100</strong></li>
              <li>Standard payout: <strong>KES 125,000</strong></li>
              <li>With 34%: <strong>KES 167,500</strong> (+KES 42,500)</li>
            </ul>
          </div>

          <div
            class="rounded-2xl p-6 shadow-sm bg-white dark:bg-surface-sunken border border-black/5 dark:border-white/10"
          >
            <h4 class="font-semibold">30-Selection (100% Boost)</h4>
            <ul class="text-sm mt-2 space-y-1 opacity-90">
              <li>Combined odds: <strong>50,000.0</strong></li>
              <li>Stake: <strong>KES 100</strong></li>
              <li>Standard payout: <strong>KES 5,000,000</strong></li>
              <li>
                With 100%: <strong>KES 10,000,000</strong> (+KES 5,000,000)
              </li>
            </ul>
          </div>
        </div>
      </section>

      <!-- How to Qualify -->
      <section class="grid md:grid-cols-2 gap-6">
        <div class="rounded-2xl p-6 shadow-sm bg-gray-50 dark:bg-surface-sunken">
          <h2 class="text-2xl font-bold mb-2">How to Qualify</h2>
          <h3 class="font-semibold">Minimum Requirements</h3>
          <ul class="mt-2 text-sm space-y-1 opacity-90">
            <li>• Minimum <strong>3 selections</strong> per multibet</li>
            <li>• Minimum odds per leg: <strong>1.30</strong></li>
            <li>• Minimum total odds: <strong>3.0</strong></li>
            <li>• Minimum stake: <strong>KES 10</strong></li>
          </ul>
        </div>

        <div class="rounded-2xl p-6 shadow-sm bg-gray-50 dark:bg-surface-sunken">
          <h3 class="font-semibold">Eligible Sports & Markets</h3>
          <ul class="mt-2 text-sm space-y-1 opacity-90">
            <li>• Football, Basketball, Tennis, Cricket, Rugby, Boxing/MMA</li>
            <li>• <strong>Pre-match markets only</strong></li>
          </ul>
          <h4 class="mt-4 font-semibold">Popular Bet Types</h4>
          <ul class="mt-2 text-sm space-y-1 opacity-90">
            <li>• Match Result (1X2)</li>
            <li>• Over/Under Goals/Points</li>
            <li>• Both Teams to Score</li>
            <li>• Handicap betting</li>
          </ul>
        </div>
      </section>

      <!-- Terms & Conditions -->
      <section class="space-y-6">
        <h2 class="text-2xl font-bold">Terms & Conditions</h2>

        <div class="grid md:grid-cols-2 gap-6">
          <div
            class="rounded-2xl p-6 shadow-sm bg-white dark:bg-surface-sunken border border-black/5 dark:border-white/10"
          >
            <h3 class="font-semibold">Eligibility Requirements</h3>
            <ul class="mt-2 text-sm space-y-1 opacity-90">
              <li>• Available to all registered Bandabets customers</li>
              <li>• Valid on <strong>pre-match</strong> bets only</li>
              <li>
                • All selections must be from
                <strong>different matches/events</strong>
              </li>
              <li>
                • Maximum boost amount: <strong>KES 100,000</strong> per
                multibet
              </li>
            </ul>

            <h3 class="font-semibold mt-6">Bet Validation Rules</h3>
            <ul class="mt-2 text-sm space-y-1 opacity-90">
              <li>
                • <strong>All selections must win</strong> for boost to apply
              </li>
              <li>• Void/cancelled selections invalidate the boost</li>
              <li>• Cash-out forfeits boost eligibility</li>
              <li>
                • Boost applies to <strong>net winnings only</strong> (stake
                excluded)
              </li>
              <li>
                • Max boost cap: <strong>KES 100,000</strong> per multibet
              </li>
            </ul>
          </div>

          <div
            class="rounded-2xl p-6 shadow-sm bg-white dark:bg-surface-sunken border border-black/5 dark:border-white/10"
          >
            <h3 class="font-semibold">Excluded Markets</h3>
            <ul class="mt-2 text-sm space-y-1 opacity-90">
              <li>• Virtual sports & esports</li>
              <li>• Special/novelty bets</li>
              <li>• System/combination bets</li>
              <li>• Same-game multiples</li>
            </ul>

            <h3 class="font-semibold mt-6">General Terms</h3>
            <ul class="mt-2 text-sm space-y-1 opacity-90">
              <li>• Boost calculated automatically on placement</li>
              <li>• Winnings credited upon settlement</li>
              <li>• Subject to Bandabets’s standard terms & conditions</li>
              <li>• Bandabets may modify/terminate anytime</li>
              <li>• One multibet boost per customer per day</li>
              <li>• Suspicious patterns may void eligibility</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- Getting Started & Pro Tips -->
      <section class="grid md:grid-cols-2 gap-6">
        <div class="rounded-2xl p-6 shadow-sm bg-gray-50 dark:bg-surface-sunken">
          <h2 class="text-2xl font-bold mb-2">Getting Started</h2>
          <ol
            class="mt-2 text-sm space-y-2 opacity-90 list-decimal list-inside"
          >
            <li>Select Your Matches: pick favorites across sports</li>
            <li>Add to Betslip: minimum 3 selections at 1.30+</li>
            <li>Check Your Boost: auto-calculated percentage</li>
            <li>Place Your Bet: min stake KES 10</li>
            <li>Watch & Win: enjoy enhanced returns when all win!</li>
          </ol>
        </div>

        <div class="rounded-2xl p-6 shadow-sm bg-gray-50 dark:bg-surface-sunken">
          <h3 class="font-semibold">Pro Tips for Success</h3>
          <ul class="mt-2 text-sm space-y-2 opacity-90">
            <li>• Start with 3–5 selections to learn the system</li>
            <li>• Mix safer odds (1.30–2.0) with moderate risks</li>
            <li>• Research thoroughly—higher counts need precision</li>
            <li>• Diversify sports & leagues to spread risk</li>
            <li>• Consider timing to reduce correlation</li>
            <li>• Manage stakes wisely; all selections must win</li>
            <li>• Track progress with live scores</li>
            <li>
              • Dream big: a perfect 30-leg <strong>doubles</strong> your
              winnings
            </li>
          </ul>
        </div>
      </section>

      <!-- CTA -->
      <section
        class="text-center py-12 rounded-2xl shadow-lg bg-brand-dark text-white"
      >
        <h2 class="text-3xl font-extrabold">Ready to Boost Your Multibets?</h2>
        <p class="mt-2 opacity-95">
          Turn smart combinations into amplified winnings with Bandabets Multibet
          Boost.
        </p>
        <div
          class="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <RouterLink
            :to="{ name: 'home' }"
            class="px-6 py-3 rounded-xl font-bold bg-gold-bright text-primary-foreground shadow-sm hover:scale-105 transition"
            >Start Building a Multibet</RouterLink
          >
          <RouterLink
            class="px-6 py-3 rounded-xl font-bold bg-white text-primary-foreground shadow-sm hover:scale-105 transition"
            href="#"
            >View Eligible Markets</RouterLink
          >
        </div>
        <p class="mt-4 text-xs opacity-90">18+ | Play responsibly</p>
      </section>
    </main>
  </div>
</template>
