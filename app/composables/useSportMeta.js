// Batch 0.4 — the 23 sport-keyed title/description entries ported verbatim
// from the deleted baseline router (`git show 81ae85f:src/router/index.js`,
// lines ~794-910, `sportMetaMap`). Consumed by app/pages/sports/[sport].vue
// and app/pages/sports/live/[sport].vue's useSeoHead() call. Sports not in
// this map fall back to the existing param-derived title/description.
//
// Keys are camelCase (matching the baseline and the sibling
// `useSportsIcons.js`/`useSports.js` composables), while the `:sport` route
// param arrives kebab-case (e.g. "american-football"). `toCamelCase` below
// is the same normalization `useSportsIcons.js` already uses.
const sportMetaMap = {
  soccer: {
    title: "Football betting | Bet on football or soccer online – Bandabets",
    description:
      "Bet on football matches from top leagues including EPL, La Liga, and Serie A. Get live odds and instant cashouts on Bandabets.",
  },
  basketball: {
    title: "Basketball betting | Bet on NBA and more – Bandabets",
    description:
      "Bet live on NBA, EuroLeague, and more with Bandabets. Enjoy competitive odds, fast payouts, and secure betting.",
  },
  tennis: {
    title: "Tennis betting | Bet on tennis tournaments – Bandabets",
    description:
      "Place bets on ATP, WTA, and Grand Slam matches. Bandabets gives you instant payouts and live tennis betting options.",
  },
  cricket: {
    title: "Cricket betting | Bet on T20 and IPL matches – Bandabets",
    description:
      "Bet on cricket tournaments including IPL, ODI, and T20 World Cup. Bandabets gives you top odds and instant payouts.",
  },
  rugby: {
    title: "Rugby betting | Bet on rugby matches – Bandabets",
    description:
      "Bet on rugby union and rugby league matches worldwide. Enjoy competitive odds, live betting, and fast payouts.",
  },
  iceHockey: {
    title: "Ice Hockey betting | Bet on NHL and more – Bandabets",
    description:
      "Bet on NHL and global ice hockey leagues with live odds, real-time action, and instant cashouts.",
  },
  tableTennis: {
    title: "Table Tennis betting | Bet on live matches – Bandabets",
    description:
      "Bet on ITTF and international table tennis events. Live odds, fast markets, and optimized betting experience.",
  },
  handball: {
    title: "Handball betting | Bet on top leagues – Bandabets",
    description:
      "Explore handball betting markets from European and international leagues with competitive odds and fast payouts.",
  },
  volleyball: {
    title: "Volleyball betting | Bet on global leagues – Bandabets",
    description:
      "Bet on volleyball leagues worldwide including international tournaments. Live betting and fast withdrawals.",
  },
  americanFootball: {
    title: "American Football betting | Bet on NFL and more – Bandabets",
    description:
      "Bet on NFL, College Football, and more with live odds, prop bets, and fast payouts.",
  },
  boxing: {
    title: "Boxing betting | Bet on major fights – Bandabets",
    description:
      "Bet on world boxing matches including title fights and major events. Live odds and instant payouts.",
  },
  eSoccer: {
    title: "eSoccer betting | Bet on virtual soccer – Bandabets",
    description:
      "Bet on eSoccer and virtual football matches 24/7 with fast odds and instant results.",
  },
  aussieRules: {
    title: "Aussie Rules betting | Bet on AFL matches – Bandabets",
    description:
      "Bet on AFL and Australian Rules Football with competitive odds and live betting options.",
  },
  futsal: {
    title: "Futsal betting | Bet on futsal leagues – Bandabets",
    description:
      "Bet on international futsal leagues with real-time odds and fast payouts.",
  },
  golf: {
    title: "Golf betting | Bet on PGA and global tours – Bandabets",
    description:
      "Bet on PGA Tour, LPGA, and global golf tournaments with top odds and live betting markets.",
  },
  hockey: {
    title: "Field Hockey betting | Bet on major matches – Bandabets",
    description:
      "Bet on field hockey matches and international tournaments with competitive odds.",
  },
  horseRacing: {
    title: "Horse Racing betting | Bet on races worldwide – Bandabets",
    description:
      "Bet on global horse racing events with instant payouts and live odds across all major tracks.",
  },
  snooker: {
    title: "Snooker betting | Bet on snooker tournaments – Bandabets",
    description:
      "Bet on major snooker tournaments including World Snooker Championship and ranking events.",
  },
  motorSport: {
    title: "Motor Sport betting | Bet on F1 and racing events – Bandabets",
    description:
      "Bet on Formula 1, MotoGP, NASCAR, and more with competitive odds and live race betting.",
  },
  badminton: {
    title: "Badminton betting | Bet on BWF tournaments – Bandabets",
    description:
      "Bet on badminton matches including BWF tours and international tournaments with fast markets.",
  },
  baseball: {
    title: "Baseball betting | Bet on MLB and global leagues – Bandabets",
    description:
      "Bet on MLB and international baseball leagues with live action and instant payouts.",
  },
  cycling: {
    title: "Cycling betting | Bet on major tours – Bandabets",
    description:
      "Bet on cycling tours including Tour de France, Giro d’Italia, and Vuelta with real-time odds.",
  },
  darts: {
    title: "Darts betting | Bet on PDC events – Bandabets",
    description:
      "Bet on major darts tournaments including PDC World Championship with competitive odds.",
  },
};

function toCamelCase(str = "") {
  if (!str) {
    return "";
  }
  return str
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[^a-zA-Z0-9]+/g, " ")
    .trim()
    .toLowerCase()
    .split(" ")
    .map((word, i) => (i === 0 ? word : word[0].toUpperCase() + word.slice(1)))
    .join("");
}

export function useSportMeta() {
  function getSportMeta(sport) {
    return sportMetaMap[toCamelCase(sport)] || null;
  }

  return { sportMetaMap, getSportMeta };
}
