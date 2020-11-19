import Vue from "vue";
import { router, store } from "@/assets/lib/configLoad";
import App from "./App.vue";

Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
