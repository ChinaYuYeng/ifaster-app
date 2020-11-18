import importInjectMixin from "./importInjectMixin";
import { registerRoute } from "@/router";
import { registerModule } from "@/store";
import request from "@/api/request";
import { registerApi } from "@/api";
import { createNamespacedHelpers } from "vuex";

const contexts = require.context("@/business/views", true, /config\.js$/);
contexts.keys().map(item => {
  let currentPath = item.match(/\.\/(.+)\/config\.js$/)[1];
  const config = contexts(item).default(
    request,
    importInjectMixin,
    createNamespacedHelpers(currentPath)
  );
  if (config.apis) {
    registerApi(config.apis);
  }
  if (config.store) {
    registerModule(currentPath, config.store);
  }
  if (config.route) {
    registerRoute(currentPath, {
      ...config.route
    });
  } else {
    registerRoute(currentPath, {
      component: importInjectMixin(currentPath + "/page.vue", currentPath),
      path: currentPath
    });
  }
});
