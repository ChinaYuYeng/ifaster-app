/* 业务逻辑的入口，初始化设置
 entry.js 和 views文件夹（内部文件除外）被引用了,不能删除*/
import Vue from "vue";
import { loadRouters } from "@/router";
import Vant from "vant";
import "vant/lib/index.less";
import "@@/style/main.less";
import "@@/components";
import "@@/mixins";
import "@/assets/directive";
Vue.use(Vant);

/* 设置rem */
function setRem() {
  document.querySelector("html").setAttribute("style", "font-size:calc(100vw / 750 * 100);");
}

// 加载高德地图
function loadMap() {
  const script = document.createElement("script");
  script.src = "https://webapi.amap.com/loader.js";
  // script.src = "https://webapi.amap.com/maps?v=2.0&key=21a1ca7e415887a172fe8399bd114b28";
  script.type = "text/javascript";
  document.querySelector("head").appendChild(script);
}

/* 开启路由 */
function setLoginRouter() {
  loadRouters();
  //   routeMap => {
  //   return [routeMap["/login"]];
  // }
}

/* 路由拦截 */
function routerControll(router, store) {
  router.beforeEach((to, from, next) => {
    if (store.getters["login/getToken"]) {
      next();
    } else if (to.path === "/login/login") {
      next();
    } else {
      next({ path: "/login/login" });
    }
  });
  router.afterEach(() => {
    // console.log(to, store);
  });
}

/*  接口拦截 */
function requestInterceptor(request, store) {
  request.defaults.timeout = 2 * 60 * 1000;
  request.defaults.baseURL = "/ifaster-v2-wechat";
  request.interceptors.request.use(
    config => {
      config.headers = { token: store.getters["login/getToken"] };
      return config;
    },
    error => {
      Promise.reject(error);
    }
  );

  request.interceptors.response.use(
    response => {
      let res = response.data;
      switch (res.code) {
        case "A0500":
        case "A0300":
          Vue.prototype.$notify({ type: "warning", message: res.msg });
          return Promise.reject(res);
        case "A0400":
        case "B0001":
          return Promise.reject(res);
        default:
          return Promise.resolve(res);
      }
    },
    error => {
      return Promise.reject(error);
    }
  );
}

export default function(request, router, store) {
  loadMap();
  setRem();
  setLoginRouter();
  routerControll(router, store);
  requestInterceptor(request, store);
}
