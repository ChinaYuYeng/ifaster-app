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
      temporaryLock(params) {
        return post("/rent/device/switch/temporary/lock", params);
      },
      batteryModel(params) {
        return post("/rent/device/model/list", params);
      },
      batteryPoint(params) {
        return post("/rent/device/point/list", params);
      },
      account(params) {
        return post("/rent/device/funds/list", params);
      },
      putOn(params) {
        return post("/rent/putaway/up", params);
      },
      Off(params) {
        return post("/rent/putaway/down", params);
      }
    }
  };
  const routes = {
    path: "/battery",
    meta: {
      title: "电池管理",
      permission: "battery:view"
    },
    children: [
      {
        path: "detail",
        component: "./detail/page.vue",
        meta: {
          title: "电池详情",
          permission: "battery:detail"
        }
      },
      {
        path: "log",
        component: "./log/page.vue",
        meta: {
          title: "累计解锁",
          permission: "battery:log"
        }
      },
      {
        path: "puton",
        component: "./putOn/page.vue",
        meta: {
          title: "电池上架",
          permission: "battery:puton"
        }
      },
      {
        path: "account",
        component: "./account/page.vue",
        meta: {
          title: "分账信息",
          permission: "battery:account"
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
