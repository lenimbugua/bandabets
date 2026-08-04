export function useModalTypes() {
  // modal types
  const login = "login";
  const deposit = "deposit";
  const betslip = "betslip";
  const instantBetslip = "instantBetslip";
  const drawer = "drawer";
  const betPlaceStatus = "betPlaceStatus";
  const search = "search";
  const calendar = "calendar";
  const instantBetWonModal = "instantBetWonModal";
  const chat = "chat";
  const shareBet = "shareBet";
  const bookedBetPreview = "bookedBetPreview";
  const casinoUnauthModal = "casinoUnauthModal";
  const confirm = "confirm";
  const confirmRemoveSlipModal = "confirmRemoveSlipModal";
  const insufficientBalance = "insufficientBalanceModal";
  const notification = "notificationModal";
  const cashout = "cashoutModal";
  const roadblock = "roadblockModal";
  const loader = "loaderModal";
  const sportsIconsModal = "sportsIconsModal";
  const ChangeEventModal = "ChangeEventModal";
  const socialIconsModal = "socialIconsModal";
  const oneCutModal = "oneCutModal";
  const twoUpModal = "twoUpModal";
  const multibetBoostModal = "multibetBoostModal";
  const customerSupportModal = "customerSupportModal";
  const geniusGameTracker = "geniusGameTracker";
  const festiveModal = "festiveModal";

  // modal titles
  const loginModalTitle = "Login";
  const depositModalTitle = "Deposit to your account";
  const betslipModalTitle = "Betslip";
  const shareBetTitle = "Share With Friends";
  const bookedBetPreviewTitle = "Preview";

  // modal functions
  const getModalTitle = (modalType) => {
    switch (modalType) {
      case login:
        return loginModalTitle;
      case deposit:
        return depositModalTitle;
      case betslip:
      case instantBetslip:
        return betslipModalTitle;
      case shareBet:
        return shareBetTitle;
      case bookedBetPreview:
        return bookedBetPreviewTitle;
      default:
        return "";
    }
  };

  return {
    chat,
    login,
    loader,
    cashout,
    deposit,
    betslip,
    drawer,
    search,
    calendar,
    shareBet,
    confirm,
    roadblock,
    twoUpModal,
    oneCutModal,
    notification,
    festiveModal,
    confirmRemoveSlipModal,
    sportsIconsModal,
    ChangeEventModal,
    bookedBetPreview,
    socialIconsModal,
    casinoUnauthModal,
    multibetBoostModal,
    instantBetWonModal,
    customerSupportModal,
    insufficientBalance,
    geniusGameTracker,
    instantBetslip,
    betPlaceStatus,
    getModalTitle,
  };
}
