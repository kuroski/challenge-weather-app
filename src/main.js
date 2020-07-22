import Vue from "vue";
import { makeServer } from "./server";
import App from "./App.vue";
import "./registerServiceWorker";
import "./plugins";
import store from "./store";
import { provideI18n } from "@/hooks/useI18n";
import messages from "@/i18n/messages";
import dateTimeFormats from "@/i18n/dateTimeFormats";
import "@/assets/index.css";

Vue.config.productionTip = false;

// TODO: Enable mirage only for dev when solve the CORS meta weather API issue
// if (process.env.NODE_ENV === "development") {
makeServer();
//}

new Vue({
  store,
  setup() {
    provideI18n({
      locale: "en-US",
      fallbackLocale: "en-US",
      messages,
      dateTimeFormats
    });
  },
  render: h => h(App)
}).$mount("#app");
