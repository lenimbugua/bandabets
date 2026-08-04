import { defineStore, storeToRefs } from "pinia";
import API, { betBaseURL } from "../services/API";

import { useToast } from "@/composables/useToast";
import { useLoginStore } from "./login";

const { fireErrorToast, fireSuccessToast, positionTopRight } = useToast();

export const useFeedbackStore = defineStore("feedback-store", {
  state: () => ({
    error: null,
    pending: false,
    games: [],
  }),

  actions: {
    async sendFeedback(body) {
      try {
        this.pending = true;
        const { token, profileSid } = storeToRefs(useLoginStore());

        body.profileSid = profileSid.value;

        this.error = null;
        this.responseOK = false;
        const response = await API(betBaseURL).post(`/api/comments`, body, {
          headers: {
            Authorization: `Bearer ${token.value}`,
            "X-PROFILE-SID": profileSid.value,
          },
        });

        if (response.data.status === "success") {
          fireSuccessToast(response.data.message, positionTopRight);
          return;
        }
        this.pending = false;
        this.responseOK = true;
      } catch (err) {
        this.responseOK = false;
        if (err.response.status === 400) {
          fireErrorToast(err.response.data.message, positionTopRight);
          return;
        }
        fireErrorToast("Something went wrong", positionTopRight);
        this.error = err.response.data.statusMessage;
        this.pending = false;
      } finally {
        this.pending = false;
      }
    },
  },
  persist: false,
});
