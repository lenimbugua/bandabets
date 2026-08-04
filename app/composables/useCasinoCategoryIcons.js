/**
 * Icon paths for casino category pills, keyed by the slug used in
 * `?category=` query params. Shared by CasinoCategoryNav (casino home) and the
 * HotSection Games tab so both render the same glyph for the same category.
 */
export const casinoCategoryIconPaths = {
  home: "M11.47 3.84a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.06l-8.69-8.69a2.25 2.25 0 0 0-3.18 0l-8.69 8.69a.75.75 0 1 0 1.06 1.06l8.69-8.69Z M12 5.43l8.16 8.16c.03.03.05.06.07.09v6.2c0 .46-.38.84-.84.84H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V20a.75.75 0 0 1-.75.75H4.61a.84.84 0 0 1-.84-.84v-6.2c.02-.03.04-.06.07-.09L12 5.43Z",
  live: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2Zm-2 14.5v-9l6 4.5-6 4.5Z",
  slots:
    "M4 5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5Zm3 3v8h2V8H7Zm4 0v8h2V8h-2Zm4 0v8h2V8h-2Z",
  crash:
    "M9.32 7.58C12.2 3.88 16.7 1.5 21.75 1.5a.75.75 0 0 1 .75.75c0 5.06-2.38 9.56-6.08 12.44A6.75 6.75 0 0 1 9.75 22.5a.75.75 0 0 1-.75-.75v-4.13c-1-.5-1.93-1.16-2.62-1.62H2.25a.75.75 0 0 1-.75-.75 6.75 6.75 0 0 1 7.82-6.67ZM15 6.75a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z",
  virtuals:
    "M7 4a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h2v-2a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2h2a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm1.5 5a1 1 0 1 1 0 2 1 1 0 0 1 0-2Zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2Z",
  top: "M11.48 3.5a.56.56 0 0 1 1.04 0l2.13 5.11a.56.56 0 0 0 .47.34l5.52.45c.5.04.7.66.32.99l-4.2 3.6a.56.56 0 0 0-.18.56l1.28 5.38a.56.56 0 0 1-.84.61l-4.72-2.88a.56.56 0 0 0-.59 0l-4.72 2.88a.56.56 0 0 1-.84-.61l1.28-5.38a.56.56 0 0 0-.18-.56l-4.2-3.6a.56.56 0 0 1 .32-.99l5.52-.45a.56.56 0 0 0 .47-.34L11.48 3.5Z",
  table:
    "M3 5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5Zm2 6h6V5H5v6Zm8 0h6V5h-6v6ZM5 19h6v-6H5v6Zm8 0h6v-6h-6v6Z",
  new: "M9.4 7.2 8 4l-1.4 3.2L3.4 8.6 6.6 10 8 13.2l1.4-3.2L12.6 8.6 9.4 7.2Zm9 2.6L16.8 6l-1.6 3.8L11.4 11.4l3.8 1.6 1.6 3.8 1.6-3.8 3.8-1.6-3.8-1.6Zm-6 8.6L10.8 14l-1.6 3.4-3.4 1.6 3.4 1.6 1.6 3.4 1.6-3.4 3.4-1.6-3.4-1.6Z",
  roulette: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2Zm0 4a2 2 0 1 1 0 4 2 2 0 0 1 0-4Zm-4.5 6.5a2 2 0 1 1 0 4 2 2 0 0 1 0-4Zm9 0a2 2 0 1 1 0 4 2 2 0 0 1 0-4Z",
  baccarat:
    "M6 3a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H6Zm6 3.2 3.2 4.3a2.6 2.6 0 1 1-2.45 3.9h-1.5a2.6 2.6 0 1 1-2.45-3.9L12 6.2Z",
  other:
    "M8 7a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm0 10a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm12-10a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm0 10a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z",
};

/** Map a raw API category name ("Crash Game", "Live Casino") to an icon path. */
export function casinoCategoryIconPath(name) {
  const lower = (name || "").toLowerCase();
  if (lower.includes("crash")) return casinoCategoryIconPaths.crash;
  if (lower.includes("slot")) return casinoCategoryIconPaths.slots;
  if (lower.includes("live")) return casinoCategoryIconPaths.live;
  if (lower.includes("table")) return casinoCategoryIconPaths.table;
  if (lower.includes("virtual")) return casinoCategoryIconPaths.virtuals;
  if (lower.includes("roulette")) return casinoCategoryIconPaths.roulette;
  if (lower.includes("baccarat")) return casinoCategoryIconPaths.baccarat;
  if (lower.includes("top") || lower.includes("popular"))
    return casinoCategoryIconPaths.top;
  if (lower.includes("new")) return casinoCategoryIconPaths.new;
  return casinoCategoryIconPaths.other;
}
