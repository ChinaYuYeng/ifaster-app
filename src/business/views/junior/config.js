export default function({ post, get }) {
  const apis = {
    scope: {
      info(params) {
        return post("/partner/info", params);
      },
      getRegisterRoleList() {
        return get("/account/register/role");
      },
      auditList() {
        return post("/partner/audit/list");
      },
      audit(params) {
        return post("/partner/audit", params);
      }
    }
  };
  const routes = {
    path: "/junior",
    meta: {
      title: "下级管理",
      permission: "junior:view"
    },
    children: [
      {
        path: "invite",
        component: "./invite/page.vue",
        meta: {
          title: "邀请注册",
          permission: "junior:invite"
        }
      },
      {
        path: "detail",
        component: "./detail/page.vue",
        meta: {
          title: "详情",
          permission: "junior:detail"
        }
      },
      {
        path: "auditList",
        component: "./auditList/page.vue",
        meta: {
          title: "待审核列表",
          permission: "junior:auditList"
        }
      }
    ]
  };
  const store = {
    state: {
      topInfo: {},
      userList: []
    },
    getters: {
      getTopInfo(state) {
        return state.topInfo;
      },
      getList(state) {
        return state.userList;
      },
      getListTop(state) {
        return state.userList[state.userList.length - 1];
      }
    },
    mutations: {
      setTopInfo(state, data) {
        state.topInfo = data;
      },
      pop(state) {
        state.userList.pop();
      },
      push(state, data) {
        state.userList.push(data);
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
