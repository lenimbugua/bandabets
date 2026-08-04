<script setup>
import MobileFooterV2 from "../components/mobile/MobileFooterV2.vue";
import FreebetButton from "@/components/freebet/FreebetButton.vue";
import HeaderLinks from "@/components/HeaderLinks.vue";
import { useFormatDates } from "@/composables/useFormatDates";
import { useFreebetStore } from "@/stores/freebet";
import { CheckCircleIcon } from "@heroicons/vue/20/solid";
import { ArrowRightIcon } from "@heroicons/vue/24/outline";
import { storeToRefs } from "pinia";
import { computed, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const { humanFriendlyDate } = useFormatDates();

// Freebet store
const freebetStore = useFreebetStore();
const { fetchFreebet, clearFreebet, createSportsbookFreebet } = freebetStore;
const { freebet, pending, betslip, totalOdds, createPending, createError, createSuccess } =
  storeToRefs(freebetStore);

const possibleWin = computed(() => {
  if (!totalOdds.value) return 0;
  const win = freebetStore.stake * totalOdds.value - freebetStore.stake;
  return Math.round((Math.max(0, win) + Number.EPSILON) * 100) / 100;
});

const formCustomId = (parent_match_id, sub_type_id, outcome_name, index) => {
  return `${parent_match_id}${sub_type_id}${outcome_name}${index}`;
};

// Fetch freebet data
fetchFreebet();

async function placeBet() {
  if (!betslip.value) return;
  await createSportsbookFreebet();
}

function proceedToApp() {
  router.push({ name: "home" });
}

onBeforeUnmount(() => {
  clearFreebet();
});
</script>

<template>
  <HeaderLinks />

  <div class="wg">
    <!-- Ambient stage lighting -->
    <div class="wg-stage" aria-hidden="true">
      <div class="wg-ambient wg-ambient--emerald"></div>
      <div class="wg-ambient wg-ambient--ember"></div>
    </div>

    <div class="wg-container">
      <!-- Heading -->
      <header class="wg-head">
        <h1 class="wg-title">Your Welcome Gift</h1>
        <p class="wg-sub">Claim your reward to supercharge your Naibet experience</p>
      </header>

      <!-- Vouchers -->
      <div class="wg-cards">
        <!-- ═══ SPORTSBOOK VOUCHER ═══ -->
        <article class="voucher voucher--emerald">
          <div class="voucher-glow" aria-hidden="true"></div>

          <!-- Stub -->
          <div class="voucher-stub">
            <div class="stub-top">
              <span class="stub-icon">
                <SecondaryNavIcons icon="soccer" icon-css="w-4 h-4" />
              </span>
              <span class="stub-kind">Sportsbook</span>
            </div>
            <div class="stub-amount">
              <span class="amt-cur">KES</span>
              <span class="amt-num">20</span>
              <span class="amt-label">free bet</span>
            </div>
          </div>

          <!-- Perforation -->
          <div class="voucher-perf" aria-hidden="true">
            <span class="notch notch--l"></span>
            <span class="notch notch--r"></span>
          </div>

          <!-- Body -->
          <div class="voucher-body">
            <AnimatePulse v-if="pending" :rows="1" />
            <template v-if="freebet">
              <div class="match-strip">
                <div class="match-team">
                  <span class="match-initial">{{
                    freebet.homeTeam?.charAt(0)
                  }}</span>
                  <span class="match-name">{{ freebet.homeTeam }}</span>
                </div>
                <div class="match-center">
                  <span class="match-vs">vs</span>
                  <span class="match-date">{{
                    humanFriendlyDate(freebet.startTime)
                  }}</span>
                </div>
                <div class="match-team">
                  <span class="match-initial">{{
                    freebet.awayTeam?.charAt(0)
                  }}</span>
                  <span class="match-name">{{ freebet.awayTeam }}</span>
                </div>
              </div>

              <div class="odds-row">
                <FreebetButton
                  v-for="outcome in freebet.markets[0].matchOutcomes"
                  :key="outcome.id"
                  :outcome="outcome"
                  :season-id="freebet.homeTeam"
                  :home-team="freebet.homeTeam"
                  :sport-id="freebet.sportId"
                  :custom-id="
                    formCustomId(
                      freebet.parentMatchId,
                      outcome.marketId,
                      outcome.outcomeName,
                      outcome.outcomeId
                    )
                  "
                  :away-team="freebet.awayTeam"
                  :start-time="freebet.startTime"
                  :competition-id="freebet.competitionId"
                  :sub-type-id="parseInt(outcome.marketId)"
                  :competition-name="freebet.competitionName"
                  :country-name="freebet.countryName"
                  :sport-name="freebet.sportName"
                  :parent-match-id="freebet.parentMatchId"
                />
              </div>

              <!-- Payout summary -->
              <div v-if="betslip" class="payout">
                <div class="payout-item">
                  <span class="payout-label">Stake</span>
                  <span class="payout-value">KES {{ freebetStore.stake }}</span>
                </div>
                <span class="payout-arrow">→</span>
                <div class="payout-item">
                  <span class="payout-label">To win</span>
                  <span class="payout-value payout-value--win"
                    >KES {{ possibleWin }}</span
                  >
                </div>
              </div>
            </template>
          </div>

          <!-- Footer -->
          <div class="voucher-foot">
            <div v-if="createError" class="bet-error">{{ createError }}</div>
            <template v-if="!createSuccess">
              <button
                :disabled="!betslip || createPending"
                class="claim-btn claim-btn--emerald"
                :class="{ 'claim-btn--disabled': !betslip || createPending }"
                @click="placeBet"
              >
                <span v-if="createPending">Placing…</span>
                <span v-else>{{
                  betslip ? "Place free bet" : "Select an outcome"
                }}</span>
              </button>
            </template>
            <div v-else class="bet-success">
              <CheckCircleIcon class="bet-success-icon" />
              <span>Free bet placed</span>
            </div>
          </div>
        </article>
      </div>

      <!-- Proceed -->
      <button class="wg-proceed" @click="proceedToApp">
        Continue to Naibet
        <ArrowRightIcon class="wg-proceed-icon" />
      </button>
    </div>
  </div>

  <MobileFooterV2 />
  <Footer />
</template>

<style scoped>
/* ════════════════════════════════════════════
   WELCOME GIFT — "Redeemable Vault Vouchers"
   Dark, lit stage · gold medallion · ticket perforation
   ════════════════════════════════════════════ */

.wg {
  position: relative;
  min-height: calc(100dvh - 56px);
  background: var(--surface-sunken);
  overflow: hidden;
  /* notch colour = the surface directly behind each voucher */
  --wg-notch: var(--surface-sunken);
}

/* ── Ambient stage lighting ── */
.wg-stage {
  position: absolute;
  inset: 0;
  pointer-events: none;
}
.wg-ambient {
  position: absolute;
  width: 460px;
  height: 460px;
  border-radius: 50%;
  filter: blur(120px);
  opacity: 0.16;
}
.wg-ambient--emerald {
  top: -140px;
  left: -80px;
  background: var(--brand-bright);
}
.wg-ambient--ember {
  top: -120px;
  right: -100px;
  background: var(--gold-deep);
}

.wg-container {
  position: relative;
  z-index: 1;
  max-width: 860px;
  margin: 0 auto;
  padding: 40px 16px 36px;
}

/* ── Heading ── */
.wg-head {
  text-align: center;
  margin-bottom: 30px;
}
.wg-title {
  font-size: clamp(1.6rem, 5vw, 2.4rem);
  font-weight: 800;
  letter-spacing: -0.025em;
  line-height: 1.05;
  color: var(--foreground);
}
.wg-sub {
  font-size: 0.875rem;
  color: var(--muted-foreground);
  margin-top: 8px;
}

/* ── Cards layout ── */
.wg-cards {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 0;
  margin-bottom: 28px;
}
@media (min-width: 720px) {
  .wg-cards {
    flex-direction: row;
    align-items: stretch;
  }
}

/* ── Voucher ── */
.voucher {
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  border-radius: 18px;
  overflow: hidden;
  background: var(--surface-elevated);
  border: 1px solid var(--border-subtle);
  box-shadow: 0 18px 40px -24px oklch(0% 0 0 / 0.7),
    inset 0 1px 0 oklch(100% 0 0 / 0.04);
  transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
}
.voucher:hover {
  transform: translateY(-4px);
  border-color: color-mix(in oklch, var(--acc) 45%, var(--border-strong));
  box-shadow: 0 26px 56px -26px oklch(0% 0 0 / 0.75),
    0 0 0 1px color-mix(in oklch, var(--acc) 30%, transparent),
    inset 0 1px 0 oklch(100% 0 0 / 0.06);
}
.voucher--emerald {
  --acc: var(--brand-bright);
  --acc-deep: var(--brand-forest);
}

/* accent glow inside card */
.voucher-glow {
  position: absolute;
  top: -50px;
  right: -50px;
  width: 160px;
  height: 160px;
  border-radius: 50%;
  background: var(--acc);
  filter: blur(60px);
  opacity: 0.14;
  pointer-events: none;
  transition: opacity 0.3s ease;
}
.voucher:hover .voucher-glow {
  opacity: 0.26;
}

/* ── Stub (the headline band) ── */
.voucher-stub {
  position: relative;
  padding: 18px 18px 16px;
  background: linear-gradient(
    160deg,
    color-mix(in oklch, var(--acc) 14%, var(--surface-elevated)),
    color-mix(in oklch, var(--acc) 4%, var(--surface-elevated))
  );
  border-bottom: 1px solid color-mix(in oklch, var(--acc) 22%, transparent);
}
.voucher-stub::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(
    90deg,
    transparent,
    color-mix(in oklch, var(--acc) 80%, transparent),
    transparent
  );
}
.stub-top {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 14px;
}
.stub-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  border-radius: 8px;
  background: color-mix(in oklch, var(--acc) 16%, transparent);
  border: 1px solid color-mix(in oklch, var(--acc) 28%, transparent);
  color: var(--acc);
}
.stub-kind {
  font-size: 0.6875rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: var(--foreground);
}
.stub-amount {
  display: flex;
  align-items: baseline;
  gap: 6px;
}
.amt-cur {
  font-size: 0.8125rem;
  font-weight: 700;
  color: var(--muted-foreground);
  align-self: flex-start;
  margin-top: 4px;
}
.amt-num {
  font-size: 2.75rem;
  font-weight: 800;
  line-height: 1;
  letter-spacing: -0.03em;
  font-variant-numeric: tabular-nums;
  color: var(--acc);
}
.amt-label {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--muted-foreground);
}

/* ── Perforation (ticket cut) ── */
.voucher-perf {
  position: relative;
  height: 0;
  border-top: 1.5px dashed
    color-mix(in oklch, var(--border-strong) 70%, transparent);
  margin: 0 14px;
}
.notch {
  position: absolute;
  top: 0;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: var(--wg-notch);
  transform: translateY(-50%);
}
.notch--l {
  left: -14px;
  transform: translate(-50%, -50%);
}
.notch--r {
  right: -14px;
  transform: translate(50%, -50%);
}

/* ── Body ── */
.voucher-body {
  flex: 1;
  padding: 16px 18px 8px;
}

/* match strip */
.match-strip {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 14px;
}
.match-team {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  flex: 1;
  min-width: 0;
}
.match-initial {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 0.9375rem;
  color: var(--foreground);
  background: linear-gradient(
    150deg,
    color-mix(in oklch, var(--acc) 22%, var(--surface-interactive)),
    var(--surface-interactive)
  );
  border: 1px solid color-mix(in oklch, var(--acc) 24%, transparent);
}
.match-name {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--foreground);
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
}
.match-center {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
  gap: 2px;
}
.match-vs {
  font-size: 0.625rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--acc);
}
.match-date {
  font-size: 0.625rem;
  color: var(--muted-foreground);
  white-space: nowrap;
}

/* odds */
.odds-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 7px;
  margin-bottom: 4px;
}

/* payout */
.payout {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid var(--border-subtle);
}
.payout-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}
.payout-label {
  font-size: 0.625rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--muted-foreground);
}
.payout-value {
  font-size: 0.875rem;
  font-weight: 800;
  font-variant-numeric: tabular-nums;
  color: var(--foreground);
}
.payout-value--win {
  color: var(--brand-bright);
}
.payout-arrow {
  color: var(--text-subtle);
  font-size: 0.875rem;
}

/* ── Footer / claim ── */
.voucher-foot {
  padding: 8px 18px 18px;
}
.claim-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  width: 100%;
  padding: 12px 18px;
  border-radius: 12px;
  border: none;
  font-size: 0.8125rem;
  font-weight: 700;
  letter-spacing: 0.01em;
  cursor: pointer;
  transition: transform 0.12s ease, filter 0.18s ease, box-shadow 0.18s ease;
}
.claim-btn:hover {
  filter: brightness(1.04);
}
.claim-btn:active {
  transform: scale(0.985);
}
.claim-btn--emerald {
  background: var(--brand-bright);
  color: var(--primary-foreground);
  box-shadow: 0 8px 20px -10px color-mix(in oklch, var(--brand-bright) 80%, transparent);
}
.claim-btn--disabled,
.claim-btn--disabled:hover {
  background: var(--surface-interactive);
  color: var(--muted-foreground);
  cursor: not-allowed;
  filter: none;
  box-shadow: none;
}
.claim-btn-icon {
  width: 16px;
  height: 16px;
}

/* status */
.bet-error {
  font-size: 0.75rem;
  color: var(--destructive);
  text-align: center;
  padding: 7px 10px;
  margin-bottom: 8px;
  border-radius: 8px;
  background: color-mix(in oklch, var(--destructive) 14%, transparent);
}
.bet-success {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  padding: 12px 18px;
  border-radius: 12px;
  background: color-mix(in oklch, var(--brand-bright) 14%, transparent);
  border: 1px solid color-mix(in oklch, var(--brand-bright) 26%, transparent);
  color: var(--brand-bright);
  font-size: 0.8125rem;
  font-weight: 700;
}
.bet-success-icon {
  width: 17px;
  height: 17px;
}

/* ── Proceed ── */
.wg-proceed {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  margin: 0 auto;
  padding: 11px 22px;
  border-radius: 12px;
  border: none;
  background: linear-gradient(135deg, var(--gold-bright), var(--gold-deep));
  color: var(--gold-foreground);
  font-size: 0.8125rem;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 8px 20px -10px color-mix(in oklch, var(--gold) 80%, transparent);
  transition: filter 0.18s ease, transform 0.12s ease, box-shadow 0.18s ease;
}
.wg-proceed:hover {
  filter: brightness(1.04);
  box-shadow: 0 10px 24px -10px color-mix(in oklch, var(--gold) 90%, transparent);
}
.wg-proceed:active {
  transform: scale(0.985);
}
.wg-proceed-icon {
  width: 15px;
  height: 15px;
}

/* ── Responsive ── */
@media (max-width: 719px) {
  .wg-container {
    padding: 28px 14px 28px;
  }
}

/* ── Reduced motion ── */
@media (prefers-reduced-motion: reduce) {
  .voucher,
  .voucher-glow,
  .claim-btn,
  .wg-proceed {
    transition: none;
  }
  .voucher:hover {
    transform: none;
  }
}
</style>
