// import { loadRouters } from "@/router";
export default function({ post }) {
  const apis = {
    root: {
      loginout() {
        console.log("out");
      },
      loadMenu() {},
      sms(params) {
        return post("/account/sms", params);
      }
    },
    scope: {
      login(params) {
        return post("/account/login", params);
      },
      register(params) {
        return post("/account/agent/register", params);
      }
    }
  };

  const store = {
    state: {
      menu: null,
      logined: false,
      token: "",
      userInfo: {}
    },
    getters: {
      getMenu(state) {
        return state.menu;
      },
      getLogined(state) {
        return state.logined;
      },
      getUserInfo(state) {
        return state.userInfo;
      },
      getToken(state) {
        return state.token;
      }
    },
    mutations: {
      setMenu(state, data) {
        state.menu = data;
      },
      setLogined(state, data) {
        state.logined = data;
      },
      setUserInfo(state, data) {
        state.userInfo = data;
      },
      setToken(state, data) {
        state.token = data;
      }
    },
    actions: {
      doLogin({ commit }, data) {
        commit("setToken", data.token);
      }
    }
  };

  const routes = {
    path: "/login",
    children: [
      {
        path: "login",
        component: "./login-register/login.vue"
      },
      {
        path: "register",
        component: "./login-register/register.vue"
      }
    ]
  };

  return {
    apis,
    store,
    routes
  };
}
