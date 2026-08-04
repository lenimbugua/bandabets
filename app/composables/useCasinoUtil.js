import { useRouter } from "vue-router";
import { useCasino } from "./useCasino";

export function useCasinoUtil() {
  const router = useRouter();

  const { public: config } = useRuntimeConfig();
  const aviatrixId = config.aviatrixGameId;
  const aviatorGameId = config.aviatorGameId;
  const jetXId = config.jetxGameId;
  const maestroGameId = config.maestroGameId;
  const crashRoyalGameId = config.crashRoyaleGameId;
//   const hakiTurboGameId = config.hakiTurboGameId;

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
