import { useLoginStore } from "@/stores/login.js";

export default defineNuxtPlugin(() => {
  // persistedstate rehydrates the login store from the cookie on both
  // server and client (see login.js's `persist.storage`). Touching the
  // store here, during plugin init, guarantees that rehydration has
  // happened before any component renders, so SSR-rendered markup
  // reflects the real auth state instead of a logged-out default.
  //
  // The brief's sample plugin also does `return { provide: { authReady: ... } }`.
  // Nothing in the codebase consumes `$authReady` (grepped app/ for
  // "authReady": no hits), and it would be redundant anyway — any
  // component can already read `useLoginStore().isAuthenticated` directly
  // and get a live, reactive value, whereas a `provide`d boolean computed
  // once at plugin-init time would go stale the moment the user logs in or
  // out client-side. Adding an unused/soon-stale provide is dead weight,
  // so this plugin just forces the store access and stops there.
  useLoginStore();
});
