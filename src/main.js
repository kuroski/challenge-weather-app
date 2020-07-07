import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import "./plugins";
import store from "./store";
import { provideI18n } from "@/hooks/i18n";
import messages from "@/i18n/messages";
import "vue-material-design-icons/styles.css";
import "@/assets/index.css";

Vue.config.productionTip = false;

new Vue({
  store,
  setup() {
    provideI18n({
      locale: "en",
      messages
    });
  },
  render: h => h(App)
}).$mount("#app");
