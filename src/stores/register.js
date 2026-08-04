import { useAuthStatus } from "@/composables/useAuthStatus";
import { useToast } from "@/composables/useToast";
import { useFreebetStore } from "@/stores/freebet";
import { defineStore, storeToRefs } from "pinia";
import API, { authBaseURL } from "../services/API";
import { useLoginStore } from "./login";
import { useUtmStore } from "./utm";

const { fireToast, errorColor, successColor, successIcon, errorIcon } =
  useToast();
const {
  apiSuccessCode,
  apiProfileExist,
  apiLockedCode,
  apiProfileNotFound,
  apiProfileInActive,
  apiErrorCode,
} = useAuthStatus();

const defaultCountDown = 30;

export const useRegisterStore = defineStore("register-store", {
  state: () => ({
    error: null,
    pending: false,
    otpPending: false,
    responseOK: false,
    msisdn: null,
    otp: null,
    resendOTP: true,
    countdownSeconds: defaultCountDown,
    password: "",
    confirmPassword: "",
  }),

  getters: {
    passwordMatch(state) {
      return state.password === state.confirmPassword;
    },
    showPasswordDoNotMatch(state) {
      if (!state.password || !state.confirmPassword) {
        return false;
      }
      return !this.passwordMatch;
    },
  },

  actions: {
    async createAccount(body, router) {
      try {
        this.pending = true;

        this.error = null;
        this.responseOK = false;
        this.msisdn = body.msisdn;

        const { extra, bTag, referralCode } = storeToRefs(useUtmStore());

        const { freeBetPayload } = storeToRefs(useFreebetStore());

        body = {
          ...body,
          freeBet: freeBetPayload.value,
          extra: extra.value,
          referralCode: referralCode.value,
          bTag: bTag.value,
        };

        const response = await API(authBaseURL).post(
          "/auth/api/v1/create/profile",
          body
        );

        this.pending = false;

        if (response.data.statusCode == apiSuccessCode) {
          this.responseOK = true;
          this.error = response.data.statusMessage;
          fireToast(successColor, successIcon, response.data.statusMessage);
          router.push({ name: "verify-account" });
          this.msisdn = body.msisdn;
          return;
        }

        if (response.data.statusCode === apiErrorCode) {
          this.error = response.data.statusMessage;
          fireToast(errorColor, errorIcon, this.error);
          return;
        }

        if (response.data.statusCode === apiProfileExist) {
          this.error = response.data.statusMessage;
          fireToast(successColor, successIcon, this.error);
          router.push({ name: "login" });
          return;
        }

        if (response.data.statusCode === apiLockedCode) {
          this.error = response.data.statusMessage;
          fireToast(errorColor, errorIcon, this.error);
          return;
        }

        if (response.data.statusCode === apiProfileNotFound) {
          this.error = response.data.statusMessage;
          fireToast(errorColor, errorIcon, this.error);
          return;
        }
        if (response.data.statusCode === apiProfileInActive) {
          this.error = response.data.statusMessage;
          fireToast(errorColor, errorIcon, this.error);
          router.push({ name: "verify-account" });
          return;
        }
      } catch (err) {
        this.responseOK = false;
        this.pending = false;
        if (err.response.data.statusCode === apiErrorCode) {
          this.error = err.response.data.statusMessage;
          fireToast(errorColor, errorIcon, this.error);
          return;
        }
        this.error = err.response.data.statusMessage;
      }
    },

    async activateProfile(body) {
      const { bTag, referralCode } = storeToRefs(useUtmStore());

      try {
        this.pending = true;

        this.error = null;
        this.responseOK = false;

        body = {
          msisdn: this.msisdn,
          ...body,
          referralCode: referralCode.value,
          bTag: bTag.value,
        };

        const response = await API(authBaseURL).post(
          "/auth/api/v1/activate/profile",
          body
        );

        if (response.data.statusCode === "01") {
          this.error = response.data.statusMessage;
          this.pending = false;
          return;
        }

        const { setToken } = useLoginStore();

        const token = response?.data?.extra?.accessToken;
        const profileUid = response.data.extra.profileUid;
        const userName = response.data.extra.userName;
        this.pending = false;
        this.responseOK = true;

        if (token) {
          setToken(token, profileUid, userName);
        }
      } catch (err) {
        this.responseOK = false;
        this.pending = false;
        console.log(err);
        this.error = err.response.data.statusMessage;
      }
    },

    async resendOtp(body) {
      try {
        this.otpPending = true;
        this.error = null;
        this.responseOK = false;

        const response = await API(authBaseURL).post(
          "/auth/api/v1/reset/otp",
          body
        );

        if (response.data.statusCode !== "00") {
          this.error = response.data.statusMessage;
          this.otpPending = false;
          this.responseOK = false;
          return;
        }

        this.otpPending = false;
        this.responseOK = true;
      } catch (err) {
        this.otpPending = false;
        this.responseOK = false;
        console.log(err);
        this.error = err.response.data.statusMessage;
      }
    },

    async forgotPassword(body) {
      try {
        this.pending = true;

        this.error = null;
        this.responseOK = false;

        const response = await API(authBaseURL).post(
          "/auth/api/v1/reset/password/init",
          body
        );

        if (response.data.statusCode !== "00") {
          this.error = response.data.statusMessage;
          this.otpPending = false;
          this.pending = false;
          this.responseOK = false;
          return;
        }

        this.msisdn = body.msisdn;

        this.pending = false;
        this.responseOK = true;
      } catch (err) {
        this.pending = false;
        this.responseOK = false;
        console.log(err);
        this.error = err.response.data.statusMessage;
      }
    },

    async resetPassword(body) {
      try {
        this.pending = true;

        this.error = null;
        this.responseOK = false;
        const response = await API(authBaseURL).post(
          "/auth/api/v1/reset/password",
          body
        );

        if (response.data.statusCode !== "00") {
          this.error = response.data.statusMessage;
          this.pending = false;
          this.responseOK = false;
          return;
        }

        this.pending = false;
        this.responseOK = true;
      } catch (err) {
        this.pending = false;
        this.responseOK = false;
        console.log(err);
        this.error = err.response.data.statusMessage;
      }
    },

    resetError() {
      this.error = null;
    },

    decreaseCount() {
      if (this.countdownSeconds <= 1) {
        this.resendOTP = true;
        return;
      }
      this.countdownSeconds--;
    },

    resetCount() {
      this.resendOTP = false;
      this.countdownSeconds = defaultCountDown;
    },

    updateMsisdn(msisdn) {
      this.msisdn = msisdn.replace(/\D/g, "");
    },
    formatPhoneNumber(phoneNumber) {
      if (phoneNumber.startsWith("+")) {
        return phoneNumber.slice(1);
      }
      return phoneNumber;
    },
    updateOtp(otp) {
      this.otp = otp;
    },

    updatePassword(password) {
      this.password = password;
    },
    updateConfirmPassword(confirmPassword) {
      this.confirmPassword = confirmPassword;
    },
  },
  persist: {
    pick: ["msisdn"],
  },
});
