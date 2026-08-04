<script setup>
import { useCasino } from "@/composables/useCasino";
import { usePromos } from "@/composables/usePromos";
import { usePromoStore } from "@/stores/promos";
import { toRefs } from "vue";
import { RouterLink, useRouter } from "vue-router";
import PromoCta from "./ui/PromoCta.vue";
import PromoDetailSection from "./ui/PromoDetailSection.vue";
import PromoDetailShell from "./ui/PromoDetailShell.vue";
import PromoStep from "./ui/PromoStep.vue";

const router = useRouter();
const { selectedPromo } = toRefs(usePromoStore());
const { launchCasino } = useCasino();
const { promos, aviatorPromo } = usePromos();
const promo = promos.find((p) => p.name === aviatorPromo);

const rains = [
  { value: "10", drops: 100 },
  { value: "20", drops: 90 },
  { value: "30", drops: 80 },
  { value: "50", drops: 60 },
  { value: "100", drops: 40 },
  { value: "200", drops: 80 },
  { value: "500", drops: 20 },
  { value: "1000", drops: 20 },
];

function goToRoute() {
  if (selectedPromo.value?.game_id?.Valid) {
    router.push({ name: selectedPromo.value.app_route_name });
    return;
  }
  if (selectedPromo.value?.game_id) {
    launchCasino(
      selectedPromo.value.game_id.String,
      selectedPromo.value.game_name.String
    );
  }
}
</script>

<template>
  <PromoDetailShell
    :img="promo?.img"
    to="aviator"
    alt="Aviator Free Rains promotion"
  >
    <!-- Intro -->
    <PromoDetailSection
      tone="forest"
      eyebrow="🌧️ Aviator Free Rains"
      title="Piga extra mileage na free bet rains."
    >
      <p>
        The skies are opening up over the Aviator hangar. We're showering our
        pilots with <strong>KES 200,000 worth of Free Bets</strong> inside the
        game chat room every single day. Stay sharp, the first pilots to claim
        take the prize.
      </p>
    </PromoDetailSection>

    <!-- Headline figure -->
    <PromoDetailSection tone="gold" align="center">
      <p class="pool-label">Claim your share of</p>
      <p class="pool-value">KES 200,000</p>
      <p class="pool-sub">in free bets dropped daily, right inside the live chat</p>
    </PromoDetailSection>

    <!-- How it works -->
    <PromoDetailSection
      eyebrow="How the rain works"
      eyebrow-tone="gold"
      title="Watch the chat, claim fast"
    >
      <div class="grid gap-3 sm:grid-cols-3">
        <PromoStep badge="1" title="Open the chat">
          Launch Bandabets Aviator and keep your eye on the live chat box.
        </PromoStep>
        <PromoStep badge="2" title="Spot the rain">
          Throughout the day, Free Bet Rains drop randomly in the chat window.
        </PromoStep>
        <PromoStep badge="3" tone="gold" title="Be lightning fast">
          The first players to tap CLAIM get the free bet loaded instantly.
        </PromoStep>
      </div>
    </PromoDetailSection>

    <!-- Rain values -->
    <PromoDetailSection
      eyebrow="Free bet values"
      title="Drops worth catching, every day"
    >
      <div class="rain-grid">
        <div v-for="r in rains" :key="r.value" class="rain-card">
          <p class="rain-card__value">KES {{ r.value }}</p>
          <p class="rain-card__drops">{{ r.drops }} drops / day</p>
        </div>
      </div>
    </PromoDetailSection>

    <!-- Terms -->
    <PromoDetailSection
      tone="elevated"
      eyebrow="📋 Terms & conditions"
      title="The fine print"
    >
      <ul class="plist">
        <li>
          To claim a Free Bet from the Rain, you must have wagered a minimum of
          KES 50 on Aviator within the 30 minutes prior to the drop.
        </li>
        <li>
          Free Bets claimed from the chat must be used within 30 minutes of
          claiming, or they will expire.
        </li>
        <li>
          Winnings from the Free Bet Rain can be cashed out once the multiplier
          reaches 1.50x or higher.
        </li>
        <li>You can claim once per Rain event.</li>
        <li>System errors or suspicious activity may lead to voided winnings.</li>
        <li>Standard Bandabets Aviator Terms &amp; Conditions apply.</li>
      </ul>
    </PromoDetailSection>

    <!-- CTA -->
    <PromoCta
      title="Ready to fly? Claim now."
      note="18+ · Terms & Conditions Apply · Please Play Responsibly"
    >
      Open Aviator, keep the chat in view, and grab your share of the rain.
      <template #actions>
        <RouterLink :to="{ name: 'aviator' }" @click="goToRoute">
          Play Aviator now
        </RouterLink>
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
  font-size: clamp(2.4rem, 8vw, 4rem);
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

.rain-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}
@media (min-width: 640px) {
  .rain-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
.rain-card {
  padding: 16px;
  border-radius: 14px;
  text-align: center;
  background: color-mix(in oklch, var(--gold) 8%, var(--surface-elevated));
  border: 1px solid color-mix(in oklch, var(--gold) 22%, var(--border));
}
.rain-card__value {
  font-size: 1.05rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: var(--gold-deep);
  font-variant-numeric: tabular-nums;
}
[data-theme="dark"] .rain-card__value {
  color: var(--gold-bright);
}
.rain-card__drops {
  margin-top: 3px;
  font-size: 0.72rem;
  color: var(--muted-foreground);
}
</style>
