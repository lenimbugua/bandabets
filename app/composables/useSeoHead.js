const BASE_URL = "https://naibet.com";
const DEFAULT_TITLE = "Naibet Kenya – Bet on All Sports & Top Odds";
const DEFAULT_DESC =
  "Bet from as low as KSh 10 and win big with Naibet! Enjoy on sports bets, thrilling casino games, huge jackpots, and virtual sports action.";
const OG_IMAGE = `${BASE_URL}/og-image.png`;
const OG_IMAGE_ALT = "Naibet Kenya – bet on all sports with top odds";

const stripQuery = (p) => p.split("?")[0].replace(/\/{2,}/g, "/");
const removeTrailingSlash = (p) =>
  p.length > 1 && p.endsWith("/") ? p.slice(0, -1) : p;
const normalizePath = (p) => removeTrailingSlash(stripQuery(p)).toLowerCase();

// Query params that indicate a faceted or campaign URL we do not want indexed.
const isParamPage = (fullPath) => {
  const q = fullPath.split("?")[1] || "";
  return /\butm_|^page=|[?&]sort=|[?&]session=/.test("?" + q);
};

export function useSeoHead(options = {}) {
  const route = useRoute();

  const title = options.title || DEFAULT_TITLE;
  const description = options.description || DEFAULT_DESC;
  const canonical = `${BASE_URL}${normalizePath(route.path || "/")}`;
  const robots = isParamPage(route.fullPath)
    ? "noindex,follow"
    : options.robots || "index,follow";

  const { combinedSchemas } = useOrganizationSchema();
  const schema = combinedSchemas(route, BASE_URL);

  useHead({
    title,
    meta: [
      { name: "description", content: description },
      { name: "robots", content: robots },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: canonical },
      { property: "og:type", content: "website" },
      { property: "og:image", content: OG_IMAGE },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: OG_IMAGE_ALT },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: OG_IMAGE },
      { name: "twitter:image:alt", content: OG_IMAGE_ALT },
    ],
    link: [{ rel: "canonical", href: canonical }],
    script: [
      { type: "application/ld+json", innerHTML: JSON.stringify(schema) },
    ],
  });
}
