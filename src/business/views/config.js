import Vue from "vue";
import Vant from "vant";
import "vant/lib/index.css";
import { getStore } from "@/store";
import { loadRouters } from "@/router";
Vue.use(Vant);

// 设置rem
document
  .querySelector("html")
  .setAttribute("style", "font-size:calc(100vw / 750 * 100);");

function configAxios({ request }) {
  request.defaults.timeout = 2 * 60 * 1000;
  request.defaults.baseURL = "";

  request.interceptors.request.use(
    config => {
      // 在请求发送之前做一些处理

      return config;
    },
    error => {
      Promise.reject(error);
    }
  );

  request.interceptors.response.use(
    response => {
      let res = response.data;
      // 登录验证
      if (res.login === 0) {
        getStore().dispatch("loginout", { root: true });
      }
      return res;
    },
    error => {
      return Promise.reject(error);
    }
  );
}

export default function(request) {
  const apis = {
    root: {
      loadMenu() {
        return [
          {
            url: "/"
          },
          {
            url: "/home"
          },
          {
            url: "/login"
          },
          {
            url: "/system/user",
            submenu: [
              {
                url: "/system/user/dialogs/add"
              }
            ]
          },
          {
            url: "/system/menu"
          }
        ];
      }
    }
  };

  const store = {
    state: {
      menu: null
    },
    getters: {
      menu(state) {
        return state.menu;
      }
    },
    mutations: {
      menu(state, data) {
        state.menu = data;
      }
    },
    actions: {
      menu({ commit }) {
        let menu = apis.root.loadMenu();
        loadRouters(menu);
        commit("menu", menu);
      }
    }
  };
  // 因为该配置文件没有对应点页面，因此route重定向到别点地方
  const route = {
    strategy: "replace",
    raw: {
      path: "/",
      redirect: "/system"
    }
  };

  configAxios(request);

  return {
    route,
    store,
    apis
  };
}
