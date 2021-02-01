export default function({ post }) {
  const apis = {
    scope: {
      // login(params) {
      //   return post("/account/login", params);
      // },
      // register(params) {
      //   return post("/account/agent/register", params);
      // }
      list(params) {
        return post("/charge/device/list", params);
      },
      detail(params) {
        return post("/charge/device/detail", params);
      }
    }
  };
  const routes = {
    path: "/pile",
    meta: {
      title: "电桩管理"
    },
    children: [
      {
        path: "detail",
        component: "./detail/page.vue",
        meta: {
          title: "电桩详情"
        }
      },
      {
        path: "edit",
        component: "./edit/page.vue",
        meta: {
          title: "电桩imei：1111"
        }
      }
    ]
  };
  const store = {
    state: {
      pileInfo: {}
    },
    getters: {
      getPileInfo(state) {
        return state.pileInfo;
      }
    },
    mutations: {
      setPileInfo(state, data) {
        state.pileInfo = data;
      }
    },
    actions: {
      saveMessage({ commit }, data) {
        commit("setPileInfo", data);
      }
    }
  };
  return { apis, routes, store };
}
