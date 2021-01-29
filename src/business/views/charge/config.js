export default function() {
  const routes = {
    path: "/charge",
    meta: {
      title: "收费模板"
    },
    children: [
      {
        path: "set",
        component: "./edit/page.vue",
        meta: {
          title: "收费模板设置"
        }
      }
    ]
  };
  return {
    routes
  };
}
