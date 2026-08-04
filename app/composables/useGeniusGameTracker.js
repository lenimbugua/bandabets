import { storeToRefs } from "pinia";
import { ref } from "vue";
import { useSportsStore } from "../stores/sports";
import { useSports } from "./useSports";

export function useGeniusGameTracker(fixtureId) {
  const geniusGameTrackerURL = import.meta.env.VITE_GENIUS_GAME_TRACKER_URL;
  const productName = "siakabet";
  const geniusGameTrackerEndpoint = `${geniusGameTrackerURL}/multisportgametracker?productName=${productName}&fixtureId=${fixtureId}`;
  const geniusScoreBoardEndpoint = `${geniusGameTrackerURL}/multisportscoreboard?productName=${productName}&fixtureId=${fixtureId}`;

  const scoreboard = "scoreboard";
  const court = "court";
  const lineups = "lineups";
  const playByPlay = "playByPlay";
  const teamStats = "teamStats";

  const widgets = [court, scoreboard, lineups, playByPlay, teamStats];

  const { selectedSport } = storeToRefs(useSportsStore());
  const {
    soccer,
    basketball,
    tennis,
    americanFootball,
    rugby,
    iceHockey,
    baseball,
    eSoccer,
    aussieRules,
  } = useSports();

  const geniusGameTrackerCoverage = [
    soccer,
    basketball,
    tennis,
    americanFootball,
  ];

  let currentTrackerUrl = ref(null);

  function formGameTrackerUrl() {
    // currentTrackerUrl.value = `${geniusGameTrackerEndpoint}&widget=${widget}`;
    currentTrackerUrl.value = `${geniusGameTrackerEndpoint}`;
  }
  currentTrackerUrl.value = formGameTrackerUrl(widgets[0]);

  function isGeniusGameTrackerSport() {
    return geniusGameTrackerCoverage.includes(selectedSport.value);
  }

  const geniusScoreBoardCoverage = [
    soccer,
    basketball,
    tennis,
    americanFootball,
    rugby,
    iceHockey,
    baseball,
    eSoccer,
    aussieRules,
  ];

  function isGeniusScoreBoardSport() {
    return geniusScoreBoardCoverage.includes(selectedSport.value);
  }

  function formScoreBoardUrl() {
    return `${geniusScoreBoardEndpoint}`;
  }

  return {
    isGeniusScoreBoardSport,
    isGeniusGameTrackerSport,
    formScoreBoardUrl,
    formGameTrackerUrl,
    widgets,
    currentTrackerUrl,
  };
}
