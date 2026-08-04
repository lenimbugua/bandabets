import { defineStore, storeToRefs } from "pinia";
import API, { betBaseURL } from "../services/API";
import { useLoginStore } from "./login";

const categories = [
  {
    id: 1,
    name: "Top Leagues",
    img: "Top_Leagues_84bc1a7546.png",
    description:
      "Immerse yourself in top-tier football competitions, all in one place.",
  },
  {
    id: 1,
    name: "Today's Matches",
    img: "Today_s_Matches_013716fed3.png",

    description:
      "Grab fresh betting codes for today's hottest fixtures, right as they kick off.",
  },
  {
    id: 1,
    name: "Freeze",
    img: "Freeze_6f3d5ab2a6.png",
    description:
      "Boost your winning chances with our Flash Freeze feature—don't miss out!",
  },
  {
    id: 1,
    name: "English Premier League",
    img: "EPL_f563e605b0.png",
    description:
      "Experience the pulse-pounding action of the world's most-watched league.",
  },
  {
    id: 1,
    name: "La Liga",
    img: "La_Liga_d8d808c32c.png",
    description:
      "Savor the artistry and flair of Spain's finest clubs and rivalries.",
  },
  {
    id: 1,
    name: "Bundesliga",
    img: "Bundesliga_62cd7ac38d.png",
    description:
      "Feel the intensity and precision of Germany's most passionate battles.",
  },
  {
    id: 1,
    name: "Serie A",
    img: "Serie_A_a491904aca.png",
    description:
      "Indulge in Italian tactical genius and timeless football traditions.",
  },
  {
    id: 1,
    name: "Ligue 1",
    img: "Ligue_1_08a28154fc.png",
    description:
      "Discover rising stars and electrifying showdowns in France's premier competition.",
  },
  {
    id: 1,
    name: "NBA",
    img: "nba.png",
    description:
      "Epic comebacks, high-flying dunks—every game is a showstopper.",
  },
];

// const bethub = {
//   status: "ok",
//   message: "success",
//   data: [
//     {
//       icon: "https://s.football.com/cms/Today_s_Matches_013716fed3.png",
//       categoryCode: "HUB002",
//       position: "2",
//       categoryName: "Today's Matches",
//       categoryDesc:
//         "Grab fresh betting codes for today's hottest fixtures, right as they kick off.",
//       bets: [
//         {
//           shareBet: "271U2506",
//           slip: [
//             {
//               parentMatchId: 11141321,
//               homeTeam: "Getafe",
//               awayTeam: "Real Madrid",
//               oddType: "1X2",
//               startTime: "2025-04-23 22:30:00",
//               oddValue: 1.5,
//               prevOddValue: 1.75,
//               outcomeId: 3,
//               outcomeName: "Away",
//               subTypeId: 2,
//               specifiers: null,
//               status: 1,
//               sportId: 10,
//               sportName: "soccer",
//               competitionId: 53,
//               competitionName: "Spain La Liga",
//               countryName: "Spain",
//             },
//             {
//               parentMatchId: 11949132,
//               homeTeam: "Benfica",
//               awayTeam: "FC Tirsense",
//               oddType: "1X2",
//               startTime: "2025-04-23 22:15:00",
//               oddValue: 1.05,
//               prevOddValue: 1.06,
//               outcomeId: 1,
//               outcomeName: "Home",
//               subTypeId: 2,
//               specifiers: null,
//               status: 1,
//               sportId: 10,
//               sportName: "soccer",
//               competitionId: 429,
//               competitionName: "Portugal Cup",
//               countryName: "Portugal",
//             },
//           ],
//         },
//       ],
//     },
//     {
//       icon: "https://s.football.com/cms/Top_Leagues_84bc1a7546.png",
//       categoryCode: "HUB001",
//       position: "1",
//       categoryName: "Top Leagues",
//       categoryDesc:
//         "Immerse yourself in top-tier football competitions, all in one place.",
//       bets: [
//         {
//           shareBet: "K8343802",
//           slip: [
//             {
//               parentMatchId: 12077699,
//               homeTeam: "Arsenal",
//               awayTeam: "Crystal Palace",
//               oddType: "1X2",
//               startTime: "2025-04-23 22:00:00",
//               oddValue: 1.35,
//               prevOddValue: 1.6,
//               outcomeId: 1,
//               outcomeName: "Home",
//               subTypeId: 2,
//               specifiers: null,
//               status: 1,
//               sportId: 10,
//               sportName: "soccer",
//               competitionId: 36,
//               competitionName: "England Premier League",
//               countryName: "England",
//             },
//           ],
//         },
//         {
//           shareBet: "909766M1",
//           slip: [
//             {
//               parentMatchId: 11141321,
//               homeTeam: "Getafe",
//               awayTeam: "Real Madrid",
//               oddType: "1X2",
//               startTime: "2025-04-23 22:30:00",
//               oddValue: 1.5,
//               prevOddValue: 1.75,
//               outcomeId: 3,
//               outcomeName: "Away",
//               subTypeId: 2,
//               specifiers: null,
//               status: 1,
//               sportId: 10,
//               sportName: "soccer",
//               competitionId: 53,
//               competitionName: "Spain La Liga",
//               countryName: "Spain",
//             },
//             {
//               parentMatchId: 12077699,
//               homeTeam: "Arsenal",
//               awayTeam: "Crystal Palace",
//               oddType: "1X2",
//               startTime: "2025-04-23 22:00:00",
//               oddValue: 1.35,
//               prevOddValue: 1.6,
//               outcomeId: 1,
//               outcomeName: "Home",
//               subTypeId: 2,
//               specifiers: null,
//               status: 1,
//               sportId: 10,
//               sportName: "soccer",
//               competitionId: 36,
//               competitionName: "England Premier League",
//               countryName: "England",
//             },
//           ],
//         },
//       ],
//     },
//   ],
// };

const slip = [
  {
    homeTeam: "Athletic Bilbao",
    awayTeam: "Barcelona",
    oddType: "Over/Under",
    startTime: "2023-10-20T19:30:00Z",
    oddValue: 31.56,
    outcomeName: "Over 1.5",
  },
  {
    homeTeam: "Athletic Bilbao",
    awayTeam: "Barcelona",
    oddType: "Over/Under",
    startTime: "2023-10-20T19:30:00Z",
    oddValue: 31.56,
    outcomeName: "Over 1.5",
  },
  {
    homeTeam: "Athletic Bilbao",
    awayTeam: "Barcelona",
    oddType: "Over/Under",
    startTime: "2023-10-20T19:30:00Z",
    oddValue: 31.56,
    outcomeName: "Over 1.5",
  },
  {
    homeTeam: "Athletic Bilbao",
    awayTeam: "Barcelona",
    oddType: "Over/Under",
    startTime: "2023-10-20T19:30:00Z",
    oddValue: 31.56,
    outcomeName: "Over 1.5",
  },
];

const selection = {
  totalOdds: 997.7,
  slip,
};

export const useBookedBetsStore = defineStore("booked-bets-store", {
  state: () => ({
    bookedBets: selection,
    categories: categories,
    bethub: null,
    pending: false,
  }),

  actions: {
    async fetchBethub() {
      this.pending = true;
      try {
        const {
          // token,
          profileSid,
        } = storeToRefs(useLoginStore());

        const response = await API(betBaseURL).post(
          `/bet/hub/api/v1/bets`,
          {},
          {
            headers: {
              //   Authorization: `Bearer ${token.value}`,
              "X-PROFILE-SID": profileSid.value,
            },
          }
        );
        this.bethub = response?.data?.data;
        this.responseOK = true;
      } catch (err) {
        this.responseOK = false;
        // if (err.status === 422) {
        //   fireErrorToast(err.response.data.message, positionTopRight);
        // }
      } finally {
        this.pending = false;
      }
    },

    setBookedBets(bookedBets) {
      this.bookedBets = bookedBets;
    },
    reset() {
      this.bookedBets = "";
    },
  },
});
