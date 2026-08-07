<script setup>
import { useFormatDates } from "@/composables/useFormatDates";
import { useCompetionsStore } from "@/stores/competitions";
import { useModalStore } from "@/stores/modal";
import { toRefs } from "vue";
import { useMatchesStore } from "../stores/matches";
const { closeModal } = useModalStore();

const { fetchMatchDetails } = useMatchesStore();

const { competitions, pending } = toRefs(useCompetionsStore());
const { humanFriendlyDate } = useFormatDates();

function goFetchMatchDetails(matchId) {
  closeModal();
  fetchMatchDetails(matchId);
}
</script>
<template>
  <!-- Loading skeleton -->
  <div v-if="pending" class="matches-grid">
    <div
      v-for="i in 8"
      :key="i"
      class="match-skeleton"
    >
      <div class="skeleton-line skeleton-date"></div>
      <div class="skeleton-line skeleton-team"></div>
      <div class="skeleton-line skeleton-team short"></div>
    </div>
  </div>

  <div v-else>
    <!-- Match cards -->
    <div
      v-if="competitions && competitions[0]?.matches"
      class="matches-grid"
    >
      <button
        v-for="match in competitions[0]?.matches"
        :key="match.parentMatchId"
        class="match-card"
        :aria-label="'View details: ' + match.homeTeam + ' vs ' + match.awayTeam"
        @click="goFetchMatchDetails(match.parentMatchId)"
      >
        <span class="match-date">{{ humanFriendlyDate(match.startTime) }}</span>
        <span class="match-team">{{ match.homeTeam }}</span>
        <span class="match-vs">vs</span>
        <span class="match-team">{{ match.awayTeam }}</span>
      </button>
    </div>

    <!-- Empty state -->
    <BaseEmptyState
      v-else
      icon="tabler:calendar-month"
      title="No events available"
      description="Check back later for upcoming matches"
    />
  </div>
</template>

<style scoped>
.matches-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
  padding: 0.75rem;
}

.match-card {
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
  padding: 0.625rem 0.75rem;
  border-radius: 0.625rem;
  background: oklch(100% 0 0);
  border: 1px solid oklch(0% 0 0 / 0.07);
  cursor: pointer;
  transition: all 0.15s;
  text-align: left;
}
.match-card:hover {
  border-color: color-mix(in oklch, var(--primary) 30%, transparent);
  box-shadow: 0 2px 8px color-mix(in oklch, var(--primary) 8%, transparent);
}
[data-theme="dark"] .match-card {
  background: var(--card);
  border-color: oklch(100% 0 0 / 0.06);
}
[data-theme="dark"] .match-card:hover {
  border-color: color-mix(in oklch, var(--primary) 25%, transparent);
  box-shadow: 0 2px 8px color-mix(in oklch, var(--primary) 6%, transparent);
}

.match-date {
  font-size: 0.55rem;
  font-weight: 500;
  color: oklch(55% 0 0);
  margin-bottom: 0.125rem;
}
[data-theme="dark"] .match-date {
  color: oklch(100% 0 0 / 0.35);
}

.match-team {
  font-size: 0.7rem;
  font-weight: 600;
  color: oklch(20% 0 0);
  line-height: 1.3;
}
[data-theme="dark"] .match-team {
  color: oklch(100% 0 0 / 0.8);
}

.match-vs {
  font-size: 0.5rem;
  font-weight: 500;
  color: oklch(60% 0 0);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
[data-theme="dark"] .match-vs {
  color: oklch(100% 0 0 / 0.2);
}

/* Skeleton loading */
.match-skeleton {
  padding: 0.625rem 0.75rem;
  border-radius: 0.625rem;
  background: oklch(100% 0 0);
  border: 1px solid oklch(0% 0 0 / 0.05);
}
[data-theme="dark"] .match-skeleton {
  background: var(--card);
  border-color: oklch(100% 0 0 / 0.04);
}

.skeleton-line {
  border-radius: 0.25rem;
  animation: pulse 1.5s ease-in-out infinite;
}

.skeleton-date {
  height: 0.5rem;
  width: 60%;
  margin-bottom: 0.5rem;
  background: oklch(0% 0 0 / 0.06);
}
[data-theme="dark"] .skeleton-date {
  background: oklch(100% 0 0 / 0.06);
}

.skeleton-team {
  height: 0.625rem;
  width: 85%;
  margin-bottom: 0.375rem;
  background: oklch(0% 0 0 / 0.08);
}
.skeleton-team.short {
  width: 65%;
  margin-bottom: 0;
}
[data-theme="dark"] .skeleton-team {
  background: oklch(100% 0 0 / 0.08);
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}
</style>
