import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

let modules = {};
let Store = null;

export function registerModule(path, module) {
  path = path
    .split("/")
    .join("/modules/")
    .split("/");
  const name = path.slice(-1)[0];
  path.slice(0, -1).reduce((collection, pathName) => {
    return (
      collection[pathName] ||
      (collection[pathName] = pathName == "modules" ? {} : { namespaced: true })
    );
  }, modules)[name] = { ...module, namespaced: true };
}

export function getStore() {
  if (Store) {
    return Store;
  }
  return (Store = new Vuex.Store({
    modules
  }));
}
