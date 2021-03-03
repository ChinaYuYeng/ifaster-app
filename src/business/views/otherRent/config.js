export default function({ post }) {
  let head = "/rent/otherrent";
  const apis = {
    scope: {
      sms(params) {
        return post("/account/sms", params);
      },
      managerList(params) {
        return post(head + "/manager", params);
      },
      list(params) {
        return post(head + "/list", params);
      },
      return(params) {
        return post(head + "/return", params);
      }
    }
  };

  const store = {
    state: {
      manager: {},
      batteryList: [],
      selectedInfo: {}
    },
    getters: {
      getManager(state) {
        return state.manager;
      },
      getBatteryList(state) {
        return state.batteryList;
      },
      getSelectedInfo(state) {
        return state.selectedInfo;
      }
    },
    mutations: {
      setManager(state, data) {
        state.manager = data;
      },
      setBatteryList(state, data) {
        state.batteryList = data;
      },
      setSelectedInfo(state, data) {
        state.selectedInfo = data;
      }
    },
    actions: {
      setManager({ commit }, data) {
        commit("setManager", data);
      },
      setBatteryList({ commit }, data) {
        commit("setBatteryList", data);
      },
      setSelectedInfo({ commit }, data) {
        commit("setSelectedInfo", data);
      }
    }
  };

  const routes = {
    path: "/otherRent",
    component: "./page.vue",
    meta: {
      title: "异地还车电池"
    },
    children: [
      {
        path: "return",
        component: "./return/page.vue",
        meta: {
          title: "异地还车电池"
        }
      }
    ]
  };

  return {
    apis,
    store,
    routes
  };
}
