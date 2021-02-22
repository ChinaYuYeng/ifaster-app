import { asyncImport } from "./importInjectMixin";
import router, { registerRoute } from "@/router";
import { registerModule, getStore } from "@/store";
import request from "@/api/request";
import { registerApi } from "@/api";
import { createNamespacedHelpers } from "vuex";
import { parseFilePath } from "./tool";

function traverse(route, cb, path = []) {
  if (route) {
    if (!route.path) throw new Error("children route need path,please set something");
    path.push(route.path);
    cb(route, path.join("/"));
    if (route.children) {
      route.children.forEach(subRoute => traverse(subRoute, cb, [...path]));
    }
  }
}

// process.env.NODE_ENV !== "production" ? syncImport : asyncImport;
const importComp = asyncImport;
// ‘@/business/views‘ 必须是字符串，无法使用变量
const contexts = require.context("@/business/views", true, /config\.js$/);
contexts.keys().map(item => {
  let currentPath = item.match(/\.\/(?:(.+)\/)?config\.js$/)[1] || "";
  const { mapGetters, mapActions, mapMutations } = createNamespacedHelpers(currentPath);
  /**
   * config的结构
   * config:{
   *  store:{}, vuex的module
   *  routes:{path,component} 支持vue-router可以配置的全部属性，component是必须的可以是路径，或者组件
   *          component可以是组件，也可以是需要加载的组件地址(只支持相对地址),默认是./page.vue
   *          path 是路由地址
   *  apis:{root:{},scope:{}} 或者 apis:{}, 这种默认是scope,
   *
   * }
   */
  const config =
    (contexts(item).default &&
      contexts(item).default(request, {
        mapGetters,
        mapActions,
        mapMutations
      })) ||
    {};

  const apis = {
    root: config?.apis?.root,
    scope: config?.apis?.scope || (config?.apis?.root ? {} : config?.apis || {})
  };
  registerApi(apis.root);

  const store = config?.store || {};
  registerModule(currentPath, store);

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
  // 设置默认path
  traverse({ path: currentPath, ...(config.routes || {}) }, (route, fullPath) => {
    route.name = fullPath;
    route.component =
      Object.prototype.toString.call(route.component) === "[object Function]"
        ? route.component()
        : importComp(parseFilePath((currentPath == "/" ? "" : currentPath) + "/" + (route.component || "page.vue")), {
            fullPath,
            name:
              fullPath
                .split("/")
                .filter(v => v)
                .join("-") || "root",
            beforeCreate() {
              Object.defineProperty(this, "$apis", {
                value: Object.assign(Object.create(this.$api), apis.scope)
              });
              // 当前页面的默认路径，用来判断当前路由是否在这个页面上
              Object.defineProperty(this, "$pagePath", {
                value: this.$options._pagePaths
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
            // 如果报mergeData溢出，可能和这个选项的合并策略有关
            provide() {
              return {
                $pagePath: this.$pagePath
              };
            }
          });
    registerRoute(fullPath, route);
  });
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
