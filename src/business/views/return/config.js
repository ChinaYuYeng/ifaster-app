export default function() {
  const routes = {
    meta: {
      title: "还车申请"
    },
    children: [
      {
        path: "detail",
        component: "./subpage/detail.vue",
        meta: {
          title: "还车申请详情"
        },
        children: [
          {
            path: "settle",
            component: "./subpage/settle.vue",
            meta: {
              title: "还车申请结算"
            }
          }
        ]
      }
    ]
  };
  return {
    routes
  };
}
