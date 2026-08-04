const PROPELLER_AID = import.meta.env.VITE_PROPELLER_AID;
const PROPELLER_TID = import.meta.env.VITE_PROPELLER_TID;
const CONVERSION_BASE = `https://ad.propellerads.com/conversion.php?aid=${PROPELLER_AID}&tid=${PROPELLER_TID}`;
const FTD_FLAG_PREFIX = "prop_ftd_done_";

function readVisitorId() {
  return ("; " + document.cookie)
    .split("; prop_visitor_id=")
    .pop()
    .split(";")[0];
}

function hasFiredFtd(visitorId) {
  try {
    return localStorage.getItem(FTD_FLAG_PREFIX + visitorId) === "1";
  } catch {
    return false;
  }
}

function markFtdFired(visitorId) {
  try {
    localStorage.setItem(FTD_FLAG_PREFIX + visitorId, "1");
  } catch {
    /* storage disabled — postback still goes out, PropellerAds dedupes */
  }
}

function fireConversion(url) {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.send();
}

function buildUrl({ goal, visitorId, payout }) {
  const params = new URLSearchParams({ visitor_id: visitorId });
  if (goal != null) params.set("goal", String(goal));
  if (payout != null) params.set("payout", String(payout));
  return `${CONVERSION_BASE}&${params.toString()}`;
}

export function usePropellarAds() {
  function initPropellerAds() {
    const value = new URL(location.href).searchParams.get("PROPELLER");
    if (value) {
      const date = new Date();
      date.setTime(date.getTime() + 30 * 24 * 60 * 60 * 1000);
      document.cookie =
        "prop_visitor_id=" +
        (value || "") +
        "; expires=" +
        date.toUTCString() +
        "; path=/";
    }
  }

  function trackPropellerConversion() {
    const visitorId = readVisitorId();
    if (!visitorId) return;
    fireConversion(buildUrl({ visitorId }));
  }

  function trackPropellerDeposit(amount) {
    const visitorId = readVisitorId();
    if (!visitorId) return;
    const isFtd = !hasFiredFtd(visitorId);
    fireConversion(
      buildUrl({ goal: isFtd ? 2 : 3, visitorId, payout: amount })
    );
    if (isFtd) markFtdFired(visitorId);
  }

  return {
    initPropellerAds,
    trackPropellerConversion,
    trackPropellerDeposit,
  };
}
