import { defineStore } from "pinia";
import API from "../services/API";
import { useLoginStore } from "./login";
import { authBaseURL } from "../services/API";
import { useProfileStore } from "@/stores/profile";
import { storeToRefs } from "pinia";
import { useToast } from "@/composables/useToast";
import { useAuthStatus } from "@/composables/useAuthStatus";
import { MIN_WITHDRAWAL } from "../composables/useDefinedConstants";
const { fireToast, successColor, successIcon, errorColor, errorIcon } =
  useToast();
const { apiSuccessCode } = useAuthStatus();

export const useWithdrawStore = defineStore("withdraw-store", {
  state: () => ({
    pending: false,
    responseOK: false,
    amount: MIN_WITHDRAWAL,
  }),

  actions: {
    async withdraw() {
      const { token, msisdn, profileSid } = storeToRefs(useLoginStore());

      const body = {
        msisdn: msisdn.value,
        amount: this.amount,
      };

      try {
        this.pending = true;
        this.responseOK = false;
        const response = await API(authBaseURL).post(
          "/auth/api/v1/b2c/withdraw",
          body,
          {
            headers: {
              Authorization: `Bearer ${token.value}`,
              "X-PROFILE-SID": profileSid.value,
            },
          }
        );

        this.pending = false;
        if (response.data.statusCode == apiSuccessCode) {
          this.responseOK = true;
          fireToast(successColor, successIcon, response.data.statusMessage);
          const { getProfileInfo } = useProfileStore();
          getProfileInfo();
          return;
        } else {
          fireToast(errorColor, errorIcon, response.data.statusMessage);
        }
      } catch (err) {
        this.pending = false;
        this.responseOK = false;
        if (err.status == 401) {
          const { openLoginModal } = useLoginStore();
          openLoginModal(this.makeDeposit);
          return;
        }
        fireToast(errorColor, errorIcon, "Something went wrong");
      }
    },
    setAmount(payload) {
      this.amount = payload;
    },
  },
});
