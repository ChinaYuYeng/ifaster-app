export default function({ post }) {
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
            path: "chargeDetail",
            meta: {
              title: "充电订单详情"
            },
            import: "/chargeOrder/detail"
          },
          {
            path: "rentDetail",
            meta: {
              title: "租赁订单详情"
            },
            import: "/rentOrder/detail"
          }
        ]
      }
    ]
  };
  const apis = {
    getList(params) {
      return post("/earning/list", params);
    },
    getDetail(params) {
      return post("/earning/detail", params);
    },
    getOrderDetail(params) {
      return post("/charge/order/detail", params);
    }
  };

  const store = {
    state: {
      searchForm: {
        earningType: 1,
        date: ""
      }
    },
    getter: {
      getSearchForm(state) {
        return state.searchForm;
      }
    },
    mutations: {
      setSearchForm(state, data) {
        state.searchForm = Object.assign({}, state.searchForm, data);
      }
    }
  };
  return { routes, apis, store };
}
