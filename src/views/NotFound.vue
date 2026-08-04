<script setup>
import Footer from "@/components/Footer.vue";
</script>

<template>
  <div class="min-h-dvh flex flex-col bg-white dark:bg-background">
    <div class="sticky z-60 top-0 bg-white dark:bg-background border-b dark:shadow-xl dark:border-border-darkest rounded-b-xl overflow-clip">
      <HeaderLinks />
    </div>

    <div class="flex-1 flex flex-col items-center justify-center px-6 py-24 sm:py-32 text-center relative overflow-hidden">
      <div class="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" style="background-image: radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0); background-size: 40px 40px;"></div>

      <div class="relative mb-6">
        <span class="text-[10rem] sm:text-[14rem] font-black leading-none text-transparent bg-clip-text bg-linear-to-b from-brand-bright via-brand-teal to-brand-teal/60 select-none drop-shadow-xs">
          404
        </span>
        <div class="absolute inset-0 blur-[80px] opacity-15 bg-linear-to-br from-brand-bright to-brand-teal rounded-full scale-110"></div>
      </div>

      <div class="w-16 h-1 rounded-full bg-linear-to-r from-brand-bright to-brand-teal mb-8"></div>

      <h1 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">
        Page Not Found
      </h1>
      <p class="text-gray-700 dark:text-muted-foreground max-w-lg mb-12 text-base sm:text-lg leading-relaxed">
        The page you're looking for doesn't exist or has been moved. Let's get you back in the game.
      </p>

      <router-link
        to="/"
        class="group relative inline-flex items-center gap-2.5 bg-linear-to-r from-brand-teal to-brand-bright hover:from-brand-bright hover:to-brand-teal text-white font-semibold text-base px-10 py-4 rounded-xl transition-all duration-300 shadow-xl shadow-brand-teal/30 hover:shadow-brand-bright/40 hover:scale-[1.02] active:scale-[0.98]"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-0.5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
        </svg>
        Go Home
      </router-link>
    </div>

    <Footer />
  </div>
</template>
