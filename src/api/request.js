import axios from "axios";

// const baseURL = "/ifasteroms/json";

// // 创建一个 axios 实例,这个请求是要登陆之后
const request = axios.create();

// // 请求拦截器
// request.interceptors.request.use(
//   config => {
//     // 在请求发送之前做一些处理

//     return config;
//   },
//   error => {
//     // 发送失败
//     Promise.reject(error);
//   }
// );

// // 响应拦截器
// request.interceptors.response.use(
//   response => {
//     let res = response.data;
//     // 登录验证
//     if (res.login === 0) {
//       //   exitLogin();
//       // store.dispatch("d2admin/account/logout", {});
//     }
//     return res;
//   },
//   error => {
//     return Promise.reject(error);
//   }
// );

const get = (url, params) => {
  return request.get(url, { params });
};

const post = (url, params) => {
  return request.post(url, params);
};

export default { request, get, post };
