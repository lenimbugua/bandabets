import { ref } from "vue";
import { MAX_WIN } from "../composables/useDefinedConstants";
import { useMultibetBonus } from "../composables/useMultibetBonus";

export function useBetslip() {
  const { calculateBoostBonus } = useMultibetBonus();
  const stakeAmounts = ref([20, 50, 100, 500, 1000, 1500, 2000]);

  function calculateTotalOdds(betslip) {
    // place odds in one array
    const oddsInBetslip = betslip.map((item) => {
      return Number.parseFloat(item.oddValue);
    });
    // calculate the total
    let totalOdds = 0;
    if (oddsInBetslip.length !== 0) {
      totalOdds = oddsInBetslip.reduce((accumulator, currentValue) => {
        return accumulator * currentValue;
      });
    }

    // round odds to 2 decimals
    totalOdds = Math.round((totalOdds + Number.EPSILON) * 100) / 100;

    return totalOdds;
  }

  function calculatePossibleWin(betslip, stake) {
    const totalOdds = calculateTotalOdds(betslip);
    if (totalOdds !== null) {
      const odds = totalOdds;
      let totalWin = stake * odds;

      const maxWin = MAX_WIN;
      if (totalWin >= maxWin) {
        totalWin = maxWin;
      }
      return totalWin;
    }
  }

  function calculatePotentialWin(betslip, stake) {
    let possibleWin = calculatePossibleWin(betslip, stake);
    let totalWin = calculateBoostBonus(possibleWin) + possibleWin;
    const maxWin = MAX_WIN;
    if (totalWin >= maxWin) {
      totalWin = maxWin;
    }
    return Math.round((totalWin + Number.EPSILON) * 100) / 100;
  }

  return {
    stakeAmounts,
    calculateTotalOdds,
    calculatePossibleWin,
    calculatePotentialWin,
  };
}
