export default defineEventHandler((event) => {
  const { public: config } = useRuntimeConfig(event);
  setResponseHeader(event, "cache-control", "no-store");
  return { version: config.appVersion || "unknown" };
});
