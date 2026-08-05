export function usePromos() {
  const aviatorPromo = "aviator";
  const pariLeaguePromo = "siakaleague";
  const cashbackPromo = "cashback";
  const bethubPromo = "bethub";

  const multibetBoostPromo = "multibet-boost";
  const twoUpPromo = "two-up";
  const oneCutPromo = "one-cut";
  const dailyAviatorCashback = "daily-aviator-cashback";
  const aviatorWelcomeBonus = "aviator-welcome-bonus";
  const aviatorKaribuBonus = "aviator-karibu-bonus";
  const jengaBetsPromo = "jenga-bets";
  const tanoSupuuPromo = "tano-supuu";
  const sambazaZaKrisiiPromo = "sambaza-za-krisii";
  const leaderboardPromo = "leaderboard";
  const aviatorInviteFriends = "invite-friends";

  const welcomeBonusPromo = "welcome-bonus";
  const earlyCashoutPromo = "early-cashout";
  const playonRainsPromo = "playon-rains";

  // The live promo line-up. Anything not listed here no longer appears on the
  // promos page; its detail component and route handler are left in place.
  const promos = [
    {
      id: 2,
      name: aviatorPromo,
      routeName: "aviator",
      title: "Aviator Freespins ✈️",
      img: "bee48bac-2d48-423a-797f-1c4a46a02900",
      samary: `Claim your share of KSH 200,000 in Free Bets every single day inside the Aviator game chat room. The moment a Rain pop-up appears, the first players to click CLAIM win — be lightning fast!`,
    },
    {
      id: 2113384545646,
      name: oneCutPromo,
      routeName: "home",
      title: "Bandabets One Cut: 50% Cashback 🛡️",
      img: "2c0722b1-5c47-4d12-e1f2-35f5975fdb00",
      samary: `Even When You Lose, You Win! If your multi-bet falls short by exactly one game, we give you a 50% cash refund — real cash you can withdraw immediately (up to KES 10,000).`,
    },
    {
      id: 17700113,
      name: cashbackPromo,
      routeName: "deposit",
      title: "Daily Deposit Bonus 💰",
      img: "0cb84377-ce0a-476b-4db0-af26c06a3f00",
      samary: `First Deposit, First Bonus – Every Single Day! We refund your partial or full transaction charges as an instant bonus on your first deposit(s) of the day. The more you deposit, the bigger the bonus you unlock!`,
    },
    {
      id: 211336,
      name: multibetBoostPromo,
      routeName: "home",
      title: "Multibet Boost — Supercharge Your Wins 🚀",
      img: "4a5c473e-27af-40ed-de17-483985220000",
      samary: `Maximize Your Winning Potential with Bandabets's exclusive Multibet Boost! Combine multiple selections and watch your winnings grow with our tiered boost system that rewards bigger combinations with even bigger returns.`,
    },
  ];

  const welcomePromos = [
    {
      id: 211336345,
      name: aviatorKaribuBonus,
      routeName: "aviator",
      title: "Bandabets Aviator Karibu Bonus.",
      img: "87601caa-79a3-4162-173d-7a54df140b00",
      bg: "bg-linear-to-r from-red-700 to-yellow-700",
      samary: `Register today and get up to 50 FREE Aviator Bets!
✅ Create an account
✅ Make your first deposit
✅ Enjoy free Bandabets Aviator Bets Instantly!
`,
    },
    {
      id: 2113384545646656,
      name: aviatorWelcomeBonus,
      routeName: "aviator",
      title: "Aviator Welcome Bonus!",
      img: "87601caa-79a3-4162-173d-7a54df140b00",
      bg: "bg-linear-to-r from-red-700 to-red-800",
      samary: `Earn up to 25 free bets worth KES 10 each on Aviator during your first 5 days after registration!`,
    },
    {
      id: 17700113,
      name: cashbackPromo,
      routeName: "deposit",
      title: "DEPOSIT BONUS",
      img: "76660817-13e0-485c-748b-5e8073392e00",
      bg: "bg-linear-to-r from-red-700 to-amber-800",
      samary: `Bandabets provides a daily bonus to customers for their first deposit(s) of the day.`,
    },
    {
      id: 0,
      name: pariLeaguePromo,
      routeName: "pari-league",
      title: "NaiLeague Freebets",
      img: "1579e9ad-a404-4291-f0e9-b053fdb10c00",
      bg: "bg-linear-to-l from-red-700 to-amber-800",
      samary: `This promotion allows participants to place bets without using their own
money.`,
    },
    {
      id: 2113384545646656,
      name: dailyAviatorCashback,
      routeName: "aviator",
      title: "Daily Aviator Cashback - Surprise Rewards for Loyal Players!",
      bg: "bg-linear-to-r from-destructive to-brand-forest",
      img: "55154f30-9952-4bd9-f840-f2b790bce200",
      samary: `Every day, our system randomly rewards loyal Aviator players with surprise cash back on their losses. The more you play, the better your chances of being selected for our exclusive daily rewards program.`,
    },
    {
      id: 2,
      name: aviatorPromo,
      routeName: "aviator",
      title: "BANDABETS AVIATOR FREE RAINS",
      img: "a2dc155a-7835-43ab-f67d-e2879860cb00",
      bg: "bg-linear-to-l from-sky-700 to-amber-800",
      samary: `Bandabets Aviator Rains Promotion offers Aviator players a daily opportunity to win over KSH
200,000 in free bets.`,
    },
    {
      id: 211336,
      name: multibetBoostPromo,
      routeName: "home",
      title: "Multibet Boost - Supercharge Your Wins!",
      img: "0b1e5c5c-aa2f-4864-5ec5-646b3f34ea00",
      bg: "bg-linear-to-r from-cyan-700 to-red-800",
      samary: `Maximize Your Winning Potential with Bandabets's exclusive Multibet Boost!
        Combine multiple selections and watch your winnings grow with our tiered boost system that rewards bigger combinations with even bigger returns.`,
    },
    {
      id: 21133845456,
      name: twoUpPromo,
      routeName: "home",
      title: " 2UP – Get Paid in Full When Your Team Goes 2 Goals Up",
      img: "2d4f1cd5-abe0-4781-87af-41f1f4917400",
      bg: "bg-linear-to-r from-amber-700 to-pink-800",
      samary: `Experience football betting without the heartbreak of late comebacks! With Bandabets 2UP, when your team takes a 2-goal lead, we pay out in full instantly – no waiting, no reduced odds.`,
    },
    {
      id: 2113384545646,
      name: oneCutPromo,
      routeName: "home",
      title: "🏆Miss One, Still Win Cash Back!",
      img: "aa0e65f2-e0f0-48f8-80ac-2b770019a700",
      bg: "bg-linear-to-r from-amber-700 to-blue-800",
      samary: `Experience smarter betting with Bandabets One Cut! Even the best bettors can have one selection let them down. That’s why we created the ultimate safety net – when your multibet falls short by just one game, you still win real cash back.`,
    },

    {
      id: 211333,
      name: bethubPromo,
      routeName: "share-bets",
      title: "Share & Win Together!",
      img: "ca999c4c-366c-4f8b-2ea3-55d06ca48600",
      bg: "bg-linear-to-r from-yellow-700 to-teal-800",
      samary: `Boost Your Bets with Shared Luck! Load, Bet, Celebrate – Faster Than Ever!
      Unlock Bigger Wins – Team up and multiply your chances with Shared Luck!
      Instant Thrills – Load, place your bet, and enjoy lightning-fast results!
      More Bets, More Fun – Join forces and watch your rewards grow together!`,
    },
  ];

  return {
    aviatorPromo,
    pariLeaguePromo,
    multibetBoostPromo,
    dailyAviatorCashback,
    aviatorWelcomeBonus,
    aviatorKaribuBonus,
    cashbackPromo,
    twoUpPromo,
    bethubPromo,
    oneCutPromo,
    promos,
    welcomePromos,
    jengaBetsPromo,
    tanoSupuuPromo,
    sambazaZaKrisiiPromo,
    leaderboardPromo,
    aviatorInviteFriends,
    welcomeBonusPromo,
    earlyCashoutPromo,
    playonRainsPromo,
  };
}
