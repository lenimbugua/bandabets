export function useMixpanel() {
  const { $mixpanel } = useNuxtApp();
  return $mixpanel;
}
