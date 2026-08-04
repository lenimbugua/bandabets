<script setup>
import { ArrowDownOnSquareStackIcon, InformationCircleIcon } from "@heroicons/vue/24/outline";
import { useLoadCode } from "@/composables/useLoadCode";

const {
  loadCode,
  setIntention,
  loadSlipIsPending,
  isToLoadCode,
  bookingCode,
} = useLoadCode();
</script>

<template>
  <form
    class="bg-card border border-border/50 rounded-xl p-5 max-w-sm mx-auto"
    @submit.prevent="loadCode"
  >
    <div class="mb-4">
      <label
        for="bookingCode"
        class="block text-sm font-semibold text-foreground mb-1.5"
      >
        Enter the Booking Code
      </label>
      <input
        id="bookingCode"
        v-model="bookingCode"
        required
        type="text"
        placeholder="eg. PK45J6"
        class="w-full bg-background border-2 border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
      />
    </div>

    <button
      type="submit"
      class="w-full flex items-center justify-center gap-2 bg-brand-bright text-primary-foreground font-bold text-sm rounded-lg px-4 py-3 hover:bg-brand-bright/90 transition-colors"
      @click="setIntention(isToLoadCode)"
    >
      <TheButtonSpin v-if="loadSlipIsPending" />
      <template v-else>
        <ArrowDownOnSquareStackIcon class="w-4 h-4" />
        Load Code
      </template>
    </button>

    <div class="mt-4 flex items-start gap-2">
      <InformationCircleIcon class="w-5 h-5 text-gold-bright shrink-0 mt-0.5" />
      <p class="text-xs text-muted-foreground leading-relaxed">
        A booking code enables you to book a bet. Odds or availabilities may change.
      </p>
    </div>
  </form>
</template>
