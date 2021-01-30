import "./style.less";
export default function() {
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
            }
          ]
        },
        {
          path: "add",
          component: "./rent/add.vue",
          meta: {
            title: "租还点修改"
          }
        }
      ]
    }
  };
}
