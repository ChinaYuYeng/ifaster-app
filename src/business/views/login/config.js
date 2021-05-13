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
      },
      other_register(params) {
        return post("/account/others/register", params);
      }
    }
  };

  const store = {
    state: {
      logined: false,
      token: window.localStorage.getItem("ifaster_token") || "",
      userInfo: {},
      permissions: JSON.parse(window.localStorage.getItem("ifaster_permissions") || "[]")
    },
    getters: {
      getLogined(state) {
        return state.logined;
      },
      getUserInfo(state) {
        return state.userInfo;
      },
      getToken(state) {
        return state.token;
      },
      getPermissions(state) {
        return state.permissions;
      }
    },
    mutations: {
      setLogined(state, data) {
        state.logined = data;
      },
      setUserInfo(state, data) {
        state.userInfo = data;
      },
      setToken(state, data) {
        state.token = data;
        window.localStorage.setItem("ifaster_token", data);
      },
      setPermissions(state, data) {
        state.permissions = data;
        window.localStorage.setItem("ifaster_permissions", JSON.stringify(data));
      }
    },
    actions: {
      doLogin({ commit }, data) {
        commit("setToken", data.token);
        commit("setPermissions", data.loginAuthVos);
      },
      loginOut(context, cb) {
        context.commit("setToken", "");
        context.commit("setPermissions", []);
        context.commit("setLogined", false);
        context.commit("setUserInfo", {});
        cb && cb();
        // window.location.reload();
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
