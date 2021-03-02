export default function({ post, get }) {
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
    // scope: {
    //   rent(params) {
    //     return post("/rent/rate/list", params); // 租赁收费设置
    //   },
    //   pile(params) {
    //     return post("/charge/rate/list", params); // 充电收费设置
    //   }
    // }

    // 租赁
    getRentList(params) {
      return post("/rent/rate/list", params); //获取收费模板列表
    },
    getRentDetail(params) {
      return post("/rent/rate/detail", params); //获取收费模板详情
    },
    deleteRent(params) {
      return post("/rent/rate/delete", params); //删除收费模板
    },
    saveRent(params) {
      return post("/rent/rate/save", params); //新增-编辑收费模板
    },
    getRentExample(params) {
      return get("/rent/rate/example", params); //获取默认的收费模板
    },
    // 充电
    getPileList(params) {
      return post("/charge/rate/list", params); //获取收费模板列表
    },
    getPileDetail(params) {
      return post("/charge/rate/detail", params); //获取收费模板详情
    },
    deletePile(params) {
      return post("/charge/rate/delete", params); //删除收费模板
    },
    savePile(params) {
      return post("/charge/rate/save", params); //新增-编辑收费模板
    },
    getPileExample(params) {
      return post("/charge/rate/example", params); //获取默认的收费模板
    }
  };
  const store = {
    state: {
      rent: {},
      pile: {},
      active: 0
    },
    getters: {
      getRentList(state) {
        return state.rent;
      },
      getPileList(state) {
        return state.pile;
      },
      getActivat(state) {
        return state.active;
      }
    },
    mutations: {
      setRentList(state, data) {
        state.rent = data;
      },
      setPileList(state, data) {
        state.pile = data;
      },
      setActivat(state, data) {
        state.active = data;
      }
    },
    actions: {
      SaveRentList({ commit }, data) {
        commit("setRentList", data);
      },
      SavePileInfo({ commit }, data) {
        commit("setPileList", data);
      },
      SaveActivat({ commit }, data) {
        commit("setActivat", data);
      }
    }
  };
  return {
    apis,
    routes,
    store
  };
}
