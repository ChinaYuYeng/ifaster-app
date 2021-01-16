/* 业务逻辑的入口，初始化设置
 entry.js 和 views文件夹（内部文件除外）被引用了,不能删除*/
import Vue from "vue";
import { loadRouters } from "@/router";
import Vant from "vant";
import "vant/lib/index.less";
Vue.use(Vant);

/* 设置rem */
function setRem() {
  document
    .querySelector("html")
    .setAttribute("style", "font-size:calc(100vw / 750 * 100);");
}

/* 开启登录路由 */
function setLoginRouter() {
  loadRouters([{ url: "/login" }]);
}

/* 路由拦截 */
function routerControll(router, store) {
  router.beforeEach((to, from, next) => {
    console.log("current route", to);
    next();
  });

  router.afterEach(to => {
    console.log(to, store);
  });
}

/*  接口拦截 */
function requestInterceptor(request) {
  request.defaults.timeout = 2 * 60 * 1000;
  request.defaults.baseURL = "";
  // 请求拦截器
  request.interceptors.request.use(
    config => {
      // 在请求发送之前做一些处理

      return config;
    },
    error => {
      // 发送失败
      Promise.reject(error);
    }
  );

  // 响应拦截器
  request.interceptors.response.use(
    response => {
      let res = response.data;
      // 登录验证
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
