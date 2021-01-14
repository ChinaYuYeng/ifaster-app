import { asyncImport } from "./importInjectMixin";
import router, { registerRoute } from "@/router";
import { registerModule, getStore } from "@/store";
import request from "@/api/request";
import { registerApi } from "@/api";
import { createNamespacedHelpers } from "vuex";
import { parseFilePath } from "@/assets/util/tool";

const importComp = asyncImport;
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
  const getAlias = Object.keys(store?.getters || {}).map(key => ({
    [key]: key
  }));
  const mutationsAlias = Object.keys(store?.actions || {})
    .filter(key => typeof store.actions[key] === "function")
    .map(key => ({
      [key]: key
    }));
  const actionAlias = Object.keys(store?.mutations || {}).map(key => ({
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
