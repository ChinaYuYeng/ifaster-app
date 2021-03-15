import Vue from "vue";
import { getStore } from "@/store";

const store = getStore();
const exclude = ["/home", "/login/login"];
function checkAuth(permission) {
  const permissions = store.getters["login/getPermissions"];
  if (permissions.length === 1 && permissions[0] === "admin") {
    // 如果是admin权限则没限制
    return true;
  }
  return permissions.indexOf(permission) > -1;
}

export default {
  beforeRouteEnter(to, from, next) {
    if (exclude.indexOf(to.path) > -1) {
      next();
    } else {
      if (to.meta.permission === false) {
        next();
      } else if (checkAuth(to.meta.permission)) {
        next();
      } else {
        Vue.prototype.$notify({ type: "warning", message: "您尚未获得相应权限！" });
      }
    }
  },
  methods: {
    routerTo(route, method = "push") {
      if (typeof route === "string") {
        route = {
          path: route
        };
      }
      if (route.name && route.name[0] != "/") {
        route.name = this.$route.fullPath + "/" + route.name;
      }
      this.$router[method](route);
    },
    checkAuth
  }
};
