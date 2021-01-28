export default function() {
  const routes = {
    path: "/report",
    children: [
      {
        path: "detail",
        component: "./detail/page.vue"
      }
    ]
  };
  return { routes };
}
