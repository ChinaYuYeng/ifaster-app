import axios from "axios";

// const baseURL = "/ifasteroms/json";

// // 创建一个 axios 实例,这个请求是要登陆之后
const instance = axios.create();

const get = (url, params) => {
  return instance.get(url, { params });
};

const post = (url, params) => {
  return instance.post(url, params);
};

export default { instance, get, post };
