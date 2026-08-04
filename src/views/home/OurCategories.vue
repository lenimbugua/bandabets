<template>
  <div class="grid md:grid-cols-3 gap-8">
    <FeatureCard
      title="The Best Aviator"
      description="Take a flight of the highest multiplier aviator in the market, maximizing your potential winnings for every altitude you soar."
    >
      <template #icon>
        <img class="w-20 h-20 rounded-full" src="/aviator.png" alt="Aviator crash game" loading="lazy" />
      </template>
    </FeatureCard>
    <FeatureCard
      title="Crash Games"
      description="Experience the thrill of the hotest fast-paced crash games with instant results."
    >
      <template #icon>
        <div class="p-3 rounded-full">
          <div
            class="flex justify-center items-center bg-red-200 w-20 h-20 rounded-full"
          >
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
              class="lucide lucide-zap w-10 h-10 text-red-400"
            >
              <path
                d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"
              ></path>
            </svg>
          </div>
        </div>
        <!-- <TrophyIcon class="w-12 h-12 text-yellow-400" /> -->
      </template>
    </FeatureCard>

    <FeatureCard
      title="Sports Betting"
      description="From football to esports, bet on your favorite teams and athletes."
    >
      <template #icon>
        <div class="p-3 rounded-full">
          <div class="flex justify-center items-center w-20 h-20 rounded-full">
            <div class="relative w-20 h-20 rounded-full">
              <img
                class="absolute z-1 inset-0 w-full h-full rounded-full"
                src="/soccer.png"
                alt="Sports betting"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </template>
    </FeatureCard>

    <FeatureCard
      title="Live Betting"
      description="Get in on the action with real-time odds and live streaming."
    >
      <template #icon>
        <div class="p-3 rounded-full">
          <div
            class="flex justify-center items-center bg-red-500 w-20 h-20 rounded-full"
          >
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
              class="lucide lucide-radio w-10 h-10 text-blue-400"
            >
              <path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9"></path>
              <path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5"></path>
              <circle cx="12" cy="12" r="2"></circle>
              <path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5"></path>
              <path d="M19.1 4.9C23 8.8 23 15.1 19.1 19"></path>
            </svg>
          </div>
        </div>
      </template>
    </FeatureCard>

    <FeatureCard
      title="Virtual Sports"
      description="Our dedicated support team is always ready to assist you, anytime, anywhere."
    >
      <template #icon>
        <div class="relative w-20 h-20 rounded-full">
          <img
            class="absolute z-1 inset-0 w-full h-full rounded-full"
            src="/virtuals.png"
            alt="Virtual games"
            loading="lazy"
          />
        </div>
      </template>
    </FeatureCard>
    <FeatureCard
      title="AviatriX"
      description="Soar to new heights with Aviatrix, offering the highest multipliers in the market and unlocking unmatched potential with every climb!"
    >
      <template #icon>
        <div class="relative w-20 h-20 rounded-full">
          <img
            class="absolute z-1 inset-0 w-full h-full object-center object-contain rounded-full"
            src="/aviatrix-img.png"
            alt="Aviatrix crash game"
            loading="lazy"
          />
        </div>
      </template>
    </FeatureCard>
  </div>
</template>

<script setup>
import FeatureCard from "./FeatureCard.vue";
</script>
