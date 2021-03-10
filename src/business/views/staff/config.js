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
      title: "店员管理",
      permisson: "staff:view"
    },
    children: [
      {
        path: "qrcode",
        component: "./QRcode/page.vue",
        meta: {
          title: "邀请注册-店员",
          permisson: "staff:invite"
        }
      },
      {
        path: "detail",
        component: "./detail/page.vue",
        meta: {
          title: "店员管理-详情",
          permission: "staff:detail"
        }
      },
      {
        path: "permission",
        component: "./permission/page.vue",
        meta: {
          title: "店员管理-权限",
          permission: "staff:permission"
        }
      },
      {
        path: "template",
        component: "./template/page.vue",
        meta: {
          title: "权限模板",
          permission: "staff:template"
        }
      },
      {
        path: "addtemp",
        component: "./addTemp/page.vue",
        meta: {
          title: "新增模板",
          permission: "staff:template:add"
        }
      },
      {
        path: "editTemp",
        component: "./editTemp/page.vue",
        meta: {
          title: "编辑模板",
          permission: "staff:template:edit"
        }
      },
      {
        path: "authList",
        component: "./authList/page.vue",
        meta: {
          title: "个人权限",
          permission: "staff:auth"
        }
      }
    ]
  };
  const store = {
    state: {
      staffInfo: {},
      templateInfo: {},
      passFlag: false
    },
    getters: {
      getStaffInfo(state) {
        return state.staffInfo;
      },
      getTemplateInfo(state) {
        return state.templateInfo;
      },
      getPassFlag(state) {
        return state.passFlag;
      }
    },
    mutations: {
      setStaffInfo(state, data) {
        state.staffInfo = data;
      },
      setTemplateInfo(state, data) {
        state.templateInfo = data;
      },
      setPassFlag(state, data) {
        state.passFlag = data;
      }
    },
    actions: {
      saveMessage({ commit }, data) {
        commit("setStaffInfo", data);
      },
      saveTempInfo({ commit }, data) {
        commit("setTemplateInfo", data);
      },
      savePassFlag({ commit }, data) {
        commit("setPassFlag", data);
      }
    }
  };
  return { store, apis, routes };
}
