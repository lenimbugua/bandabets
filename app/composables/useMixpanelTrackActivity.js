import { useMixpanel } from "@/composables/useMixpanel";

export function useMixpanelTractActivity() {
  const mixpanel = useMixpanel();

  let sessionStartTime = null;
  let lastActiveTime = null;
  let isActive = false;
  //    let activityInterval = null;

  function trackLogin(user) {
    mixpanel.identify(user.id);
    mixpanel.people.set({
      $name: user.profileSid,
      msisdn: user.msisdn,
      signup_date: new Date().toISOString(),
      profileSid: user.profileSid,
    });

    mixpanel.track("UserLogin", {
      profileSid: user.profileSid,
      timestamp: new Date().toISOString(),
    });
  }

  function startSessionTracking() {
    if (!isActive) {
      isActive = true;
      sessionStartTime = Date.now();
      lastActiveTime = Date.now();

      mixpanel.track("SessionStarted", {
        start_time: new Date().toISOString(),
        device_type: detectDeviceType(),
      });

      startActivityListeners();
    }
  }

  function startActivityListeners() {
    ["mousemove", "keydown", "scroll", "touchstart"].forEach((evt) =>
      window.addEventListener(evt, updateActivity)
    );

    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") {
        goInactive();
      } else {
        updateActivity();
      }
    });

    setInterval(() => {
      if (Date.now() - lastActiveTime > 60000) {
        goInactive();
      }
    }, 30000);
  }

  function updateActivity() {
    lastActiveTime = Date.now();
    if (!isActive) {
      isActive = true;
      mixpanel.track("UserActive", { timestamp: new Date().toISOString() });
    }
  }

  function goInactive() {
    if (isActive) {
      isActive = false;
      mixpanel.track("UserInactive", { timestamp: new Date().toISOString() });

      const sessionDuration = Math.floor(
        (Date.now() - sessionStartTime) / 1000
      );
      mixpanel.track("SessionEnded", { duration_seconds: sessionDuration });
    }
  }

  function detectDeviceType() {
    if (window.innerWidth <= 768) return "Mobile";
    if (window.innerWidth <= 1024) return "Tablet";
    return "Desktop";
  }

  return {
    trackLogin,
    startSessionTracking,
  };
}
