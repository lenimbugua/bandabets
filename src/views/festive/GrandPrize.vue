<template>
  <!-- Grand Prize Card -->
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-12">
    <div
      class="group relative bg-surface-elevated border border-gray-700 hover:border-gold-bright rounded-2xl p-6 transition-all duration-300 hover:-translate-y-2"
    >
      <div
        class="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-background p-3 rounded-full border border-gray-700 group-hover:border-gold-bright"
      >
        <div
          class="text-7xl self-end transform group-hover:scale-110 group-hover:-rotate-12 transition-transform duration-300 drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]"
        >
          🐐
        </div>
      </div>
      <div class="mt-16 text-center">
        <h3 class="text-xl font-bold text-white uppercase">30x Mbuzi</h3>
        <p class="text-xs text-gray-400 mt-1">Perfect for choma</p>
      </div>
    </div>

    <div
      class="mx-3 group relative bg-linear-to-b from-surface-deepest to-primary/15 border-2 border-gold-bright rounded-2xl p-8 transform scale-105 shadow-[0_0_30px_color-mix(in_oklch,var(--gold)_15%,transparent)]"
    >
      <div
        class="absolute -top-4 right-4 bg-gold-bright text-primary-foreground text-xs font-bold px-3 py-1 rounded-full animate-bounce"
      >
        GRAND PRIZE
      </div>
      <div class="text-center">
        <div
          class="text-[100px] leading-none mb-4 drop-shadow-[0_20px_20px_rgba(0,0,0,0.8)] animate-bounce-slow"
        >
          🏍️
        </div>
        <h3 class="text-3xl font-black text-gold-bright uppercase italic">
          15x Nduthi
        </h3>
        <p class="text-sm text-gray-300 mt-2">Boxer 150cc Motorbikes</p>
      </div>
    </div>

    <div
      class="group relative bg-surface-elevated border border-gray-700 hover:border-gold-bright rounded-2xl p-6 transition-all duration-300 hover:-translate-y-2"
    >
      <div
        class="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-background p-3 rounded-full border border-gray-700 group-hover:border-gold-bright"
      >
        <div
          class="text-7xl self-end transform group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300 drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]"
        >
          💵
        </div>
      </div>
      <div class="mt-16 text-center">
        <h3 class="text-xl font-bold text-white uppercase">Cash Money</h3>
        <p class="text-xs text-gray-400 mt-1">Instant withdrawal</p>
      </div>
    </div>
  </div>
</template>
