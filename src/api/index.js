import Vue from "vue";
let globleApi = {};
Object.defineProperty(Vue.prototype, "$api", {
  configurable: true,
  set() {
    console.warn("$api is readyonly");
  },
  get() {
    return globleApi;
  }
});

export const registerApi = function(apis) {
  if (!apis) return;
  Object.assign(globleApi, apis);
  console.log("g_api", globleApi);
};

export const UnregisterApi = function(api) {
  delete globleApi[api];
};
