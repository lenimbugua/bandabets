export function useTopLeagues() {
  const topLeagues = [
    {
      competitionId: 19,
      competitionName: "UEFA Champions League",
      countryName: "Europe",
      countryId: 6,
      matchCount: 10,
      cbinomen: "UEFA Champions League",
    },
    {
      competitionId: 2072,
      competitionName: "UEFA Europa League",
      countryName: "Europe",
      countryId: 6,
      matchCount: 10,
      cbinomen: "UEFA Europa League",
    },
    {
      competitionId: 36,
      competitionName: "England Premier League",
      countryName: "England",
      countryId: 3795032,
      matchCount: 10,
      cbinomen: "England Premier League",
    },
    {
      competitionId: 63,
      competitionName: "England Championship",
      countryName: "England",
      countryId: 3795032,
      matchCount: 10,
      cbinomen: "England Championship",
    },
    {
      competitionId: 40,
      competitionName: "Germany Bundesliga",
      countryName: "Germany",
      countryId: 237,
      matchCount: 10,
      cbinomen: "Germany Bundesliga",
    },
    {
      competitionId: 53,
      competitionName: "Spain La Liga",
      countryName: "Spain",
      countryId: 232,
      matchCount: 10,
      cbinomen: "Spain La Liga",
    },
    {
      competitionId: 56,
      competitionName: "France Ligue 1",
      countryName: "France",
      countryId: 236,
      matchCount: 10,
      cbinomen: "France Ligue 1",
    },
    {
      competitionId: 15450,
      competitionName: "UEFA Europa Conference League",
      countryName: "Europe",
      countryId: 6,
      matchCount: 10,
      cbinomen: "UEFA Europa Conference League",
    },
    {
      competitionId: 54,
      competitionName: "Italy Serie A",
      countryName: "Italy",
      countryId: 225,
      matchCount: 10,
      cbinomen: "Italy Serie A",
    },
  ];

  function isTopLeague(competitionName) {
    return topLeagues.some(
      (league) => league.competitionName === competitionName
    );
  }

  function getTopLeagueImage(competitionName) {
    if (!isTopLeague(competitionName)) {
      return `https://imagedelivery.net/ZY5OwFLlTE2ePHl_IE20jg/bcd51663-91e3-4a07-94b6-eecca05bdd00/public`;
    }
    return `/top-leagues/${competitionName}.png`;
  }

  return {
    topLeagues,
    isTopLeague,
    getTopLeagueImage,
  };
}
