export default function({ post }) {
  const apis = {
    getList(params) {
      return post("/rent/order/list", params);
    },
    getOrderDetail(params) {
      return post("/rent/order/detail", params);
    },
    audit(params) {
      return post("/rent/return/audit", params);
    }
  };
  const routes = {
    path: "/rentOrder",
    component: "./page.vue",
    meta: {
      title: "租赁订单列表",
      permission: "rent:order:view"
    },
    children: [
      {
        path: "detail",
        component: "./detail/page.vue",
        meta: {
          title: "租赁订单详情",
          permission: "rent:order:detail",
          export: true
        },
        children: [
          {
            path: "settle",
            component: "./detail/settle.vue",
            meta: {
              title: "异常订单结算",
              permission: "rent:order:stop"
            }
          }
        ]
      }
    ]
  };
  return {
    routes,
    apis
  };
}
