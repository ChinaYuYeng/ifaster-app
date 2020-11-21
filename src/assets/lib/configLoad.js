import { asyncImport, syncImport } from "./importInjectMixin";
import router, { registerRoute } from "@/router";
import { registerModule, getStore } from "@/store";
import request from "@/api/request";
import { registerApi } from "@/api";
import { createNamespacedHelpers } from "vuex";

const importComp =
  process.env.NODE_ENV !== "production" ? syncImport : asyncImport;
const contexts = require.context("@/business/views", true, /config\.js$/);
contexts.keys().map(item => {
  let currentPath = item.match(/\.\/(?:(.+)\/)?config\.js$/)[1] || "";
  const { mapGetters, mapActions, mapMutations } = createNamespacedHelpers(
    currentPath
  );
  const config = contexts(item).default(
    request,
    { mapGetters, mapActions, mapMutations },
    importComp
  );

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
    [`get${key.slice(0, 1).toUpperCase()}${key.slice(1)}`]: key
  }));
  const mutationsAlias = Object.keys(store?.actions || {})
    .filter(key => typeof store.actions[key] === "function") //过滤掉注册到root的action
    .map(key => ({
      [`action${key.slice(0, 1).toUpperCase()}${key.slice(1)}`]: key
    }));
  const actionAlias = Object.keys(store?.mutations || {}).map(key => ({
    [`commit${key.slice(0, 1).toUpperCase()}${key.slice(1)}`]: key
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
          (currentPath == "/" ? "" : currentPath) + "/page.vue",
          {
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
            ...(config.mixin || {})
          }
        ),
        ...raw
      });
  }
});

const store = getStore();
export { router, store };
