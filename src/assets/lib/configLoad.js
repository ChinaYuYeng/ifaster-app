import { asyncImport } from "./importInjectMixin";
import router, { registerRoute } from "@/router";
import { registerModule, getStore } from "@/store";
import request from "@/api/request";
import { registerApi } from "@/api";
import { createNamespacedHelpers } from "vuex";
import { parseFilePath } from "@/assets/util/tool";

// process.env.NODE_ENV !== "production" ? syncImport : asyncImport;
const importComp = asyncImport;
// ‘@/business/views‘ 必须是字符串，无法使用变量
const contexts = require.context("@/business/views", true, /config\.js$/);
contexts.keys().map(item => {
  let currentPath = item.match(/\.\/(?:(.+)\/)?config\.js$/)[1] || "";
  let name = currentPath.split("/").join("-") || "root";
  const { mapGetters, mapActions, mapMutations } = createNamespacedHelpers(currentPath);
  /**
   * config的结构
   * config:{
   *  store:{}, vuex的module
   *  route:{strategy:'',raw:{}}或者route:{}这种默认是raw的值,
   *  apis:{root:{},scope:{}} 或者 apis:{}, 这种默认是scope,
   *  mixin:{}需要注入到*.vue中的minxin
   *  compPath:string 需要加载的组件地址(支持相对地址),默认是./page.vue
   *
   * }
   */
  const config = contexts(item).default(request, {
    mapGetters,
    mapActions,
    mapMutations
  });

  const apis = {
    root: config?.apis?.root,
    scope: config?.apis?.scope || config?.apis?.root ? {} : config?.apis || {}
  };
  registerApi(apis.root);

  const store = config?.store || {};
  registerModule(currentPath, store);

  const route = {
    strategy: config?.route?.strategy || "merge",
    raw: config?.route?.raw || config?.route || {}
  };

  const raw = route.raw;
  const strategy = route.strategy;
  const getAlias = Object.keys(store?.getters || {}).map(key => ({
    [key]: key
  }));
  const actionAlias = Object.keys(store?.actions || {})
    .filter(key => typeof store.actions[key] === "function") //过滤掉注册到root的action,注册到root的action是一个{}
    .map(key => ({
      [key]: key
    }));
  const mutationsAlias = Object.keys(store?.mutations || {}).map(key => ({
    [key]: key
  }));
  currentPath = "/" + currentPath;
  switch (strategy) {
    case "replace":
      registerRoute(currentPath, raw);
      break;
    case "merge":
      registerRoute(currentPath, {
        path: currentPath,
        component: importComp(parseFilePath((currentPath == "/" ? "" : currentPath) + "/" + (config.compPath ? config.compPath : "page.vue")), {
          name: name,
          beforeCreate() {
            Object.defineProperty(this, "$api", {
              value: Object.assign(Object.create(this.$api), apis.scope)
            });
          },
          // concat({})是为了没数据的时候防止assign报错
          computed: {
            ...mapGetters(Object.assign.apply({}, getAlias.concat({})))
          },
          methods: {
            ...mapActions(Object.assign.apply({}, actionAlias.concat({}))),
            ...mapMutations(Object.assign.apply({}, mutationsAlias.concat({})))
          },
          mixins: [config.mixin || {}]
        }),
        ...raw
      });
  }
});

const store = getStore();
export { request, router, store };
// 这个方法配合上面的加载组件过程中主动注入mixins的逻辑
export default function(Vue) {
  const oldInit = Vue.prototype._init;
  process.env.NODE_ENV !== "production" &&
    (Vue.prototype._init = function(options) {
      // 在开发环境下解决vue-loader热加载动态注入mixin丢失的问题
      if (options._isComponent) {
        const Ctor = this.constructor;
        if (!Ctor.options.__file) {
          // 这里mixin注入的位置和import首次加载的位置保持一致
          (Ctor.extendOptions.mixins || (Ctor.extendOptions.mixins = [])).push(
            options._parentVnode.componentOptions.Ctor.extendOptions.reserveMixin || {}
          );
          Ctor.options = Vue.util.mergeOptions(Ctor.superOptions, Ctor.extendOptions, this);
        }
      }
      oldInit.call(this, options);
    });
}
