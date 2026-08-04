import { useMatchesStore } from "@/stores/matches";
import { useModalStore } from "@/stores/modal";
import { useSportsQueryParamsStore } from "@/stores/sports-query-params";
import formatStuff from "@/utilities/format-stuff";
import { storeToRefs } from "pinia";
import { useScrollToViewedMatch } from "./useScrollToViewedMatch";

const { slugify } = formatStuff();

export function useMatchDetails() {
  const { matchDetailIsLive } = storeToRefs(useMatchesStore());
  const { fetchMatchDetails, pollMatchDetails } = useMatchesStore();
  function performInitialFetch(matchId) {
    if (matchDetailIsLive.value) {
      pollMatchDetails(matchId);
      return;
    }
    fetchMatchDetails(matchId);
  }

  function goToMatchDetails(match, router, isLive) {
    const { saveScrolledPosition } = useScrollToViewedMatch();
    const { setMatchDetailIsLive } = useMatchesStore();
    const { setMatchId,setScrollPosition } = useSportsQueryParamsStore();

    const { closeModal } = useModalStore();

    
    closeModal();
    
    setScrollPosition(match.parentMatchId);
    setMatchId(match.parentMatchId);

    if (isLive) {
      setMatchDetailIsLive(true);
    } else {
      setMatchDetailIsLive(false);
    }
    saveScrolledPosition();
    router.push({
      name: "match-details",
      params: {
        sport: slugify(match.sportName) || "sport",
        country: slugify(match.countryName) || "country",
        league: slugify(match.competitionName) || "league",
        matchSlug: slugify(`${match.homeTeam || "home"}-vs-${match.awayTeam || "away"}`),
        id: match.parentMatchId,
      },
    });
    performInitialFetch(match.parentMatchId);
  }

  return {
    goToMatchDetails,
    performInitialFetch,
  };
}
