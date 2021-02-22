export default function({ post }) {
  const apis = {
    scope: {
      list(params) {
        return post("/rent/device/list", params);
      },
      detail(params) {
        return post("/rent/device/detail", params);
      },
      online(params) {
        return post("/rent/device/refresh/online", params);
      },
      log(params) {
        return post("/rent/device/log/list", params);
      },
      force(params) {
        return post("/rent/device/switch/force", params);
      },
      temporary(params) {
        return post("/rent/device/switch/temporary", params);
      }
    }
  };
  const routes = {
    path: "/battery",
    meta: {
      title: "电池管理"
    },
    children: [
      {
        path: "detail",
        component: "./detail/page.vue",
        meta: {
          title: "电池详情"
        }
      },
      {
        path: "edit",
        component: "./edit/page.vue"
      },
      {
        path: "log",
        component: "./log/page.vue",
        meta: {
          title: "累计解锁"
        }
      }
    ]
  };
  const store = {
    state: {
      batteryInfo: {},
      batteryDetail: {}
    },
    getters: {
      getbatteryInfo(state) {
        return state.batteryInfo;
      },
      getbatteryDetail(state) {
        return state.batteryDetail;
      }
    },
    mutations: {
      setbatteryInfo(state, data) {
        state.batteryInfo = data;
      },
      setbatteryDetail(state, data) {
        state.batteryDetail = data;
      }
    },
    actions: {
      saveMessage({ commit }, data) {
        commit("setbatteryInfo", data);
      },
      saveDetail({ commit }, data) {
        commit("setbatteryDetail", data);
      }
    }
  };
  return { store, apis, routes };
}
