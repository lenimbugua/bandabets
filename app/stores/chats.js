import { defineStore } from "pinia";

export const useChatsStore = defineStore("chats-store", {
  state: () => ({
    displayChat: false,
  }),

  actions: {
    setDisplayChat(displayChat) {
      console.log("displayChat", displayChat);
      this.displayChat = displayChat;
    },
  },
  persist: true,
});
