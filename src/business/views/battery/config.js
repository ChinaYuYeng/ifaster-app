export default function() {
  const routes = {
    path: "/battery",
    meta: {
      title: "电池管理"
    },
    children: [
      {
        path: "detail",
        component: "./detail/page.vue",
        meta: {
          title: "电池详情"
        }
      },
      {
        path: "edit",
        component: "./edit/page.vue"
      },
      {
        path: "log",
        component: "./log/page.vue",
        meta: {
          title: "累计解锁"
        }
      }
    ]
  };
  return { routes };
}
