import Vue from "vue";
import { router, store } from "@/assets/lib/configLoad";
import App from "./App.vue";

const oldInit = Vue.prototype._init;

process.env.NODE_ENV !== "production" &&
  (Vue.prototype._init = function(options) {
    // 解决热加载动态注入mixin丢失的问题
    if (options._isComponent) {
      const Ctor = this.constructor;
      if (!Ctor.options.__file) {
        Ctor.options = Vue.util.mergeOptions(
          Ctor.options,
          options._parentVnode.componentOptions.Ctor.extendOptions
            .reserveMixin || {},
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
