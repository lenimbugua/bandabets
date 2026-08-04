import { nextTick, onMounted, ref, watch } from "vue";

export function useScrollToSelected(selectedId, options = {}) {
  const {
    behavior = "smooth",
    inline = "center",
    block = "nearest",
    watchSelected = true,
    scrollOnMount = true,
  } = options;

  // id -> HTMLElement map
  const elementRefs = ref({});

  const scrollToSelected = async () => {
    await nextTick();

    const id = selectedId.value;
    if (!id) return;

    const el = elementRefs.value[id];
    if (!el) return;

    el.scrollIntoView({
      behavior,
      inline,
      block,
    });
  };

  // 🔹 scroll on mount (useful when navigating back)
  if (scrollOnMount) {
    onMounted(() => {
      if (selectedId.value) {
        scrollToSelected();
      }
    });
  }

  // 🔹 scroll whenever selectedId changes
  if (watchSelected) {
    watch(selectedId, () => {
      scrollToSelected();
    });
  }

  return {
    elementRefs,
    scrollToSelected,
  };
}
