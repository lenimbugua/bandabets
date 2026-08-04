import { useGoogleDataLayers } from "@/composables/useGoogleDataLayers";
import { useModalTypes } from "@/composables/useModalTypes";
import { usePoll } from "@/composables/usePoll";
import { usePropellarAds } from "@/composables/usePropellarAds";
import { useToast } from "@/composables/useToast";
import { useProfileStore } from "@/stores/profile";
import API, { authBaseURL } from "../services/API";
import { useModalStore } from "../stores/modal";
import { useLoginStore } from "./login";
import { useUtmStore } from "./utm";

// Factory, not a module-scope literal: state() calls this on every store
// instantiation so each store instance (and, on the server, each concurrent
// request) gets its own array rather than a shared reference that a
// mutation from one user's session could leak into every other request.
function createDepositAmounts() {
  return [
    { amount: 49, bonus: 5 },
    { amount: 100, bonus: 10 },
    { amount: 200, bonus: 15 },
    { amount: 300, bonus: 20 },
    { amount: 400, bonus: 25 },
    { amount: 500, bonus: 30 },
    { amount: 1000, bonus: 50 },
    { amount: 2000, bonus: 50 },
  ];
}

export const useDepositStore = defineStore("deposit-store", {
  state: () => {
    const depositAmounts = createDepositAmounts();
    return {
      depositAmounts,
      pending: false,
      responseOK: false,
      deposit: depositAmounts[2].amount,
      statusMessage: null,
    };
  },

  actions: {
    async makeDeposit() {
      const { token, msisdn, profileSid } = storeToRefs(useLoginStore());
      const { extra } = storeToRefs(useUtmStore());
      const { getProfileInfo } = useProfileStore();

      const body = {
        msisdn: msisdn.value,
        amount: this.deposit,
        extra: extra.value,
      };

      try {
        this.pending = true;
        this.responseOK = false;
        console.log("true");
        const response = await API(authBaseURL).post(
          "/auth/api/v1/stk/push",
          body,
          {
            headers: {
              Authorization: `Bearer ${token.value}`,
              "X-PROFILE-SID": profileSid.value,
            },
          }
        );

        if (response.data.statusCode === "01") {
          this.statusMessage = response.data.statusMessage;
          this.pending = false;
          this.responseOK = false;
          console.log("false");
          return;
        }
        this.responseOK = true;
        console.log(this.responseOK);

        this.statusMessage = response?.data?.statusMessage;
        await getProfileInfo();
        this.pending = false;
        console.log(this.statusMessage);
        console.log(this.responseOK);
      } catch (err) {
        console.log(err);
        this.pending = false;
        this.responseOK = false;
        console.log("false");
        if (err.status == 401) {
          const { openLoginModal } = useLoginStore();
          openLoginModal(this.makeDeposit);
          return;
        }

        this.statusMessage = err?.response?.data?.statusMessage;
        this.error = err?.response?.data?.statusMessage;
      }
    },
    async jisort(mpesaCode) {
      const { token, profileSid } = storeToRefs(useLoginStore());

      const body = {
        mpesaCode,
      };

      try {
        this.pending = true;
        this.responseOK = false;
        const response = await API(authBaseURL).post(
          "/auth/api/v1/validate/txn",
          body,
          {
            headers: {
              Authorization: `Bearer ${token.value}`,
              "X-PROFILE-SID": profileSid.value,
            },
          }
        );
        if (response.data.statusCode === "01") {
          this.statusMessage = response.data.statusMessage;
          this.pending = false;
          this.responseOK = false;
          return;
        }
        this.responseOK = true;

        this.statusMessage = response.data.statusMessage;
        const { getProfileInfo } = useProfileStore();
        await getProfileInfo();
        this.pending = false;
      } catch (err) {
        this.pending = false;
        this.responseOK = false;
        if (err.status == 401) {
          const { openLoginModal } = useLoginStore();
          openLoginModal(this.jisort(mpesaCode));
          return;
        }

        this.statusMessage = err.response.data.statusMessage;
        this.error = err.response.data.statusMessage;
      }
    },

    depositAttemptDataLayer() {
      const { pushDataLayerToGoogle } = useGoogleDataLayers();
      pushDataLayerToGoogle({
        event: "deposit_attempt",
        deposit: this.deposit,
      });
    },

    async performDeposit(router) {
      const { Toast } = useToast();
      const {
        getProfileInfo,
        pushToDatalayerIfDeposit,
        setBalanceBeforeDeposit,
      } = useProfileStore();
      this.depositAttemptDataLayer();
      setBalanceBeforeDeposit(this.deposit);
      await this.paymentBridge();
      if (this.responseOK) {
        const { trackPropellerDeposit } = usePropellarAds();
        const { startPolling } = usePoll();
        const { closeModal } = useModalStore();

        trackPropellerDeposit(this.deposit);
        startPolling(getProfileInfo, pushToDatalayerIfDeposit);
        closeModal();
        (async () => {
          await Toast("green").fire({
            icon: "success",
            title: this.statusMessage,
          });
        })();

        if (router.currentRoute.value.name === "deposit") {
          if (this.responseOK) {
            router.push({ name: "home" });
          }
        }
      } else {
        console.log(this.responseOK);
        // closeModal();
        (async () => {
          await Toast("red").fire({
            icon: "warning",
            title: this.statusMessage,
          });
        })();
      }
    },

    async paymentBridge() {
      const { utm } = storeToRefs(useUtmStore());

      if (!utm.value) {
        await this.makeDeposit();
        return;
      }

      console.log(utm.value);

      const safaricom = "SAFARICOM";

      const { utmSource } = utm.value;

      //sample link
      //https://hakibets.com/?utm_source=SAFARICOM&utm_medium=SAFARICOM&utm_campaign=SAFARICOM&utm_id=SAFARICOM&utm_term=SAFARICOM&utm_content=SAFARICOM

      if (utmSource === safaricom) {
        if (window.AlipayJSBridge) {
          await this.makePayBillPayment();
          console.log("AlipayJSBridge");
          return;
        } else {
          await this.makeDeposit();
          return;
        }
      }
      await this.makeDeposit();
      return;
    },

    async makePayBillPayment() {
      const { msisdn } = storeToRefs(useLoginStore());
      const { startPolling } = usePoll();
      const { getProfileInfo, pushToDatalayerIfDeposit } = useProfileStore();
      const { public: config } = useRuntimeConfig();
      // AlipayJSBridge
      try {
        window.AlipayJSBridge.call(
          "payBill",
          {
            businessID: config.paybillNo, //paybill number
            billReference: `${msisdn.value}`,
            amount: `${this.deposit}`,
            currency: "KES", // currencyCode to be used - only KES supported for now
            reason: "deposit", // optional field
          },
          (res) => {
            // payment success add logic after success
            console.log("success", res);
            startPolling(getProfileInfo, pushToDatalayerIfDeposit);
            const { fireSuccessToast } = useToast();
            if (res.transactionId) {
              fireSuccessToast(`Deposit successful ${res.transactionId || ""}`);
            }
            // fireSuccessToast("Deposit successful");
            // alert(`paybill, ${JSON.stringify(res)}`);
          },
          (res) => {
            // payment failed add logic after failure
            alert(res);
            console.log(("errror", res));
            window.AlipayJSBridge.call(
              "alert",
              { title: "Fail", content: JSON.stringify(res) },
              () => {},
              () => {}
            );
          }
        );
      } catch (error) {
        console.log("error", error);
        alert(error);
      }
    },

    // async makePayBillPayment() {
    //   try {
    //     window.AlipayJSBridge.call(
    //       "payBill",
    //       {
    //         businessID: "4999908", // Paybill number
    //         billReference: this.msisdn,
    //         amount: this.deposit,
    //         currency: "KES",
    //         reason: "Hakibets Ali Payment",
    //       },
    //       (res) => {
    //         console.log("PayBill success:", res);
    //         alert(`PayBill Success: ${JSON.stringify(res)}`);
    //         // this.makeDeposit();

    //         return;
    //       },
    //       async (res) => {
    //         console.error("PayBill failed:", res);
    //         await this.makeDeposit();
    //         window.AlipayJSBridge.call(
    //           "alert",
    //           { title: "Payment Failed", content: JSON.stringify(res) },
    //           () => {},
    //           () => {}
    //         );
    //         return;
    //       }
    //     );
    //   } catch (error) {
    //     console.error("PayBill error:", error);
    //     await this.makeDeposit();

    //      alert(error);
    //   }
    // },

    login() {
      const { openModal } = useModalStore();
      const { login } = useModalTypes();
      openModal(login);
    },
    setDeposit(payload) {
      this.deposit = payload;
    },
    resetDeposit() {
      this.deposit = this.depositAmounts[2].amount;
    },
  },
});
