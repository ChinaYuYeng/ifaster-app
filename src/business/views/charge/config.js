export default function({ post }) {
  const routes = {
    path: "/charge",
    meta: {
      title: "收费模板"
    },
    children: [
      {
        path: "editbattery",
        component: "./editbattery/page.vue",
        meta: {
          title: "新增/编辑-电池收费模板"
        }
      },
      {
        path: "editpile",
        component: "./editpile/page.vue",
        meta: {
          title: "新增/编辑-电桩收费模板"
        }
      }
    ]
  };
  const apis = {
    getBatterylist(params) {
      return post("/rent/rate/list", params);
    }
  };
  const store = {
    state: {
      batteryInfo: {}
    },
    getters: {
      getBatteryInfo(state) {
        return state.BatteryInfo;
      }
    },
    mutations: {
      setBatteryInfo(state, data) {
        state.BatteryInfo = data;
      }
    }
  };
  return {
    apis,
    routes,
    store
  };
}
