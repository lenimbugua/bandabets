import { createHead } from "@unhead/vue/client";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import { createApp } from "vue";

import App from "./App.vue";
import router from "./router";
import "./style.css";

import { VueDatePicker } from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

import mixpanelPlugin from "./plugins/mixpanel";

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

const app = createApp(App);
app.component("VueDatePicker", VueDatePicker);

app
  .use(createHead())
  .use(pinia)
  .use(router)
  .use(mixpanelPlugin)
  .mount("#app");
