export default function() {
  const routes = {
    path: "/order",
    component: "./page.vue",
    meta: {
      title: "订单"
    },
    children: [
      {
        path: "detail",
        component: "./detail/page.vue",
        meta: {
          title: "订单详情"
        }
      }
    ]
  };
  return {
    routes
  };
}
