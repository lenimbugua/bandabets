<script setup>
import { ref } from "vue";
// import { usePopular } from "../../composables/usePopular";
// import { useCasino } from "../../composables/useCasino";

// const { games: popularGames, allGames, newGames } = usePopular();
// const { launchCasino } = useCasino();

// Eligible games — all casino games (crash, slots, spins, etc.)
// const seenIds = new Set();
// const eligibleGames = [
//   ...popularGames.filter((g) => g.category_id === "crash" || g.category_id === "spins"),
//   ...newGames,
//   ...allGames,
// ].filter((g) => {
//   if (seenIds.has(g.id)) return false;
//   seenIds.add(g.id);
//   return true;
// });

// function playGame(game) {
//   launchCasino(game.id, game.gameName, game.routeName);
// }

const openTerm = ref(null);

function toggleTerm(index) {
  openTerm.value = openTerm.value === index ? null : index;
}

const prizeData = [
  { position: "1st Place", prize: "30,000", highlight: "gold" },
  { position: "2nd Place", prize: "25,000", highlight: "silver" },
  { position: "3rd Place", prize: "15,000", highlight: "bronze" },
  { position: "4th Place", prize: "10,000", highlight: "" },
  { position: "5th Place", prize: "10,000", highlight: "" },
  { position: "6th place", prize: "7,500", highlight: "" },
  { position: "7th Place", prize: "6,500", highlight: "" },
  { position: "8th Place", prize: "6,000 each", highlight: "" },
  { position: "9th Place", prize: "5,500 each", highlight: "" },
  { position: "10th Place", prize: "5,000 each", highlight: "" },
];

const sportsbookPoints = [
  { text: "Place a multibet with 3+ selections" },
  { text: "Each selection: odds of 1.6 or higher" },
  { text: "Earn 1 point per KES 20 staked" },
];

const casinoPoints = [
  { text: "Play with a 2x multiplier or higher" },
  { text: "Stake at least KES 20 per wager" },
  { text: "Earn 1 point per qualifying wager" },
];

// const prizeSummary = [
//   { label: "Top 5", amount: "200,000", colorClass: "text-gold-bright" },
//   { label: "6th-10th", amount: "40,000", colorClass: "text-brand-bright" },
//   { label: "11th-20th", amount: "40,000", colorClass: "text-brand-bright" },
//   { label: "21st-30th", amount: "20,000", colorClass: "text-gray-500 dark:text-gray-400" },
// ];

const termsContent = [
  {
    title: "1. Introduction",
    content: `1.1. These Terms and Conditions ("Terms") govern participation in the Bandabets Weekly Leaderboard Promotion ("Promotion"), operated by Bandabets ("the Company", "we", "us", or "our").\n\n1.2. By participating in the Promotion, you ("Participant", "Player", or "you") agree to be bound by these Terms, Bandabets's General Terms and Conditions, and Privacy Policy.\n\n1.3. The Promotion consists of two separate leaderboards: the Sportsbook Leaderboard and the Casino Leaderboard, each with a weekly prize pool of KES 300,000.`,
  },
  {
    title: "2. Eligibility",
    content: `2.1. To participate in the Promotion, you must:\na) Be at least 18 years of age or the legal gambling age in your jurisdiction;\nb) Hold a valid, verified Bandabets account in good standing;\nc) Be a resident of Kenya or any other jurisdiction where participation is legally permitted;\nd) Not be an employee, director, or immediate family member of Bandabets or its affiliates;\ne) Not have any pending disputes or unresolved issues with your Bandabets account.\n\n2.2. Bandabets reserves the right to verify the eligibility of any Participant at any time.`,
  },
  {
    title: "3. Promotion Period",
    content: `3.1. The Promotion runs on a weekly cycle, commencing every Monday at 00:00 EAT and ending the following Sunday at 23:59:59 EAT.\n\n3.2. The leaderboard resets at the start of each new Promotion Period. Points do not carry over.\n\n3.3. Bandabets reserves the right to modify, suspend, or terminate the Promotion at any time with reasonable notice.`,
  },
  {
    title: "4. Sportsbook Leaderboard Rules",
    content: `4.1. Qualifying Bets must contain a minimum of 3 selections, each with odds of 1.60 or higher, placed using real money.\n\n4.2. Earn 1 point for every KES 20 staked on qualifying bets, regardless of outcome.\n\n4.3. Non-qualifying: single bets, fewer than 3 selections, odds below 1.60, bonus funds, cashed-out or void bets.`,
  },
  {
    title: "5. Casino Leaderboard Rules",
    content: `5.1. Qualifying wagers must be on games with 2x+ multiplier, minimum KES 20 stake, using real money.\n\n5.2. Earn 1 point per qualifying wager, regardless of amount (above KES 20 minimum).\n\n5.3. All casino games with 2x+ multiplier qualify including slots, crash, table, and live games.\n\n5.4. Non-qualifying: wagers below KES 20, multipliers below 2x, bonus funds, void wagers.`,
  },
  {
    title: "6. Leaderboard Updates",
    content: `6.1. The leaderboard updates in real-time.\n\n6.2. View your position anytime via the Bandabets app or website.\n\n6.3. Positions are indicative and subject to final verification.\n\n6.4. Bandabets may make corrections at any time.`,
  },
  {
    title: "7. Fair Play & Anti-Fraud",
    content: `7.1. Bandabets may disqualify participants engaging in fraudulent activity including multiple accounts, collusion, bots, or exploiting glitches.\n\n7.2. Disqualified participants forfeit prizes and may have accounts suspended.\n\n7.3. Bandabets's decision on fair play matters is final.`,
  },
  {
    title: "8. General Terms",
    content: `8.1. Bandabets may modify, suspend, or terminate the Promotion at any time.\n\n8.2. In event of termination, prizes are awarded based on standings at time of termination.\n\n8.3. These Terms are governed by the laws of Kenya.\n\n8.4. Disputes are resolved through Bandabets's standard dispute resolution process.`,
  },
  {
    title: "9. Responsible Gambling",
    content: `9.1. Bandabets promotes responsible gambling. Participation should be for entertainment only.\n\n9.2. Set personal limits on deposits, wagers, and time spent gambling.\n\n9.3. Contact Bandabets support if you believe you may have a gambling problem.\n\n9.4. Gambling is restricted to persons 18 years and above. Please gamble responsibly.`,
  },
];
</script>

<template>
  <div
    class="min-h-dvh bg-white dark:bg-background text-primary-foreground dark:text-white overflow-x-hidden"
  >
    <!-- Hero Section -->
    <section class="relative py-4 md:py-4 px-4 overflow-hidden">
      <div class="absolute inset-0 pointer-events-none">
        <div
          class="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-brand-bright/5 blur-[120px]"
        />
        <div
          class="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-gold-bright/5 blur-[100px]"
        />
      </div>

      <div class="relative max-w-4xl mx-auto text-center">
        <div
          class="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-bright/30 bg-brand-bright/10 dark:bg-brand-bright/20 mb-6"
        >
          <Icon name="tabler:flame" class="w-4 h-4 text-brand-bright" />
          <span class="text-sm font-medium text-brand-bright">BANDABETS WEEKLY LEADERBOARD</span>
        </div>

        <h1 class="font-display text-xl md:text-xl lg:text-4xl font-bold leading-tight mb-6">
          Climb the Ranks.
          <span
            class="text-transparent bg-clip-text bg-linear-to-r from-gold-bright to-gold-deep"
          >
            Claim Your Cash.
          </span>
        </h1>

        <p class="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto mb-8">
          Compete weekly for a share of
          <span class="text-gold-bright font-bold">KES 300,000</span> in prizes.
          Place bets, earn points, and rise to the top.
        </p>

        <div class="flex flex-wrap justify-center gap-4 mb-12">
          <div
            class="bg-white dark:bg-surface-elevated border border-gray-100 dark:border-border-subtle rounded-2xl px-6 py-4 text-center"
          >
            <div class="text-2xl font-bold text-gold-bright font-display">KES 300K</div>
            <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">Weekly Prize Pool</div>
          </div>
          <div
            class="bg-white dark:bg-surface-elevated border border-gray-100 dark:border-border-subtle rounded-2xl px-6 py-4 text-center"
          >
            <div class="text-2xl font-bold text-brand-bright font-display">40</div>
            <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">Winners Every Week</div>
          </div>
          <div
            class="bg-white dark:bg-surface-elevated border border-gray-100 dark:border-border-subtle rounded-2xl px-6 py-4 text-center"
          >
            <div class="text-2xl font-bold font-display">2</div>
            <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">Leaderboards</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Leaderboards Section -->
    <section class="px-4 pb-16">
      <div class="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
        <!-- Sportsbook Card -->
        <div
          class="bg-white dark:bg-surface-elevated border border-gray-100 dark:border-border-subtle rounded-3xl p-8 relative overflow-hidden group hover:border-brand-bright/40 transition-all duration-500"
        >
          <div
            class="absolute top-0 right-0 w-32 h-32 bg-brand-bright/5 rounded-full blur-[60px] group-hover:bg-brand-bright/10 transition-all"
          />
          <div class="relative">
            <div class="w-14 h-14 rounded-2xl bg-brand-bright/15 flex items-center justify-center mb-5">
              <Icon name="tabler:trending-up" class="w-7 h-7 text-brand-bright" />
            </div>
            <h2 class="font-display text-2xl font-bold mb-2">Sportsbook Leaderboard</h2>
            <p class="text-gray-500 dark:text-gray-400 text-sm mb-6">
              Place qualifying multibets and watch your name rise!
            </p>

            <div class="space-y-4 mb-6">
              <h3 class="text-sm font-semibold text-brand-bright uppercase tracking-wider">
                Earning Points
              </h3>
              <div class="space-y-3">
                <div
                  v-for="(item, i) in sportsbookPoints"
                  :key="i"
                  class="flex items-start gap-3"
                >
                  <div
                    class="w-7 h-7 rounded-lg bg-brand-bright/10 flex items-center justify-center shrink-0 mt-0.5"
                  >
                    <Icon name="tabler:bolt" v-if="i === 1" class="w-3.5 h-3.5 text-brand-bright" />
                    <Icon name="tabler:star" v-else-if="i === 2" class="w-3.5 h-3.5 text-brand-bright" />
                    <svg
                      v-else
                      xmlns="http://www.w3.org/2000/svg"
                      class="w-3.5 h-3.5 text-brand-bright"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  </div>
                  <span class="text-sm text-gray-700 dark:text-gray-300">{{ item.text }}</span>
                </div>
              </div>
            </div>

            <div class="rounded-xl p-4 bg-gold-bright/5 border border-gold-bright/20">
              <div class="text-xs text-gold-bright font-semibold mb-1">EXAMPLE</div>
              <p class="text-sm text-gray-700 dark:text-gray-300">
                Stake
                <span class="dark:text-white text-primary-foreground font-medium">KES 1,000</span>
                on a qualifying multibet =
                <span class="text-brand-bright font-bold">50 points</span> earned
              </p>
            </div>

            <div class="mt-6 space-y-2">
              <h4 class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Quick Tips
              </h4>
              <ul class="space-y-1.5 text-xs text-gray-500 dark:text-gray-400">
                <li>* More legs = more excitement, same point value</li>
                <li>* Higher stakes = faster climb</li>
                <li>* Leaderboard updates live!</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Casino Card -->
        <div
          class="bg-white dark:bg-surface-elevated border border-gray-100 dark:border-border-subtle rounded-3xl p-8 relative overflow-hidden group hover:border-gold-bright/40 transition-all duration-500"
        >
          <div
            class="absolute top-0 right-0 w-32 h-32 bg-gold-bright/5 rounded-full blur-[60px] group-hover:bg-gold-bright/10 transition-all"
          />
          <div class="relative">
            <div class="w-14 h-14 rounded-2xl bg-gold-bright/15 flex items-center justify-center mb-5">
              <Icon name="tabler:box" class="w-7 h-7 text-gold-bright" />
            </div>
            <h2 class="font-display text-2xl font-bold mb-2">Casino Leaderboard</h2>
            <p class="text-gray-500 dark:text-gray-400 text-sm mb-6">Spin. Play. Get Paid.</p>

            <div class="space-y-4 mb-6">
              <h3 class="text-sm font-semibold text-gold-bright uppercase tracking-wider">
                Earning Points
              </h3>
              <div class="space-y-3">
                <div
                  v-for="(item, i) in casinoPoints"
                  :key="i"
                  class="flex items-start gap-3"
                >
                  <div
                    class="w-7 h-7 rounded-lg bg-gold-bright/10 flex items-center justify-center shrink-0 mt-0.5"
                  >
                    <Icon name="tabler:bolt" v-if="i === 0" class="w-3.5 h-3.5 text-gold-bright" />
                    <Icon name="tabler:star" v-else-if="i === 1" class="w-3.5 h-3.5 text-gold-bright" />
                    <svg
                      v-else
                      xmlns="http://www.w3.org/2000/svg"
                      class="w-3.5 h-3.5 text-gold-bright"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  </div>
                  <span class="text-sm text-gray-700 dark:text-gray-300">{{ item.text }}</span>
                </div>
              </div>
            </div>

            <div class="rounded-xl p-4 bg-gold-bright/5 border border-gold-bright/20">
              <div class="text-xs text-gold-bright font-semibold mb-1">EXAMPLE</div>
              <p class="text-sm text-gray-700 dark:text-gray-300">
                <span class="dark:text-white text-primary-foreground font-medium">50 qualifying casino bets</span>
                =
                <span class="text-gold-bright font-bold">50 points</span> earned
              </p>
            </div>

            <div class="mt-6 space-y-2">
              <h4 class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Quick Tips
              </h4>
              <ul class="space-y-1.5 text-xs text-gray-500 dark:text-gray-400">
                <li>* Every spin counts toward your total</li>
                <li>* Slots, crash, all qualify!</li>
                <li>* Track your progress in real-time</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

=    

    <!-- Prize Structure -->
    <section class="px-4 pb-16">
      <div class="max-w-4xl mx-auto">
        <div class="text-center mb-10">
          <div
            class="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold-bright/30 bg-gold-bright/10 dark:bg-gold-bright/20 mb-4"
          >
            <Icon name="tabler:gift" class="w-4 h-4 text-gold-bright" />
            <span class="text-sm font-medium text-gold-bright">PRIZE STRUCTURE</span>
          </div>
          <h2 class="font-display text-3xl md:text-4xl font-bold mb-2">
            Weekly Prize Pool:
            <span class="text-transparent bg-clip-text bg-linear-to-r from-gold-bright to-gold-deep">
              KES 300,000
            </span>
          </h2>
        </div>

        <!-- Prize Table -->
        <div
          class="bg-white dark:bg-surface-elevated border border-gray-100 dark:border-border-subtle rounded-3xl overflow-hidden"
        >
          <div class="grid grid-cols-2 px-6 py-4 border-b border-gray-200 dark:border-border-subtle">
            <div class="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Position
            </div>
            <div
              class="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 text-right"
            >
              Prize (KES)
            </div>
          </div>
          <div
            v-for="(row, i) in prizeData"
            :key="i"
            class="grid grid-cols-2 px-6 py-4 border-b border-gray-100 dark:border-border-subtle/50 last:border-0 transition-colors hover:bg-gray-50 dark:hover:bg-secondary"
            :class="{
              'bg-gold-bright/5': row.highlight === 'gold',
              'bg-gray-50 dark:bg-white/2': row.highlight === 'silver',
              'bg-gold-bright/2': row.highlight === 'bronze',
            }"
          >
            <div class="flex items-center gap-3">
              <Icon name="tabler:trophy" v-if="row.highlight === 'gold'" class="w-5 h-5 text-gold-bright" />
              <Icon name="tabler:trophy" v-else-if="row.highlight === 'silver'" class="w-5 h-5 text-gray-400" />
              <Icon
                name="tabler:trophy"
                v-else-if="row.highlight === 'bronze'"
                class="w-5 h-5 text-gold-bright/60"
              />
              <div v-else class="w-5" />
              <span
                class="font-medium text-sm"
                :class="{ 'text-gold-bright': row.highlight === 'gold' }"
              >
                {{ row.position }}
              </span>
            </div>
            <div
              class="text-right font-display font-bold text-lg"
              :class="{
                'text-gold-bright': row.highlight === 'gold',
                'dark:text-white text-primary-foreground': row.highlight !== 'gold' && i < 3,
                'text-gray-500 dark:text-gray-400': row.highlight !== 'gold' && i >= 3,
              }"
            >
              {{ row.prize }}
            </div>
          </div>
        </div>

        <!-- Prize Summary Cards -->
        <!-- <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
          <div
            v-for="(item, i) in prizeSummary"
            :key="i"
            class="bg-white dark:bg-surface-elevated border border-gray-100 dark:border-border-subtle rounded-2xl p-4 text-center"
          >
            <div class="text-xs text-gray-500 dark:text-gray-400 mb-1">{{ item.label }}</div>
            <div class="font-display font-bold" :class="item.colorClass">KES {{ item.amount }}</div>
          </div>
        </div> -->
      </div>
    </section>

    <!-- Winner Announcement -->
    <section class="px-4 pb-16">
      <div class="max-w-4xl mx-auto">
        <div
          class="bg-white dark:bg-surface-elevated border border-gray-100 dark:border-border-subtle rounded-3xl p-8 md:p-12 text-center relative overflow-hidden"
        >
          <div class="absolute inset-0 pointer-events-none">
            <div
              class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-brand-bright/5 blur-[80px]"
            />
          </div>
          <div class="relative">
            <div
              class="w-16 h-16 rounded-2xl bg-brand-bright/15 flex items-center justify-center mx-auto mb-6"
            >
              <Icon name="tabler:clock" class="w-8 h-8 text-brand-bright" />
            </div>
            <h2 class="font-display text-2xl md:text-3xl font-bold mb-3">Winner Announcement</h2>
            <div
              class="text-3xl md:text-4xl font-display font-bold text-transparent bg-clip-text bg-linear-to-r from-brand-bright to-brand-selected mb-4"
            >
              Every Monday at 2:00 PM.
            </div>
            <p class="text-gray-700 dark:text-gray-300 max-w-lg mx-auto">
              All prizes are credited automatically to winners' Bandabets wallets.
              <span class="dark:text-white text-primary-foreground font-medium">No action required</span>
              — just play, win, and get paid!
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Terms and Conditions -->
    <section class="px-4 pb-20">
      <div class="max-w-4xl mx-auto">
        <div class="text-center mb-8">
          <div
            class="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 dark:border-border-subtle bg-gray-50 dark:bg-surface-elevated/50 mb-4"
          >
            <Icon name="tabler:shield-check" class="w-4 h-4 text-gray-500 dark:text-gray-400" />
            <span class="text-sm font-medium text-gray-500 dark:text-gray-400">
              TERMS AND CONDITIONS:
            </span>
          </div>
        </div>

        <div class="space-y-2">
          <div
            v-for="(section, i) in termsContent"
            :key="i"
            class="bg-white dark:bg-surface-elevated border border-gray-100 dark:border-border-subtle rounded-xl overflow-hidden"
          >
            <button
              class="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gray-50 dark:hover:bg-secondary transition-colors"
              @click="toggleTerm(i)"
            >
              <span class="font-medium text-sm">{{ section.title }}</span>
              <Icon
                name="tabler:chevron-down"
                class="w-4 h-4 text-gray-500 dark:text-gray-400 transition-transform duration-300"
                :class="{ 'rotate-180': openTerm === i }"
              />
            </button>
            <div v-show="openTerm === i" class="px-6 pb-5">
              <p class="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-line leading-relaxed">
                {{ section.content }}
              </p>
            </div>
          </div>
        </div>

        <div class="text-center mt-8">
          <p class="text-xs text-gray-500 dark:text-gray-400 max-w-md mx-auto">
            By participating in the Bandabets Weekly Leaderboard Promotion, you acknowledge that you
            have read, understood, and agree to be bound by these Terms and Conditions.
          </p>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="border-t border-gray-200 dark:border-border-subtle py-8 px-4">
      <div class="max-w-4xl mx-auto text-center">
        <div class="flex items-center justify-center gap-2 mb-3">
          <Icon name="tabler:alert-triangle" class="w-4 h-4 text-gold-bright" />
          <span class="text-sm font-medium text-gold-bright">18+ | Gamble Responsibly</span>
        </div>
        <p class="text-xs text-gray-500 dark:text-gray-400">
          &copy; {{ new Date().getFullYear() }} Bandabets. All rights reserved.
        </p>
      </div>
    </footer>
  </div>
</template>
