<script setup>
import { usePromos } from "@/composables/usePromos";
import { RouterLink } from "vue-router";
import PromoCta from "./ui/PromoCta.vue";
import PromoDetailSection from "./ui/PromoDetailSection.vue";
import PromoDetailShell from "./ui/PromoDetailShell.vue";
import PromoStat from "./ui/PromoStat.vue";

const { promos, playonRainsPromo } = usePromos();
const promo = promos.find((p) => p.name === playonRainsPromo);
</script>

<template>
  <PromoDetailShell
    :img="promo?.img"
    to="playon"
    alt="Jipin na Wagerless Rains on Playon promotion"
  >
    <!-- Intro -->
    <PromoDetailSection
      tone="forest"
      eyebrow="🌧️ Wagerless Rains"
      title="Jipin na Wagerless Rains on Playon"
    >
      <p>
        Ready for the ultimate gaming downpour? Dive into Playon and grab your
        share of <strong>KES 1,000,000 worth of Free Bet Rains</strong>. Best of
        all, they are completely wagerless. What you win is yours to keep, with
        zero strings attached.
      </p>
    </PromoDetailSection>

    <!-- Headline figure -->
    <PromoDetailSection tone="gold" align="center">
      <p class="pool-label">Total pool, every day</p>
      <p class="pool-value">KES 1,000,000</p>
      <p class="pool-sub">distributed randomly via system drops to active players</p>
    </PromoDetailSection>

    <!-- Why -->
    <PromoDetailSection
      eyebrow="Play free & win big"
      eyebrow-tone="gold"
      title="No rollover. No catch."
    >
      <div class="grid gap-3 sm:grid-cols-3">
        <PromoStat accent="emerald" label="No rollover">
          No complicated rollover requirements on your winnings.
        </PromoStat>
        <PromoStat accent="emerald" label="No playthrough">
          No hidden playthrough terms buried in the fine print.
        </PromoStat>
        <PromoStat accent="gold" label="Pure free play">
          Free spins and free play drops on our premium Playon catalog.
        </PromoStat>
      </div>
      <p class="mt-4 text-center note">
        Keep your gaming lobby active, watch for the 1 Million pool
        notifications, and grab your share.
      </p>
    </PromoDetailSection>

    <!-- Terms -->
    <PromoDetailSection
      tone="elevated"
      eyebrow="📋 Terms & conditions"
      title="The fine print"
    >
      <ul class="plist">
        <li>
          The KES 1,000,000 Playon pool is distributed randomly via system drops
          to active players.
        </li>
        <li>
          Wagerless means winnings from these promo rains are immediately credited
          to your withdrawable cash balance, with no turnover requirements.
        </li>
        <li>
          Accounts must be fully verified and in good standing to qualify for the
          Playon pool.
        </li>
      </ul>
    </PromoDetailSection>

    <!-- CTA -->
    <PromoCta
      title="Grab your share of 1 Million."
      note="18+ · Terms & Conditions Apply · Please Play Responsibly"
    >
      Keep your Playon lobby active and catch the rain.
      <template #actions>
        <RouterLink :to="{ name: 'playon' }">Play Playon now</RouterLink>
      </template>
    </PromoCta>
  </PromoDetailShell>
</template>

<style scoped>
.pool-label {
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--gold-deep);
}
[data-theme="dark"] .pool-label {
  color: var(--gold-bright);
}
.pool-value {
  margin-top: 8px;
  font-size: clamp(2.6rem, 9vw, 4.5rem);
  font-weight: 800;
  letter-spacing: -0.04em;
  line-height: 0.95;
  color: var(--gold-deep);
  font-variant-numeric: tabular-nums;
}
[data-theme="dark"] .pool-value {
  color: var(--gold-bright);
}
.pool-sub {
  margin-top: 10px;
  font-size: 0.85rem;
  color: var(--muted-foreground);
}
.note {
  font-size: 0.85rem;
  color: var(--muted-foreground);
}
</style>
