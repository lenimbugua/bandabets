<script setup>
import { UsersIcon } from "@heroicons/vue/24/outline";
import { VueDatePicker } from "@vuepic/vue-datepicker";
import { useDark } from "@vueuse/core";
import { ref, toRefs } from "vue";
import { useAffiliateV2Store } from "../../stores/affiliate-v2";
import SparkleLoader from "./SparkleLoader.vue";

const isDark = useDark();

const { fetchLeaderboard } = useAffiliateV2Store();
const { leaderBoard, earnings, pending } = toRefs(useAffiliateV2Store());
const date = ref(new Date());
fetchLeaderboard(date.value);

const { fetchEarnings } = useAffiliateV2Store();

fetchEarnings(date.value);

const itsMyRank = (rank) => {
  console.log(rank);
  console.log(earnings.value);
  return rank == earnings?.value?.rank;
};
</script>
<template>
  <VueDatePicker
    v-model="date"
    :dark="isDark"
    @update:model-value="fetchLeaderboard(date)"
  />
  <div
    class="bg-white dark:bg-surface-elevated border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden mt-2 mb-16 shadow-sm dark:shadow-none"
  >
    <div
      class="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-surface-sunken"
    >
      <h3 class="font-bold text-gray-900 dark:text-white">Leaderboard</h3>
      <span class="text-xs text-amber-600 dark:text-gold-bright animate-pulse"
        >● Live Updates</span
      >
    </div>
    <SparkleLoader v-if="pending" />
    <div v-else>
      <BaseEmptyState
        v-if="!leaderBoard || !leaderBoard.length"
        :icon="UsersIcon"
        title="No players yet"
        description="Rankings will appear here"
      />
      <div v-else>
        <div class="overflow-x-auto">
          <table class="w-full text-sm text-left text-gray-700 dark:text-gray-400">
            <thead
              class="text-xs text-gray-700 dark:text-gray-400 uppercase bg-gray-100 dark:bg-background border-b border-gray-200 dark:border-gray-700"
            >
              <tr>
                <th scope="col" class="px-3 py-3">Rank</th>
                <th scope="col" class="px-6 py-3">Player</th>
                <th scope="col" class="px-6 py-3">% Completed</th>
                <th scope="col" class="px-6 py-3 text-right">Reward</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(player, index) in leaderBoard"
                :key="player.msisdn"
                :class="[
                  itsMyRank(player.position)
                    ? 'bg-red-50 dark:bg-red-600/20 text-red-700 dark:text-red-400'
                    : [
                        'text-gray-700 dark:text-white',
                        index % 2 === 0
                          ? 'bg-white dark:bg-surface-elevated'
                          : 'bg-gray-50/70 dark:bg-surface-elevated',
                      ],
                ]"
                class="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-background transition-colors"
              >
                <td class="px-3 py-4 font-mono font-semibold text-gray-900 dark:text-white text-center">
                  {{ player.position }}
                </td>
                <td class="px-6 py-4 font-mono text-gray-700 dark:text-gray-300">
                  {{ itsMyRank(player.position) ? "You" : player.msisdn }}
                </td>
                <td class="px-6 py-4 font-mono text-gray-600 dark:text-gray-400">
                  {{ player.percentage }}
                </td>
                <td class="px-6 py-4 font-mono font-semibold text-amber-600 dark:text-amber-400 text-right">
                  {{ player.prize }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="px-6 py-3 bg-gray-50 dark:bg-surface-sunken border-t border-gray-200 dark:border-gray-700 text-center">
          <button
            class="text-xs text-gray-700 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            View All History
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
