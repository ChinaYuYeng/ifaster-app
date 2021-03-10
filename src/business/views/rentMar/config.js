import "./style.less";
export default function({ post, get }) {
  return {
    routes: {
      path: "/rentMar",
      meta: {
        title: "租还点管理",
        permission: "rent:point:view"
      },
      children: [
        {
          path: "detail",
          component: "./rent/detail.vue",
          meta: {
            title: "租还点详情",
            permission: "rent:point:detail"
          },
          children: [
            {
              path: "assign",
              component: "./assign/index.vue",
              meta: {
                title: "分佣列表",
                permission: "rent:commission:view"
              },
              children: [
                {
                  path: "detail",
                  component: "./assign/detail.vue",
                  meta: {
                    title: "分佣详情",
                    permission: "rent:commission:detail"
                  }
                },
                {
                  path: "add",
                  component: "./assign/add.vue",
                  meta: {
                    title: "新增人员",
                    permission: "rent:commission:add"
                  }
                },
                {
                  path: "invite",
                  component: "./assign/invite.vue",
                  meta: {
                    title: "人员邀请",
                    permission: "rent:commission:invite"
                  }
                }
              ]
            },
            {
              path: "edit",
              component: "./rent/add.vue",
              meta: {
                title: "租还点修改",
                permission: "rent:point:edit"
              }
            }
          ]
        },
        {
          path: "add",
          component: "./rent/add.vue",
          meta: {
            title: "租还点新增",
            permission: "rent:point:add"
          }
        }
      ]
    },
    apis: {
      getPointList(params) {
        return post("/rent/point/list", params);
      },
      getPointDetail(params) {
        return post("/rent/point/detail", params);
      },
      deletePoint(params) {
        return post("/rent/point/delete", params);
      },
      savePoint(params) {
        return post("/rent/point/save", params);
      },
      getAssignList(params) {
        return post("/rent/point/commission/list", params);
      },
      delAssign(params) {
        return post("/rent/point/commission/list", params);
      },
      saveAssign(params) {
        return post("/rent/point/commission/list", params);
      },
      getAssignDetail(params) {
        return post("/rent/point/commission/list", params);
      },
      getRegisterRoleList(params) {
        return get("/account/register/role", params);
      }
    },
    store: {
      state: {
        selectMod: false
      },
      getters: {
        getSelectMod(state) {
          return state.selectMod;
        }
      },
      mutations: {
        setSelectMod(state, data) {
          state.selectMod = data;
        }
      }
    }
  };
}
