<script setup>
import { usePromos } from "@/composables/usePromos";
import { RouterLink } from "vue-router";
import PromoCta from "./ui/PromoCta.vue";
import PromoDetailSection from "./ui/PromoDetailSection.vue";
import PromoDetailShell from "./ui/PromoDetailShell.vue";
import PromoStep from "./ui/PromoStep.vue";

const { promos, welcomeBonusPromo } = usePromos();
const promo = promos.find((p) => p.name === welcomeBonusPromo);
</script>

<template>
  <PromoDetailShell
    :img="promo?.img"
    to="signup"
    alt="Naibet Welcome Bonus promotion"
  >
    <!-- Intro -->
    <PromoDetailSection
      tone="forest"
      eyebrow="🎁 Welcome Bonus"
      title="Zero risk. Pure reward. Play for free."
    >
      <p>
        New to Naibet? We are rolling out the red carpet for you. Get a taste of
        the action with our signature <strong>Deposit-Free Sportsbook Welcome
        Bonus</strong>. You don't need to spend a single shilling to start
        winning.
      </p>
    </PromoDetailSection>

    <!-- How it works -->
    <PromoDetailSection
      eyebrow="How it works"
      eyebrow-tone="gold"
      title="Three steps to your free bet"
    >
      <div class="grid gap-3 sm:grid-cols-3">
        <PromoStep badge="1" title="Sign up">
          Create a new Naibet account, verified by phone number or ID.
        </PromoStep>
        <PromoStep badge="2" title="Place your free bet">
          Pick your favourite game. No deposit needed to play.
        </PromoStep>
        <PromoStep badge="3" tone="gold" title="Keep the winnings">
          Win real money on the house and cash out.
        </PromoStep>
      </div>
    </PromoDetailSection>

    <!-- Terms -->
    <PromoDetailSection
      tone="elevated"
      eyebrow="📜 Terms & conditions"
      title="The fine print"
    >
      <ul class="plist">
        <li>
          Available strictly to newly registered, unique accounts verified by
          phone number or ID.
        </li>
        <li>No deposit is required to activate or place the welcome free bet.</li>
        <li>Winnings returned exclude the initial free bet stake.</li>
        <li>
          To prevent abuse, maximum withdrawable winnings may be capped, and
          standard account verification must be completed before any withdrawal.
        </li>
      </ul>
    </PromoDetailSection>

    <!-- CTA -->
    <PromoCta
      title="Ready to play for free?"
      note="18+ · Terms & Conditions Apply · Please Play Responsibly"
    >
      Sign up today and claim your no-deposit free bet.
      <template #actions>
        <RouterLink :to="{ name: 'signup' }">Create account & claim</RouterLink>
      </template>
    </PromoCta>
  </PromoDetailShell>
</template>
