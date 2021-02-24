import "./style.less";
export default function({ post, get }) {
  return {
    routes: {
      meta: {
        title: "租还点管理"
      },
      children: [
        {
          path: "detail",
          component: "./rent/detail.vue",
          meta: {
            title: "租还点管理"
          },
          children: [
            {
              path: "assign",
              component: "./assign/index.vue",
              meta: {
                title: "分佣列表"
              },
              children: [
                {
                  path: "detail",
                  component: "./assign/detail.vue",
                  meta: {
                    title: "分佣设置"
                  }
                },
                {
                  path: "add",
                  component: "./assign/add.vue",
                  meta: {
                    title: "分佣人员"
                  }
                },
                {
                  path: "invite",
                  component: "./assign/invite.vue",
                  meta: {
                    title: "人员邀请"
                  }
                }
              ]
            },
            {
              path: "edit",
              component: "./rent/edit.vue",
              meta: {
                title: "租还点修改"
              }
            }
          ]
        },
        {
          path: "add",
          component: "./rent/add.vue",
          meta: {
            title: "租还点新增"
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
    }
  };
}
