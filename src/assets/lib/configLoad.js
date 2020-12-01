import { asyncImport } from "./importInjectMixin";
import router, { registerRoute } from "@/router";
import { registerModule, getStore } from "@/store";
import request from "@/api/request";
import { registerApi } from "@/api";
import { createNamespacedHelpers } from "vuex";
import { parseFilePath } from "@/assets/util/tool";

const importComp = asyncImport;
// process.env.NODE_ENV !== "production" ? syncImport : asyncImport;
const contexts = require.context("@/business/views", true, /config\.js$/);
contexts.keys().map(item => {
  let currentPath = item.match(/\.\/(?:(.+)\/)?config\.js$/)[1] || "";
  let name = currentPath.split("/").join("-") || "root";
  const { mapGetters, mapActions, mapMutations } = createNamespacedHelpers(
    currentPath
  );
  /**
   * config的结构
   * config:{
   *  store:{}, vuex的module
   *  route:{strategy:'',raw:{}}或者route:{}这种默认是raw的值,
   *  apis:{root:{},scope:{}} 或者 apis:{}, 这种默认是scope,
   *  mixin:{}需要注入到*.vue中的minxin
   *  compPath:string 需要加载的组件地址(支持相对地址)
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
  // 如果不转换名字，那么需要开发者自我约束规范命名，转换名字会让开发者不熟悉
  const getAlias = Object.keys(store?.getters || {}).map(key => ({
    // [`get${key.slice(0, 1).toUpperCase()}${key.slice(1)}`]
    [key]: key
  }));
  const mutationsAlias = Object.keys(store?.actions || {})
    .filter(key => typeof store.actions[key] === "function") //过滤掉注册到root的action
    .map(key => ({
      // [`action${key.slice(0, 1).toUpperCase()}${key.slice(1)}`]
      [key]: key
    }));
  const actionAlias = Object.keys(store?.mutations || {}).map(key => ({
    // [`commit${key.slice(0, 1).toUpperCase()}${key.slice(1)}`]
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
        component: importComp(
          parseFilePath(
            (currentPath == "/" ? "" : currentPath) +
              "/" +
              (config.compPath ? config.compPath : "page.vue")
          ),
          {
            name: name,
            beforeCreate() {
              Object.defineProperty(this, "$api", {
                value: Object.assign(Object.create(this.$api), apis.scope)
              });
            },
            //   concat({})是为了没数据的时候防止assign报错
            computed: {
              ...mapGetters(Object.assign.apply({}, getAlias.concat({})))
            },
            methods: {
              ...mapActions(Object.assign.apply({}, mutationsAlias.concat({}))),
              ...mapMutations(Object.assign.apply({}, actionAlias.concat({})))
            },
            mixins: [config.mixin || {}]
          }
        ),
        ...raw
      });
  }
});

const store = getStore();
export { router, store };
