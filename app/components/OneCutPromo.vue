<script setup>
import { usePromos } from "@/composables/usePromos";
import { useDefaultSport } from "@/composables/useDefaultSport";
import { useRouter } from "vue-router";
import PromoCta from "./promos/ui/PromoCta.vue";
import PromoDetailSection from "./promos/ui/PromoDetailSection.vue";
import PromoDetailShell from "./promos/ui/PromoDetailShell.vue";
import PromoStat from "./promos/ui/PromoStat.vue";
import PromoStep from "./promos/ui/PromoStep.vue";

const router = useRouter();
const { initDefaultSport } = useDefaultSport();
const { promos, oneCutPromo } = usePromos();
const promo = promos.find((p) => p.name === oneCutPromo);

const sports = ["Football", "Basketball", "Tennis", "Cricket", "Rugby", "Boxing/MMA"];
const markets = [
  "1X2",
  "Over/Under",
  "BTTS",
  "Handicap",
  "Player Performance",
  "Correct Score",
];

function goToSports() {
  initDefaultSport(true);
  router.push({ name: "sports", params: { sport: "soccer" } });
}
</script>

<template>
  <PromoDetailShell :img="promo?.img" alt="Naibet One Cut promotion">
    <!-- Intro -->
    <PromoDetailSection
      tone="forest"
      eyebrow="🛡️ One Cut · 50% Cashback"
      title="Even when you lose, you win."
    >
      <p>
        We've all been there: a massive multi-bet with 10 legs, and just one team
        lets you down. With <strong>Naibet One Cut</strong>, that heartbreak is
        over. If your multi-bet falls short by exactly one game, we give you a 50%
        cash refund, real cash you can withdraw immediately, with no annoying
        bonus restrictions.
      </p>
    </PromoDetailSection>

    <!-- How to build -->
    <PromoDetailSection
      eyebrow="How to build a protected bet"
      eyebrow-tone="gold"
      title="Three rules, full peace of mind"
    >
      <div class="grid gap-3 sm:grid-cols-3">
        <PromoStep badge="1" title="Build your slip">
          Select 6 or more games across any sports worldwide.
        </PromoStep>
        <PromoStep badge="2" title="Meet the minimums">
          Stake at least KES 50 with odds of 1.2 or higher per selection.
        </PromoStep>
        <PromoStep badge="3" tone="gold" title="Get protected">
          If exactly one team cuts your slip, 50% of your stake is credited back
          instantly, up to KES 10,000.
        </PromoStep>
      </div>
    </PromoDetailSection>

    <!-- Scenarios -->
    <PromoDetailSection
      tone="gold"
      eyebrow="What you get"
      eyebrow-tone="gold"
      title="Three outcomes, always covered"
    >
      <div class="grid gap-3 sm:grid-cols-3">
        <PromoStat accent="emerald" label="All selections win" value="Full payout">
          Your multi-bet lands in full, exactly as placed.
        </PromoStat>
        <PromoStat accent="gold" label="Exactly 1 loses" value="50% back">
          Half your stake returned as <strong>real cash</strong>, up to KES
          10,000.
        </PromoStat>
        <PromoStat accent="neutral" label="2 or more lose" value="No cashback">
          Protection covers a single slip, not multiple misses.
        </PromoStat>
      </div>
    </PromoDetailSection>

    <!-- Eligible sports & markets -->
    <PromoDetailSection
      eyebrow="Eligible sports & markets"
      title="Mix and match across the board"
    >
      <div class="grid gap-5 sm:grid-cols-2">
        <div>
          <p class="chip-label">Sports</p>
          <div class="chips">
            <span v-for="s in sports" :key="s" class="chip">{{ s }}</span>
          </div>
        </div>
        <div>
          <p class="chip-label">Markets</p>
          <div class="chips">
            <span v-for="m in markets" :key="m" class="chip chip--gold">{{ m }}</span>
          </div>
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
          Eligibility: registered customers only, 6+ selections, odds 1.2 or
          higher, stake KES 50 or more.
        </li>
        <li>
          Cashback pays 50% of your stake if exactly one selection loses, capped
          at KES 10,000.
        </li>
        <li>
          Exclusions: void selections, cashed-out bets, system bets, same-game
          multiples, or bets placed using bonus funds and free bets.
        </li>
        <li>Naibet may modify or terminate the promotion. Standard terms apply.</li>
      </ul>
    </PromoDetailSection>

    <!-- CTA -->
    <PromoCta
      title="Ready to try One Cut protection?"
      note="18+ · Terms & Conditions Apply · Please Play Responsibly"
    >
      Join thousands of smarter bettors building protected slips today.
      <template #actions>
        <button type="button" @click="goToSports">Build a protected bet</button>
      </template>
    </PromoCta>
  </PromoDetailShell>
</template>

<style scoped>
.chip-label {
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--muted-foreground);
  margin-bottom: 12px;
}
.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.chip {
  display: inline-flex;
  align-items: center;
  padding: 7px 13px;
  border-radius: 10px;
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--foreground);
  background: color-mix(in oklch, var(--brand-bright) 12%, transparent);
  border: 1px solid color-mix(in oklch, var(--brand-bright) 22%, transparent);
}
.chip--gold {
  background: color-mix(in oklch, var(--gold) 12%, transparent);
  border-color: color-mix(in oklch, var(--gold) 28%, transparent);
}
</style>
