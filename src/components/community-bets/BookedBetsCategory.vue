<script setup>
import { useBookedBetsStore } from "@/stores/booked-bets";
import { storeToRefs } from "pinia";
import "swiper/css";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/vue";
import EmptyState from "../EmptyState.vue";

const modules = [Autoplay, Navigation];
const { bethub, pending } = storeToRefs(useBookedBetsStore());
</script>

<template>
  <div
    v-if="bethub && bethub.length"
    class="grid grid-cols-1 md:grid-cols-2 gap-4"
  >
    <div
      v-for="hub in bethub"
      :key="hub.id"
      class="bg-card border border-border/50 rounded-xl overflow-hidden"
    >
      <!-- Category header -->
      <div class="flex items-center gap-3 p-4 border-b border-border/30">
        <div class="relative h-16 w-24 rounded-lg overflow-hidden bg-muted shrink-0">
          <img
            class="absolute inset-0 h-full w-full object-cover"
            :src="hub.icon"
            :alt="hub.name || 'Category'"
            loading="lazy"
          />
        </div>
        <div>
          <h3 class="text-base font-bold text-foreground">
            {{ hub.categoryName }}
          </h3>
          <p class="text-xs text-muted-foreground mt-0.5">
            {{ hub.categoryDesc }}
          </p>
        </div>
      </div>

      <!-- Bet carousel -->
      <div class="p-3">
        <swiper
          :space-between="30"
          :centered-slides="true"
          :navigation="false"
          :modules="modules"
          class="mySwiper"
        >
          <swiper-slide v-for="bet in hub.bets" :key="bet.shareBet">
            <SelectionsCard :booking-code="bet.shareBet" :selections="bet.slip" />
          </swiper-slide>
          <CategoryPagination />
        </swiper>
      </div>
    </div>
  </div>
  <div v-else-if="pending"></div>
  <EmptyState v-else />
</template>
