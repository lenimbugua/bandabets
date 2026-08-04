import { defineStore, storeToRefs } from "pinia";
import API, { kironLiteBaseURL } from "../services/API";
import { useCasinoStore } from "./casino";
import { useLoginStore } from "./login";

import { useScreenSizes } from "../composables/useScreenSizes";

export const useKironStore = defineStore("kiron-store", {
  state: () => ({
    pending: false,
    responseOK: false,
    launchUrl: null,
    turboLaunchUrl: null,
    jackpotLaunchUrl: null,
  }),

  actions: {
    async getLaunchDetail(gameId) {
      const { isMediumScreen, isLargeScreen } = useScreenSizes();

      const isMobile = isMediumScreen.value || isLargeScreen.value ? "0" : "1";

      const { profileSid, token } = storeToRefs(useLoginStore());

      const profileId = profileSid.value ? profileSid.value : "";

      const { isDemo } = storeToRefs(useCasinoStore());

      const demo = isDemo.value;

      const headers = {};
      if (token.value) {
        headers.Authorization = `Bearer ${token.value}`;
      }
      if (profileSid.value) {
        headers["X-PROFILE-SID"] = profileSid.value;
      }

      try {
        this.pending = true;

        this.responseOK = false;
        const response = await API(kironLiteBaseURL).get(
          `/v1/lite/virtuals/auth?profileSid=${profileId}&isMobile=${isMobile}&isDemo=${demo}&gameId=${gameId}`,
          { headers }
        );
        this.launchUrl = response.data.launchUrl;
        this.pending = false;
        this.responseOK = true;
      } catch (error) {
        this.pending = false;
      }
    },
  },
});
