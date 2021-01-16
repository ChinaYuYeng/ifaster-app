import { loadRouters } from "@/router";
// 业务逻辑的入口，初始化设置
// entry.js 和 views文件夹（内部文件除外）被引用了,不能删除
export default function(request, router, store) {
  loadRouters([{ url: "/login" }]);
  router.beforeEach((to, from, next) => {
    next();
  });

  router.afterEach(to => {
    console.log(to, store);
  });

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
