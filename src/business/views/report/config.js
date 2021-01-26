import Detail from "./detail/page.vue";
import Index from "./index.vue";
export default function() {
  const routes = {
    path: "/report",
    children: [
      {
        path: "index",
        component: Index
      },
      {
        path: "detail",
        component: Detail
      }
    ]
  };
  const mixin = {
    provide() {
      return {
        parent: this
      };
    }
  };
  return { routes, mixin };
}
