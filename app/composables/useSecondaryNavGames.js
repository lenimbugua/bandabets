import { ref } from "vue";
import { crashGamesRouteName, useCasino } from "./useCasino";

export function useSecondaryNavGames() {
  const aviatorRoute = "aviator";
  const { public: config } = useRuntimeConfig();
  const aviatorId = config.aviatorGameId;

  const useRouterLauncher = "useRouterLauncher";
  const useCasinoLauncher = "useCasinoLauncher";

  const { launchCasino } = useCasino();
  function routeToGame(router, routeName) {
    router.push({ name: routeName });
  }

  function launchGame(router, params) {
    const { gameName, gameId, launcher, routeName, route } = params;
    switch (launcher) {
      case useRouterLauncher:
        routeToGame(router, route);
        break;
      case useCasinoLauncher:
        launchCasino(gameId, gameName, routeName);
        break;
      default:
        break;
    }
  }

  const games = ref([
    {
      gameId: aviatorId,
      gameName: "aviator",
      imgUrl: "/aviator3.png",
      launcher: useCasinoLauncher,
      routeName: crashGamesRouteName,
      route: aviatorRoute,
      new: false,
      hot: false,
    },
  ]);

  return {
    games,
    launchGame,
  };
}
