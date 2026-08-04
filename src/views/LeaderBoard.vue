<script setup>
import EligibleCasinoGame from "@/components/leaderboard/EligibleCasinoGame.vue";
import {
  CalendarIcon,
  GiftIcon,
  InformationCircleIcon,
  PuzzlePieceIcon,
  TrophyIcon,
  ViewfinderCircleIcon,
} from "@heroicons/vue/24/outline";
import { computed, ref, toRefs } from "vue";
import { useLeaderboardStore } from "../stores/leaderboard";
import { useLoginStore } from "../stores/login";
import formatStuff from "../utilities/format-stuff";

const { formattedNumber, formCloudflareImage } = formatStuff();

const podiumImageId = "decc1027-a40f-4a67-01cf-fe902dd13400";

const store = useLeaderboardStore();
const { fetchLeaderboard, setSelected } = store;
const { isSelected, categories, pending, leaderboard } = toRefs(store);

const loginStore = useLoginStore();
const { msisdn } = toRefs(loginStore);

const myRank = computed(() => {
  if (!msisdn.value || !leaderboard.value?.length) return null;
  return leaderboard.value.find((p) => p.msisdn === msisdn.value) || null;
});

fetchLeaderboard();

const showHowPoints = ref(false);
const casinoSubTab = ref("leaderboard");

const getCurrentWeek = () => {
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 1);
  const daysPassed = Math.floor((now - startOfYear) / (24 * 60 * 60 * 1000));
  const weekNumber = Math.ceil((daysPassed + startOfYear.getDay() + 1) / 7);
  return weekNumber.toString().padStart(2, "0");
};

const firstPlace = computed(() => leaderboard.value?.[0]);
const secondPlace = computed(() => leaderboard.value?.[1]);
const thirdPlace = computed(() => leaderboard.value?.[2]);

const tablePlayers = computed(() => {
  if (!leaderboard.value?.length) return [];
  return leaderboard.value.slice(3);
});

const handleTabChange = (category) => {
  setSelected(category);
  casinoSubTab.value = "leaderboard";
};
</script>

<template>
  <div class="min-h-screen bg-background pb-8">
    <!-- Header -->
    <div class="px-4 md:px-6 py-4 flex items-start justify-between gap-3">
      <div>
        <h1 class="text-xl md:text-2xl font-bold text-foreground">
          Leaderboards
        </h1>
        <p class="text-sm text-muted-foreground mt-0.5">
          Compete for the top spot and win
          <span class="text-brand-bright font-semibold">KES 150,000 Weekly!</span>
        </p>
      </div>

      <!-- Sport / Casino Tab Switcher -->
      <div
        class="relative inline-grid grid-cols-2 bg-card rounded-lg border border-border/50 p-0.5 shrink-0"
      >
        <div
          class="absolute top-0.5 bottom-0.5 rounded-md bg-brand-bright transition-all duration-300 ease-in-out"
          :style="{
            left: isSelected(categories[0]) ? '2px' : '50%',
            width: 'calc(50% - 2px)',
          }"
        />
        <button
          :class="[
            'relative z-10 flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-colors whitespace-nowrap',
            isSelected(categories[0])
              ? 'text-white'
              : 'text-muted-foreground hover:text-foreground',
          ]"
          @click="handleTabChange(categories[0])"
        >
          <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 2l3 7h-6l3-7z M2.5 9.5l6.5 2-4 5.5z M21.5 9.5l-6.5 2 4 5.5z M7 21l2-6.5h6l2 6.5z" />
          </svg>
          Sport
        </button>
        <button
          :class="[
            'relative z-10 flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-colors whitespace-nowrap',
            isSelected(categories[1])
              ? 'text-white'
              : 'text-muted-foreground hover:text-foreground',
          ]"
          @click="handleTabChange(categories[1])"
        >
          <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C12 2 4 10 4 14a4 4 0 004 4c1.5 0 2.8-.8 3.5-2-.2 1.8-.8 3.5-1.5 4h4c-.7-.5-1.3-2.2-1.5-4 .7 1.2 2 2 3.5 2a4 4 0 004-4c0-4-8-12-8-12z" />
          </svg>
          Casino
        </button>
      </div>
    </div>

    <!-- How Points + Prize Banner -->
    <div class="px-4 md:px-6 mb-4 flex gap-3">
      <!-- How Points Work -->
      <button
        class="flex-1 bg-card rounded-xl p-3 md:p-4 border border-border/50 text-left transition-colors hover:bg-accent/30"
        @click="showHowPoints = !showHowPoints"
      >
        <div class="flex items-center gap-1.5 text-brand-bright text-xs font-semibold mb-1">
          <InformationCircleIcon class="w-4 h-4" />
          How Points Work
        </div>
        <p
          v-if="isSelected(categories[0])"
          class="text-xs text-muted-foreground leading-relaxed"
        >
          Place a multibet with <span class="font-semibold text-foreground">3+ selections</span>
          at <span class="font-semibold text-foreground">1.6+</span> odds.
          Earn <span class="text-brand-bright font-semibold">1 point</span> per KES 20 staked.
        </p>
        <p
          v-else
          class="text-xs text-muted-foreground leading-relaxed"
        >
          Play with a <span class="font-semibold text-foreground">2x+</span> multiplier,
          stake at least <span class="font-semibold text-foreground">KES 20</span>.
          Earn <span class="text-brand-bright font-semibold">1 point</span> per wager.
        </p>
      </button>

      <!-- Prize Banner -->
      <div
        class="flex-1 rounded-xl bg-linear-to-br from-brand-bright/10 to-gold-bright/10 dark:from-brand-bright/15 dark:to-gold-bright/10 p-3 md:p-4 border border-brand-bright/20 flex items-center"
      >
        <div>
          <p class="text-xs font-semibold text-foreground">
            Earn Points, Climb the Ranks!
          </p>
          <p class="text-sm font-bold text-brand-bright mt-0.5">
            Win KES 150,000 Weekly!
          </p>
        </div>
      </div>
    </div>

    <!-- Loading -->
    <BetsLoader v-if="pending" />

    <template v-else>
      <!-- Info Cards -->
      <div class="px-4 md:px-6 mb-4 grid grid-cols-3 gap-2 md:gap-3">
        <div class="bg-card rounded-xl p-3 border border-border/50">
          <div class="flex items-center gap-1.5 mb-1.5">
            <div class="w-5 h-5 rounded-md bg-muted flex items-center justify-center">
              <CalendarIcon class="w-3 h-3 text-muted-foreground" />
            </div>
            <span class="text-[10px] text-muted-foreground">Period</span>
          </div>
          <p class="text-xs md:text-sm font-bold text-foreground tabular-nums">
            2026, Wk {{ getCurrentWeek() }}
          </p>
        </div>

        <div class="bg-card rounded-xl p-3 border border-border/50">
          <div class="flex items-center gap-1.5 mb-1.5">
            <div class="w-5 h-5 rounded-md bg-brand-bright/10 flex items-center justify-center">
              <ViewfinderCircleIcon class="w-3 h-3 text-brand-bright" />
            </div>
            <span class="text-[10px] text-muted-foreground">Min Points</span>
          </div>
          <p class="text-xs md:text-sm font-bold text-brand-bright tabular-nums">
            5 Points
          </p>
        </div>

        <div class="bg-card rounded-xl p-3 border border-brand-bright/40 shadow-glow-green">
          <div class="flex items-center gap-1.5 mb-1.5">
            <div class="w-5 h-5 rounded-md bg-brand-bright/10 flex items-center justify-center">
              <GiftIcon class="w-3 h-3 text-brand-bright" />
            </div>
            <span class="text-[10px] text-muted-foreground">Weekly Prize</span>
          </div>
          <p class="text-xs md:text-sm font-bold text-brand-bright tabular-nums">
            KES 150,000
          </p>
        </div>
      </div>

      <!-- My Rank -->
      <div
        v-if="myRank"
        class="mx-4 md:mx-6 mb-4 bg-linear-to-r from-brand-bright/10 to-brand-bright/5 dark:from-brand-bright/15 dark:to-brand-bright/5 rounded-xl p-4 border border-brand-bright/30"
      >
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div
              class="w-11 h-11 rounded-full bg-brand-bright flex items-center justify-center text-white font-bold text-sm shadow-md"
            >
              #{{ myRank.position }}
            </div>
            <div>
              <p class="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">
                My Rank
              </p>
              <p class="text-sm font-bold text-foreground">
                {{ myRank.msisdn }}
              </p>
            </div>
          </div>
          <div class="text-right">
            <p class="text-xs text-muted-foreground">Points</p>
            <p class="text-sm font-bold text-brand-bright tabular-nums">
              {{ myRank.points }}
            </p>
            <p
              v-if="myRank.prizeAmount"
              class="text-xs font-semibold text-gold-bright tabular-nums"
            >
              {{ formattedNumber(myRank.prizeAmount) }} KES
            </p>
          </div>
        </div>
      </div>

      <!-- Casino Sub-Tabs -->
      <div
        v-if="isSelected(categories[1])"
        class="px-4 md:px-6 mb-3 flex justify-end"
      >
        <div
          class="relative inline-grid grid-cols-2 bg-card rounded-lg border border-border/50 p-0.5"
        >
          <div
            class="absolute top-0.5 bottom-0.5 rounded-md bg-brand-bright transition-all duration-300 ease-in-out"
            :style="{
              left: casinoSubTab === 'leaderboard' ? '2px' : '50%',
              width: 'calc(50% - 2px)',
            }"
          />
          <button
            class="relative z-10 flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-colors whitespace-nowrap"
            :class="casinoSubTab === 'leaderboard' ? 'text-white' : 'text-muted-foreground'"
            @click="casinoSubTab = 'leaderboard'"
          >
            <TrophyIcon class="w-3.5 h-3.5" />
            Leaderboard
          </button>
          <button
            class="relative z-10 flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-colors whitespace-nowrap"
            :class="casinoSubTab === 'games' ? 'text-white' : 'text-muted-foreground'"
            @click="casinoSubTab = 'games'"
          >
            <PuzzlePieceIcon class="w-3.5 h-3.5" />
            Eligible Games
          </button>
        </div>
      </div>

      <!-- Eligible Games (Casino only) -->
      <div
        v-if="isSelected(categories[1]) && casinoSubTab === 'games'"
        class="px-4 md:px-6"
      >
        <EligibleCasinoGame />
      </div>

      <!-- Podium + Table -->
      <template v-if="isSelected(categories[0]) || casinoSubTab === 'leaderboard'">
        <!-- Podium -->
        <div
          v-if="leaderboard && leaderboard.length >= 3"
          class="px-4 md:px-6 mb-4"
        >
          <div class="relative overflow-hidden rounded-xl max-w-sm md:max-w-md mx-auto">
            <img
              :src="formCloudflareImage(podiumImageId)"
              alt="Leaderboard Podium"
              loading="lazy"
              class="w-full object-cover"
            />

            <!-- Overlay with player info -->
            <div
              class="absolute bottom-0 inset-x-0 bg-linear-to-t from-black/80 via-black/50 to-transparent pt-10 pb-3 px-2"
            >
              <div class="grid grid-cols-3 gap-1">
                <!-- 2nd Place -->
                <div class="text-center">
                  <div
                    class="inline-flex items-center justify-center w-6 h-6 rounded-full text-[10px] font-bold text-foreground bg-linear-to-br from-gray-200 to-gray-400 mb-1"
                  >
                    2
                  </div>
                  <p class="text-[10px] md:text-xs font-semibold text-white/90 truncate px-1">
                    {{ secondPlace?.msisdn }}
                  </p>
                  <p class="text-[10px] md:text-xs font-bold text-gray-300 tabular-nums">
                    {{ formattedNumber(secondPlace?.prizeAmount) }} KES
                  </p>
                </div>

                <!-- 1st Place -->
                <div class="text-center">
                  <div
                    class="inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold text-gray-900 bg-linear-to-br from-yellow-300 to-amber-500 mb-1 ring-2 ring-yellow-400/50"
                  >
                    1
                  </div>
                  <p class="text-[11px] md:text-sm font-bold text-white truncate px-1">
                    {{ firstPlace?.msisdn }}
                  </p>
                  <p class="text-[11px] md:text-sm font-bold text-gold-bright tabular-nums">
                    {{ formattedNumber(firstPlace?.prizeAmount) }} KES
                  </p>
                </div>

                <!-- 3rd Place -->
                <div class="text-center">
                  <div
                    class="inline-flex items-center justify-center w-6 h-6 rounded-full text-[10px] font-bold text-gray-900 bg-linear-to-br from-orange-300 to-amber-600 mb-1"
                  >
                    3
                  </div>
                  <p class="text-[10px] md:text-xs font-semibold text-white/90 truncate px-1">
                    {{ thirdPlace?.msisdn }}
                  </p>
                  <p class="text-[10px] md:text-xs font-bold text-amber-400 tabular-nums">
                    {{ formattedNumber(thirdPlace?.prizeAmount) }} KES
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div class="text-center mt-3">
            <p class="text-sm font-semibold text-foreground">
              Claim your winnings weekly
            </p>
            <p class="text-xs text-brand-bright font-medium mt-0.5">
              Each stake brings you closer to the top
            </p>
          </div>
        </div>

        <!-- Rankings Table (4th+) -->
        <div
          v-if="tablePlayers.length"
          class="mx-4 md:mx-6 mb-4 bg-card rounded-xl border border-border/50 overflow-hidden"
        >
          <!-- Table header -->
          <div
            class="grid grid-cols-4 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground bg-accent/50 border-b border-border/50"
          >
            <span>Rank</span>
            <span>Player</span>
            <span class="text-center">Points</span>
            <span class="text-right">Prize</span>
          </div>

          <!-- Table rows -->
          <div
            v-for="player in tablePlayers"
            :key="player.msisdn"
            :class="[
              'grid grid-cols-4 px-4 py-2.5 text-sm items-center border-t border-border/30 transition-colors',
              msisdn && player.msisdn === msisdn
                ? 'bg-brand-bright/10 border-brand-bright/30'
                : 'hover:bg-accent/30',
            ]"
          >
            <span class="font-bold text-foreground tabular-nums">
              {{ player.position }}
            </span>
            <span class="text-sm text-muted-foreground">
              {{ player.msisdn }}
            </span>
            <span class="text-center text-sm text-muted-foreground tabular-nums">
              {{ player.points }}
            </span>
            <span class="text-right text-sm font-semibold tabular-nums" :class="player.prizeAmount ? 'text-gold-bright' : 'text-muted-foreground/50'">
              {{ player.prizeAmount ? formattedNumber(player.prizeAmount) : "-" }}
            </span>
          </div>
        </div>

        <!-- Empty State -->
        <BaseEmptyState
          v-if="!leaderboard || leaderboard.length === 0"
          :icon="TrophyIcon"
          title="No rankings yet"
          description="Start playing to see rankings!"
        />
      </template>
    </template>

    <!-- Footer Note -->
    <div class="text-center px-4 md:px-6 mt-2">
      <p class="text-xs text-muted-foreground">
        Leaderboard updates in real-time. Keep wagering to climb to the top!
      </p>
    </div>
  </div>
</template>
