import Vue from "vue";
import wrapVueInit, { request, router, store } from "@/assets/lib/configLoad";
import entry from "@@/entry";
import App from "./App.vue";

entry(request.instance, router, store);
wrapVueInit(Vue);

Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
