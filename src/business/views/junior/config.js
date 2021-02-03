export default function({ post }) {
  const apis = {
    scope: {
      info(params) {
        return post("/partner/info", params);
      }
    }
  };
  const routes = {
    path: "/junior",
    meta: {
      title: "下级管理"
    },
    children: [
      {
        path: "invite",
        component: "./invite/page.vue",
        meta: {
          title: "邀请注册"
        }
      },
      {
        path: "detail",
        component: "./detail/page.vue",
        meta: {
          title: "详情"
        }
      }
    ]
  };
  const store = {
    state: {
      topInfo: {}
    },
    getters: {
      getTopInfo(state) {
        return state.topInfo;
      }
    },
    mutations: {
      setTopInfo(state, data) {
        state.topInfo = data;
      }
    },
    actions: {
      saveMessage({ commit }, data) {
        commit("setTopInfo", data);
      }
    }
  };
  return { apis, routes, store };
}
