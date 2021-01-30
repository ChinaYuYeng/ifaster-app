export default function() {
  const routes = {
    path: "/pile",
    meta: {
      title: "电桩管理"
    },
    children: [
      {
        path: "detail",
        component: "./detail/page.vue",
        meta: {
          title: "电桩详情"
        }
      },
      {
        path: "edit",
        component: "./edit/page.vue",
        meta: {
          title: "电桩imei：1111"
        }
      }
    ]
  };
  const store = {
    state: {
      pileInfo: {}
    },
    getters: {
      getPileInfo(state) {
        return state.pileInfo;
      }
    },
    mutations: {
      setPileInfo(state, data) {
        state.pileInfo = data;
      }
    }
  };
  return { routes, store };
}
