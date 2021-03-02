export default function({ post }) {
  let head = "/rent";
  const apis = {
    scope: {
      pointList(params) {
        return post(head + "/point/all", params);
      },
      putawayList(params) {
        return post(head + "/putaway/list", params);
      },
      up(params) {
        return post(head + "/putaway/up", params);
      },
      down(params) {
        return post(head + "/putaway/down", params);
      },
      getRentTemplate(params) {
        return post(head + "/rate/list", params);
      }
    }
  };

  const store = {
    state: {
      pointIndex: 0,
      pointList: [],
      putawayList: [],
      selectedInfo: {}
    },
    getters: {
      getPointList(state) {
        return state.pointList;
      },
      getPutawayList(state) {
        return state.putawayList;
      },
      getSelectedInfo(state) {
        return state.selectedInfo;
      },
      getPointIndex(state) {
        return state.pointIndex;
      }
    },
    mutations: {
      setPointList(state, data) {
        state.pointList = data;
      },
      setPutawayList(state, data) {
        state.putawayList = data;
      },
      setSelectedInfo(state, data) {
        state.selectedInfo = data;
      },
      setPointIndex(state, data) {
        state.pointIndex = data;
      }
    },
    actions: {
      setPointList({ commit }, data) {
        commit("setPointList", data);
      },
      setPutawayList({ commit }, data) {
        commit("setPutawayList", data);
      },
      setSelectedInfo({ commit }, data) {
        commit("setSelectedInfo", data);
      },
      setPointIndex({ commit }, data) {
        commit("setPointIndex", data);
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
