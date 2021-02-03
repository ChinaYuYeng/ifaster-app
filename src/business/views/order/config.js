export default function({ post }) {
  const apis = {
    getList(params) {
      return post("/charge/order/list", params);
    },
    getOrderDetail(params) {
      return post("/charge/order/detail", params);
    }
  };
  const routes = {
    path: "/order",
    component: "./page.vue",
    meta: {
      title: "订单列表"
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
    routes,
    apis
  };
}
