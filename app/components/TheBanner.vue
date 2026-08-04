<script setup>
import { useDefaultSport } from "@/composables/useDefaultSport";
import formatStuff from "@/utilities/format-stuff";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/vue";
import { ref } from "vue";
import { useRouter } from "vue-router";

const { formCloudflareImage } = formatStuff();
const { initDefaultSport } = useDefaultSport();
const router = useRouter();

const modules = [Autoplay];
const autoplayDelay = 8000;

// Each slide drops the player straight into the game the offer is played on,
// matching the primary CTA on the matching promo detail page.
const sportsbook = { name: "sports", params: { sport: "soccer" } };

const items = [
  { name: "One Cut", image: "ba71caf8-45e3-4dba-8563-2fd769e98800", to: sportsbook },
  { name: "Welcome Bonus", image: "cdfc009d-fa81-4134-d165-3a1a0a463e00", to: sportsbook },
  { name: "Daily Deposit Bonus", image: "47fad6b1-0048-4f18-90cd-100c01eba300", to: { name: "deposit" } },
  { name: "Wagerless Rains", image: "c752f35f-37c3-42e8-03e1-11425ff4af00", to: { name: "playon" } },
  { name: "Cashout", image: "1949af94-a569-4c2a-032f-005a5c0e9900", to: sportsbook },
  { name: "Aviator Cashback", image: "3c60068d-b2cf-4ce2-0cab-4a65d691b700", to: { name: "aviator" } },
];

function openBanner(item) {
  if (item.to.name === "sports") {
    initDefaultSport(true);
  }
  router.push(item.to);
}

const swiperInstance = ref(null);

const onSwiperInit = (swiper) => {
  swiperInstance.value = swiper;
};

function slidePrev() {
  swiperInstance.value?.slidePrev();
}

function slideNext() {
  swiperInstance.value?.slideNext();
}
</script>

<template>
  <div class="w-full">
    <div class="relative w-full aspect-[1366/331] overflow-hidden">
      <swiper
        :slides-per-view="1"
        :slides-per-group="1"
        :space-between="12"
        :loop="true"
        :autoplay="{ delay: autoplayDelay, disableOnInteraction: false }"
        :navigation="false"
        :modules="modules"
        class="h-full"
        @swiper="onSwiperInit"
      >
        <swiper-slide v-for="item in items" :key="item.image">
          <button
            type="button"
            class="relative block h-full w-full rounded-xl overflow-hidden group cursor-pointer ring-1 ring-gray-200/80 dark:ring-white/10"
            :aria-label="`${item.name} — open`"
            @click="openBanner(item)"
          >
            <img
              :src="formCloudflareImage(item.image)"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              :alt="`${item.name} banner`"
            />
            <div
              class="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            ></div>
          </button>
        </swiper-slide>
      </swiper>

      <!-- Subtle scroll-suggesting arrows -->
      <button
        type="button"
        aria-label="Previous banner"
        class="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full flex items-center justify-center bg-card/60 text-muted-foreground opacity-40 hover:opacity-100 hover:text-foreground hover:bg-card transition-all duration-200 backdrop-blur-sm"
        @click="slidePrev"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4" aria-hidden="true">
          <path fill-rule="evenodd" d="M14.78 5.22a.75.75 0 0 1 0 1.06L9.06 12l5.72 5.72a.75.75 0 1 1-1.06 1.06l-6.25-6.25a.75.75 0 0 1 0-1.06l6.25-6.25a.75.75 0 0 1 1.06 0Z" clip-rule="evenodd" />
        </svg>
      </button>
      <button
        type="button"
        aria-label="Next banner"
        class="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full flex items-center justify-center bg-card/60 text-muted-foreground opacity-40 hover:opacity-100 hover:text-foreground hover:bg-card transition-all duration-200 backdrop-blur-sm"
        @click="slideNext"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4" aria-hidden="true">
          <path fill-rule="evenodd" d="M9.22 5.22a.75.75 0 0 1 1.06 0l6.25 6.25a.75.75 0 0 1 0 1.06l-6.25 6.25a.75.75 0 1 1-1.06-1.06L14.94 12 9.22 6.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
        </svg>
      </button>
    </div>
  </div>
</template>
