export function useKiron() {
  const hakiLeagueRouteName = "pari-league";
  const hakiTurboRouteName = "pari-turbo";
  const hakiJackpotRouteName = "pari-virtual-jackpot";

  const { public: config } = useRuntimeConfig();
  const hakiLeagueGameId = config.hakiLeagueGameId;
  const hakiTurboGameId = config.hakiTurboGameId;
  const hakiJackpotGameId = config.kironJackpotGameId;

  return {
    hakiLeagueRouteName,
    hakiTurboRouteName,
    hakiJackpotRouteName,
    hakiLeagueGameId,
    hakiTurboGameId,
    hakiJackpotGameId,
  };
}
