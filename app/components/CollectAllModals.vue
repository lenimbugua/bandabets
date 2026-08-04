<script setup>
import BookedBetPreviewModal from "@/components/community-bets/BookedBetPreviewModal.vue";
import ShareBetModal from "@/components/community-bets/ShareBetModal.vue";
import { useModalTypes } from "@/composables/useModalTypes";
import { useModalStore } from "@/stores/modal";
import { useBetslipStore } from "@/stores/sports-betslip";
import { storeToRefs } from "pinia";
import BetslipModal from "./BetslipModal.vue";
import CalendarModal from "./CalendarModal.vue";
import CashoutModal from "./cashout/CashoutModal.vue";
import ChangeEventModal from "./ChangeEventModal.vue";
import CustomerSupportModal from "./CustomerSupportModal.vue";
import GeniusGameTrackerModal from "./GeniusGameTrackerModal.vue";
import InsufficientBalanceModal from "./InsufficientBalanceModal.vue";
import LoaderModal from "./LoaderModal.vue";
import LoginModal from "./LoginModal.vue";
import MultibetBoostModal from "./MultibetBoostModal.vue";
import OneCutModal from "./OneCutModal.vue";
import TwoUpModal from "./TwoUpModal.vue";
import InviteFriendModal from "../../src/views/festive/InviteFriendModal.vue";
import SocialconsModal from "@/components/affiliate/SocialconsModal.vue";
// import DepositPop from "./DepositPop.vue";
const { modalType } = storeToRefs(useModalStore());
const { getModalTitle, betslip } = useModalTypes();
const { betslipLength } = storeToRefs(useBetslipStore());
</script>
<template>
  <!-- sport betslip -->
  <BetslipModal class="z-999 max-h-32 max-w-28 h-full bottom-32 absolute">
    <template #title>
      {{ getModalTitle(modalType) }}
      <span v-if="betslipLength > 0" class="inline-flex items-center justify-center min-w-5 h-5 px-1.5 text-[0.65rem] font-bold text-primary-foreground bg-brand-bright rounded-full">{{ betslipLength }}</span>
    </template>
    <div class="max-h-[85vh] flex flex-col">
      <SportsBetslip v-if="modalType === betslip" />
    </div>
  </BetslipModal>
  <!-- End sport betslip -->

  <TheDrawer />
  <BetPlaceStatusDialogue />
  <SearchModal />
  <CalendarModal />
  <LoginModal />
  <CasinoUnauthModal />
  <DepositModal />
  <ChatModal />

  <ShareBetModal />

  <!-- book bet preview modal -->
  <BookedBetPreviewModal
    class="z-50 max-h-32 max-w-28 h-full bottom-32 absolute"
  >
  </BookedBetPreviewModal>
  <!-- End sbook bet preview modal -->

  <!-- Cancel bet modal -->
  <ConfirmModal>
    <CancelBet />
  </ConfirmModal>
  <!-- End Cancel bet modal -->

  <!-- Insufficient balance modal -->
  <InsufficientBalanceModal> </InsufficientBalanceModal>
  <!-- End Insufficient balance modal -->

  <!-- Notification modal -->
  <!-- <NotificationModal>
   <DepositPop/>
  </NotificationModal> -->
  <!-- End Notification modal -->

  <CashoutModal />
  <RoadBlockModal />
  <LoaderModal />
  <SportsIconsModal />
  <ChangeEventModal />
  <SocialconsModal />
  <CustomerSupportModal />
  <GeniusGameTrackerModal />

  <OneCutModal class="z-999 max-h-32 max-w-28 h-full bottom-32 absolute">
  </OneCutModal>
  <!-- <OneCutModal /> -->
  <TwoUpModal
    class="z-999 max-h-32 max-w-28 h-full bottom-32 absolute"
  ></TwoUpModal>

  <MultibetBoostModal
    class="z-999 max-h-32 max-w-28 h-full bottom-32 absolute"
  ></MultibetBoostModal>
  <InviteFriendModal/>
</template>
