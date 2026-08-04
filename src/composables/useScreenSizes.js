import { useMediaQuery } from "@vueuse/core";
// const isSmallScreen = useMediaQuery("(min-width: 100px)");
// const isMediumScreen = useMediaQuery("(min-width: 1280px)");
// const isLargeScreen = useMediaQuery("(min-width: 1400px)");
const isSmallScreen = useMediaQuery("(min-width: 100px)"); // Phones and above
const isMediumScreen = useMediaQuery("(min-width: 768px)"); // Tablets and above
const isLargeScreen = useMediaQuery("(min-width: 1024px)"); // Desktops and above
const isPreferredDark = useMediaQuery("(prefers-color-scheme: dark)");
export function useScreenSizes() {
  return {
    isSmallScreen,
    isMediumScreen,
    isLargeScreen,
    isPreferredDark,
  };
}
