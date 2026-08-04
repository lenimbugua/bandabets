import { useRouter } from "vue-router";
import { useCasino } from "./useCasino";

export function useCasinoUtil() {
  const router = useRouter();

  const aviatrixId = import.meta.env.VITE_AVIATRIX_GAME_ID;
  const aviatorGameId = import.meta.env.VITE_AVIATOR_GAME_ID;
  const jetXId = import.meta.env.VITE_JETX_GAME_ID;
  const maestroGameId = import.meta.env.VITE_MAESTRO_GAME_ID;
  const crashRoyalGameId = import.meta.env.VITE_CRASH_ROYALE_GAME_ID;
//   const hakiTurboGameId = import.meta.env.VITE_HAKI_TURBO_GAME_ID;

  const goToHakiLeague = () => {
    // navigate to haki league page
    router.push({ name: "pari-league" });
  };

  const goToSport = () => {
    // navigate to sport page
    router.push({ name: "sports", params: { sport: "soccer" } });
  };

//   const goToHakiTurbo = () => {
//     //   navigate to sport page
//     router.push({ name: "pari-turbo" });
//   };

  const { launchCasino } = useCasino();

  let promoStripItems = [
    {
      name: "Aviator",
      func: launchCasino,
      gameId: aviatorGameId,
    },
    // {
    //   name: "Haki Turbo",
    //   func: goToHakiTurbo,
    //   gameId: hakiTurboGameId,
    // },
    {
      name: "Sports",
      func: goToSport,
      gameId: aviatorGameId,
    },

    {
      name: "Sports",
      func: goToSport,
      gameId: aviatorGameId,
    },
    {
      name: "Sports",
      func: goToSport,
      gameId: aviatorGameId,
    },
    {
      name: "Sports",
      func: goToSport,
      gameId: aviatorGameId,
    },
    {
      name: "Sports",
      func: goToSport,
      gameId: aviatorGameId,
    },
    {
      name: "Sports",
      func: goToSport,
      gameId: aviatorGameId,
    },
    { name: "Pari League", func: goToHakiLeague },
    {
      name: "JetX",
      func: launchCasino,
      gameId: jetXId,
    },
    {
      name: "Aviator",
      func: launchCasino,
      gameId: aviatorGameId,
    },
    {
      name: "Aviator",
      func: launchCasino,
      gameId: aviatorGameId,
    },
    {
      name: "Maestro",
      func: launchCasino,
      gameId: maestroGameId,
    },
    {
      name: "AviatriX",
      func: launchCasino,
      gameId: aviatrixId,
    },
    {
      name: "Crash Royale",
      func: launchCasino,
      gameId: crashRoyalGameId,
    },
    {
      name: "Aviator",
      func: launchCasino,
      gameId: aviatorGameId,
    },

    {
      name: "Maestro",
      func: launchCasino,
      gameId: maestroGameId,
    },
    { name: "JetX", func: launchCasino, gameId: jetXId },
  ];
  return { promoStripItems };
}
