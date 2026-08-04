import { useRoute, useRouter } from "vue-router";
import { useModalTypes } from "@/composables/useModalTypes";
import { useModalStore } from "@/stores/modal";
import homeIcon from "@/assets/icons/home.svg";
import sportsIcon from "@/assets/icons/sports.svg";
import aviatorIcon from "@/assets/icons/aviator.svg";
import virtualsIcon from "@/assets/icons/virtuals.svg";
import casinoIcon from "@/assets/icons/casino.svg";
import liveIcon from "@/assets/icons/live.svg";
import promosIcon from "@/assets/icons/promos.svg";
import supportIcon from "@/assets/icons/support.svg";

export const mainNavIcons = {
  home: homeIcon,
  sports: sportsIcon,
  aviator: aviatorIcon,
  virtuals: virtualsIcon,
  casino: casinoIcon,
  live: liveIcon,
  promos: promosIcon,
  support: supportIcon,
};

export const mainNavCategories = [
  { name: "Home", displayName: "HOME", to: { name: "home" }, activeOn: ["home"], icon: "home" },
  { name: "Sports", displayName: "SPORTS", to: { name: "sports", params: { sport: "soccer" } }, activeOn: ["sports", "country", "countries", "match-details"], icon: "sports" },
  { name: "Aviator", displayName: "AVIATOR", to: { name: "aviator" }, activeOn: ["aviator"], icon: "aviator" },
  { name: "Casino", displayName: "CASINO", to: { name: "casino-home", query: { category: "all" } }, activeOn: ["casino-home", "casino-game"], icon: "casino" },
  { name: "Live", displayName: "LIVE", to: { name: "live", params: { sport: "soccer" } }, activeOn: ["live"], icon: "live" },
  { name: "Virtuals", displayName: "VIRTUALS", to: { name: "casino-home", query: { category: "virtuals" } }, activeOn: ["casino-home"], activeQueryCategory: "virtuals", icon: "virtuals" },
  { name: "Promos", displayName: "PROMOS", to: { name: "promotions" }, activeOn: ["promotions", "promotion-details"], icon: "promos" },
  { name: "Support", displayName: "SUPPORT", to: null, activeOn: [], icon: "support", modal: "support" },
];

const claimedQueryCategories = mainNavCategories
  .map((c) => c.activeQueryCategory)
  .filter(Boolean);

/**
 * Shared main navigation (HOME / SPORTS / AVIATOR / …).
 * Consumed by the desktop header nav links and the mobile category pill bar.
 */
export function useMainNav() {
  const router = useRouter();
  const route = useRoute();
  const { sportsIconsModal, customerSupportModal } = useModalTypes();
  const { openModal } = useModalStore();

  function isActive(cat) {
    if (!cat.activeOn.includes(route.name)) return false;
    if (cat.activeQueryCategory) {
      return route.query.category === cat.activeQueryCategory;
    }
    const q = route.query.category;
    if (q && claimedQueryCategories.includes(q)) return false;
    return true;
  }

  function handleClick(cat) {
    if (cat.modal === "support") {
      openModal(customerSupportModal);
      return;
    }
    if (!cat.to) {
      openModal(sportsIconsModal);
      return;
    }
    router.push(cat.to);
  }

  function openMenu() {
    openModal(sportsIconsModal);
  }

  return {
    categories: mainNavCategories,
    iconMap: mainNavIcons,
    isActive,
    handleClick,
    openMenu,
  };
}
