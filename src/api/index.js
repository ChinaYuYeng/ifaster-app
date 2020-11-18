import Vue from "vue";
let globleApi = {};
Object.defineProperty(Vue.prototype, "$api", {
  configurable: false, //不能被重新变更
  set() {
    console.warn("$api 是只读的，不能被赋值");
  },
  get() {
    return globleApi;
  }
});

export const registerApi = function(apis) {
  Object.assign(globleApi, apis);
  console.log(globleApi);
};

export const UnregisterApi = function(api) {
  delete globleApi[api];
};
