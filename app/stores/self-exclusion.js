import { useToast } from "@/composables/useToast";
import { defineStore, storeToRefs } from "pinia";
import API from "../services/API";
import { useLoginStore } from "./login";

import { authBaseURL } from "../services/API";

const { fireErrorToast, fireSuccessToast, positionTopRight } = useToast();

export const useSelfExclusionStore = defineStore("self-exclusion-store", {
  state: () => ({
    pending: false,
    responseOK: false,
  }),

  actions: {
    async excludeFromBetting(body) {
      this.pending = true;

      try {
        const { token, profileSid } = storeToRefs(useLoginStore());
        const { logout } = useLoginStore();

        await API(authBaseURL).post(`/auth/api/v1/opt/out`, body, {
          headers: {
            Authorization: `Bearer ${token.value}`,
            "X-PROFILE-SID": profileSid.value,
          },
        });

        this.responseOK = true;
        this.pending = false;

        logout();

        fireSuccessToast(
          "You have been excluded from betting",
          positionTopRight
        );
      } catch (err) {
        fireErrorToast(
          "Something went wrong, please try again",
          positionTopRight
        );

        this.pending = false;

        this.responseOK = false;
        console.log(err);
      }
    },
  },
  persist: false,
});
