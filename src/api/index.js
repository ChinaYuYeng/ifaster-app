import Vue from "vue";
let globleApi = {};
Vue.prototype.$api = globleApi;
// Object.defineProperty(Vue.prototype, "$api", {
//   configurable: false, //不能被重新变更
//   set(val) {
//     globleApi = val
//   },
//   get() {
//     return globleApi;
//   }
// });

export const registerApi = function(apis) {
  if (!apis) return;
  Object.assign(globleApi, apis);
  console.log("g_api", globleApi);
};

export const UnregisterApi = function(api) {
  delete globleApi[api];
};
