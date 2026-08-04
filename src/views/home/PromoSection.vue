<script setup>
import PromoCard from "./PromoCard.vue";
</script>

<template>
  <section class="py-20 bg-linear-to-r from-purple-700 to-indigo-800">
    <div class="container mx-auto px-4">
      <h2 class="text-4xl font-bold text-center text-white mb-12">
        Claim Your <span class="text-yellow-300">Free Bets</span> Now!
      </h2>
      <div class="grid md:grid-cols-3 gap-8">
        <PromoCard
          title="Free Bet"
          description="Get a freebet when visit and create your Naibet account!"
          code="WELCOME GIFT"
        >
          <template #icon>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-gift w-12 h-12 text-yellow-300"
            >
              <rect x="3" y="8" width="18" height="4" rx="1"></rect>
              <path d="M12 8v13"></path>
              <path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"></path>
              <path
                d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5"
              ></path>
            </svg>
          </template>
        </PromoCard>
        <PromoCard
          title="Aviator Rain"
          description="Claim a $25 freebet every week when you deposit $100 or more!"
          code="AVIATOR RAIN PROMO"
        >
          <template #icon>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="44"
              height="44"
              viewBox="0 0 24 24"
            >
              <g fill="none">
                <g clip-path="url(#majesticonsAirplaneFlight2Line0)">
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m14.071 7.586l-.828.828A2 2 0 0 1 11.828 9h-1.414c-.375 0-.735.149-1 .414v0a1.414 1.414 0 0 0 0 2l1.829 1.829a2 2 0 0 0 2.828 0l1.414-1.415l.964 2.121a1.346 1.346 0 0 0 2.178.395v0c.252-.252.394-.595.394-.952v-4.27a2 2 0 0 1 .586-1.415l2.242-2.243c.472-.47 1.132-1.697 0-2.828s-2.357-.471-2.828 0l-1.768 1.768m-3.182 3.182l-2.02-.674a1.448 1.448 0 0 1-.566-2.397v0a1.45 1.45 0 0 1 1.12-.421l4.648.31m-3.182 3.182l3.182-3.182M2 14.905c.705-1.234 1.825-2.32 3-3.204M2 22.404c1.072-3.002 3.055-5.564 5.023-7.5m.477 6.5c.721-1.442 1.96-3.077 3.087-4.405"
                  />
                </g>
                <defs>
                  <clipPath id="majesticonsAirplaneFlight2Line0">
                    <path fill="#fff" d="M0 0h24v24H0z" />
                  </clipPath>
                </defs>
              </g>
            </svg>
          </template>
        </PromoCard>
        <PromoCard
          icon="Clock"
          title="Get Upto 5x your Deposit"
          description="Claim 5 upto times the amount of your deposit if your deposit is the first deposit of the day!"
          code="DOUBLEPLAY"
        >
          <template #icon>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              wiwidth="44"
              height="44"
              viewBox="0 0 24 24"
            >
              <path
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M2.25 18.75a60 60 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0a3 3 0 0 1 6 0m3 0h.008v.008H18zm-12 0h.008v.008H6z"
              />
            </svg>
          </template>
        </PromoCard>
      </div>
    </div>
  </section>
</template>
