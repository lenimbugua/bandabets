<template>
  <div class="w-full min-h-dvh bg-background text-white pb-20">
    <!-- Hero Section -->
    <section class="w-full relative overflow-hidden">
      <div
        class="absolute inset-0 bg-cover bg-center opacity-20"
        style="background-image: url('/images/xmas-pattern.png')"
      ></div>

      <div class="relative z-10 text-center py-16 px-6">
        <h1 class="text-4xl md:text-5xl font-bold text-accent">
          Share za Krisii na Mabeste 🎄
        </h1>
        <p class="text-lg mt-4 max-w-2xl mx-auto text-gray-200">
          Invite your mabeste and win big this festive season! Earn bonuses,
          collect entries, and stand a chance to win epic prizes.
        </p>

        <div class="flex justify-center mt-8">
          <button
            class="bg-gold-bright text-primary-foreground font-semibold px-8 py-3 rounded-xl shadow-lg hover:bg-yellow-400 transition"
          >
            Start Inviting Friends
          </button>
        </div>
      </div>
    </section>

    <!-- Referral Input Area -->
    <section class="mt-12 px-6 max-w-3xl mx-auto">
      <div
        class="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/10"
      >
        <h2 class="text-2xl font-bold text-gold-bright mb-4">
          Invite Your Friends
        </h2>
        <p class="text-gray-300 mb-6">
          Enter your friends’ phone numbers below. They’ll receive an instant
          SMS with your referral link.
        </p>

        <div class="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Enter phone number e.g +2547..."
            class="w-full px-4 py-3 rounded-lg bg-white text-primary-foreground outline-hidden"
          />

          <button
            class="bg-brand-dark px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-red-700 transition"
          >
            Send Invite
          </button>
        </div>

        <p class="text-sm text-gray-400 mt-3">
          You can invite up to 20 friends per day.
        </p>
      </div>
    </section>

    <!-- Promo Highlights -->
    <section class="mt-16 px-6 max-w-5xl mx-auto">
      <h2 class="text-3xl font-bold text-center text-gold-bright mb-10">
        Why Join the Festive Referral Promo?
      </h2>

      <div class="grid md:grid-cols-3 gap-8">
        <div
          class="bg-white/10 border border-white/10 rounded-2xl p-6 shadow-md text-center"
        >
          <h3 class="text-xl font-bold mb-3">Instant Bonuses 💰</h3>
          <p class="text-gray-300">
            Earn 5% affiliate bonus (up to KES 200) when your friend deposits
            and wagers.
          </p>
        </div>

        <div
          class="bg-white/10 border border-white/10 rounded-2xl p-6 shadow-md text-center"
        >
          <h3 class="text-xl font-bold mb-3">Grand Prize Entries 🎁</h3>
          <p class="text-gray-300">
            Every signup earns both you and your friend a draw entry!
          </p>
        </div>

        <div
          class="bg-white/10 border border-white/10 rounded-2xl p-6 shadow-md text-center"
        >
          <h3 class="text-xl font-bold mb-3">Unlimited Wins 🔥</h3>
          <p class="text-gray-300">
            Refer more, earn more & boost your chances.
          </p>
        </div>
      </div>
    </section>

    <!-- Prize Section -->
    <section class="mt-20 px-6 max-w-6xl mx-auto">
      <h2 class="text-3xl font-bold text-center text-gold-bright mb-12">
        Grand Prizes Up For Grabs 🎄🎁
      </h2>

      <div class="grid md:grid-cols-3 gap-10">
        <div
          class="bg-white/10 rounded-2xl p-6 text-center border border-white/10 shadow-lg"
        >
          <!-- <img
            src="/images/motorbike.png"
            class="w-32 mx-auto mb-6"
            alt="Motorbike"
          /> -->
          <h3 class="text-xl font-bold">15x Motorbikes (Nduthi)</h3>
        </div>

        <div
          class="bg-white/10 rounded-2xl p-6 text-center border border-white/10 shadow-lg"
        >
          <!-- <img src="/images/goat.png" class="w-28 mx-auto mb-6" alt="Goat" /> -->
          <h3 class="text-xl font-bold">30x Goats (Mbuzi)</h3>
        </div>

        <div
          class="bg-white/10 rounded-2xl p-6 text-center border border-white/10 shadow-lg"
        >
          <!-- <img
            src="/images/cash.png"
            class="w-28 mx-auto mb-6"
            alt="Cash Prize"
          /> -->
          <h3 class="text-xl font-bold">Cash Prizes</h3>
        </div>
      </div>
    </section>

    <!-- Tracking Dashboard Placeholder -->
    <section class="mt-20 px-6 max-w-4xl mx-auto">
      <h2 class="text-3xl font-bold text-gold-bright mb-6 text-center">
        Track Your Referrals
      </h2>

      <div
        class="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10 shadow-xl"
      >
        <p class="text-gray-300 text-center mb-6">
          See the status of all invites: Sent, Signed Up, Deposited, Wagered.
        </p>

        <div
          class="w-full h-32 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center"
        >
          <span class="text-gray-400"
            >Referral tracking table will appear here.</span
          >
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="mt-24 text-center text-gray-400 text-sm">
      © 2025 Naibet — Share za Krisii na Mabeste Promo. T&Cs Apply.
    </footer>
  </div>
</template>
