export default function({ post, get }) {
  const apis = {
    getList(params) {
      return post("/rent/order/list", params);
    },
    getOrderDetail(params) {
      return post("/rent/order/detail", params);
    },
    audit(params) {
      return post("/rent/return/audit", params);
    },
    getModel(params) {
      return get("/rent/order/model", params);
    },
    exchangeBattery(params) {
      return post("/rent/order/change/battery", params);
    },
    getExchangeList(params) {
      return post("/rent/order/change/battery/list", params);
    },
    jsTicket(params) {
      return post("/jsapi/ticket", params);
    },
    getBatteryByScan(params) {
      return post("/rent/order/change/scan", params);
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
          },
          {
            path: "exchange",
            component: "./detail/exchange.vue",
            meta: {
              title: "设备替换",
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
