// Batch G — restores the baseline's function-shaped `/ke/**` redirect
// (`git show 81ae85f:src/router/index.js:606-613`):
//   {
//     path: "/ke/:pathMatch(.*)*",
//     redirect: (to) => {
//       const rest = Array.isArray(to.params.pathMatch)
//         ? to.params.pathMatch.join("/")
//         : to.params.pathMatch || "";
//       return { path: `/${rest}`, query: to.query, hash: to.hash };
//     },
//   }
// This shape can't be expressed as a static `routeRules` value (the target
// depends on the matched wildcard), so it's a Nitro route handler, same
// pattern as server/routes/crash-games/[name].js (Batch 0.2). The bare
// "/ke" -> "/" redirect is a separate static routeRules entry in
// nuxt.config.js and is unaffected by this file.
//
// Query string is preserved from the incoming request URL. Hash fragments
// are never sent to the server by browsers (they're a client-only URL
// part), so there is nothing to "preserve" server-side — the baseline's
// client-side vue-router redirect could read `to.hash` only because it ran
// entirely in the browser; a real HTTP 301 has no equivalent to read from.
//
// MUST land last (Batch G is the final batch): a broader catch-all
// registered earlier would have swallowed every /ke/* path before later
// batches had real pages to redirect into.
export default defineEventHandler((event) => {
  const pathMatch = getRouterParam(event, "pathMatch") || "";
  const url = getRequestURL(event);
  const target = `/${pathMatch}${url.search}`;
  return sendRedirect(event, target, 301);
});
