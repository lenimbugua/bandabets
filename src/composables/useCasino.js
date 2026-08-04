import { useCasinoStore } from "@/stores/casino";
import formatStuff from "@/utilities/format-stuff";
import { useRouter } from "vue-router";
import { useKiron } from "../composables/useKiron";
const { slugify } = formatStuff();

const {
  hakiLeagueRouteName,
  hakiTurboRouteName,
  hakiJackpotRouteName,
  hakiLeagueGameId,
  hakiTurboGameId,
  hakiJackpotGameId,
} = useKiron();

export const virtualGamesRouteName = "virtuals-games";
export const crashGamesRouteName = "crash-games";
export const casinoGamesRouteName = "casino";

export function useCasino() {
  const initialCategories = [
    {
      id: "",
      name: "hot",
      binomen: "hot",
      games_count: "",
    },
    {
      id: 35,
      name: "new",
      cat_binomen: "new",
      games_count: "",
    },
  ];
  const categories = [
    {
      category_id: "8",
      category_name: "Crash",
      cat_binomen: "crash",
      games_count: 26,
    },
    {
      category_id: "7",
      category_name: "Virtuals",
      cat_binomen: "virtuals",
      games_count: 10,
    },
    {
      category_id: "1",
      category_name: "Lite",
      cat_binomen: "lite",
      games_count: 14,
    },
    {
      category_id: "2",
      category_name: "Drops and Wins",
      cat_binomen: "dropsWins",
      games_count: 30,
    },
    {
      category_id: "4",
      category_name: "Slots",
      cat_binomen: "slots",
      games_count: 310,
    },
    {
      category_id: "5",
      category_name: "Table/Cards",
      cat_binomen: "table",
      games_count: 12,
    },
    {
      category_id: "6",
      category_name: "Live",
      cat_binomen: "live",
      games_count: 143,
    },
  ];
  const providers = [
    {
      provider_id: "1",
      provider_name: "Split The Pot",
      p_binomen: "stp",
      games_count: 14,
    },
    {
      provider_id: "2",
      provider_name: "Spribe",
      p_binomen: "spribe",
      games_count: 9,
    },
    {
      provider_id: "3",
      provider_name: "Elbet",
      p_binomen: "elbet",
      games_count: 2,
    },
    {
      provider_id: "4",
      provider_name: "Pragmatic Play",
      p_binomen: "PragmaticPlay",
      games_count: 473,
    },
    {
      provider_id: "7",
      provider_name: "i Moon",
      p_binomen: "iMoon",
      games_count: 10,
    },
    {
      provider_id: "8",
      provider_name: "Golden Race",
      p_binomen: "GoldenRace",
      games_count: 12,
    },
    {
      provider_id: "9",
      provider_name: "Aviatrix",
      p_binomen: "Aviatrix",
      games_count: 1,
    },
    {
      provider_id: "10",
      provider_name: "Evolution",
      p_binomen: "Evolution",
      games_count: 24,
    },
    {
      provider_id: "11",
      provider_name: "Smartsoft",
      p_binomen: "smartsoft",
      games_count: 8,
    },
  ];

  const meta = {
    category_id: "",
    provider_id: "",
    filter: "",
    total: "563",
    page: "1",
    limit: 50,
  };
  const router = useRouter();

  function routeToKironLiteGame(router, gameId) {
    let routeName = "";
    if (gameId === hakiLeagueGameId) {
      routeName = hakiLeagueRouteName;
    } else if (gameId === hakiTurboGameId) {
      routeName = hakiTurboRouteName;
    } else if (gameId === hakiJackpotGameId) {
      routeName = hakiJackpotRouteName;
    }
    router.push({ name: routeName });
  }

  function checkIfGameIsKironLite(gameID) {
    const kironLiteGames = [
      hakiLeagueGameId,
      hakiTurboGameId,
      hakiJackpotGameId,
    ];
    return kironLiteGames.includes(gameID);
  }

  function getRoute(routeName) {
    switch (routeName) {
      case crashGamesRouteName:
        return "play-crash-games";
      case virtualGamesRouteName:
        return "play-virtuals-games";
      case casinoGamesRouteName:
        return "play-casino-games";
      default:
        break;
    }
  }

  function launchCasino(gameId, gameName, routeName, providerName) {
    console.log(gameId, gameName, routeName);

    const { setLaunchGameId, setLaunchGameMeta } = useCasinoStore();
    setLaunchGameId(gameId);
    setLaunchGameMeta(gameName, providerName);

    const kironLiteNamesIdsMap = {
      "Pari League": hakiLeagueGameId,
      "Pari Turbo": hakiTurboGameId,
      "Pari Jackpot": hakiJackpotGameId,
    };

    if (
      gameName == "Pari League" ||
      gameName == "Pari Turbo" ||
      gameName == "Pari Jackpot"
    ) {
      routeToKironLiteGame(router, kironLiteNamesIdsMap[gameName]);
      return;
    }

    if (checkIfGameIsKironLite(gameId)) {
      routeToKironLiteGame(router, gameId);
      return;
    }
    const aviatorGameId = import.meta.env.VITE_AVIATOR_GAME_ID;

    if (parseInt(gameId) === parseInt(aviatorGameId)) {
      setLaunchGameMeta("Aviator", providerName || "Spribe");
      router.push({ name: "aviator" });
      return;
    }
    let route = getRoute(routeName);
    gameName = slugify(gameName);
    router.push({
      name: route,
      params: { routeName, name: gameName },
    });
  }

  return {
    initialCategories,
    launchCasino,
    providers,
    categories,
    meta,
  };
}
