<script setup>
import { GiftIcon } from "@heroicons/vue/24/outline";
import { VueDatePicker } from "@vuepic/vue-datepicker";
import { useDark } from "@vueuse/core";
import { ref, toRefs } from "vue";
import { useAffiliateV2Store } from "../../stores/affiliate-v2";

const isDark = useDark();

const date = ref(new Date());

const { fetchLeaderboard } = useAffiliateV2Store();
const { prizes } = toRefs(useAffiliateV2Store());
fetchLeaderboard(date.value);
</script>
<template>
  <VueDatePicker
    v-model="date"
    :dark="isDark"
    @update:model-value="fetchLeaderboard(date)"
  />
  <div
    class="bg-white dark:bg-surface-elevated border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden mt-2 shadow-sm dark:shadow-none"
  >
    <div
      class="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-surface-sunken"
    >
      <h3 class="font-bold text-gray-900 dark:text-white">Prizes</h3>
      <span class="text-xs text-amber-600 dark:text-gold-bright animate-pulse"
        >● Live Updates</span
      >
    </div>
    <SparkleLoader v-if="pending" />
    <div v-else>
      <BaseEmptyState
        v-if="!prizes || !prizes.length"
        :icon="GiftIcon"
        title="No prizes yet"
        description="Prizes will appear here"
      />
      <div v-else>
        <div class="overflow-x-auto">
          <table
            class="w-full text-sm text-left text-gray-700 dark:text-gray-400"
          >
            <thead
              class="text-xs text-gray-700 dark:text-gray-400 uppercase bg-gray-100 dark:bg-background border-b border-gray-200 dark:border-gray-700"
            >
              <tr>
                <th scope="col" class="px-6 py-3">Position</th>
                <th scope="col" class="px-6 py-3">Prize</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(prize, index) in prizes"
                :key="prize.msisdn"
                :class="[
                  'border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-background transition-colors',
                  index % 2 === 0
                    ? 'bg-white dark:bg-surface-elevated'
                    : 'bg-gray-50/70 dark:bg-surface-elevated',
                ]"
              >
                <td class="px-6 py-4 font-mono font-semibold text-gray-900 dark:text-white">
                  {{ prize.position }}
                </td>
                <td class="px-6 py-4 font-mono font-semibold text-amber-600 dark:text-amber-400">
                  {{ prize.prize }}
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
