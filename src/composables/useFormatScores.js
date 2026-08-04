export function useFormatScores() {
  function splitResults(result) {
    if (!result) return ["-", "-"];
    return result.split(":");
  }
  function homeScore(result) {
    return splitResults(result)[0];
  }
  function awayScore(result) {
    return splitResults(result)[1];
  }
  function isDraw(result) {
    const splitedResult = splitResults(result);
    return (
      Number.parseInt(splitedResult[0]) === Number.parseInt(splitedResult[1])
    );
  }
  function homeWon(result) {
    const splitedResult = splitResults(result);
    return (
      Number.parseInt(splitedResult[0]) > Number.parseInt(splitedResult[1])
    );
  }
  function awayWon(result) {
    const splitedResult = splitResults(result);
    return (
      Number.parseInt(splitedResult[0]) < Number.parseInt(splitedResult[1])
    );
  }

  return {
    splitResults,
    homeScore,
    awayScore,
    homeWon,
    awayWon,
    isDraw,
  };
}
