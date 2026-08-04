<template>
  <div
    class="min-h-dvh p-4 sm:p-8 font-poppins transition-colors duration-500 bg-white text-primary-foreground dark:bg-background dark:text-gray-100"
  >
    <div class="max-w-7xl mx-auto">
      <section
        class="p-10 mb-10 text-center rounded-2xl shadow-xl transition-colors duration-500 bg-gray-50 shadow-gray-200/50 dark:bg-secondary dark:shadow-purple-900/50"
      >
        <p class="text-xl text-red-500 mb-2 font-bold">
          🎄 Sambaza za Krisi na Mabeste UshindeMbuzi! 🐐
        </p>
        <h1
          class="text-5xl sm:text-7xl font-extrabold mb-4 leading-tight"
          style="
            background-image: linear-gradient(45deg, #57cc05, #ffb002);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          "
        >
          Refer Friends, Get Paid, Get Mbuzi.
        </h1>
        <p class="text-xl font-light mb-8">
          We’re giving away three Mbuzis worth KES 5,000 every single day!
          Everyone eats, even if you miss the goat, you earn cash for every
          single friend.
        </p>

        <RouterLink
          :to="{ name: 'share-happiness' }"
          class="inline-block px-10 py-4 text-lg font-bold uppercase rounded-full shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl bg-red-500 text-white shadow-red-600/50"
        >
          START REFERRING NOW
        </RouterLink>
      </section>

      <div class="grid md:grid-cols-2 gap-8 mb-12">
        <div
          class="p-8 rounded-2xl border-l-8 border-red-500 shadow-lg transition-colors duration-500 bg-white shadow-gray-200/50 dark:bg-secondary dark:shadow-purple-900/50"
        >
          <h2 class="text-3xl font-bold text-red-500 mb-6">
            💰 Guaranteed Cash: Everyone Eats
          </h2>
          <p class="text-lg mb-6">
            Win the goat is the ultimate prize, but you earn cash for every
            single friend who joins.
          </p>
          <div class="overflow-x-auto">
            <table
              class="w-full text-left table-auto rounded-lg overflow-hidden"
            >
              <thead>
                <tr class="bg-red-500 text-white">
                  <th class="p-3">Earning Component</th>
                  <th class="p-3">Your Reward</th>
                </tr>
              </thead>
              <tbody>
                <tr class="border-b border-gray-200 dark:border-purple-700">
                  <td class="p-3">Instant Sign-Up Cash (min KES 30 bet)</td>
                  <td class="p-3 font-bold text-yellow-500">
                    KES 30 Instantly
                  </td>
                </tr>
                <tr
                  class="border-b bg-gray-50 border-gray-200 dark:border-purple-700 dark:bg-card"
                >
                  <td class="p-3">Daily Deposit Commission</td>
                  <td class="p-3 font-bold text-yellow-500">
                    10% of deposits for
                    <span class="text-red-500">7 days!</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p class="mt-6 text-sm italic">More Friends = More Ganji.</p>
        </div>

        <div
          class="p-8 rounded-2xl border-l-8 border-yellow-500 shadow-lg transition-colors duration-500 bg-white shadow-gray-200/50 dark:bg-secondary dark:shadow-purple-900/50"
        >
          <h2 class="text-3xl font-bold text-yellow-500 mb-6">
            🏆 How to Win the Daily Mbuzi
          </h2>
          <ul class="space-y-4">
            <li class="flex items-start">
              <span class="text-xl text-yellow-500 mr-3">1.</span>
              <div>
                <strong class="font-semibold">Share Your Link:</strong> On
                WhatsApp, SMS, and Social Media.
              </div>
            </li>
            <li class="flex items-start">
              <span class="text-xl text-yellow-500 mr-3">2.</span>
              <div>
                <strong class="font-semibold">Friends Join:</strong> Your
                friends sign up and start playing.
              </div>
            </li>
            <li class="flex items-start">
              <span class="text-xl text-yellow-500 mr-3">3.</span>
              <div>
                <strong class="font-semibold">Climb the Leaderboard:</strong>
                Every active referral earns you points.
              </div>
            </li>
          </ul>
          <p
            class="mt-6 pt-4 border-t border-gray-200 text-sm italic dark:border-purple-800"
          >
            Pro Tip: The leaderboard resets every day. If you didn't win today,
            form ni kesho!
          </p>
        </div>
      </div>

      <section class="mb-12">
        <h2
          class="text-3xl font-bold text-center mb-6 pt-4 border-b-4 border-yellow-500 pb-2"
        >
          📊 Daily Prize Breakdown (Top 30)
        </h2>
        <div class="overflow-x-auto">
          <table
            class="w-full text-center table-auto rounded-lg overflow-hidden shadow-xl"
          >
            <thead>
              <tr class="bg-yellow-500 text-white text-lg font-bold">
                <th class="p-3 w-1/4">Rank Position</th>
                <th class="p-3 w-3/4">Prize Reward</th>
              </tr>
            </thead>
            <tbody>
              <tr
                class="text-xl font-extrabold bg-red-100 dark:bg-purple-800/50"
              >
                <td class="p-3 border-r border-yellow-600">1st - 3rd</td>
                <td class="p-3 text-yellow-500">🐐 Mbuzi (KES 5,000 Cash)</td>
              </tr>
              <tr class="bg-white dark:bg-secondary">
                <td class="p-3 border-r border-gray-200 dark:border-purple-700">
                  4th - 5th
                </td>
                <td class="p-3 font-semibold text-red-500">💰 KES 2,000</td>
              </tr>
              <tr class="bg-gray-50 dark:bg-card">
                <td class="p-3 border-r border-gray-200 dark:border-purple-700">
                  6th - 10th
                </td>
                <td class="p-3 font-semibold text-red-500">💸 KES 1,000</td>
              </tr>
              <tr class="bg-white dark:bg-secondary">
                <td class="p-3 border-r border-gray-200 dark:border-purple-700">
                  11th - 20th
                </td>
                <td class="p-3 font-semibold text-red-500">💵 KES 500</td>
              </tr>
              <tr class="bg-gray-50 dark:bg-card">
                <td class="p-3 border-r border-gray-200 dark:border-purple-700">
                  21st - 30th
                </td>
                <td class="p-3 font-semibold text-red-500">🪙 KES 200</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section
        class="p-8 rounded-2xl border-l-8 border-red-500 shadow-xl mb-12 bg-white shadow-gray-200/50 dark:bg-secondary dark:shadow-purple-900/50"
      >
        <h2 class="text-3xl font-bold text-red-500 mb-6">
          🎁 Why Your Friends Will Love You
        </h2>
        <div class="flex items-center text-xl font-semibold mb-8">
          <span class="text-yellow-500 text-3xl mr-4">🌟</span>
          <p>
            Welcome Bonus: Your friends unlock over
            <span class="text-yellow-500 font-bold"
              >KES 800 in Welcome Bonuses</span
            >
            immediately after joining.
          </p>
        </div>

        <p class="text-center italic mb-8">
          Don't let your friends bet elsewhere when you could be eating Mbuzi
          courtesy of them.
        </p>

        <div class="text-center">
          <RouterLink
            :to="{ name: 'share-happiness' }"
            class="inline-block px-12 py-4 text-lg font-bold uppercase rounded-full shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl bg-yellow-500 text-white shadow-yellow-600/50"
          >
            GET MY REFERRAL LINK
          </RouterLink>
        </div>
      </section>

      <section
        class="pt-6 border-t border-dashed text-sm border-gray-300 text-gray-600 dark:border-purple-700 dark:text-gray-400"
      >
        <h3 class="text-xl font-bold mb-3 text-primary-foreground dark:text-gray-100">
          📋 Terms & Conditions
        </h3>
        <ul class="list-disc pl-5 space-y-1 mb-6">
          <li>
            Qualifying Referral: A friend counts as a referral only after they
            sign up, deposit, and place a sportsbook bet of min KES 30.
          </li>
          <li>Daily Reset: The leaderboard runs from 00:00 to 23:59 daily.</li>
          <li>
            Prize Distribution: Mbuzi winners (Top 3) receive KES 5,000 credited
            to their account.
          </li>
          <li>
            Referral Commission: The 10% commission applies to the friend's
            deposits made in 7 days.
          </li>
        </ul>

        <h3 class="text-lg font-bold mb-3 text-primary-foreground dark:text-gray-100">
          General Terms
        </h3>

        <ol class="list-decimal pl-5 space-y-1">
          <li>
            Naibet reserves the right to modify, suspend, or terminate the
            Promotion at any time without prior notice.
          </li>
          <li>
            All decisions by Naibet regarding rankings, eligibility, and prize
            distribution are final.
          </li>
          <li>
            Prizes are non-transferable and may not be exchanged for cash unless
            explicitly stated.
          </li>
          <li>
            Any form of fraudulent activity will result in immediate
            disqualification.
          </li>
          <li>
            By participating, users agree to these Terms and Conditions and
            consent to the use of their usernames and performance data for
            promotional purposes.
          </li>
        </ol>
        <h3 class="text-lg font-bold mb-3 text-primary-foreground dark:text-gray-100">
          Dispute Resolution.
        </h3>
        <p class="italic mb-2">
          Naibet is committed to maintaining a fair and transparent
          relationship.
        </p>
        <ol class="list-decimal pl-5 space-y-1">
          <li>
            Informal Resolution: Contact Support Team at
            <a
              href="mailto:info@naibet.com"
              class="text-red-500 hover:underline"
              >info@naibet.com</a
            >. Resolution targeted within 10 business days.
          </li>
          <li>
            Escalation: Unresolved disputes may be escalated to senior
            management (written summary required). Response within 15 business
            days.
          </li>
          <li>
            Binding Arbitration: If unresolved, submitted to binding arbitration
            under a recognized arbitration body in Kenya. Decision is final.
          </li>
          <li>
            Governing Law and Jurisdiction: Terms governed by the laws of Kenya.
          </li>
        </ol>
      </section>
    </div>
  </div>
</template>
