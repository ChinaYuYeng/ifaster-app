export default function({ post }) {
  const apis = {
    scope: {
      list(params) {
        return post("/charge/device/list", params);
      },
      detail(params) {
        return post("/charge/device/detail", params);
      },
      edit(params) {
        return post("/charge/device/update/info", params);
      },
      online(params) {
        return post("/charge/device/refresh/online", params);
      },
      use(params) {
        return post("/charge/device/refresh/use", params);
      },
      operate(params) {
        return post("/charge/device/update/status", params);
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
          title: "电桩imei"
        }
      }
    ]
  };
  // const imei = store.state.pileDetail;
  const store = {
    state: {
      pileInfo: {},
      pileDetail: {}
    },
    getters: {
      getPileInfo(state) {
        return state.pileInfo;
      },
      getPileDetail(state) {
        return state.pileDetail;
      }
    },
    mutations: {
      setPileInfo(state, data) {
        state.pileInfo = data;
      },
      setPileDetail(state, data) {
        state.pileDetail = data;
      }
    },
    actions: {
      saveMessage({ commit }, data) {
        commit("setPileInfo", data);
      },
      saveDetail({ commit }, data) {
        commit("setPileDetail", data);
      }
    }
  };
  return { apis, routes, store };
}
