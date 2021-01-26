// import { loadRouters } from "@/router";
export default function() {
  const apis = {
    root: {
      loginout() {
        console.log("out");
      },
      loadMenu() {
        return [
          {
            url: "/home"
          },
          {
            url: "/report"
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
      loginIn({ commit }, vm) {
        return new Promise(resove => {
          let menu = vm.$api.loadMenu();
          // loadRouters(routeMap => {
          //   console.log(menu, routeMap, "dfdfdf");
          //   // if (!menu) return;
          //   // return menu.map(m => ({
          //   //   ...routeMap[m.url],
          //   //   // path:m.path,
          //   //   // meta:m,
          //   //   children: m.submenu ? parseRoutes(m.submenu) : routeMap[m.url].children || []
          //   // }));
          // });
          commit("setMenu", menu);
          commit("setLogined", true);
          commit("setToken", "123455");
          setTimeout(() => {
            vm.$router.push({ path: "/home" });
            resove();
          }, 1000);
        });
      }
    }
  };
  const routes = {
    path: "/login"
  };

  return {
    apis,
    store,
    routes
  };
}
