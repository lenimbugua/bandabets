import { useDark, useToggle } from "@vueuse/core";
import { useLoginStore } from "@/stores/login";
import { storeToRefs } from "pinia";

export function useThemeSwitch() {
  const { isAuthenticated } = storeToRefs(useLoginStore());
  const { themeSwitch } = useLoginStore();

  const isDark = useDark({
    selector: "body",
    attribute: "data-theme",
    valueDark: "dark",
    valueLight: "light",
  });
  const toggleDark = useToggle(isDark);

  function toggleToUserSavedTheme(userTheme) {
    toggleDark();
    if (parseInt(userTheme) === 0 && !isDark.value) {
      toggleDark();
    } else if (parseInt(userTheme) === 1 && isDark.value) {
      toggleDark();
    }
  }

  function changeTheme() {
    toggleDark();
    if (isAuthenticated.value) {
      let theme = isDark.value ? 0 : 1;
      themeSwitch(theme);
    }
  }

  function switchToDark() {
    if (!isDark.value) {
      toggleDark();
    }
  }

  return {
    isDark,
    changeTheme,
    switchToDark,
    toggleToUserSavedTheme,
  };
}
