import { nextTick } from "vue";
import { useMatches2Store } from "../stores/matches2";
import { useSportsQueryParamsStore } from "../stores/sports-query-params";

export function useScrollToViewedMatch() {
  const matchesStore = useMatches2Store();
  const queryParamsStore = useSportsQueryParamsStore();

  const saveScrolledPosition = () => {
    const container = document.querySelector(`.matches-scroll-container`);

    const { saveScrollPosition } = useMatches2Store();

    if (container) {
      saveScrollPosition(container.scrollTop);
    }
  };

  async function scrollToViewedMatch() {
    await nextTick();
    await new Promise((resolve) => setTimeout(resolve, 400));

    const container = document.querySelector(".matches-scroll-container");
    if (!container) return;

    if (!matchesStore.restoreScroll) {
      container.scrollTo({ top: 0, behavior: "instant" });
      return;
    }

    matchesStore.consumeScrollPosition();
    const matchId = queryParamsStore.scrollId;
    const matchEl = matchId ? document.getElementById(matchId) : null;

    if (matchEl) {
      const containerRect = container.getBoundingClientRect();
      const matchRect = matchEl.getBoundingClientRect();
      const offset = matchRect.top - containerRect.top + container.scrollTop;

      // Account for stacked sticky elements inside the scroll container:
      // Mobile: MobileHeaderV2(44) + CategoryPills(~76) + SportsFilterBar(~80) ≈ 200px
      // Desktop: HeaderLinks(56) + SecondaryNav/FilterBar(~100) ≈ 160px
      const isMobile = window.innerWidth < 768;
      const topOffset = isMobile ? 370 : 330;

      container.scrollTo({ top: Math.max(0, offset - topOffset), behavior: "instant" });
    } else {
      container.scrollTo({ top: matchesStore.scrollTop, behavior: "instant" });
    }
  }

  return { scrollToViewedMatch, saveScrolledPosition };
}
