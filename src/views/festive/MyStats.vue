<script setup>
import { ChartBarIcon, UserGroupIcon } from "@heroicons/vue/24/outline";
import { useDark } from "@vueuse/core";
import { toRefs } from "vue";

import { useAffiliateV2Store } from "../../stores/affiliate-v2";
import SparkleLoader from "./SparkleLoader.vue";

import { VueDatePicker } from "@vuepic/vue-datepicker";
import { ref } from "vue";

const isDark = useDark();
const date = ref(new Date());
const { fetchEarnings } = useAffiliateV2Store();
const { earnings, pending } = toRefs(useAffiliateV2Store());
console.log(earnings.value);

fetchEarnings(date.value);
</script>
<template>
  <section class="mb-16">
    <SparkleLoader v-if="pending" />
    <div v-else>
      <BaseEmptyState
        v-if="!earnings"
        :icon="UserGroupIcon"
        title="No friends invited yet"
        description="Invite friends to start earning bonuses!"
      />
      <div v-else class="container mx-auto pb-20">
        <VueDatePicker
          v-model="date"
          :teleport="true"
          menu-class="datepicker-fix-zindex"
          :dark="isDark"
          @update:model-value="fetchEarnings(date)"
        />
        <div class="flex flex-col lg:flex-row gap-8 mt-2">
          <div class="w-full">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div
                class="bg-white dark:bg-surface-elevated p-4 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm dark:shadow-none"
              >
                <p
                  class="text-xs text-gray-700 dark:text-gray-400 uppercase font-bold"
                >
                  Sent
                </p>
                <p
                  class="text-2xl font-black text-gray-900 dark:text-white mt-1"
                >
                  {{ earnings.sent }}
                </p>
              </div>
              <div
                class="bg-white dark:bg-surface-elevated p-4 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm dark:shadow-none relative overflow-hidden"
              >
                <div class="absolute top-0 right-0 p-1">
                  <span class="flex h-2 w-2 relative">
                    <span
                      class="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-dark opacity-75"
                    ></span>
                    <span
                      class="relative inline-flex rounded-full h-2 w-2 bg-brand-dark"
                    ></span>
                  </span>
                </div>
                <p
                  class="text-xs text-gray-700 dark:text-gray-400 uppercase font-bold"
                >
                  Signed Up
                </p>
                <p class="text-2xl font-black text-brand-dark mt-1">
                  {{ earnings.signedUp }}
                </p>
              </div>
              <div
                class="bg-white dark:bg-surface-elevated p-4 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm dark:shadow-none"
              >
                <p
                  class="text-xs text-gray-700 dark:text-gray-400 uppercase font-bold"
                >
                  My Earnings
                </p>
                <p class="text-2xl font-black text-gold-bright mt-1">
                  <span class="text-sm">KES</span> {{ earnings.earnings }}
                </p>
              </div>
              <div
                class="bg-linear-to-br from-gold to-primary backdrop-blur-lg p-4 rounded-2xl text-white"
              >
                <p class="text-xs opacity-80 uppercase font-bold">Rank</p>
                <p class="text-2xl font-black mt-1">#{{ earnings.rank }}</p>
              </div>
            </div>
            <div
              class="bg-white dark:bg-surface-elevated border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden shadow-sm dark:shadow-none"
            >
              <div
                class="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-surface-sunken"
              >
                <h3 class="font-bold text-gray-900 dark:text-white">
                  Live Referral Feed
                </h3>
                <span
                  class="text-xs text-warning dark:text-gold-bright animate-pulse"
                  >● Live Updates</span
                >
              </div>
              <BaseEmptyState
                v-if="!earnings.details || !earnings.details.length"
                :icon="ChartBarIcon"
                title="No data yet"
                description="Invite friends to start earning bonuses!"
              />
              <div v-else class="overflow-x-auto">
                <table class="w-full text-sm text-left text-gray-700 dark:text-gray-400">
                  <thead
                    class="text-xs text-gray-700 dark:text-gray-400 uppercase bg-gray-100 dark:bg-background border-b border-gray-200 dark:border-gray-700"
                  >
                    <tr>
                      <th scope="col" class="px-6 py-3">Friend</th>
                      <th scope="col" class="px-6 py-3">Status</th>
                      <th scope="col" class="px-6 py-3 text-right">Reward</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(detail, index) in earnings.details"
                      :key="detail.msisdn"
                      :class="[
                        'border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-background transition-colors',
                        index % 2 === 0
                          ? 'bg-white dark:bg-transparent'
                          : 'bg-gray-50/70 dark:bg-transparent',
                      ]"
                    >
                      <td
                        class="px-6 py-4 font-mono text-gray-900 dark:text-white"
                      >
                        {{ detail.msisdn }}
                      </td>
                      <td class="px-6 py-4 text-gray-700 dark:text-white">
                        <span
                          v-if="detail.status === 'ACTIVE'"
                          class="bg-brand-dark/20 text-brand-dark text-xs font-bold px-2 py-1 rounded border border-brand-dark/30"
                        >
                          WAGERED ✅
                        </span>
                        <span
                          v-if="detail.status === 'SIGNED_UP'"
                          class="bg-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-bold px-2 py-1 rounded border border-blue-500/30"
                        >
                          SIGNED UP
                        </span>
                        <span
                          v-if="detail.status === 'PENDING'"
                          class="bg-warning/10 text-warning text-xs font-bold px-2 py-1 rounded border border-warning/30"
                        >
                          SMS SENT
                        </span>
                      </td>
                      <td
                        v-if="detail.status === 'PENDING'"
                        class="px-6 py-4 text-right font-bold text-gray-700 dark:text-gray-400"
                      >
                        Pending
                      </td>
                      <td
                        v-else
                        class="px-6 py-4 text-right font-bold text-gold-bright"
                      >
                        {{ detail.commission }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div
                class="px-6 py-3 bg-gray-50 dark:bg-surface-sunken border-t border-gray-200 dark:border-gray-700 text-center"
              >
                <button
                  class="text-xs text-gray-700 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  View All History
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
