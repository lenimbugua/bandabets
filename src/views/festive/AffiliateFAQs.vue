<script setup>
import { ChevronRightIcon } from "@heroicons/vue/20/solid";
import { ChevronUpIcon } from "@heroicons/vue/24/solid";
import { ref } from "vue";

const faqs = ref([
  {
    id: 1,
    question: "1.⁠ ⁠What is Sambaza za Krisii na Mabeste promo?",
    answer: `Join our Sambaza za Krisi na Mabeste festive promo and earn amazing rewards just for sharing with your friends! For every friend you invite who signs up and places a sportbook bet, you instantly get KES 30 after sportsbook resulting. You'll also earn a 10% bonus from their first 7 days deposits. Plus, every referral gives you a daily chance to win a "Mbuzi" – KES 5,000 cash! Start sharing now and let the festive wins begin.`,
  },
  {
    id: 2,
    question:
      "2.⁠ ⁠What are the requirements for eligibility to participate in this program?",
    answer: `Jump into the Sambaza za Krisii na Mabeste promo at no extra cost! All you need is to have made a deposit of at least KES 49 in the last week. Once you're in, just start sharing—it's that simple to grow your network and your earnings!`,
  },
  {
    id: 3,
    question: "3.⁠ ⁠How is the Commission Calculated?",
    answer: `You earn a 10% commission on the total amount your referrals deposit each day, for the first 7 days after they sign up. Provided they signup within 7 days of you referring them`,
  },
  {
    id: 4,
    question: "4.⁠ ⁠Can I lose any money for players that win on the site?",
    answer: `When your players win, you share in their success—but you never lose. Even if overall game profits are negative, your revenue from the bonus is not touched. Play risk-free, win big!`,
  },
  {
    id: 5,
    question: "5.⁠ ⁠How can I see my winnings",
    answer: `We have a very simple and clear visual that displays what your current revenue is for the current day, the overall revenue you have generated and lists the players that you have signed up (not any of their personal data, just to confirm that they have successfully registered through you.`,
  },
  {
    id: 6,
    question:
      "6.⁠ ⁠When are my daily earnings finalized and available for withdrawal?",
    answer: `Track your referral earnings in real-time directly in your promo wallet. Your daily total is automatically transferred to your main wallet the following day at 09:00 AM EAT, ready for you to use. The cycle then resets for a new day of earning.`,
  },
]);

const openAccordion = (id) => {
  faqs.value.forEach((faq) => {
    if (faq.id === id) {
      faq.isOpened = !faq.isOpened;
    } else {
      faq.isOpened = false;
    }
  });
};
</script>

<template>
  <div
    class="border border-gray-300 dark:bg-surface-active dark:border-white/20 rounded-md bg-white p-4 mt-3 mb-16"
  >
    <!-- Accordion Item 2 -->
    <div
      v-for="faq in faqs"
      :key="faq.id"
      class="text-white border-gray-300 dark:bg-surface-active text-sm first:mt-2 flex-col mb-3 border dark:border-border-subtle rounded-3xl overflow-clip"
    >
      <div
        class="flex justify-between dark:text-white items-center p-3 bg-gray-200 dark:bg-card"
        @click="openAccordion(faq.id)"
      >
        <div class="flex space-x-2 items-center">
          <div class="font-medium text-gray-950 dark:text-slate-300">
            {{ faq.question }}
          </div>
        </div>
        <ChevronUpIcon
          v-if="faq.isOpened"
          class="h-5 w-5 text-gray-950 dark:text-white"
        />
        <ChevronRightIcon
          v-else
          class="h-5 w-5 text-gray-950 dark:text-white"
        />
      </div>
      <div v-if="faq.isOpened">
        <div
          class="bg-gray-100 text-md dark:bg-surface-elevated flex justify-between text-gray-600 dark:text-slate-400 p-3 text-md items-center"
        >
          <div>{{ faq.answer }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
