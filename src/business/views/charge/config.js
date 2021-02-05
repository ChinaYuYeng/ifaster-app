export default function({ post }) {
  const routes = {
    path: "/charge",
    meta: {
      title: "收费模板"
    },
    children: [
      {
        path: "editrent",
        component: "./editrent/page.vue",
        meta: {
          title: "新增/编辑-电池收费模板"
        }
      },
      {
        path: "editpile",
        component: "./editpile/page.vue",
        meta: {
          title: "新增/编辑-电桩收费模板"
        }
      }
    ]
  };
  const apis = {
    rent: {
      getRentInfo(params) {
        return post("/rent/rate/list", params);
      }
    },
    pile: {
      getPileInfo(params) {
        return post("/charge/rate/list", params);
      }
    }
  };
  const store = {
    state: {
      rentInfo: {},
      pileInfo: {}
    },
    getters: {
      getRentInfo(state) {
        return state.rentInfo;
      },
      getPileInfo(state) {
        return state.pileInfo;
      }
    },
    mutations: {
      setRentInfo(state, data) {
        state.rentInfo = data;
      },
      setPileInfo(state, data) {
        state.pileInfo = data;
      }
    },
    actions: {
      doRentInfo({ commit }, data) {
        commit("setRentInfo", data);
      },
      doPileInfo({ commit }, data) {
        commit("setPileInfo", data);
      }
    }
  };
  return {
    apis,
    routes,
    store
  };
}
