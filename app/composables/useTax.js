import { MAX_WIN } from "../composables/useDefinedConstants";

export function useTax() {
  const exciseTax = 15; // TODO to be externalised
  const withHoldingTax = 20; // TODO to be externalised

  function calculateExciseTax(stake) {
    return (stake * (exciseTax / 100)) / (1 + exciseTax / 100);
  }
  function calculateTotalPay(stake) {
    const exciseTax = calculateExciseTax(stake);
    return stake - exciseTax;
  }
  function calculateWithhodingTax(stake, totalOdds) {
    if (totalOdds === 0) {
      return 0;
    }
    if (stake === 0) {
      return 0;
    }
    const exciseTax = calculateExciseTax(stake);
    const newStake = stake - exciseTax;
    let possibleWin = newStake * totalOdds;

    if (possibleWin >= MAX_WIN) {
      possibleWin = MAX_WIN;
    }

    return (possibleWin - newStake) * (withHoldingTax / 100);
  }

  function calculatePossibleWinAfterExciseTax(stake, totalOdds) {
    const exciseTax = calculateExciseTax(stake);
    const newStake = stake - exciseTax;
    let possibleWin = newStake * totalOdds;

    if (possibleWin >= MAX_WIN) {
      possibleWin = MAX_WIN;
    }
    return possibleWin;
  }
  function finalAmountAfterWithHoldingTax(stake, totalOdds) {
    const withHoldingTax = calculateWithhodingTax(stake, totalOdds);
    const possibleWin = calculatePossibleWinAfterExciseTax(stake, totalOdds);
    return possibleWin - withHoldingTax;
  }

  function calculateTaxBonus(possibleWin, stake, totalOdds) {
    const afterTax = finalAmountAfterWithHoldingTax(stake, totalOdds);
    const bonus = possibleWin - afterTax;
    if (bonus > 0) {
      return bonus;
    }
    return 0;
  }
  return {
    calculateExciseTax,
    calculateTotalPay,
    calculateWithhodingTax,
    calculatePossibleWinAfterExciseTax,
    finalAmountAfterWithHoldingTax,
    calculateTaxBonus,
  };
}
