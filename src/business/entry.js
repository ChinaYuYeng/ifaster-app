/* 业务逻辑的入口，初始化设置
 entry.js 和 views文件夹（内部文件除外）被引用了,不能删除*/
import Vue from "vue";
import { loadRouters } from "@/router";
import Vant from "vant";
import "vant/lib/index.less";
import "@@/style/main.less";
import "@@/components";
import "@@/mixins";
Vue.use(Vant);

/* 设置rem */
function setRem() {
  document.querySelector("html").setAttribute("style", "font-size:calc(100vw / 750 * 100);");
}

/* 开启路由 */
function setLoginRouter() {
  loadRouters();
  //   routeMap => {
  //   return [routeMap["/login"]];
  // }
}

/* 路由拦截 */
function routerControll(router) {
  router.beforeEach((to, from, next) => {
    next();
    // if (store.getters["login/getLogined"]) {
    // } else if (to.path === "/login") {
    //   next();
    // } else {
    //   next({ path: "/login" });
    // }
  });
  router.afterEach(() => {
    // console.log(to, store);
  });
}

/*  接口拦截 */
function requestInterceptor(request) {
  request.defaults.timeout = 2 * 60 * 1000;
  request.defaults.baseURL = "";
  request.interceptors.request.use(
    config => {
      return config;
    },
    error => {
      Promise.reject(error);
    }
  );

  request.interceptors.response.use(
    response => {
      let res = response.data;
      if (res.login === 0) {
        //   exitLogin();
        // store.dispatch("d2admin/account/logout", {});
      }
      return res;
    },
    error => {
      return Promise.reject(error);
    }
  );
}

export default function(request, router, store) {
  setRem();
  setLoginRouter();
  routerControll(router, store);
  requestInterceptor(request);
}
