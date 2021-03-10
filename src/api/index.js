import Vue from "vue";
let globleApi = {};
Object.defineProperty(Vue.prototype, "$apis", {
  configurable: true,
  set() {
    console.warn("$apis is readyonly");
  },
  get() {
    return globleApi;
  }
});

export const registerApi = function(apis) {
  if (!apis) return;
  Object.assign(globleApi, apis);
};

export const UnregisterApi = function(api) {
  delete globleApi[api];
};
