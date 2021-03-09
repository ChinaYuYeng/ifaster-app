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
    path: "/chargeOrder",
    component: "./page.vue",
    meta: {
      title: "充电订单列表",
      permission: "charge:order:view"
    },
    children: [
      {
        path: "detail",
        component: "./detail/page.vue",
        meta: {
          title: "充电订单详情",
          permission: "charge:order:detail",
          export: true
        }
      }
    ]
  };
  return {
    routes,
    apis
  };
}
