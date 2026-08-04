import { useMatchesStore } from "../stores/matches";
import { useSearchStore } from "../stores/search";

export function useStoreSwitch() {
  const searchStore = "search";
  const matchesStore = "matches";
  function switchStore(store) {
    switch (store) {
      case searchStore:
        return useSearchStore;
      case matchesStore:
        return useMatchesStore;
    }
  }

  return { searchStore, matchesStore, switchStore };
}
