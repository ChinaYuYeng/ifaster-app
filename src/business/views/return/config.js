export default function({ post, get }) {
  const apis = {
    getList(params) {
      return post("/rent/return/list", params);
    },
    getDetail(params) {
      return post("/rent/return/detail", params);
    },
    audit(params) {
      return post("/rent/return/audit", params);
    },
    getModel() {
      return get("/rent/return/model");
    },
    getPoint() {
      return get("/rent/return/point");
    }
  };
  const routes = {
    path: "/return",
    meta: {
      title: "还车申请",
      permission: "rent:return:view"
    },
    children: [
      {
        path: "detail",
        component: "./subpage/detail.vue",
        meta: {
          title: "还车申请详情",
          permission: "rent:return:detail"
        },
        children: [
          {
            path: "settle",
            component: "./subpage/settle.vue",
            meta: {
              title: "还车申请结算",
              permission: "rent:return:audit"
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
