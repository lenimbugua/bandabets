const OneSignalWrapper = {
  async init(appId) {
    if (window && "OneSignal" in window) return;

    const OneSignal = window.OneSignal || [];
    window.OneSignal = OneSignal;

    OneSignal.push(function () {
      OneSignal.init({
        appId: appId,
        safari_web_id: "web.onesignal.auto.YOUR_SAFARI_ID", // optional
        notifyButton: {
          enable: true,
        },
      });
    });

    // Event listeners
    OneSignal.push(() => {
      OneSignal.on("subscriptionChange", function (isSubscribed) {
        console.log("The user subscription state is now:", isSubscribed);
      });
    });
  },

  async subscribeUser() {
    const OneSignal = window.OneSignal || [];
    OneSignal.push(() => OneSignal.showSlidedownPrompt());
  },

  async getUserId() {
    const OneSignal = window.OneSignal || [];
    return new Promise((resolve) => {
      OneSignal.push(() => {
        OneSignal.getUserId().then(resolve);
      });
    });
  },
};

export default OneSignalWrapper;
