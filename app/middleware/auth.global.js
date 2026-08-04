import { storeToRefs } from "pinia";
import { useModalTypes } from "@/composables/useModalTypes";
import { useLoginStore } from "@/stores/login";
import { useModalStore } from "@/stores/modal";

// Port of the old vue-router guard (git show 81ae85f:src/router/index.js,
// router.beforeEach around line 942). Spec §6.4. Behaviour preserved
// exactly: routes whose meta carries `requiresAuth: true` are gated by
// `isAuthenticated` from the login store; when the user isn't logged in,
// the guard does NOT redirect to a login page — it stashes the target as
// an "after login" callback and opens the login modal in place, leaving
// the user on their current page behind it.
export default defineNuxtRouteMiddleware((to) => {
  // The login gate is a client-side modal (see app/stores/modal.js /
  // app/components/TheLogin.vue), not a page — there is no server-side
  // equivalent of "open a modal" to render into the SSR response, and
  // useLoginStore()'s persisted token lives in a cookie that IS available
  // on the server, but acting on it here would only ever abort the very
  // first server-rendered navigation with no UI to show for it (no modal
  // markup gets sent down for a document that's about to be discarded and
  // re-hydrated). Bailing out on the server is correct: the client re-runs
  // global middleware on every navigation, including the one immediately
  // after hydration, so the guard still runs — just entirely client-side,
  // matching the old guard, which only ever executed in the browser
  // (vue-router's `createWebHistory()` guards never run on a server).
  if (import.meta.server) return;

  const requiresAuth = to.matched.some((record) => record.meta?.requiresAuth);
  if (!requiresAuth) return;

  const { isAuthenticated } = storeToRefs(useLoginStore());
  if (isAuthenticated.value) return;

  const { setAfterLoginAction } = useLoginStore();
  const { openModal } = useModalStore();
  const { login } = useModalTypes();

  setAfterLoginAction(() => navigateTo({ name: to.name }));
  openModal(login);

  // Old guard: `if (requiresAuth && !isAuthenticated.value) { ... }` never
  // called `next()` in this branch, which cancels the pending vue-router
  // navigation and leaves the user on the route they were already on.
  // abortNavigation() is the Nuxt route-middleware equivalent.
  return abortNavigation();
});
