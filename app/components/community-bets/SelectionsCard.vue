<script setup>
import { useModalTypes } from "@/composables/useModalTypes";
import { useModalStore } from "@/stores/modal";
import { computed } from "vue";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/vue";
import { useLoadCode } from "@/composables/useLoadCode";
import { useBetslip } from "@/composables/useBetslip";
import { useShareBetStore } from "@/stores/sharebet.js";
import BookedSelection from "./BookedSelection.vue";

const { setBookingCode } = useShareBetStore();
const modules = [Autoplay, Navigation, Pagination];

const props = defineProps({
  selections: { type: Array, required: true },
  bookingCode: { type: String, required: true },
});

const { shareBet } = useModalTypes();
const { openModal } = useModalStore();

function chunkArray(arr, size) {
  const result = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

const { calculateTotalOdds } = useBetslip();
const totalOdds = calculateTotalOdds(props.selections);
const chunkSize = 2;
const chunkedItems = computed(() => chunkArray(props.selections, chunkSize));

const {
  loadCode,
  setIntention,
  loadSlipIsPending,
  isToLoadCode,
  setBookingCode: setBookingCodeComposable,
} = useLoadCode();

function addToBetslip() {
  setIntention(isToLoadCode);
  setBookingCodeComposable(props.bookingCode);
  setBookingCode(props.bookingCode);
  loadCode();
}

function openShare() {
  setBookingCode(props.bookingCode);
  openModal(shareBet);
}
</script>

<template>
  <div class="space-y-3">
    <div class="bg-accent/30 border border-border/50 rounded-lg px-3">
      <!-- Header: selections count + odds -->
      <div class="flex items-center justify-between py-2.5">
        <div class="flex items-center gap-1.5">
          <span class="inline-flex items-center justify-center w-5 h-5 rounded-full bg-brand-bright text-[10px] font-bold text-primary-foreground tabular-nums">
            {{ selections.length }}
          </span>
          <span class="text-xs text-muted-foreground">Selections</span>
        </div>
        <div class="flex items-center gap-1.5">
          <span class="text-xs text-muted-foreground">Odds</span>
          <span class="text-sm font-bold text-brand-bright tabular-nums">
            {{ totalOdds }}
          </span>
        </div>
      </div>

      <!-- Selections carousel -->
      <swiper
        :space-between="30"
        :centered-slides="true"
        :navigation="true"
        :pagination="{ clickable: true }"
        :modules="modules"
        class="mySwiper"
      >
        <SwiperSlide v-for="(pair, index) in chunkedItems" :key="index">
          <div
            class="bg-card cursor-pointer rounded-lg p-2.5 pb-4 space-y-2 border border-border/30"
            @click="addToBetslip"
          >
            <BookedSelection
              v-for="(item, index2) in pair"
              :key="index2"
              :selection="item"
              :index="index * chunkSize + index2"
            />
          </div>
        </SwiperSlide>
      </swiper>

      <!-- Actions: Share + Add -->
      <div class="flex items-center justify-between py-2.5">
        <button
          class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-brand-bright/30 text-brand-bright text-xs font-semibold hover:bg-brand-bright/10 transition-colors"
          @click="openShare"
        >
          <Icon name="tabler:share" class="w-3.5 h-3.5" />
          Share
        </button>
        <button
          class="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-brand-bright text-primary-foreground text-xs font-bold hover:bg-brand-bright/90 transition-colors"
          @click="addToBetslip"
        >
          <TheButtonSpin v-if="loadSlipIsPending" />
          <template v-else>
            <Icon name="tabler:plus" class="w-3.5 h-3.5" />
            Add
          </template>
        </button>
      </div>
    </div>
  </div>
</template>
