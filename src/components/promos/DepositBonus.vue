<script setup>
import { usePromos } from "@/composables/usePromos";
import { RouterLink } from "vue-router";
import DepositBonusTable from "../DepositBonusTable.vue";
import DepositBonusTerms from "../DepositBonusTerms.vue";
import PromoCta from "./ui/PromoCta.vue";
import PromoDetailSection from "./ui/PromoDetailSection.vue";
import PromoDetailShell from "./ui/PromoDetailShell.vue";
import PromoStep from "./ui/PromoStep.vue";

const { promos, cashbackPromo } = usePromos();
const promo = promos.find((p) => p.name === cashbackPromo);
</script>

<template>
  <PromoDetailShell
    :img="promo?.img"
    to="deposit"
    alt="Daily Deposit Bonus promotion"
  >
    <!-- Intro -->
    <PromoDetailSection
      tone="forest"
      eyebrow="💰 Daily Deposit Bonus"
      title="First deposit, first bonus, every single day."
    >
      <p>
        Why pay transaction fees when we can pay them for you? We give you a daily
        bonus on your first deposit(s) of the day, effectively refunding your
        partial or full transaction charges and putting more cash back into your
        betting pocket. <strong>The more you deposit, the bigger the bonus you
        unlock.</strong>
      </p>
    </PromoDetailSection>

    <!-- How it works -->
    <PromoDetailSection
      eyebrow="How it works"
      eyebrow-tone="gold"
      title="Three steps, instant value"
    >
      <div class="grid gap-3 sm:grid-cols-3">
        <PromoStep badge="1" title="Make your deposit">
          Deposit any amount from KES 49 on your first top-up of the day.
        </PromoStep>
        <PromoStep badge="2" tone="gold" title="Unlock your tier">
          The bigger your deposit, the bigger the matching bonus reward.
        </PromoStep>
        <PromoStep badge="3" title="Get it instantly">
          The bonus lands in your wallet the moment your deposit clears.
        </PromoStep>
      </div>
    </PromoDetailSection>

    <!-- Tiers (own premium card) -->
    <DepositBonusTable />

    <!-- Terms (own premium card) -->
    <DepositBonusTerms />

    <!-- CTA -->
    <PromoCta
      title="More cash, every time you deposit."
      note="18+ · Terms & Conditions Apply · Please Play Responsibly"
    >
      Top up today and claim your instant daily deposit bonus.
      <template #actions>
        <RouterLink :to="{ name: 'deposit' }">Deposit now</RouterLink>
      </template>
    </PromoCta>
  </PromoDetailShell>
</template>
