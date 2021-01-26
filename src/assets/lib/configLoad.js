import { asyncImport } from "./importInjectMixin";
import router, { registerRoute } from "@/router";
import { registerModule, getStore } from "@/store";
import request from "@/api/request";
import { registerApi } from "@/api";
import { createNamespacedHelpers } from "vuex";
import { parseFilePath } from "@/assets/util/tool";

function traverse(route, cb, path = []) {
  if (route) {
    path.push(route.path);
    route.fullPath = path.join("/");
    cb(route);
  } else {
    return;
  }

  if (route.children) {
    route.children.forEach(subRoute => traverse(subRoute, cb, [...path]));
  }
}

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
   *  routes:[{strategy:'',raw:{component,path}}]或者routes:[{}]这种整个对象默认是raw的值,
   *          component可以是组件对象，也可以是需要加载的组件地址(只支持相对地址),默认是./page.vue
   *          path 是路由地址
   *  apis:{root:{},scope:{}} 或者 apis:{}, 这种默认是scope,
   *  mixin:{}需要注入到*.vue中的minxin
   *
   * }
   */
  const config =
    contexts(item).default &&
    contexts(item).default(request, {
      mapGetters,
      mapActions,
      mapMutations
    });

  // 判空，避免未 export default 方法 或者 方法未返回对象
  if (!config) return;

  const apis = {
    root: config?.apis?.root,
    scope: config?.apis?.scope || config?.apis?.root ? {} : config?.apis || {}
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

  // const routes = Array.isArray(config.routes) ? config.routes : [config.routes || {}];

  // const routes = treeFlatten(config.routes);

  traverse(config.routes || {}, r => {
    const route = {
      strategy: r?.strategy || "merge",
      raw: r?.raw || r || {}
    };

    const raw = route.raw;
    const strategy = route.strategy;

    currentPath = "/" + currentPath;
    raw.path = raw.path || currentPath;
    raw.fullPath = raw.fullPath || currentPath;
    switch (strategy) {
      case "replace":
        registerRoute(raw.fullPath, raw);
        break;
      case "merge":
        registerRoute(raw.fullPath, {
          ...raw,
          component:
            Object.prototype.toString.call(raw.component) === "[object Object]"
              ? raw.component
              : importComp(parseFilePath((currentPath == "/" ? "" : currentPath) + "/" + (raw.component || "page.vue")), {
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
                })
        });
    }
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
