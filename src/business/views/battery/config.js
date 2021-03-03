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
      },
      batteryModel(params) {
        return post("/rent/device/model/list", params);
      },
      batteryPoint(params) {
        return post("/rent/device/point/list", params);
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
      },
      {
        path: "puton",
        component: "./putOn/page.vue",
        meta: {
          title: "电池上架"
        }
      }
    ]
  };
  const store = {
    state: {
      batteryInfo: {},
      batteryDetail: {},
      flag: ""
    },
    getters: {
      getbatteryInfo(state) {
        return state.batteryInfo;
      },
      getbatteryDetail(state) {
        return state.batteryDetail;
      },
      getFlag(state) {
        return state.flag;
      }
    },
    mutations: {
      setbatteryInfo(state, data) {
        state.batteryInfo = data;
      },
      setbatteryDetail(state, data) {
        state.batteryDetail = data;
      },
      setFlag(state, data) {
        state.flag = data;
      }
    },
    actions: {
      saveMessage({ commit }, data) {
        commit("setbatteryInfo", data);
      },
      saveDetail({ commit }, data) {
        commit("setbatteryDetail", data);
      },
      saveFlag({ commit }, data) {
        commit("setFlag", data);
      }
    }
  };
  return { store, apis, routes };
}
