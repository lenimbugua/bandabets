export function useBetsStatus() {
  // bet status
  const all = 0;
  const pending = 1;
  const voided = 2;
  const lost = 3;
  const cancelled = 4;
  const won = 5;
  const pendingPayout = 10;
  const cashedOut = 15;

  function getStatusText(status) {
    switch (status) {
      case won:
        return "won";
      case lost:
        return "lost";
      case pending:
        return "open";
      case voided:
        return "voided";
      case cancelled:
        return "cancelled";
      case pendingPayout:
        return "pending payout";
      case cashedOut:
        return "cashed out";
      default:
        return "";
    }
  }

  function getColor(prefix, status) {
    switch (status) {
      case pending:
        return `${prefix}-amber-600 dark:${prefix}-amber-400`;
      case lost:
        return `${prefix}-red-600 dark:${prefix}-red-400`;
      case voided:
        return `${prefix}-stone-500 dark:${prefix}-stone-400`;
      case won:
        return `${prefix}-emerald-600 dark:${prefix}-emerald-400`;
      case pendingPayout:
        return `${prefix}-blue-600 dark:${prefix}-blue-400`;
      case cancelled:
        return `${prefix}-gray-500 dark:${prefix}-gray-400`;
      case cashedOut:
        return `${prefix}-teal-600 dark:${prefix}-teal-400`;
      default:
        return "";
    }
  }

  return {
    all,
    won,
    lost,
    voided,
    pending,
    cancelled,
    cashedOut,
    pendingPayout,

    getColor,
    getStatusText,
  };
}
