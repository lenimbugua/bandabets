<script setup>
import { usePromos } from "@/composables/usePromos";
import formatStuff from "@/utilities/format-stuff";
import { RouterLink } from "vue-router";

const { formCloudflareImage } = formatStuff();

const { promos, hakiLeaguePromo } = usePromos();

function getPromoImageByName() {
  const promo = promos.find((p) => p.name === hakiLeaguePromo);
  return promo ? promo.img : null;
}

const bettingRules = [
  "You can bet on all available leagues.",
  "Bets must include the 1X2 market.",
  "Each betslip must have minimum odds of 4 and above.",
  "Each betslip must include a minimum of 4 events.",
  "The minimum stake amount per betslip is 20 KES.",
];

const freeBetDetails = [
  "The free bet will be awarded once daily.",
  "The free bet will expire 24 hours after being awarded.",
  "You can win a maximum of 20,000 KES from the free bet.",
  "Upon qualifying, you will be awarded a free bet amount of 20 KES.",
  "This free bet has a cumulative stake wagering requirement of 20 KES.",
];
</script>

<template>
  <div class="font-sans max-w-7xl mx-auto">
    <!-- Hero Section -->
    <div class="relative aspect-video h-42 sm:h-104 w-full my-4">
      <img
        class="absolute top-0 w-full h-full right-0 left-0 bottom-0 object-contain md:object-cover"
        :src="formCloudflareImage(getPromoImageByName())"
        alt="Pari League free bets promotion"
        loading="lazy"
      />
    </div>
    <div
      class="bg-background text-white py-12 px-6 text-center border-b-4 border-brand-teal"
    >
      <h1 class="text-4xl font-bold tracking-wide">HAKILEAGUE FREEBETS</h1>
    </div>

    <!-- Content Container -->
    <div class="p-6 md:p-8">
      <!-- Intro Section -->
      <div
        class="bg-primary/5 p-6 rounded-lg mb-8 border-l-4 border-brand-teal"
      >
        <p class="leading-relaxed dark:text-slate-100">
          HakiLeague Freebets is an exciting opportunity for sports enthusiasts
          to enjoy risk-free betting on their favorite games. This promotion
          allows participants to place bets without using their own money,
          giving them a chance to win big without any financial risk. Whether
          you're a seasoned bettor or new to the world of sports betting,
          HakiLeague Freebets offers a fun and engaging way to get involved in
          the action. With a variety of sports and events to choose from,
          there's something for everyone. Don't miss out on this chance to
          experience the thrill of betting with HakiLeague Freebets!
        </p>
      </div>

      <!-- Rules Section -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <!-- Betting Rules -->
        <div class="bg-white rounded-lg shadow-md overflow-hidden">
          <div class="bg-background text-white p-4">
            <h2 class="text-xl font-bold">Betting Rules</h2>
          </div>
          <div class="p-6">
            <ul class="space-y-4">
              <li
                v-for="(rule, index) in bettingRules"
                :key="index"
                class="flex"
              >
                <span class="text-brand-teal font-bold mr-3 text-xl">➢</span>
                <span>{{ rule }}</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- Free Bet Details -->
        <div class="bg-white rounded-lg shadow-md overflow-hidden">
          <div class="bg-background text-white p-4">
            <h2 class="text-xl font-bold">Free Bet Details</h2>
          </div>
          <div class="p-6">
            <ul class="space-y-4">
              <li
                v-for="(detail, index) in freeBetDetails"
                :key="index"
                class="flex"
              >
                <span class="text-brand-teal font-bold mr-3 text-xl">➢</span>
                <span>{{ detail }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- CTA Section -->
      <div class="bg-card p-6 rounded-lg text-center">
        <h3 class="text-2xl font-bold text-primary-foreground mb-4">Ready to Start?</h3>
        <p class="mb-6 text-lg dark:text-white">
          Join HakiLeague Freebets today and experience risk-free betting!
        </p>
        <RouterLink
          :to="{ name: 'pari-league' }"
          class="bg-brand-teal hover:bg-brand-forest text-white font-bold py-3 px-8 rounded-lg transition duration-300 shadow-md"
        >
          Get Your Free Bet Now
        </RouterLink>
      </div>
    </div>
  </div>
</template>
