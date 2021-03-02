export default function({ post }) {
  let head = "/dispatch";
  const apis = {
    scope: {
      battery: {
        operatorList(params) {
          return post(head + "/battery/operator/list", params);
        },
        repositoryList(params) {
          return post(head + "/battery/repository/list", params);
        },
        operate(params) {
          return post(head + "/battery/batch/operate", params);
        }
      },
      pile: {
        operatorList(params) {
          return post(head + "/pile/operator/list", params);
        },
        repositoryList(params) {
          return post(head + "/pile/repository/list", params);
        },
        operate(params) {
          return post(head + "/pile/batch/operate", params);
        }
      },
      search(params) {
        return post(head + "/search", params);
      }
    }
  };

  const store = {
    state: {
      operationType: 0,
      sideBarActive: 0,
      battery: {
        operatorInfo: {},
        operatorList: [],
        repositoryList: [],
        selectedBattery: {
          info: {},
          percent: {}
        }
      },
      pile: {
        operatorInfo: {},
        operatorList: [],
        repositoryList: [],
        selectedPile: {
          info: {},
          percent: {}
        }
      }
    },
    getters: {
      getOperationType(state) {
        return state.operationType;
      },
      getBOperators(state) {
        return state.battery.operatorList;
      },
      getPOperators(state) {
        return state.battery.operatorList;
      },
      getSelectedBattery(state) {
        return state.battery.selectedBattery;
      },
      getSelectedBatteryInfo(state) {
        return state.battery.selectedBattery.info;
      },
      getBRepositories(state) {
        return state.pile.repositoryList;
      },
      getPRepositories(state) {
        return state.pile.repositoryList;
      },
      getSelectedPile(state) {
        return state.pile.selectedPile;
      },
      getSelectedPileInfo(state) {
        return state.pile.selectedPile.info;
      },
      getBatteryOperatorInfo(state) {
        return state.battery.operatorInfo;
      },
      getPileOperatorInfo(state) {
        return state.pile.operatorInfo;
      },
      getSideBarActive(state) {
        return state.sideBarActive;
      }
    },
    mutations: {
      setOperationType(state, data) {
        state.operationType = data;
      },
      setOperators(state, data) {
        state[data.c].operatorList = data.data;
      },
      setBatteryOperatorInfo(state, data) {
        state.battery.operatorInfo = data;
      },
      setPileOperatorInfo(state, data) {
        state.pile.operatorInfo = data;
      },
      setRepositories(state, data) {
        state[data.c].repositoryList = data.data;
      },
      setSelectedBattery(state, data) {
        state.battery.selectedBattery = data;
      },
      setSelectedBatteryInfo(state, data) {
        state.battery.selectedBattery.info = data;
      },
      setSelectedPile(state, data) {
        state.pile.selectedPile = data;
      },
      setSelectedPileInfo(state, data) {
        state.pile.selectedPile.info = data;
      },
      setSideBarActive(state, data) {
        state.sideBarActive = data;
      }
    },
    actions: {
      setOperationType({ commit }, data) {
        commit("setOperationType", data);
      },
      setOperators({ commit }, data) {
        commit("setOperators", data);
      },
      setRepositories({ commit }, data) {
        commit("setOperators", data);
      },
      setSelectedBattery({ commit }, data) {
        commit("setSelectedBattery", data);
      },
      setSelectedPile({ commit }, data) {
        commit("getSelectedPile", data);
      },
      setSelectedBatteryInfo({ commit }, data) {
        commit("setSelectedBatteryInfo", data);
      },
      setSelectedPileInfo({ commit }, data) {
        commit("setSelectedPileInfo", data);
      },
      setBatteryOperatorInfo({ commit }, data) {
        commit("setBatteryOPileperatorInfo", data);
      },
      setPileOperatorInfo({ commit }, data) {
        commit("setPileOperatorInfo", data);
      },
      setSideBarActive({ commit }, data) {
        commit("setSideBarActive", data);
      }
    }
  };

  const routes = {
    path: "/store",
    component: "./page.vue",
    meta: {
      title: "仓库管理"
    },
    children: [
      {
        path: "transfer",
        component: "./transfer/page.vue",
        meta: {
          title: "调拨"
        },
        children: [
          {
            path: "select",
            component: "./transfer/select/index.vue",
            meta: {
              title: "人员"
            }
          }
        ]
      },
      {
        path: "claim",
        component: "./claim/index.vue",
        meta: {
          title: "认领"
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
