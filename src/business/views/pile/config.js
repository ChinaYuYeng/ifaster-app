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
      },
      pileModel(params) {
        return post("/charge/device/model/list", params);
      },
      pileTemp(params) {
        return post("/charge/device/template/list", params);
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
      pileDetail: {},
      flag: ""
    },
    getters: {
      getPileInfo(state) {
        return state.pileInfo;
      },
      getPileDetail(state) {
        return state.pileDetail;
      },
      getFlag(state) {
        return state.flag;
      }
    },
    mutations: {
      setPileInfo(state, data) {
        state.pileInfo = data;
      },
      setPileDetail(state, data) {
        state.pileDetail = data;
      },
      setFlag(state, data) {
        state.flag = data;
      }
    },
    actions: {
      saveMessage({ commit }, data) {
        commit("setPileInfo", data);
      },
      saveDetail({ commit }, data) {
        commit("setPileDetail", data);
      },
      saveFlag({ commit }, data) {
        commit("setFlag", data);
      }
    }
  };
  return { apis, routes, store };
}
