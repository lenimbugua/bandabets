# SEO cutover: old naibet.com → this app

The previous naibet.com (an Expo/React Native web build) served every page under
a `/ke` country prefix — `https://naibet.com/ke`, `/ke/sports`, `/ke/casino`,
`/ke/promotions`, and so on. Those URLs are indexed by Google and saved in users'
bookmarks.

This app serves the same pages at the **root**: `/`, `/sports`, `/casino-home`,
`/promotions`. Without a redirect, every indexed `/ke/*` URL breaks at cutover
and the rankings attached to it are lost.

## What is already handled, in code

`src/router/index.js` has a catch-all that strips the prefix and preserves the
query string and hash:

| Request | Lands on |
|---|---|
| `/ke` | `/` |
| `/ke/sports` | `/sports` |
| `/ke/sports/football` | `/sports/football` |
| `/ke/sports?utm_source=x#odds` | `/sports?utm_source=x#odds` |

The same block also redirects the retired virtual-game slugs:

| Request | Lands on |
|---|---|
| `/virtual-games/siaka-league` | `/virtual-games/nai-league` |
| `/virtual-games/siaka-turbo` | `/virtual-games/nai-turbo` |
| `/virtual-games/siaka-virtual-jackpot` | `/virtual-games/nai-virtual-jackpot` |
| `/virtual-games/pari-*` | the matching `nai-*` path |

## Retired URL shapes

The old site also had a sports lobby at `/sports` and served crash games under
`/crash-games/<slug>`. This app has neither shape — sports pages live at
`/sports/:sport` and crash games at `/crash/:name`, with Aviator on its own
`/aviator` page. Both old shapes were landing on the 404 catch-all, which is
served `noindex,nofollow`, so Google was dropping them.

Note this also broke the `/ke` table above: `/ke/sports` redirected to `/sports`,
which was itself a 404.

| Request | Lands on | Why |
|---|---|---|
| `/sports` | `/sports/soccer` | no bare sports lobby in this app |
| `/crash-games/aviator` | `/aviator` | Aviator has its own page |
| `/crash-games/<slug>` | `/crash/<slug>` | crash games moved up a level |
| `/casino` | `/casino-home` | one casino lobby now |
| `/crash` | `/casino-home` | no separate crash lobby |
| `/instant`, `/instant/live` | `/casino-home` | instant games were pulled |
| `/welcome-promotions` | `/promotions` | welcome-gift page disabled |
| `/freebet` | `/promotions` | freebet disabled |

The exact-match (`location =`) form matters for `/casino` and `/crash`: the
`/casino/:name` and `/crash/:name` game routes must keep reaching the SPA.

## Both halves are in place

Every redirect above exists twice, and the two must be kept in sync:

1. **Router entries** in `src/router/index.js` — these cover in-app navigation
   and act as a safety net, but they are a client-side `200`: the SPA fallback
   returns `index.html` and JavaScript then rewrites the URL. Google follows JS
   redirects but treats them as a weaker signal than a `301`, and users on a
   slow connection see a flash of the wrong page.
2. **Real `301`s** in `docker/config/app/nginx/conf.d/default.conf`, above the
   SPA `try_files` fallback. This is what actually consolidates ranking.

Two details in that server block:

- `absolute_redirect off` keeps the `Location` header relative. Cloudflare
  terminates TLS in front of the origin, so an absolute redirect built from the
  origin's own scheme would send clients through an extra `http` → `https` hop.
- Query strings are preserved throughout (`$is_args$args` on `return`,
  automatic on `rewrite`), so `utm_*` and `referralCode` survive the redirect.
  vue-router does the same on its side — it merges `query` and `hash` into a
  string redirect target — so the router entries need no special handling.

`/ke/sports` chains two hops (`/ke/sports` → `/sports` → `/sports/soccer`).
That is within what crawlers follow; collapsing it would mean special-casing
the generic `/ke/` rewrite, which is not worth the added complexity.

If the app is ever fronted by a GKE ingress rather than Nginx directly, the
equivalent rules belong there instead.

## Post-cutover checklist

- [ ] After deploying, confirm the `301`s are live. Each of these should return
      `301`, not `200`:
      ```
      for u in /sports /crash-games/aviator /casino /crash /instant \
               /welcome-promotions /freebet /ke /ke/sports; do
        printf "%-24s " "$u"
        curl -s -o /dev/null -w "%{http_code}\n" "https://naibet.com$u"
      done
      ```
- [ ] Submit the new `public/sitemap.xml` in Google Search Console, then use
      **URL Inspection → Request indexing** on `/sports/soccer` and `/aviator`
      so the two highest-traffic redirect targets get recrawled first.
- [ ] Use the Search Console **Change of Address** tool only if the domain
      changes — it does not apply to a path-prefix move on the same host.
- [ ] Re-scrape the social cards so the new `og:image` is picked up:
      Facebook Sharing Debugger and the X Card Validator both cache aggressively.
- [ ] Watch Search Console **Coverage** for a spike in 404s under `/ke/`, which
      would mean the redirect is not being hit.
- [ ] Keep `public/sitemap.xml` free of redirected and non-existent paths — a
      sitemap full of known 404s wastes crawl budget. Every entry should
      resolve to a real route.

## Known gap

The `/crash/:name` and `/casino/:name` game pages — several of which are in the
sitemap — launch from `gameIdToLaunch` in the casino store, which is set by an
in-app click and is **not** persisted (`src/stores/casino.js`). A visitor
arriving cold from search hits the launch endpoint with `gameId=null`, so those
URLs likely render the error state rather than the game. They need a slug → game
id lookup on mount before they are worth indexing.
