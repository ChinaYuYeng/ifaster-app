import Vue from "vue";
import "@/assets/lib/configLoad";
import App from "./App.vue";
import router, { loadRouters } from "./router";
import { getStore } from "./store";

Vue.config.productionTip = false;
const store = getStore();
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

loadRouters([
  {
    url: "system/user"
    // submenu: [
    //   {
    //     url: "system/user/dialogs/add"
    //   }
    // ]
  },
  {
    url: "system/menu"
  }
]);
