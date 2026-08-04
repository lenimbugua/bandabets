<script setup>
import { usePromos } from "@/composables/usePromos";
import { RouterLink } from "vue-router";
import PromoCta from "./promos/ui/PromoCta.vue";
import PromoDetailSection from "./promos/ui/PromoDetailSection.vue";
import PromoDetailShell from "./promos/ui/PromoDetailShell.vue";
import PromoStat from "./promos/ui/PromoStat.vue";
import PromoStep from "./promos/ui/PromoStep.vue";

const { promos, dailyAviatorCashback } = usePromos();
const promo = promos.find((p) => p.name === dailyAviatorCashback);
</script>

<template>
  <PromoDetailShell
    :img="promo?.img"
    to="aviator"
    alt="Pepea na Aviator Daily Cashback promotion"
  >
    <!-- Intro -->
    <PromoDetailSection
      tone="forest"
      eyebrow="✈️ Pepea na Aviator · Daily Cashback"
      title="Even a bad flight pays you back."
    >
      <p>
        Don't let a rough round ground your fun. Every single day, loyal Bandabets
        Aviator players are randomly rewarded with <strong>real cashback on their
        net losses</strong>. The more rounds you fly, the higher your chances of
        hitting the daily selection.
      </p>
    </PromoDetailSection>

    <!-- Daily cycle -->
    <PromoDetailSection
      eyebrow="The daily selection cycle"
      eyebrow-tone="gold"
      title="From last round to payday"
    >
      <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <PromoStep badge="⏰" title="11:59 PM">
          The system automatically calculates eligible net losses for the day.
        </PromoStep>
        <PromoStep badge="🎲" title="Random draw">
          A specialized selection algorithm picks the daily cashback winners.
        </PromoStep>
        <PromoStep badge="💸" tone="gold" title="9:00 AM payday">
          Cashback is credited directly into your account every morning.
        </PromoStep>
        <PromoStep badge="📲" title="Alerts">
          Winners receive an immediate SMS and in-app notification.
        </PromoStep>
      </div>
    </PromoDetailSection>

    <!-- Tiers -->
    <PromoDetailSection
      tone="gold"
      eyebrow="Cashback tiers"
      eyebrow-tone="gold"
      title="Play more, get more back"
    >
      <div class="grid gap-3 sm:grid-cols-3">
        <PromoStat accent="bronze" label="Bronze" value="15%">
          Total stakes <strong>KES 5,000</strong> · net loss
          <strong>KES 1,000</strong> → up to KES 150 back.
        </PromoStat>
        <PromoStat accent="gold" label="Gold" value="25%">
          Total stakes <strong>KES 20,000</strong> · net loss
          <strong>KES 5,000</strong> → up to KES 1,250 back.
        </PromoStat>
        <PromoStat accent="diamond" label="Diamond" value="30%">
          Total stakes <strong>KES 40,000</strong> · net loss
          <strong>KES 15,000</strong> → up to KES 4,500 back.
        </PromoStat>
      </div>
    </PromoDetailSection>

    <!-- Eligibility -->
    <PromoDetailSection
      tone="elevated"
      eyebrow="📋 Eligibility requirements"
      title="Who qualifies"
    >
      <ul class="plist">
        <li>Must have played Aviator within the last 48 hours.</li>
        <li>
          Must have a verified active account with a minimum of 10 Aviator rounds
          played.
        </li>
        <li>Minimum net loss of KES 200 or more within the last 24 hours.</li>
        <li>The more rounds you fly, the higher your chance of selection.</li>
      </ul>
    </PromoDetailSection>

    <!-- CTA -->
    <PromoCta
      title="Start your daily cashback journey."
      note="18+ · Terms & Conditions Apply · Please Play Responsibly"
    >
      Play smart, stay loyal, and get rewarded with surprise cash every day.
      <template #actions>
        <RouterLink :to="{ name: 'aviator' }">Play Aviator now</RouterLink>
      </template>
    </PromoCta>
  </PromoDetailShell>
</template>
