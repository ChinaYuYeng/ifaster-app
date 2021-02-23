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
      battery: {
        operatorList: [],
        repositoryList: [],
        selectedBattery: {
          info: {},
          percent: {}
        }
      },
      pile: {
        operatorList: [],
        repositoryList: [],
        selectedPile: {
          info: {},
          percent: {}
        }
      }
    },
    getters: {
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
      }
    },
    mutations: {
      setOperators(state, data) {
        state[data.c].operatorList = data.data;
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
      }
    },
    actions: {
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
      }
    }
  };

  const routes = {
    path: "/shelf",
    component: "./page.vue",
    meta: {
      title: "上下架管理"
    },
    children: [
      {
        path: "onShelf",
        component: "./onShelf/page.vue",
        meta: {
          title: "上架到门店"
        },
        children: [
          {
            path: "shop",
            component: "./onShelf/shop/page.vue",
            meta: {
              title: "门店"
            }
          },
          {
            path: "chargeTemplate",
            component: "./chargeTemplate/page.vue",
            meta: {
              title: "收费模板"
            }
          }
        ]
      }
    ]
  };

  return {
    apis,
    store,
    routes
  };
}
