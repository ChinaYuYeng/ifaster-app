import Vue from "vue";
import { router, store } from "@/assets/lib/configLoad";
import App from "./App.vue";

const oldInit = Vue.prototype._init;

process.env.NODE_ENV !== "production" &&
  (Vue.prototype._init = function(options) {
    // 解决vue-loader热加载动态注入mixin丢失的问题
    if (options._isComponent) {
      const Ctor = this.constructor;
      if (!Ctor.options.__file) {
        // 这里mixin注入的位置和import首次加载的位置保持一致
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
