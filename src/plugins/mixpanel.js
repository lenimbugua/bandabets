import mixpanel from "mixpanel-browser";

export default {
  install(app) {
    mixpanel.init("855f027f4230678f61f56685e72643b4", {
      debug: process.env.NODE_ENV !== "production",
      track_pageview: true,
    });

    app.config.globalProperties.$mixpanel = mixpanel;
  },
};

export { mixpanel }; // export directly for composable use
