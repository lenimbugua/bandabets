export default defineNuxtPlugin(() => {
  const { initPropellerAds } = usePropellarAds();
  initPropellerAds();
});
