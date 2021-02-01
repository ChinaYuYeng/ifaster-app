export default function() {
  return {
    path: "/store",
    component: "./page.vue",
    routes: {
      meta: {
        title: "仓库管理"
      },
      children: [
        {
          path: "transfer",
          component: "./transfer/index.vue",
          meta: {
            title: "调拨"
          },
          children: [
            {
              path: "select",
              component: "./transfer/select/index.vue",
              meta: {
                title: "人员"
              }
            }
          ]
        },
        {
          path: "claim",
          component: "./claimindex.vue",
          meta: {
            title: "认领"
          }
        }
      ]
    }
  };
}
