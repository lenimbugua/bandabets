import { useUtmStore } from "@/stores/utm";

export default defineNuxtRouteMiddleware((to) => {
  const { getUtm, getBtag, getReferralCode } = useUtmStore();
  getUtm(to);
  getBtag(to);
  getReferralCode(to);
});
