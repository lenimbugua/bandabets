// Batch 0.2 — one of the two function-shaped baseline redirects
// (`git show 81ae85f:src/router/index.js:588-591`):
//   { path: "/crash-games/:name", redirect: (to) => ({ path: `/crash/${to.params.name}` }) }
// This shape can't be expressed as a static `routeRules` value (the target
// depends on the matched :name param), so it's a Nitro route handler
// instead. "/crash-games/aviator" is handled separately as a static
// routeRules redirect to "/aviator" (nuxt.config.js) and is unaffected by
// this file, which only matches when nuxt.config.js's routeRules didn't
// already redirect the exact path.
export default defineEventHandler((event) => {
  const name = getRouterParam(event, "name");
  return sendRedirect(event, `/crash/${name}`, 301);
});
