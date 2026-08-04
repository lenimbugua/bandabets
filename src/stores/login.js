import { useAuthStatus } from "@/composables/useAuthStatus";
import { useMixpanelTractActivity } from "@/composables/useMixpanelTrackActivity";
import { useModalTypes } from "@/composables/useModalTypes";
import { useThemeSwitch } from "@/composables/useThemeSwitch";
import { useToast } from "@/composables/useToast";
import { defineStore, storeToRefs } from "pinia";
import API, { authBaseURL } from "../services/API";
import { useModalStore } from "../stores/modal";
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
  apiProfileChangePassword,
} = useAuthStatus();

export const useLoginStore = defineStore("login-store", {
  state: () => ({
    error: null,
    pending: false,
    responseOK: false,
    msisdn: null,
    token: null,
    profileSid: null,
    afterLoginAction: null,
  }),

  getters: {
    isAuthenticated: (state) => {
      if (state.token) {
        return true;
      } else {
        return false;
      }
    },
  },

  actions: {
    async createAccount(body) {
      try {
        this.pending = true;

        this.error = null;
        this.responseOK = false;
        await API(authBaseURL).post("/auth/api/v1/generate/token", body);
        this.pending = false;
        this.responseOK = true;
      } catch (err) {
        this.responseOK = false;
        this.error = err.response.data.statusMessage;
        this.pending = false;
      }
    },

    async login(body, router) {
      //basic auth
      const { extra } = storeToRefs(useUtmStore());
      try {
        this.pending = true;
        this.error = null;
        this.responseOK = false;
        const response = await API(authBaseURL).post(
          "/auth/api/v1/generate/token",
          {
            extra: extra.value,
          },
          {
            auth: body,
          }
        );
        if (response.data.statusCode == apiSuccessCode) {
          const token = response?.data?.extra?.accessToken;
          const profileSid = response?.data?.extra?.profileUid;
          const msisdn = response?.data?.extra?.userName;
          this.setToken(token, profileSid, msisdn);
          this.responseOK = true;
          fireToast(successColor, successIcon, response.data.statusMessage);

          const { toggleToUserSavedTheme } = useThemeSwitch();
          toggleToUserSavedTheme(response?.data?.extra?.theme);
          this.trackLoginMixpanel(msisdn, profileSid);
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
        if (response.data.statusCode === apiProfileChangePassword) {
          this.error = response.data.statusMessage;
          fireToast(errorColor, errorIcon, this.error);
          router.push({ name: "change-password" });
          return;
        }
      } catch (err) {
        this.responseOK = false;
        if (err?.response?.data?.statusCode === apiProfileChangePassword) {
          this.error = err?.response?.data?.statusMessage;
          fireToast(errorColor, errorIcon, this.error);
          router.push({ name: "change-password" });
          return;
        }
        this.error =
          err?.response?.data?.statusMessage || "Login failed. Please try again";
      } finally {
        this.pending = false;
      }
    },
    async themeSwitch(theme) {
      //basic auth
      try {
        this.pending = true;

        this.error = null;
        this.responseOK = false;
        await API(authBaseURL).post(
          "/auth/api/v1/my/theme",
          {
            profileTheme: theme,
          },
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
              "X-PROFILE-SID": this.profileSid,
            },
          }
        );

        this.pending = false;
      } catch (err) {
        this.responseOK = false;
        this.pending = false;
        console.log(err);
        this.error = err?.response?.data?.statusMessage;
      }
    },

    resetError() {
      this.error = null;
    },

    logout() {
      this.token = null;
      this.profileSid = null;
    },

    setToken(token, profileSid, msisdn) {
      this.token = token;
      this.profileSid = profileSid;
      this.msisdn = msisdn;
    },
    setAfterLoginAction(action) {
      if (!action) {
        return;
      }
      this.afterLoginAction = action;
    },

    openLoginModal(afterLoginAction, shouldOpenModal = true) {
      this.logout();
      if (!shouldOpenModal) {
        return;
      }
      const { openModal } = useModalStore();
      this.setAfterLoginAction(afterLoginAction);
      const { login } = useModalTypes();
      openModal(login);
    },
    trackLoginMixpanel(msisdn, profileSid) {
      const { trackLogin } = useMixpanelTractActivity();
      const user = {
        profileSid,
        msisdn,
      };
      trackLogin(user);
    },
  },

  persist: {
    pick: ["token", "profileSid", "msisdn"],
  },
});
