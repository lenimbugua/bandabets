# Infrastructure Handoff — Nuxt 4 SSR

The app is no longer a static bundle. It is a Node server.

## What changed

| | Before | After |
|---|---|---|
| Build output | `dist/` (static) | `.output/` |
| Serve | Nginx static files | `node .output/server/index.mjs` |
| Port | 80 (Nginx) | 3000 (`PORT` env var overrides) |
| Build command | `pnpm build` | `pnpm build` (unchanged) |
| Env substitution | build-time `sed` in `docker/config/app/entrypoint.sh` | **not needed** |
| Health check | any static path | `GET /version.json` → `{"version":"…"}` |

The container must run a Node process now — a static file server (Nginx serving
`.output/`) will not work; `.output/server/index.mjs` is the entrypoint and must
stay running.

## Environment variables

All `VITE_*` keys are renamed to `NUXT_PUBLIC_*`, same values, same meaning.
Nuxt reads them at **server start** (via `runtimeConfig.public` in
`nuxt.config.js`), not at build time, so the image no longer needs rebuilding
or `sed`-patching per environment — the same built `.output/` can be started
with different env vars for dev/staging/prod.

Verified against `runtimeConfig.public` in `nuxt.config.js` and `.env.example`:
both list the same 33 keys, in the same order, with no discrepancies.

| Old (`VITE_*`) | New (`NUXT_PUBLIC_*`) |
|---|---|
| `VITE_APP_VERSION` | `NUXT_PUBLIC_APP_VERSION` |
| `VITE_MATCHES_URL` | `NUXT_PUBLIC_MATCHES_URL` |
| `VITE_INSTANT_URL` | `NUXT_PUBLIC_INSTANT_URL` |
| `VITE_AUTH_URL` | `NUXT_PUBLIC_AUTH_URL` |
| `VITE_BET_URL` | `NUXT_PUBLIC_BET_URL` |
| `VITE_CASINO_URL` | `NUXT_PUBLIC_CASINO_URL` |
| `VITE_CMS_URL` | `NUXT_PUBLIC_CMS_URL` |
| `VITE_VIRTUAL_URL` | `NUXT_PUBLIC_VIRTUAL_URL` |
| `VITE_VIRTUAL_LEAGUES_URL` | `NUXT_PUBLIC_VIRTUAL_LEAGUES_URL` |
| `VITE_KIRON_LITE_URL` | `NUXT_PUBLIC_KIRON_LITE_URL` |
| `VITE_AFFILIATE_URL` | `NUXT_PUBLIC_AFFILIATE_URL` |
| `VITE_AFFILIATE_API_URL` | `NUXT_PUBLIC_AFFILIATE_API_URL` |
| `VITE_GENIUS_GAME_TRACKER_URL` | `NUXT_PUBLIC_GENIUS_GAME_TRACKER_URL` |
| `VITE_ONESIGNAL_APP_ID` | `NUXT_PUBLIC_ONESIGNAL_APP_ID` |
| `VITE_DEPOSIT_TAX` | `NUXT_PUBLIC_DEPOSIT_TAX` |
| `VITE_WITHDRAW_TAX` | `NUXT_PUBLIC_WITHDRAW_TAX` |
| `VITE_AVIATOR_GAME_ID` | `NUXT_PUBLIC_AVIATOR_GAME_ID` |
| `VITE_AVIATRIX_GAME_ID` | `NUXT_PUBLIC_AVIATRIX_GAME_ID` |
| `VITE_FOOTBALLX_GAME_ID` | `NUXT_PUBLIC_FOOTBALLX_GAME_ID` |
| `VITE_HAKI_LEAGUE_GAME_ID` | `NUXT_PUBLIC_HAKI_LEAGUE_GAME_ID` |
| `VITE_HAKI_TURBO_GAME_ID` | `NUXT_PUBLIC_HAKI_TURBO_GAME_ID` |
| `VITE_KIRON_JACKPOT_GAME_ID` | `NUXT_PUBLIC_KIRON_JACKPOT_GAME_ID` |
| `VITE_JETX_GAME_ID` | `NUXT_PUBLIC_JETX_GAME_ID` |
| `VITE_VIRTUAL_GAME_ID` | `NUXT_PUBLIC_VIRTUAL_GAME_ID` |
| `VITE_CRASH_ROYALE_GAME_ID` | `NUXT_PUBLIC_CRASH_ROYALE_GAME_ID` |
| `VITE_VIRTUAL_SPIN_GAME_ID` | `NUXT_PUBLIC_VIRTUAL_SPIN_GAME_ID` |
| `VITE_MAESTRO_GAME_ID` | `NUXT_PUBLIC_MAESTRO_GAME_ID` |
| `VITE_PAYBILL_NO` | `NUXT_PUBLIC_PAYBILL_NO` |
| `VITE_TENANT_CODE` | `NUXT_PUBLIC_TENANT_CODE` |
| `VITE_PROPELLER_AID` | `NUXT_PUBLIC_PROPELLER_AID` |
| `VITE_PROPELLER_TID` | `NUXT_PUBLIC_PROPELLER_TID` |
| `VITE_LIVE_POLL_INTERVAL` | `NUXT_PUBLIC_LIVE_POLL_INTERVAL` |
| `VITE_USSD_ACTIVATE_ACCOUNT` | `NUXT_PUBLIC_USSD_ACTIVATE_ACCOUNT` |

## Verification (from a clean rebuild at HEAD `05b3bd9`)

`rm -rf .output && pnpm build` completes clean; `.output/server/index.mjs` is
produced and runs under `node .output/server/index.mjs` on port 3000.

The six SEO routes all returned `200` from the production server with real
server-rendered markup (`<h1>`, JSON-LD, canonical link), `data-theme="dark"`
present, and no `noindex` header:

| route | status | bytes | ld+json | canonical | meta robots | X-Robots-Tag |
|---|---|---|---|---|---|---|
| `/` | 200 | 67032 | yes | yes | index,follow | none |
| `/leagues` | 200 | 64395 | yes | yes | index,follow | none |
| `/promotions` | 200 | 100749 | yes | yes | index,follow | none |
| `/sports/football` | 200 | 64443 | yes | yes | index,follow | none |
| `/sports/live/football` | 200 | 99698 | yes | yes | index,follow | none |
| `/sports/football/kenya/premier-league` | 200 | 64760 | yes | yes | index,follow | none |

Home page detail: 1 `<h1>`; `data-theme="dark"` present; `<title>Best online
sports betting in Kenya – Naibet</title>`; canonical `https://naibet.com/`;
JSON-LD `@type`s = Organization, WebSite, BreadcrumbList, SearchAction,
ContactPoint, ListItem. Param-derived titles work, e.g. `/sports/football` →
"Football Betting in Kenya – Odds & Live Markets | Naibet".

All Phase-2 placeholder routes (`/privacy-policy`, `/terms-and-conditions`,
`/responsible-gambling`, `/deposit`, `/login`, `/signup`, `/casino-home`,
`/my-bets`, `/profile`, `/withdraw`, `/aviator`, and the match-details shape
`/sports/football/kenya/premier-league/arsenal-vs-chelsea-12345`) returned
`200` with `X-Robots-Tag: noindex, nofollow`, so none of them can be indexed
while they're stubs.

Zero SSR errors (`nuxt instance unavailable`, `window is not defined`,
`ReferenceError`, `No match for`) appeared in the server log across the run.

**Not verified — requires a real browser and real credentials, which neither
an automated check nor this handoff can provide:** that a logged-in session
survives a hard refresh with no logged-out flash (Phase 1 exit criterion 3).
This needs a manual check by the team before Phase 2 begins.

## Notes for the infra team

- The container must run a Node process; a static file server will not work.
- `.output/` is self-contained — `node_modules` is not needed at runtime.
- Sticky sessions are not required; the session lives in a client cookie.
- `GET /version.json` returns `{"version": "<NUXT_PUBLIC_APP_VERSION>"}` with
  `cache-control: no-store` — use it as the readiness/liveness probe.
