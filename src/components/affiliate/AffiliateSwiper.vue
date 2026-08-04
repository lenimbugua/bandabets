<script setup>
import "swiper/css";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/vue";
import { onMounted, ref } from "vue";
import TopEarners from "./TopEarners.vue";

const modules = [Autoplay, EffectFade, Pagination, Navigation];
const autoplayDelay = 10000;

const loaderStyle = ref({
  width: "0%",
  transition: "none",
});

const startLoader = () => {
  loaderStyle.value = { width: "0%", transition: "none" };
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      loaderStyle.value = {
        width: "100%",
        transition: `width ${autoplayDelay}ms linear`,
      };
    });
  });
};

onMounted(() => {
  startLoader();
});
</script>

<template>
  <div class="w-full overflow-hidden mb-4">
    <div class="relative w-full h-32 md:h-48 rounded-xl overflow-hidden bg-card">
      <swiper
        :space-between="30"
        :centered-slides="true"
        :autoplay="{ delay: autoplayDelay, disableOnInteraction: false }"
        :navigation="false"
        :modules="modules"
        class="h-full"
        @slide-change="startLoader"
      >
        <swiper-slide>
          <AffiliateCall />
        </swiper-slide>
        <swiper-slide>
          <TopEarners />
        </swiper-slide>
      </swiper>

      <!-- Progress bar -->
      <div class="absolute z-10 bottom-0 w-full">
        <div class="h-0.5 bg-border/30">
          <div
            class="h-full bg-brand-bright"
            :style="loaderStyle"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>
