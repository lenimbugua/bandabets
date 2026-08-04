<template>
  <div
    class="bg-linear-to-br from-destructive/40 dark:from-destructive/20 to-primary dark:to-primary/30 backdrop-blur-lg rounded-2xl px-4 py-2 border border-destructive/30 shadow-2xl relative overflow-hidden mb-2"
  >
    <div
      class="absolute -top-4 -right-4 w-24 h-24 bg-red-500/10 rounded-full"
    ></div>
    <div class="relative z-10 text-left">
      <div class="flex items-center space-x-3 mb-2">
        <div
          class="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center shadow-lg"
        >
          <span class="text-xl">💰</span>
        </div>
        <h2
          class="text-left text-md md:text-3xl font-black text-white uppercase mb-1"
        >
          How You <span class="text-gold-bright">Earn</span> Rewards
        </h2>
      </div>
      <div class="text-gray-300 text-sm">
        Refer a friend and get
        <span class="font-bold text-gold">KES 30</span> instantly when they
        deposit and wager KES 30 on sportsbook. Plus, earn
        <span class="font-bold text-gold">10%</span> on all their first 7 days deposits.
        Your friend gets over
        <span class="font-bold text-gold">KES 800</span>
        in bonuses too!
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
/* Ensure the shimmer and fade animations are available */
@keyframes shimmer {
  0% {
    transform: translateX(-150%) skewX(-12deg);
  }
  100% {
    transform: translateX(150%) skewX(-12deg);
  }
}

@keyframes fade-in-up {
  0% {
    opacity: 0;
    transform: translateY(10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fade-in-up 0.4s ease-out forwards;
}

.animate-spin-slow {
  animation: spin 3s linear infinite;
}

@keyframes tada {
  0% {
    transform: scale(1);
  }
  10%,
  20% {
    transform: scale(0.9) rotate(-3deg);
  }
  30%,
  50%,
  70%,
  90% {
    transform: scale(1.1) rotate(3deg);
  }
  40%,
  60%,
  80% {
    transform: scale(1.1) rotate(-3deg);
  }
  100% {
    transform: scale(1) rotate(0);
  }
}
.animate-tada {
  animation: tada 1s infinite;
}
</style>
