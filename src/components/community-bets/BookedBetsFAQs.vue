<script setup>
import { ChevronDownIcon } from "@heroicons/vue/24/outline";
import { ref } from "vue";

const faqs = ref([
  {
    id: 1,
    question: "What is Bet Hub?",
    answer: "Bet Hub is your go-to library of bet IDs (share codes), packed with the hottest picks and ready-made bets from fellow punters. It's your shortcut to smart, winning combos!",
  },
  {
    id: 2,
    question: "How do I use Bet Hub?",
    answer: "Browse and filter bet IDs by top leagues, today's matches, or your favorite competitions. Found one you like? Just tap Add and you're ready to place your bet!",
  },
  {
    id: 3,
    question: "Can I trust the bet IDs?",
    answer: "These are genuine picks shared by fellow punters. Betting involves both luck and strategy — no sure things, but plenty of excitement!",
  },
  {
    id: 5,
    question: "Why should I use Bet Hub?",
    answer: "It's fast, simple, and saves you the trouble of creating bets from scratch. Plus, you get a sneak peek at what other punters are backing.",
  },
  {
    id: 8,
    question: "What can I do with my Bet ID?",
    answer: "Save for later, share with friends, or revisit your selections — no need to rebuild your betslip.",
  },
  {
    id: 10,
    question: "How long does my Bet ID stay valid?",
    answer: "Your Bet ID stays active until the last match in your selection starts. Once it kicks off, the code expires.",
  },
  {
    id: 11,
    question: "Why should I use Book Bet?",
    answer: "It's perfect for when you're inspired but not ready to bet. Save time, avoid rush decisions, and share your picks with your squad!",
  },
]);

const openId = ref(null);
const toggle = (id) => {
  openId.value = openId.value === id ? null : id;
};
</script>

<template>
  <div class="space-y-2">
    <div
      v-for="faq in faqs"
      :key="faq.id"
      class="bg-card rounded-xl border border-border/50 overflow-hidden"
    >
      <button
        class="w-full flex items-center justify-between p-4 text-left hover:bg-accent/30 transition-colors"
        @click="toggle(faq.id)"
      >
        <span class="text-sm font-medium text-foreground pr-4">
          {{ faq.question }}
        </span>
        <ChevronDownIcon
          class="w-4 h-4 text-muted-foreground shrink-0 transition-transform duration-200"
          :class="{ 'rotate-180': openId === faq.id }"
        />
      </button>
      <Transition
        enter-active-class="transition-all duration-200 ease-out"
        enter-from-class="max-h-0 opacity-0"
        enter-to-class="max-h-40 opacity-100"
        leave-active-class="transition-all duration-150 ease-in"
        leave-from-class="max-h-40 opacity-100"
        leave-to-class="max-h-0 opacity-0"
      >
        <div v-if="openId === faq.id" class="overflow-hidden">
          <p class="px-4 pb-4 text-sm text-muted-foreground leading-relaxed">
            {{ faq.answer }}
          </p>
        </div>
      </Transition>
    </div>
  </div>
</template>
