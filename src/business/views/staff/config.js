export default function({ post, get }) {
  const apis = {
    scope: {
      list(params) {
        return post("/pers/staff/list", params);
      },
      audit(params) {
        return post("/pers/staff/audit", params);
      },
      detail(params) {
        return post("/pers/staff/detail", params);
      },
      authList(params) {
        return post("/pers/auth/list", params);
      },
      templateList(params) {
        return post("/pers/template/list", params);
      },
      templateAdd(params) {
        return post("/pers/template/add", params);
      },
      templateEdit(params) {
        return post("/pers/template/edit", params);
      },
      templateDel(params) {
        return post("/pers/template/del", params);
      },
      point(params) {
        return post("/rent/device/point/list", params);
      },
      getRegisterRoleList() {
        return get("/account/register/role");
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
      },
      {
        path: "editTemp",
        component: "./editTemp/page.vue",
        meta: {
          title: "编辑模板"
        }
      },
      {
        path: "authList",
        component: "./authList/page.vue",
        meta: {
          title: "个人权限"
        }
      }
    ]
  };
  const store = {
    state: {
      staffInfo: {},
      templateInfo: {}
    },
    getters: {
      getStaffInfo(state) {
        return state.staffInfo;
      },
      getTemplateInfo(state) {
        return state.templateInfo;
      }
    },
    mutations: {
      setStaffInfo(state, data) {
        state.staffInfo = data;
      },
      setTemplateInfo(state, data) {
        state.templateInfo = data;
      }
    },
    actions: {
      saveMessage({ commit }, data) {
        commit("setStaffInfo", data);
      },
      saveTempInfo({ commit }, data) {
        commit("setTemplateInfo", data);
      }
    }
  };
  return { store, apis, routes };
}
