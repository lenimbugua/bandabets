<script setup>
import { computed, onMounted, ref, nextTick } from "vue";
import { useCasinoStore } from "@/stores/casino";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";

const router = useRouter();
const { categoriesWithGames } = storeToRefs(useCasinoStore());

const fallbackGames = [
  { name: "Aviator", image: "https://via.placeholder.com/140x120/C8264A/ffffff?text=Aviator" },
  { name: "JetX", image: "https://via.placeholder.com/140x120/0000ff/ffffff?text=JetX" },
  { name: "Spaceman", image: "https://via.placeholder.com/140x120/00ff00/ffffff?text=Spaceman" },
];

const games = computed(() => {
  if (!categoriesWithGames.value?.length) return fallbackGames;
  const gameList = [];
  for (const cat of categoriesWithGames.value) {
    for (const game of cat.games || []) {
      gameList.push({
        name: game.gameName,
        image: game.imgFullUrl,
      });
    }
  }
  return gameList.length > 0 ? gameList : fallbackGames;
});

function generateRating() {
  return Math.floor(Math.random() * 5) + 1;
}

function generateWinAmount() {
  const r = Math.random();
  if (r < 0.90) {
    return Math.floor(Math.random() * 9300) + 700;
  } else {
    return Math.floor(Math.random() * 290000) + 10000;
  }
}

function formatAmount(n) {
  if (n >= 1000) {
    return (n / 1000).toFixed(2) + "k";
  }
  return n.toString();
}

const gamesList = ref([]);
const scrollContainer = ref(null);

function generateGamesList() {
  const featuredGameNames = ['aviator', 'aviatrix', 'jetx'];

  const gamesList = games.value.map((game, i) => ({
    id: i,
    game,
    rating: generateRating(),
    amount: generateWinAmount(),
  }));

  // Boost featured games - add them 3 extra times
  const featuredGames = gamesList.filter(item =>
    featuredGameNames.some(name => item.game.name.toLowerCase().includes(name))
  );

  const combinedList = [...gamesList, ...featuredGames, ...featuredGames, ...featuredGames];

  return combinedList.map((item, idx) => ({ ...item, id: idx }));
}

function launchGame(game) {
  router.push({
    name: 'casino-game',
    params: { gameName: game.name.toLowerCase().replace(/\s+/g, '-') },
    query: { game: game.name },
  });
}

function autoScroll() {
  if (!scrollContainer.value) return;
  const element = scrollContainer.value;
  let scrollPos = 0;
  const cardWidth = 176 + 6; // w-44 (176px) + space-x-1.5 (6px)
  const scrollDuration = 600; // ms for slide
  const pauseDuration = 3000; // ms to rest

  function slideToNext() {
    scrollPos += cardWidth;
    if (scrollPos > element.scrollWidth - element.clientWidth) {
      scrollPos = 0;
    }

    element.scrollTo({
      left: scrollPos,
      behavior: 'smooth',
    });

    setTimeout(slideToNext, scrollDuration + pauseDuration);
  }

  setTimeout(slideToNext, pauseDuration);
}

onMounted(() => {
  gamesList.value = generateGamesList();
  nextTick(() => {
    autoScroll();
  });
});
</script>

<template>
  <section class="mb-3 px-3 sm:px-0">
    <!-- Card container -->
    <div class="rounded-lg bg-card border border-border-subtle p-1.5">
      <!-- Horizontal scroll carousel -->
      <div ref="scrollContainer" class="flex space-x-1.5 overflow-x-auto scrollbar-hide -mx-1.5 px-1.5">
        <button
          v-for="item in gamesList"
          :key="item.id"
          class="shrink-0 rounded-lg overflow-hidden bg-surface-deepest border border-border-subtle flex w-44 h-20 cursor-pointer hover:shadow-md transition-shadow"
          @click="launchGame(item.game)"
        >
          <!-- Game Image LEFT -->
          <div class="w-20 h-20 shrink-0 overflow-hidden">
            <img
              :src="item.game.image"
              :alt="item.game.name"
              class="w-full h-full object-cover"
              loading="lazy"
            />
          </div>

          <!-- Content RIGHT -->
          <div class="flex-1 px-2 py-1 flex flex-col justify-between">
            <!-- Crown + Rating -->
            <div class="flex items-center gap-0.5">
              <span class="text-xs">👑</span>
              <span class="text-[10px] font-bold text-foreground">
                {{ "★".repeat(item.rating) }}<span class="text-gold-bright">4</span>
              </span>
            </div>

            <!-- Game name -->
            <h3 class="text-[11px] font-bold text-foreground whitespace-nowrap overflow-hidden text-ellipsis">
              {{ item.game.name }}
            </h3>

            <!-- Amount -->
            <div class="text-[10px] font-bold text-brand-bright whitespace-nowrap">
              {{ formatAmount(item.amount) }} KES
            </div>
          </div>
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>
