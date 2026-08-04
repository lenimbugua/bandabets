<script setup>
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/vue/24/outline";
import { useSwiper } from "swiper/vue";
import { computed } from "vue";

const swiper = useSwiper();
const totalPages = computed(() => swiper?.value?.slides?.length || 0);
const itsLastPage = computed(() => swiper.value.isEnd);
const itsFirstPage = computed(() => swiper.value.isBeginning);
</script>

<template>
  <div class="flex items-center justify-between pt-3">
    <button
      :disabled="itsFirstPage"
      :class="itsFirstPage ? 'opacity-30 cursor-not-allowed' : 'hover:text-brand-bright/80'"
      class="flex items-center gap-0.5 text-xs font-medium text-brand-bright transition-colors"
      @click="swiper.slidePrev()"
    >
      <ChevronLeftIcon class="w-4 h-4" />
      Prev
    </button>

    <span class="text-xs text-muted-foreground tabular-nums">
      {{ swiper.realIndex + 1 }} / {{ totalPages }}
    </span>

    <button
      :disabled="itsLastPage"
      :class="itsLastPage ? 'opacity-30 cursor-not-allowed' : 'hover:text-brand-bright/80'"
      class="flex items-center gap-0.5 text-xs font-medium text-brand-bright transition-colors"
      @click="swiper.slideNext()"
    >
      Next
      <ChevronRightIcon class="w-4 h-4" />
    </button>
  </div>
</template>
