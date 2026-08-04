import { toRefs } from "vue";
import { useBetslipStore } from "../stores/sports-betslip";

export function useOneCut() {
  const MIN_LEGS = 6;
  const MIN_ODDS = 1.2;
  const MIN_STAKE = 1;

  const { betslip, stake } = toRefs(useBetslipStore());

  function oneCutAmout() {
    const percentage = 0.5;
    const amount = stake.value * percentage;
    return Math.round((amount + Number.EPSILON) * 100) / 100;
  }

  function remainingLegs() {
    // count qualifying legs
    const qualifyingLegs = betslip.value.filter(
      (bet) => parseFloat(bet.oddValue) >= MIN_ODDS
    ).length;

    // calculate how many more are needed
    const remaining = Math.max(0, MIN_LEGS - qualifyingLegs);

    return remaining;
  }

  function buildLegsMessage() {
    const qualifyingLegs = betslip.value.filter(
      (bet) => parseFloat(bet.oddValue) >= MIN_ODDS
    ).length;
    const remainingLegs = Math.max(0, MIN_LEGS - qualifyingLegs);

    // First check legs/odds requirement
    if (remainingLegs > 0) {
      return `Add ${remainingLegs} more leg${
        remainingLegs > 1 ? "s" : ""
      } @${MIN_ODDS}+ odds`;
    }

    // Then check stake requirement
    if (stake.value < MIN_STAKE) {
      return `Add stake (min stake ${MIN_STAKE})`;
    }

    // If both conditions are satisfied
    return "One Cut ready ✅";
  }

  function isOneCutQualified() {
    const qualifyingLegs = betslip.value.filter(
      (bet) => parseFloat(bet.oddValue) >= MIN_ODDS
    ).length;

    const hasEnoughLegs = qualifyingLegs >= MIN_LEGS;
    const hasEnoughStake = stake.value >= MIN_STAKE;

    return hasEnoughLegs && hasEnoughStake;
  }
  function qualifyingLegs() {
    const qualifyingLegs = betslip.value.filter(
      (bet) => parseFloat(bet.oddValue) >= MIN_ODDS
    ).length;

    if (qualifyingLegs >= MIN_LEGS) {
      return MIN_LEGS;
    }

    return qualifyingLegs;
  }

  function qualifyingLegsUnlimited() {
    const qualifyingLegs = betslip.value.filter(
      (bet) => parseFloat(bet.oddValue) >= MIN_ODDS
    ).length;

    return qualifyingLegs;
  }

  function oneCutRatio() {
    let denominator = MIN_LEGS;
    let numerator = MIN_LEGS - 1;
    if (qualifyingLegsUnlimited() > numerator) {
      numerator = qualifyingLegsUnlimited() - 1;
      denominator = qualifyingLegsUnlimited();
    }

    return `${numerator}/${denominator}`;
  }

  return {
    MIN_LEGS,
    qualifyingLegs,
    remainingLegs,
    oneCutAmout,
    oneCutRatio,
    isOneCutQualified,
    buildLegsMessage,
  };
}
