<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { useCasinoStore } from "@/stores/casino";
import { storeToRefs } from "pinia";

const emit = defineEmits(["play"]);

const { categoriesWithGames } = storeToRefs(useCasinoStore());

// Pull real game names from the casino store, fallback to a small list
const fallbackNames = ["Aviator", "JetX", "Spaceman", "Plinko", "Sweet Bonanza"];

const gameNames = computed(() => {
  if (!categoriesWithGames.value?.length) return fallbackNames;
  const names = new Set();
  for (const cat of categoriesWithGames.value) {
    for (const game of cat.games || []) {
      names.add(game.gameName);
    }
  }
  return names.size > 0 ? Array.from(names) : fallbackNames;
});

function generateWinAmount() {
  const r = Math.random();
  if (r < 0.70) {
    return Math.floor(Math.random() * 9900) + 100;
  } else if (r < 0.95) {
    return Math.floor(Math.random() * 290000) + 10000;
  } else {
    return Math.floor(Math.random() * 700000) + 300000;
  }
}

function generatePhoneNumber() {
  const mid = Math.floor(Math.random() * 900) + 100;
  const end = Math.floor(Math.random() * 90) + 10;
  return `07${mid}**${end}`;
}

function generateWinner() {
  const names = gameNames.value;
  return {
    phone: generatePhoneNumber(),
    game: names[Math.floor(Math.random() * names.length)],
    amount: generateWinAmount(),
  };
}

function formatAmount(n) {
  return n.toLocaleString("en-KE");
}

const counter = ref(0);
const SLOT_COUNT = 3;
const winners = ref(Array.from({ length: SLOT_COUNT }, generateWinner));
let interval = null;

onMounted(() => {
  interval = setInterval(() => {
    const next = (counter.value + 1) % SLOT_COUNT;
    winners.value[next] = generateWinner();
    counter.value = next;
  }, 3000);
});

onBeforeUnmount(() => {
  clearInterval(interval);
});
</script>

<template>
  <div class="relative overflow-hidden rounded-lg bg-gray-100 dark:bg-white/[0.03] border border-gray-200 dark:border-white/5 h-9">
    <template v-for="(w, i) in winners" :key="i">
      <Transition
        name="custom-classes"
        enter-active-class="ticker-enter-active ticker-slideInUp"
        leave-active-class="ticker-leave-active ticker-slideOutUp"
      >
        <div
          v-if="counter === i"
          class="absolute inset-0 flex items-center justify-between gap-2 px-3 text-xs"
        >
          <div class="flex items-center gap-2 min-w-0">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4 shrink-0 text-primary">
              <path d="M13.92 3.845a19.361 19.361 0 0 1-6.3 1.98C6.765 5.942 5.89 6 5 6a4 4 0 0 0-.504.032l1.092 7.636c.27.134.548.256.832.368a19.48 19.48 0 0 1 7.5-2.191V3.845ZM15.514 3.293A20.862 20.862 0 0 0 18 3.5v9c-.643 0-1.283.033-1.916.098A20.703 20.703 0 0 0 14 13.236V3.382a20.877 20.877 0 0 0 1.514-.089ZM5 8a2 2 0 1 0 0 4h.092L4.253 5.055C3.521 5.222 3 5.868 3 6.62v2.76c0 .753.521 1.398 1.253 1.565L5.929 18.5a1.5 1.5 0 0 0 1.482 1.268h.252a1.5 1.5 0 0 0 1.478-1.75L8.18 12H5Z" />
            </svg>
            <span class="text-gray-400 dark:text-gray-500 font-medium truncate">{{ w.phone }}</span>
            <span class="text-gray-500 dark:text-gray-400 shrink-0">won</span>
            <span
              :class="[
                'font-bold tabular-nums shrink-0',
                w.amount >= 300000
                  ? 'text-amber-500'
                  : w.amount >= 10000
                    ? 'text-primary'
                    : 'text-gray-700 dark:text-gray-200',
              ]"
            >
              KES {{ formatAmount(w.amount) }}
            </span>
            <span class="text-gray-500 dark:text-gray-400 shrink-0">on</span>
            <span class="text-gray-600 dark:text-gray-300 font-medium truncate">{{ w.game }}</span>
          </div>
          <button
            class="shrink-0 bg-primary text-white text-[0.65rem] font-bold px-2.5 py-1 rounded-md hover:bg-primary/90 transition-colors"
            @click="emit('play', w.game)"
          >
            Play Now
          </button>
        </div>
      </Transition>
    </template>
  </div>
</template>

<style scoped>
.ticker-enter-active,
.ticker-leave-active {
  animation-duration: 0.4s;
  animation-fill-mode: both;
  position: absolute;
  inset: 0;
}

.ticker-slideInUp {
  animation-name: slideInUp;
}

.ticker-slideOutUp {
  animation-name: slideOutUp;
}

@keyframes slideInUp {
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes slideOutUp {
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(-100%);
    opacity: 0;
  }
}
</style>
