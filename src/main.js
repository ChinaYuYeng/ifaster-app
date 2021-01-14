import Vue from "vue";
import { router, store } from "@/assets/lib/configLoad";
import App from "./App.vue";

const oldInit = Vue.prototype._init;

process.env.NODE_ENV !== "production" &&
  (Vue.prototype._init = function(options) {
    if (options._isComponent) {
      const Ctor = this.constructor;
      if (!Ctor.options.__file) {
        (Ctor.extendOptions.mixins || (Ctor.extendOptions.mixins = [])).push(
          options._parentVnode.componentOptions.Ctor.extendOptions
            .reserveMixin || {}
        );
        Ctor.options = Vue.util.mergeOptions(
          Ctor.superOptions,
          Ctor.extendOptions,
          this
        );
      }
    }
    oldInit.call(this, options);
  });

Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
