<script setup>
import { useDefaultSport } from "@/composables/useDefaultSport";
import { usePromos } from "@/composables/usePromos";
import { useRouter } from "vue-router";
import PromoCta from "./ui/PromoCta.vue";
import PromoDetailSection from "./ui/PromoDetailSection.vue";
import PromoDetailShell from "./ui/PromoDetailShell.vue";
import PromoStat from "./ui/PromoStat.vue";

const router = useRouter();
const { initDefaultSport } = useDefaultSport();
const { promos, earlyCashoutPromo } = usePromos();
const promo = promos.find((p) => p.name === earlyCashoutPromo);

function goToSports() {
  initDefaultSport(true);
  router.push({ name: "sports", params: { sport: "soccer" } });
}
</script>

<template>
  <PromoDetailShell
    :img="promo?.img"
    alt="Naibet Early Cashout promotion"
  >
    <!-- Intro -->
    <PromoDetailSection
      tone="forest"
      eyebrow="⏱️ Early Cashout"
      title="Take total control of your bets."
    >
      <p>
        Is your team leading 1-0 in the 80th minute but looking shaky? Don't
        sweat it out until the final whistle. Secure a profit or cut your losses
        before a match even finishes. Whether it's a single bet or a massive
        accumulator, <strong>you call the shots</strong>.
      </p>
    </PromoDetailSection>

    <!-- Why choose -->
    <PromoDetailSection
      eyebrow="Why choose it"
      eyebrow-tone="gold"
      title="Three ways to stay in command"
    >
      <div class="grid gap-3 sm:grid-cols-3">
        <PromoStat accent="emerald" label="Pre-match & live">
          Cash out on major global events both before kick-off and live in-play.
        </PromoStat>
        <PromoStat accent="gold" label="Partial cashout">
          Lock in some profit and leave the rest of your stake running with the
          slider.
        </PromoStat>
        <PromoStat accent="emerald" label="Instant payout">
          Funds transferred straight into your main balance the moment you tap.
        </PromoStat>
      </div>
    </PromoDetailSection>

    <!-- Terms -->
    <PromoDetailSection
      tone="elevated"
      eyebrow="📋 Terms & conditions"
      title="Good to know"
    >
      <ul class="plist">
        <li>
          Cashout availability is subject to live market fluctuations. If a
          market is suspended or odds change rapidly, the offer may be
          temporarily unavailable.
        </li>
        <li>
          Bets settled using Cashout do not count toward the wagering
          requirements of other active offers. One Cut protection is voided if
          you cash out.
        </li>
        <li>
          Naibet cannot guarantee the availability of Cashout on every market
          or event.
        </li>
      </ul>
    </PromoDetailSection>

    <!-- CTA -->
    <PromoCta
      title="Bet smart. Cash out anytime."
      note="18+ · Terms & Conditions Apply · Please Play Responsibly"
    >
      Place your bet and stay in control from kick-off to the final whistle.
      <template #actions>
        <button type="button" @click="goToSports">Bet now</button>
      </template>
    </PromoCta>
  </PromoDetailShell>
</template>
