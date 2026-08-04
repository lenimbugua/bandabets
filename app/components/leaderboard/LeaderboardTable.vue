<script setup>
import { useLeaderboardStore } from "@/stores/leaderboard";
import formatStuff from "@/utilities/format-stuff";
import { toRefs } from "vue";

const { formattedNumber } = formatStuff();

const getPositionBadgeClass = (position) => {
  const badges = {
    1: "bg-linear-to-br from-yellow-400 to-amber-500 text-gray-900",
    2: "bg-linear-to-br from-gray-300 to-gray-500 text-gray-900",
    3: "bg-linear-to-br from-orange-400 to-amber-600 text-gray-900",
  };
  return badges[position] || "bg-muted text-muted-foreground";
};

const getRowClass = (position) => {
  const rows = {
    1: "bg-gold-bright/5 dark:bg-gold-bright/5",
    2: "bg-accent/30",
    3: "bg-gold-bright/3 dark:bg-gold-bright/3",
  };
  return rows[position] || "";
};

const { leaderboard } = toRefs(useLeaderboardStore());
</script>

<template>
  <table v-if="leaderboard && leaderboard.length" class="w-full">
    <thead>
      <tr class="bg-accent/50 border-b border-border/50">
        <th class="px-3 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Rank
        </th>
        <th class="px-3 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Player
        </th>
        <th class="px-3 py-2.5 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Points
        </th>
        <th class="px-3 py-2.5 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Prize
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="player in leaderboard"
        :key="player.msisdn"
        :class="[
          'border-t border-border/30 transition-colors hover:bg-accent/30',
          getRowClass(player.position),
        ]"
      >
        <td class="px-3 py-2.5 whitespace-nowrap">
          <div class="flex items-center gap-2">
            <div
              :class="[
                'shrink-0 w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shadow-sm',
                getPositionBadgeClass(player.position),
              ]"
            >
              {{ player.position }}
            </div>
          </div>
        </td>
        <td class="px-3 py-2.5 whitespace-nowrap">
          <span class="text-sm font-medium text-foreground">
            {{ player?.msisdn }}
          </span>
        </td>
        <td class="px-3 py-2.5 whitespace-nowrap text-right">
          <span class="text-sm font-semibold text-brand-bright tabular-nums">
            {{ player?.points }}
          </span>
        </td>
        <td class="px-3 py-2.5 whitespace-nowrap text-right">
          <span
            v-if="player?.prizeAmount"
            class="text-sm font-bold text-gold-bright tabular-nums"
          >
            {{ formattedNumber(player?.prizeAmount) }}
          </span>
          <span v-else class="text-sm text-muted-foreground/50">-</span>
        </td>
      </tr>
    </tbody>
  </table>
</template>
