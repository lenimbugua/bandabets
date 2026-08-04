import { ref } from "vue";
import { useKiron } from "./useKiron";
export function useMainCategories() {
  const {
    hakiLeagueRouteName,
    // hakiTurboRouteName
  } = useKiron();
  const jetXId = import.meta.env.VITE_JETX_GAME_ID;

  const virtualId = import.meta.env.VITE_VIRTUAL_GAME_ID;
  const aviatorId = import.meta.env.VITE_AVIATOR_GAME_ID;

  const categories = ref([
    {
      name: "sport",
      path: "sport",
      bg: "bg-brand-bright",
      img: "soccer.png",
    },
    { name: "live", path: "live", bg: "bg-destructive" },
    {
      name: "crash",
      path: "crash",
      bg: "bg-linear-to-r from-red-800 via-amber-600 to-red-700 hover:from-pink-500 hover:to-orange-500",
    },
    { name: "virtuals", path: "virtuals", bg: "bg-amber-600" },
    {
      name: "promotions",
      path: "promotions",
      bg: "bg-linear-to-r from-brand-bright via-red-400 to-brand-bright hover:from-pink-500 hover:to-orange-500",
    },
  ]);

  const moreOptions = ref([
    { name: "aviator", path: "aviator", bg: "bg-red-500" },
    { name: "soccer", path: "sport", bg: "bg-red-500" },
    {
      name: "crash",
      path: "crash",
      bg: "bg-linear-to-r from-red-500 via-red-400 to-blue-500 hover:from-pink-500 hover:to-orange-500",
    },
    { name: "virtuals", path: "virtuals", bg: "bg-gold" },
    // { name: "casino", path: "popular-games", bg: "bg-destructive" },
  ]);

  const sideGames = ref([
    {
      name: "aviator",
      category: "aviator",
      path: "aviator",
      img: "/aviator3.png",
      bg: "bg-red-500",
      id: aviatorId,
    },
    { name: "soccer", path: "sport", img: "/football.png", bg: "bg-red-500" },
    {
      name: "Pari League",
      category: "virtuals",
      path: hakiLeagueRouteName,
      img: "/haki-league.png",
      bg: "bg-gold",
      id: virtualId,
    },
    {
      name: "jetX",
      category: "casino",
      path: "popular-games",
      img: "/jetx.webp",
      bg: "bg-gold",
      id: jetXId,
    },
    {
      name: "AviatriX",
      category: "casino",
      path: "popular-games",
      img: "/jetx.webp",
      bg: "bg-gold",
      id: jetXId,
    },
  ]);

  return { categories, sideGames, moreOptions };
}
