<script setup>
import { computed } from "vue";

const props = defineProps({
  game: { type: Object, required: true },
});

defineEmits(["play"]);

const hakiLeagueGameId = import.meta.env.VITE_HAKI_LEAGUE_GAME_ID;
const hakiJackpotGameId = import.meta.env.VITE_KIRON_JACKPOT_GAME_ID;

const overrides = {
  "haki league": {
    name: "Pari League",
    img: "https://imagedelivery.net/ZY5OwFLlTE2ePHl_IE20jg/0d0a33b2-151e-4b59-754d-e4dec05d0300/public",
    gameId: hakiLeagueGameId,
  },
  "haki jackpot": {
    name: "Pari Jackpot",
    img: "https://imagedelivery.net/ZY5OwFLlTE2ePHl_IE20jg/a5abe485-4985-4f80-3826-03cc2f579700/public",
    gameId: hakiJackpotGameId,
  },
};

const lower = computed(() => props.game.gameName?.toLowerCase());
const override = computed(() => overrides[lower.value]);
const displayName = computed(() => override.value?.name || props.game.gameName);
const displayImg = computed(() => override.value?.img || props.game.imgFullUrl);
const resolvedGame = computed(() =>
  override.value
    ? {
        ...props.game,
        gameId: override.value.gameId,
        gameName: override.value.name,
      }
    : props.game
);
</script>

<template>
  <button
    type="button"
    class="group cursor-pointer shrink-0 w-[120px] sm:w-[150px] md:w-[170px] lg:w-[180px] rounded-lg overflow-hidden bg-surface-deepest border border-border-subtle text-left hover:shadow-md transition-shadow"
    :aria-label="'Play ' + displayName"
    @click="$emit('play', resolvedGame)"
  >
    <div class="relative aspect-square overflow-hidden">
      <img
        :src="displayImg"
        :alt="displayName"
        class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        loading="lazy"
      />

      <div
        class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center"
      >
        <div class="bg-primary text-primary-foreground font-bold text-xs px-5 py-2 rounded-full shadow-lg">
          Play
        </div>
      </div>
    </div>
  </button>
</template>
