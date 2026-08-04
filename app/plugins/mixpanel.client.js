import mixpanel from "mixpanel-browser";

export default defineNuxtPlugin(() => {
  mixpanel.init("855f027f4230678f61f56685e72643b4", {
    debug: import.meta.dev,
    track_pageview: true,
  });

  return { provide: { mixpanel } };
});
