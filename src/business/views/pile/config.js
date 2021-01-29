export default function() {
  const routes = {
    path: "/pile",
    children: [
      {
        path: "detail",
        component: "./detail/page.vue"
      },
      {
        path: "edit",
        component: "./detail/edit/page.vue"
      }
    ]
  };
  return { routes };
}
