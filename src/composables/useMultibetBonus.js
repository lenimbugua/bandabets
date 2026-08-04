import { toRefs } from "vue";
import { useBetslipStore } from "../stores/sports-betslip";
export function useMultibetBonus() {
  const minimumOdds = 1.3;

  const { betslip } = toRefs(useBetslipStore());

  const boost = [
    { legs: 3, boost: 3, text: "🚀 Tatu bora +3% Boost Power!" },
    { legs: 4, boost: 5, text: "🎉 4 legs in! +5% Supercharge!" },
    { legs: 5, boost: 7, text: "🔥 5 legs = +7% Jackpot Heat!" },
    { legs: 6, boost: 9, text: "⚡ Zap it! 6 legs = +9% Boost!" },
    { legs: 7, boost: 11, text: "💰 Lucky 7 = +11% Cash Boost!" },
    { legs: 8, boost: 13, text: "🚀 8 legs flying! +13% Win Boost!" },
    { legs: 9, boost: 15, text: "🎯 9 legs locked = +15% Precision Win!" },
    { legs: 10, boost: 18, text: "🔥 Big 10! +18% Mega Money!" },
    { legs: 11, boost: 21, text: "⚡ 11 legs = +21% Shock Boost!" },
    { legs: 12, boost: 24, text: "🎉 Dozen legs! +24% Celebration!" },
    { legs: 13, boost: 27, text: "💎 13 = Lucky Boost +27%!" },
    { legs: 14, boost: 30, text: "🚀 14 Kumi na nne supuu! +30% Power!" },
    { legs: 15, boost: 34, text: "🔥 Halfway Hero! 15 = +34%!" },
    { legs: 16, boost: 38, text: "⚡ 16 legs = +38% Voltage Boost!" },
    { legs: 17, boost: 42, text: "💰 Seventeen wins! +42% Cash Flow!" },
    { legs: 18, boost: 46, text: "🎯 18 = +46% Precision Payday!" },
    { legs: 19, boost: 50, text: "🚀 Nineteen = +50% Rocket Boost!" },
    { legs: 20, boost: 55, text: "🔥 20 Legs! +55% Mega Multiplier!" },
    { legs: 21, boost: 60, text: "⚡ 21 = +60% Jackpot Voltage!" },
    { legs: 22, boost: 66, text: "💎 22 = +66% Diamond Boost!" },
    { legs: 23, boost: 72, text: "🎉 23 = +72% Celebration Mode!" },
    { legs: 24, boost: 78, text: "🚀 24 = +78% Blast Off!" },
    { legs: 25, boost: 84, text: "🔥 25 = +84% Money Storm!" },
    { legs: 26, boost: 88, text: "⚡ 26 = +88% Lightning Payout!" },
    { legs: 27, boost: 92, text: "💰 27 = +92% Gold Rush!" },
    { legs: 28, boost: 95, text: "🎯 28 = +95% Almost Max!" },
    { legs: 29, boost: 98, text: "🚀 29 = +98% Sky High Boost!" },
    { legs: 30, boost: 100, text: "🔥💰 MAX 30 = +100% DOUBLE WIN!" },
  ];

  function getCurrentBoost() {
    // Filter only selections meeting the minimum odds
    const qualifyingLegs = betslip.value.filter(
      (item) => parseFloat(item.oddValue) >= minimumOdds
    ).length;

    if (qualifyingLegs < 3) return 0; // No boost if less than 3 legs

    // Find the matching boost (if not found, return the max boost)
    const match = boost.find((b) => b.legs === qualifyingLegs);

    if (match) {
      return match.boost;
    } else {
      // If legs exceed defined table, return last boost (30 legs → 100%)
      return boost[boost.length - 1].boost;
    }
  }
  function getCurrentText() {
    // Filter only selections meeting the minimum odds
    const qualifyingLegs = betslip.value.filter(
      (item) => parseFloat(item.oddValue) >= minimumOdds
    ).length;

    if (qualifyingLegs < 3) return ""; // No boost if less than 3 legs

    // Find the matching boost (if not found, return the max boost)
    const match = boost.find((b) => b.legs === qualifyingLegs);

    if (match) {
      return match.text;
    } else {
      // If legs exceed defined table, return last boost (30 legs → 100%)
      return boost[boost.length - 1].text;
    }
  }

  // ✅ Get next boost if one more qualifying bet is added
  function getNextBoost() {
    const qualifyingLegs = betslip.value.filter(
      (item) => parseFloat(item.oddValue) >= minimumOdds
    ).length;

    const nextLegs = qualifyingLegs + 1;

    // Find the next tier at or above nextLegs
    const nextTier = boost.find((b) => b.legs >= nextLegs);

    if (!nextTier) {
      return boost[boost.length - 1].boost; // Already at or beyond max boost
    }

    return nextTier.boost;
  }

  // ✅ Get legs needed for next boost
  function getLegsToNextBonus() {
    const qualifyingLegs = betslip.value.filter(
      (item) => parseFloat(item.oddValue) >= minimumOdds
    ).length;

    // Find the next tier higher than current qualifying legs
    const nextTier = boost.find((b) => b.legs > qualifyingLegs);

    if (!nextTier) {
      return 0; // Already at max boost
    }

    return nextTier.legs - qualifyingLegs;
  }

  function calculateBoostBonus(possibleWin) {
    const currentBoostPercentage = getCurrentBoost();
    const boostBonus = (currentBoostPercentage / 100) * possibleWin;
    return Math.round((boostBonus + Number.EPSILON) * 100) / 100;
  }

  return {
    getLegsToNextBonus,
    getCurrentText,
    getCurrentBoost,
    calculateBoostBonus,
    getNextBoost,
  };
}
