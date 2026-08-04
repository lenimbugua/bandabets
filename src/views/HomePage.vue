<script setup lang="ts">
import OurCategories from "./home/OurCategories.vue";
import PromoSection from "./home/PromoSection.vue";
import TheNav from "./home/TheNav.vue";
import WhyChooseUs from "./home/WhyChooseUs.vue";
</script>

<template>
  <div class="min-h-dvh bg-background text-white">
    <!-- Header -->
    <TheNav />
    <!-- Hero Section -->
    <section class="container mx-auto px-4 pt-4 flex flex-col items-center">
      <h1 class="text-5xl font-bold leading-none md:leading-tight">
        Bet Smarter, <span class="text-purple-400">Win Bigger</span>
      </h1>
      <div class="mt-6 mb-10 w-full">
        <TheBanner />
      </div>
      <!-- <p class="text-xl mb-8 text-gray-300">
        Join the ultimate betting experience. Get started with a 100% bonus on
        your first deposit!
      </p> -->
      <button
        class="p-2 bg-purple-600 mb-10 shadow-sm hover:bg-purple-700 text-white text-lg px-8 py-3 rounded-full"
      >
        Start Betting Now <ArrowRight class-="ml-2" />
      </button>
    </section>

    <!-- <section
      class="container mx-auto px-4 py-20 flex flex-col md:flex-row items-center"
    >
      <div class="md:w-1/2 mb-10 md:mb-0">
        <h1 class="text-5xl font-bold mb-6 leading-tight">
          Bet Smarter, <span class="text-purple-400">Win Bigger</span>
        </h1>
        <p class="text-xl mb-8 text-gray-300">
          Join the ultimate betting experience. Get started with a 100% bonus on
          your first deposit!
        </p>
        <button
          class="p-2 bg-purple-600 shadow-sm hover:bg-purple-700 text-white text-lg px-8 py-3 rounded-full"
        >
          Start Betting Now <ArrowRight class-="ml-2" />
        </button>
      </div>
      <div class="md:w-1/2">
        <TheBanner />
      </div>
    </section> -->

    <!-- Features Section -->
    <section class="bg-card py-20">
      <div class="container mx-auto px-4">
        <h2 class="text-4xl font-bold mb-12 text-center">
          Explore Our Betting Universe.
        </h2>
        <OurCategories />
      </div>
    </section>

    <PromoSection />

    <!-- Why Choose us Section -->
    <section class="bg-card py-20">
      <div class="container mx-auto px-4">
        <h2 class="text-4xl font-bold mb-12 text-center">
          Why Choose Naibet?
        </h2>
        <WhyChooseUs />
      </div>
    </section>

    <!-- CTA Section -->
    <section class="container mx-auto px-4 py-20 text-center">
      <h2 class="text-4xl font-bold mb-6">Ready to Start Winning?</h2>
      <p class="text-xl mb-8 text-gray-300">
        Join thousands of winners and start your betting journey today!
      </p>
      <button
        class="p-2 shadow-sm bg-purple-600 hover:bg-purple-700 text-white text-lg px-8 py-3 rounded-full"
      >
        Create Your Account
      </button>
    </section>

    <!-- Footer -->
    <footer class="bg-surface-sunken py-10">
      <Footer class="bg-background" />
      <!-- <div class="container mx-auto px-4 text-center text-gray-400">
        <p>&copy; 2023 Naibet. All rights reserved.</p>
        <p class="mt-2">Please gamble responsibly. 18+</p>
      </div> -->
    </footer>
  </div>
</template>
