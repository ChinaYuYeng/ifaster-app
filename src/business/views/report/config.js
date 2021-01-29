export default function() {
  const routes = {
    path: "/report",
    meta: {
      title: "日报/月报"
    },
    children: [
      {
        path: "statement",
        component: "./statement/page.vue",
        meta: {
          title: "日报/月报-订单"
        },
        children: [
          {
            path: "detail",
            meta: {
              title: "订单详情"
            },
            component: "./detail/page.vue"
          }
        ]
      }
    ]
  };
  return { routes };
}
