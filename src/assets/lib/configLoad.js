import importInjectMixin from "./importInjectMixin";
import router, { registerRoute } from "@/router";
import { registerModule, getStore } from "@/store";
import request from "@/api/request";
import { registerApi } from "@/api";
import { createNamespacedHelpers } from "vuex";

const contexts = require.context("@/business/views", true, /config\.js$/);
contexts.keys().map(item => {
  let currentPath = item.match(/\.\/(?:(.+)\/)?config\.js$/)[1] || "";
  const { mapGetters, mapActions, mapMutations } = createNamespacedHelpers(
    currentPath
  );
  const config = contexts(item).default(
    request,
    { mapGetters, mapActions, mapMutations },
    importInjectMixin
  );

  const apis = {
    root: config?.apis?.root,
    scope: config?.apis?.scope || config?.apis || {}
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
        component: importInjectMixin(
          (currentPath == "/" ? "" : currentPath) + "/page.vue",
          {
            beforeCreate() {
              this.$api = config.apis.scope;
              this.$vuexMap = { mapGetters, mapActions, mapMutations };
            },
            //   concat({})是为了没数据的时候防止assign报错
            computed: {
              ...mapGetters(Object.assign.apply({}, getAlias.concat({})))
            },
            methods: {
              ...mapActions(Object.assign.apply({}, mutationsAlias.concat({}))),
              ...mapMutations(Object.assign.apply({}, actionAlias.concat({})))
            },
            provide: config?.provide || {}
          }
        ),
        ...raw
      });
  }
});

const store = getStore();
export { router, store };
