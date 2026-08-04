<script setup>
// import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/vue/20/solid";
import { ref } from "vue";
const isHidden = ref(true);
</script>
<template>
  <div
    class="w-full text-gray-800 leading-8 bg-white dark:bg-surface-deepest dark:text-gray-400 mx-auto space-y-4 p-2"
  >
    <div class="w-full border dark:border-card rounded-lg p-2">
      <div
        :class="['dark:text-slate-50']"
        class="w-full text-2xl cursor-pointer flex justify-between leading-tight mb-4"
        @click="isHidden = !isHidden"
      >
        <!-- Header Section -->
        <header class="w-full bg-surface-interactive text-white text-center py-8">
          <h1 class="text-3xl font-bold">
            The Aviator Free Bet Rains at Naibet
          </h1>
          <p class="text-lg mt-2">
            Win guaranteed free bets daily with Naibet Aviator!
          </p>
          <div v-if="isHidden" class="text-red-400 font-bold py-3">More</div>
          <div v-if="!isHidden" class="text-red-400 font-bold py-3">Less</div>
        </header>
      </div>
      <div class="bg-gray-100 text-gray-800 font-sans leading-relaxed">
        <!-- Main Content -->
        <main v-show="!isHidden" class="max-w-5xl mx-auto py-10 px-5 space-y-10">
          <!-- Promotion Overview -->
          <section>
            <h2 class="text-2xl font-semibold text-indigo-700 mb-4">
              Overview
            </h2>
            <p>
              Naibet is running a promotion dubbed **"ENDA EXTRA ROUND na
              Aviator Free Rain"** to give Aviator players a chance to claim
              free bet rains. With this promotion, players can win from a daily
              pool of <strong>KSH 100,000</strong> in guaranteed free bets while
              enjoying the Aviator game.
            </p>
          </section>

          <!-- How it Works -->
          <section>
            <h2 class="text-2xl font-semibold text-indigo-700 mb-4">
              How It Works
            </h2>
            <p>
              The promotion is open to all customers playing Naibet Aviator.
              Free Bet Rain will appear randomly in the chat after a
              notification during gameplay. Players can claim free bets ranging
              from <strong>KSH 30</strong> to <strong>KSH 1000</strong> by being
              the fastest to click **CLAIM**.
            </p>
            <p class="mt-3">
              Below are the Free Bet Rain details and qualification
              requirements:
            </p>

            <!-- Free Bet Rain Details -->
            <div class="space-y-6 mt-6">
              <div class="bg-gray-50 border-l-4 border-indigo-500 p-4">x1xd1xxzzzzzzzzzZ C`AZASZ```````````````````````````K566 BUJJ N <Noframes>JMMMJ</Noframes>`````z`
                <h3 class="font-bold text-lg">KSH 30 Free Bet Rain</h3>
                <ul class="list-disc list-inside text-gray-700 mt-2">
                  <li>Randomly awarded <strong>20 times daily</strong>.</li>
                  <li>Minimum balance: <strong>KSH 200</strong>.</li>
                  <li>Minimum stake: <strong>KSH 50</strong>.</li>
                  <li>
                    Last bet placed within the last <strong>5 minutes</strong>.
                  </li>
                </ul>
              </div>

              <div class="bg-gray-50 border-l-4 border-indigo-500 p-4">
                <h3 class="font-bold text-lg">KSH 50 Free Bet Rain</h3>
                <ul class="list-disc list-inside text-gray-700 mt-2">
                  <li>Randomly awarded <strong>20 times daily</strong>.</li>
                  <li>Minimum balance: <strong>KSH 300</strong>.</li>
                  <li>Minimum stake: <strong>KSH 100</strong>.</li>
                  <li>
                    Last bet placed within the last <strong>5 minutes</strong>.
                  </li>
                </ul>
              </div>

              <div class="bg-gray-50 border-l-4 border-indigo-500 p-4">
                <h3 class="font-bold text-lg">KSH 100 Free Bet Rain</h3>
                <ul class="list-disc list-inside text-gray-700 mt-2">
                  <li>Randomly awarded <strong>10 times daily</strong>.</li>
                  <li>Minimum balance: <strong>KSH 500</strong>.</li>
                  <li>Minimum stake: <strong>KSH 100</strong>.</li>
                  <li>
                    Last bet placed within the last <strong>5 minutes</strong>.
                  </li>
                </ul>
              </div>

              <div class="bg-gray-50 border-l-4 border-indigo-500 p-4">
                <h3 class="font-bold text-lg">KSH 500 Free Bet Rain</h3>
                <ul class="list-disc list-inside text-gray-700 mt-2">
                  <li>Randomly awarded <strong>10 times daily</strong>.</li>
                  <li>Minimum balance: <strong>KSH 1000</strong>.</li>
                  <li>Minimum stake: <strong>KSH 200</strong>.</li>
                  <li>
                    Last bet placed within the last <strong>5 minutes</strong>.
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <!-- Terms and Conditions -->
          <section>
            <h2 class="text-2xl font-semibold text-indigo-700 mb-4">
              Terms and Conditions
            </h2>
            <ul class="list-disc list-inside space-y-2 text-gray-700">
              <li>Only one claim per customer per Rain shower.</li>
              <li>Free Bets range from KSH 30 to KSH 1000.</li>
              <li>
                Minimum multiplier to cash out a Free Bet is
                <strong>x1.50</strong>.
              </li>
              <li>Free Bets expire within <strong>24 hours</strong>.</li>
              <li>
                Must be claimed within <strong>2 minutes</strong> of appearing
                in the chat area.
              </li>
              <li>Promotion available all days of the week, day and night.</li>
              <li>
                Cash winnings = (freebet stake) x (cashout multiplier) –
                (freebet stake).
              </li>
              <li>
                System errors or suspected prohibited activities may result in
                void winnings.
              </li>
              <li>
                Naibet reserves the right to modify or void the promotion at
                its discretion.
              </li>
            </ul>
          </section>

          <!-- Conclusion -->
          <section>
            <h2 class="text-2xl font-semibold text-indigo-700 mb-4">
              Conclusion
            </h2>
            <p>
              Naibet provides this promotion "as is," without warranties of
              any kind. The promotion terms may be amended periodically. For
              more details, refer to the Naibet General Terms and Conditions
              and Privacy Policy.
            </p>
          </section>
        </main>
      </div>
    </div>
  </div>
</template>
