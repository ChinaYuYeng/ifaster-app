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
    // rent: {
    //   getRentInfo(params) {
    //     return post("/rent/rate/list", params);
    //   }
    // },
    // pile: {
    //   getPileInfo(params) {
    //     return post("/charge/rate/list", params);
    //   }
    // }
    scope: {
      rent(params) {
        return post("/rent/rate/list", params); // 租赁收费设置
      },
      pile(params) {
        return post("/charge/rate/list", params); // 充电收费设置
      }
    }
  };
  const store = {
    state: {
      rent: {},
      pile: {}
    },
    getters: {
      getRentList(state) {
        return state.rent;
      },
      getPileList(state) {
        return state.pile;
      }
    },
    mutations: {
      setRentList(state, data) {
        state.rent = data;
      },
      setPileList(state, data) {
        state.pile = data;
      }
    },
    actions: {
      SaveRentList({ commit }, data) {
        commit("setRentList", data);
      },
      SavePileInfo({ commit }, data) {
        commit("setPileList", data);
      }
    }
  };
  return {
    apis,
    routes,
    store
  };
}
