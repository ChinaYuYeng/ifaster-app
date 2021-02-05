export default function({ post }) {
  const apis = {
    scope: {
      list(params) {
        return post("/pers/staff/list", params);
      },
      audit(params) {
        return post("/pers/staff/audit", params);
      },
      authList(params) {
        return post("/pers/auth/list", params);
      },
      templateList(params) {
        return post("/pers/template/list", params);
      }
    }
  };
  const routes = {
    path: "/staff",
    meta: {
      title: "店员管理"
    },
    children: [
      {
        path: "qrcode",
        component: "./QRcode/page.vue",
        meta: {
          title: "邀请注册-店员"
        }
      },
      {
        path: "detail",
        component: "./detail/page.vue",
        meta: {
          title: "店员管理-详情"
        }
      },
      {
        path: "permission",
        component: "./permission/page.vue",
        meta: {
          title: "店员管理-权限"
        }
      },
      {
        path: "template",
        component: "./template/page.vue",
        meta: {
          title: "权限模板"
        }
      },
      {
        path: "addtemp",
        component: "./addTemp/page.vue",
        meta: {
          title: "新增模板"
        }
      }
    ]
  };
  const store = {
    state: {
      staffInfo: {}
    },
    getters: {
      getStaffInfo(state) {
        return state.staffInfo;
      }
    },
    mutations: {
      setStaffInfo(state, data) {
        state.staffInfo = data;
      }
    },
    actions: {
      saveMessage({ commit }, data) {
        commit("setStaffInfo", data);
      }
    }
  };
  return { store, apis, routes };
}
