<script setup>
import { useLoadCode } from "../composables/useLoadCode";
import TheButtonSpin from "./TheButtonSpin.vue";

const {
  loadCode,
  setIntention,
  loadSlipIsPending,
  isToLoadCode,
  bookingCode,
} = useLoadCode();

function isValidBookingCode(code) {
  return code.length === 8;
}
</script>

<template>
  <form class="px-4 pt-4 pb-3" @submit.prevent="loadCode">
    <label
      for="bookingCode"
      class="block text-xs font-semibold text-muted-foreground mb-2"
    >
      Have a booking code?
    </label>
    <div class="flex gap-2">
      <input
        id="bookingCode"
        v-model="bookingCode"
        required
        type="text"
        placeholder="Enter 8-digit code"
        class="flex-1 min-w-0 text-sm text-foreground bg-input rounded-lg px-3 py-2 border border-border placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-colors"
      />
      <button
        type="submit"
        :class="[
          isValidBookingCode(bookingCode)
            ? 'bg-foreground/90 text-background hover:bg-foreground/80 cursor-pointer'
            : 'bg-muted text-muted-foreground/30 cursor-not-allowed',
        ]"
        class="shrink-0 flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors duration-150"
        @click="setIntention(isToLoadCode)"
      >
        <TheButtonSpin v-if="loadSlipIsPending" />
        <template v-else>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-3.5 h-3.5">
            <path d="M10.75 2.75a.75.75 0 0 0-1.5 0v8.614L6.295 8.235a.75.75 0 1 0-1.09 1.03l4.25 4.5a.75.75 0 0 0 1.09 0l4.25-4.5a.75.75 0 0 0-1.09-1.03l-2.955 3.129V2.75Z" />
            <path d="M3.5 12.75a.75.75 0 0 0-1.5 0v2.5A2.75 2.75 0 0 0 4.75 18h10.5A2.75 2.75 0 0 0 18 15.25v-2.5a.75.75 0 0 0-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5Z" />
          </svg>
          Load
        </template>
      </button>
    </div>
  </form>
</template>
