import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

let root = {};
let modules = {};
let Store = null;

export function registerModule(path, module) {
  if (!path) {
    root = module;
    return;
  }
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
  console.log(modules);
}

export function getStore() {
  if (Store) {
    return Store;
  }
  return (Store = new Vuex.Store({
    ...root,
    modules
  }));
}
