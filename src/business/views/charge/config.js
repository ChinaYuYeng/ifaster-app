export default function() {
  const routes = {
    path: "/charge",
    meta: {
      title: "收费模板"
    },
    children: [
      {
        path: "edit",
        component: "./edit/page.vue",
        meta: {
          title: "编辑/新增收费模板"
        }
      }
    ]
  };
  return {
    routes
  };
}
