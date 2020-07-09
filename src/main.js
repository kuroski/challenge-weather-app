import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import "./plugins";
import store from "./store";
import { provideI18n } from "@/hooks/i18n";
import messages from "@/i18n/messages";
import dateTimeFormats from "@/i18n/dateTimeFormats";
import "@/assets/index.css";

Vue.config.productionTip = false;

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
