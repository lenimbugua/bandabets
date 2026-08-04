// import { storeToRefs } from "pinia";
// import { useAuthStore } from "../stores/auth";
// import { useLeagueStore } from "../stores/league";
// import { useQueryParametersStore } from "../stores/query-parameters";
// import { useTabStore } from "../stores/tabs";

export function useCompetitions() {
  //   const { setTabToDisplay } = useTabStore();

  //   const { fetchLeagueMatches, setSelectedStartTime, setCompetitionIsLoading } =
  //     useLeagueStore();
  //   const { firstPeriod } = storeToRefs(useLeagueStore());
  //   const { setCompetitionId, resetSubtypeId } = useQueryParametersStore();
  //   const { competitionId: cID } = storeToRefs(useQueryParametersStore());

  //   const { clientConfigId } = storeToRefs(useAuthStore());

  // function getVariableCompetition() {
  //   switch (clientConfigId.value) {
  //     case "1":
  //       return "zambian";
  //     default:
  //       return "kenyan";
  //   }
  // }

  const competitions = [
    {
      name: "English",
      id: "1",
      flag: "english",
    },
    {
      name: "Spanish",
      id: "2",
      flag: "spanish",
    },
    {
      name: "Kenyan",
      id: "3",
      flag: "kenyan",
    },
    {
      name: "Italian",
      id: "4",
      flag: "italian",
    },
  ];

  //   getVariableCompetition();

  //   const fetchMatches = async (competitionID) => {
  //     setCompetitionId(competitionID);
  //     const queryString = `?competition_id=${cID.value}`;

  //     setCompetitionIsLoading(true);
  //     await fetchLeagueMatches(queryString);
  //     setCompetitionIsLoading(false);

  //     setTabToDisplay("Markets");
  //     setSelectedStartTime(firstPeriod.value.start_time);
  //     resetSubtypeId();
  //   };

  const formFlagUrl = (competionName) => {
    return `/haki-league-img/${competionName}.png`;
  };
  //   const competitionIsSelected = (competitionId) => {
  //     return cd.value === competitionId;
  //   };

  return {
    competitions,
    formFlagUrl,
    // fetchMatches,
    // competitionIsSelected,
  };
}
