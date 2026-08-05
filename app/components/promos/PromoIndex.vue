<script setup>
import { usePromos } from "@/composables/usePromos";
import { useRoute } from "vue-router";
import AviatorPromo from "../AviatorPromo.vue";
import AviatorWelcomeBonus from "../AviatorWelcomeBonus.vue";
import MultibetBoostPromo from "../MultibetBoostPromo.vue";
import OneCutPromo from "../OneCutPromo.vue";
import TwoUpPromo from "../TwoUpPromo.vue";
import AviatorFreeRains from "./AviatorFreeRains.vue";
import AviatorKaribuBonus from "./AviatorKaribuBonus.vue";
import DepositBonus from "./DepositBonus.vue";
import JengaBetsPromotion from "./JengaBetsPromotion.vue";

// import formatStuff from "@/utilities/format-stuff";
import { ArrowLeftIcon } from "@heroicons/vue/20/solid";
import InviteFriendsPromo from "./InviteFriendsPromo.vue";
import LeaderboardPromo from "./LeaderboardPromo.vue";
import PariLeagueWinBoost from "./PariLeagueWinBoost.vue";
import TanoSupuu from "./TanoSupuu.vue";
import WelcomeBonus from "./WelcomeBonus.vue";
import EarlyCashout from "./EarlyCashout.vue";
import PlayonRains from "./PlayonRains.vue";
import ShareKrisii from "./ShareKrisii.vue";

// Unused while the placeholder is in place — see getPromoImage() below.
// const { formCloudflareImage } = formatStuff();

const route = useRoute();

const selectedPromo = route.params.name;

const {
  promos,
  aviatorPromo,
  pariLeaguePromo,
  cashbackPromo,
  multibetBoostPromo,
  dailyAviatorCashback,
  aviatorKaribuBonus,
  twoUpPromo,
  oneCutPromo,
  aviatorWelcomeBonus,
  jengaBetsPromo,
  tanoSupuuPromo,
  sambazaZaKrisiiPromo,
  leaderboardPromo,
  aviatorInviteFriends,
  welcomeBonusPromo,
  earlyCashoutPromo,
  playonRainsPromo,
} = usePromos();

// Promos whose detail pages render their own banner (via PromoDetailShell)
// are intentionally excluded here to avoid a duplicate banner.
const newPromos = [
  aviatorKaribuBonus,
  multibetBoostPromo,
  twoUpPromo,
  aviatorWelcomeBonus,
  jengaBetsPromo,
  tanoSupuuPromo,
  sambazaZaKrisiiPromo,
  leaderboardPromo,
  pariLeaguePromo,
  aviatorInviteFriends,
];
function getPromoImageByName() {
  const promo = promos.find((p) => p.name === selectedPromo);
  return promo ? promo : null;
}

function getPromoImage() {
  // TEMPORARY: every promo renders the shared placeholder while the real
  // artwork is produced. Restore the Cloudflare lookup below to undo.
  return PROMO_PLACEHOLDER;

  // const promo = getPromoImageByName();
  // const imgId = promo ? promo.img : null;
  // return formCloudflareImage(imgId);
}

function promoExistsInNewPromos() {
  return newPromos.includes(selectedPromo);
}
</script>
<template>
  <!-- Top bar -->
  <div class="detail-topbar">
    <button aria-label="Go back" class="detail-back" @click="$router.go(-1)">
      <ArrowLeftIcon class="w-5 h-5" />
    </button>
    <h1 class="detail-page-title">Promotion Details</h1>
    <div class="w-5"></div>
  </div>

  <!-- Banner image for new-style promos -->
  <RouterLink
    v-if="promoExistsInNewPromos() && getPromoImageByName()"
    :to="{ name: getPromoImageByName().routeName }"
    class="detail-banner"
  >
    <img
      :src="getPromoImage()"
      alt="Promotion banner"
      loading="lazy"
    />
  </RouterLink>

  <!-- Legacy promo detail components -->
  <DepositBonus v-if="selectedPromo === cashbackPromo" />
  <PariLeagueWinBoost v-if="selectedPromo === pariLeaguePromo" />
  <AviatorFreeRains v-if="selectedPromo === aviatorPromo" />
  <AviatorKaribuBonus v-if="selectedPromo === aviatorKaribuBonus" />
  <AviatorPromo v-if="selectedPromo === dailyAviatorCashback" />
  <TwoUpPromo v-if="selectedPromo === twoUpPromo" />
  <MultibetBoostPromo v-if="selectedPromo === multibetBoostPromo" />
  <OneCutPromo v-if="selectedPromo === oneCutPromo" />
  <AviatorWelcomeBonus v-if="selectedPromo === aviatorWelcomeBonus" />
  <JengaBetsPromotion v-if="selectedPromo === jengaBetsPromo" />
  <TanoSupuu v-if="selectedPromo === tanoSupuuPromo" />
  <ShareKrisii v-if="selectedPromo === sambazaZaKrisiiPromo" />
  <LeaderboardPromo v-if="selectedPromo === leaderboardPromo" />
  <InviteFriendsPromo v-if="selectedPromo === aviatorInviteFriends" />
  <WelcomeBonus v-if="selectedPromo === welcomeBonusPromo" />
  <EarlyCashout v-if="selectedPromo === earlyCashoutPromo" />
  <PlayonRains v-if="selectedPromo === playonRainsPromo" />
</template>

<style scoped>
.detail-topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 0;
}
.detail-back {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 10px;
  border: 1px solid var(--border);
  background: white;
  color: var(--foreground);
  cursor: pointer;
  transition: background 0.15s;
}
.detail-back:hover {
  background: var(--surface-elevated);
}
.detail-page-title {
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--foreground);
  letter-spacing: -0.01em;
}

/* Banner */
.detail-banner {
  display: block;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 20px;
}
.detail-banner img {
  width: 100%;
  display: block;
  object-fit: cover;
}

/* ═══ Dark Mode ═══ */
[data-theme="dark"] .detail-back {
  background: var(--card);
  border-color: var(--border);
  color: var(--muted-foreground);
}
[data-theme="dark"] .detail-back:hover {
  background: var(--surface-interactive);
}
[data-theme="dark"] .detail-page-title {
  color: var(--foreground);
}
</style>
