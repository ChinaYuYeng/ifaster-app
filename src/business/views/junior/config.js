export default function() {
  const routes = {
    path: "/junior",
    meta: {
      title: "下级管理"
    },
    children: [
      {
        path: "invite",
        component: "./invite/page.vue",
        meta: {
          title: "邀请注册"
        }
      },
      {
        path: "detail",
        component: "./detail/page.vue",
        meta: {
          title: "详情"
        }
      }
    ]
  };
  return { routes };
}
