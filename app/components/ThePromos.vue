<script setup>
import { usePromoStore } from "@/stores/promos";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { usePromos } from "../composables/usePromos";
import { useCasinoStore } from "../stores/casino";

import { useDefaultSport } from "@/composables/useDefaultSport";
import { ArrowRightIcon } from "@heroicons/vue/20/solid";
// Unused while the promo placeholder is in place. Kept commented, not
// deleted, so restoring the real images is a local change in this file.
// import formatStuff from "../utilities/format-stuff";
// const { formCloudflareImage } = formatStuff();

const { initDefaultSport } = useDefaultSport();

const { setLaunchGameId } = useCasinoStore();

const router = useRouter();

const { selectPromo } = usePromoStore();

const {
  promos,
  hakiLeaguePromo,
  cashbackPromo,
  bethubPromo,
  multibetBoostPromo,
  twoUpPromo,
  oneCutPromo,
  aviatorWelcomeBonus,
  dailyAviatorCashback,
  aviatorKaribuBonus,
  jengaBetsPromo,
  sambazaZaKrisiiPromo,
  tanoSupuuPromo,
  pariLeaguePromo,
  welcomeBonusPromo,
  earlyCashoutPromo,
  playonRainsPromo,
} = usePromos();

const { pending } = storeToRefs(usePromoStore());

const goToSports = () => {
  initDefaultSport(true);
  router.push({ name: "sports", params: { sport: "soccer" } });
};

function launchCasino(gameId, gameName) {
  if (gameName === "invite-aviator" || gameName === "invite-friends") {
    router.push({ name: "aviator", query: { invite: "1" } });
    return;
  }
  if (gameName === sambazaZaKrisiiPromo) {
    router.push({ name: "share-happiness" });
    return;
  }
  if (gameName == hakiLeaguePromo || gameName == pariLeaguePromo) {
    router.push({ name: "pari-league" });
    return;
  }
  if (gameName == cashbackPromo) {
    router.push({ name: "deposit" });
    return;
  }
  if (gameName == welcomeBonusPromo) {
    router.push({ name: "signup" });
    return;
  }
  if (gameName == earlyCashoutPromo) {
    goToSports();
    return;
  }
  if (gameName == playonRainsPromo) {
    router.push({ name: "playon" });
    return;
  }
  if (gameName == bethubPromo) {
    router.push({ name: "share-bets" });
    return;
  }

  if (gameName == multibetBoostPromo) {
    goToSports();
    return;
  }
  if (gameName == twoUpPromo) {
    goToSports();
    return;
  }
  if (gameName == oneCutPromo) {
    goToSports();
    return;
  }
  if (gameName == jengaBetsPromo) {
    goToSports();
    return;
  }

  if (gameName == dailyAviatorCashback) {
    router.push({ name: "aviator" });
    return;
  }
  if (gameName == aviatorWelcomeBonus) {
    router.push({ name: "aviator" });
    return;
  }
  if (gameName == aviatorKaribuBonus) {
    router.push({ name: "deposit" });
    return;
  }
  if (gameName == tanoSupuuPromo) {
    router.push({ name: "home" });
    return;
  }
  setLaunchGameId(gameId);
  router.push({ name: "aviator" });
}

function goToPromoDetails(promo) {
  const normalized = {
    ...promo,
    // TEMPORARY: placeholder instead of the CMS/Cloudflare image, so the
    // detail page a user lands on matches the card they clicked.
    // Restore: promo.image_url || formCloudflareImage(promo.img)
    image_url: PROMO_PLACEHOLDER,
    description: promo.description || promo.samary,
    app_route_name: promo.app_route_name || promo.routeName,
    call_to_action_name: promo.call_to_action_name || "Claim Now",
    game_id: promo.game_id || { Valid: false },
  };
  selectPromo(normalized);
  router.push({ name: "promotion-details", params: { name: promo.name } });
}
</script>
<template>
  <div class="promo-page">
    <BetsLoader v-if="pending" />

    <div v-else class="promo-grid">
      <article v-for="promo in promos" :key="promo.title" class="promo-card">
        <!-- Image -->
        <div class="promo-card-img" @click="launchCasino(promo.id, promo.name)">
          <!-- TEMPORARY: placeholder in place of the per-promo Cloudflare
               image. This is the /promotions listing grid.
               Restore :src="formCloudflareImage(promo.img)" to undo. -->
          <img
            :src="PROMO_PLACEHOLDER"
            :alt="promo.name || 'Promotion'"
            loading="lazy"
          />
          <span class="promo-card-scrim" aria-hidden="true"></span>
        </div>

        <!-- Header -->
        <header class="promo-card-header">
          <h2 class="promo-card-title">{{ promo.title }}</h2>
        </header>

        <!-- Body -->
        <div class="promo-card-body">
          <p class="promo-card-summary">{{ promo.samary }}</p>
        </div>

        <!-- Footer -->
        <footer class="promo-card-footer">
          <button
            class="promo-btn promo-btn--primary"
            @click="launchCasino(promo.id, promo.name)"
          >
            Claim Now
          </button>
          <button
            v-if="
              promo.name != 'aviatrix' &&
              promo.name != 'bethub'
            "
            class="promo-btn promo-btn--secondary"
            @click="goToPromoDetails(promo)"
          >
            Details
            <ArrowRightIcon class="w-3.5 h-3.5" />
          </button>
        </footer>
      </article>
    </div>
  </div>
</template>

<style scoped>
.promo-page {
  width: 100%;
  max-width: 1680px;
  margin: 0 auto;
  padding: 16px 16px 32px;
}

/* ── Grid ── */
.promo-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
}
@media (min-width: 640px) {
  .promo-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (min-width: 1024px) {
  .promo-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
@media (min-width: 1280px) {
  .promo-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
@media (min-width: 1600px) {
  .promo-grid {
    grid-template-columns: repeat(5, 1fr);
  }
}

/* ── Card ── */
.promo-card {
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  background: var(--card);
  border: 1px solid color-mix(in oklch, var(--brand-bright) 30%, var(--border));
  overflow: hidden;
  box-shadow: 0 1px 2px oklch(0% 0 0 / 0.04);
  transition: transform 0.28s cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 0.28s ease, border-color 0.28s ease;
}
[data-theme="dark"] .promo-card {
  background: var(--surface-elevated);
}
.promo-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 18px 42px oklch(0% 0 0 / 0.1);
}
[data-theme="dark"] .promo-card:hover {
  box-shadow: 0 18px 46px oklch(0% 0 0 / 0.45);
}

/* Card image */
.promo-card-img {
  position: relative;
  cursor: pointer;
  overflow: hidden;
  aspect-ratio: 16 / 9;
  background: var(--surface-sunken);
}
.promo-card-img img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);
}
.promo-card:hover .promo-card-img img {
  transform: scale(1.04);
}
.promo-card-scrim {
  position: absolute;
  inset: 40% 0 0 0;
  background: linear-gradient(
    to top,
    color-mix(in oklch, var(--brand-forest) 55%, transparent),
    transparent
  );
  pointer-events: none;
}

/* Card header (raised, distinct surface) */
.promo-card-header {
  padding: 14px 18px;
  background: color-mix(in oklch, var(--brand-forest) 7%, var(--card));
  border-bottom: 1px solid color-mix(in oklch, var(--border) 65%, transparent);
}
[data-theme="dark"] .promo-card-header {
  background: color-mix(in oklch, var(--brand-forest) 22%, var(--surface-elevated));
}
.promo-card-title {
  font-size: 1.02rem;
  font-weight: 800;
  color: var(--foreground);
  letter-spacing: -0.022em;
  line-height: 1.25;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Card body */
.promo-card-body {
  flex: 1;
  padding: 14px 18px;
}
.promo-card-summary {
  font-size: 0.8rem;
  color: var(--muted-foreground);
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
[data-theme="dark"] .promo-card-summary {
  color: var(--text-subtle);
}

/* Card footer */
.promo-card-footer {
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 14px 18px;
  border-top: 1px solid var(--border);
  background: color-mix(in oklch, var(--foreground) 2.5%, transparent);
}
.promo-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  padding: 7px 14px;
  border-radius: 9px;
  border: none;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.01em;
  cursor: pointer;
  transition: transform 0.18s cubic-bezier(0.22, 1, 0.36, 1),
    filter 0.18s ease, background 0.18s ease, border-color 0.18s ease;
}
.promo-btn {
  flex: 1;
}
.promo-btn--primary {
  background: var(--primary);
  color: var(--primary-foreground);
  box-shadow: 0 4px 12px color-mix(in oklch, var(--primary) 24%, transparent),
    inset 0 1px 0 oklch(100% 0 0 / 0.14);
}
.promo-btn--primary:hover {
  transform: translateY(-1px);
  filter: brightness(1.04);
}
.promo-btn--primary:active {
  transform: translateY(0);
}
.promo-btn--secondary {
  color: var(--primary);
  background: transparent;
  border: 1px solid color-mix(in oklch, var(--primary) 45%, transparent);
}
[data-theme="dark"] .promo-btn--secondary {
  color: var(--brand-bright);
  border-color: color-mix(in oklch, var(--brand-bright) 45%, transparent);
}
.promo-btn--secondary:hover {
  background: color-mix(in oklch, var(--brand-bright) 10%, transparent);
  border-color: color-mix(in oklch, var(--brand-bright) 60%, transparent);
}
</style>
