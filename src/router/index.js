import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

const baseRoutes = [
  {
    path: "/",
    name: "Home"
  },
  {
    path: "/about",
    name: "About"
  }
];

const router = new VueRouter({
  baseRoutes
});

export default router;

const routeMap = {}; //用于建立完整路由的路由池

function registerRoute(name, route) {
  routeMap[name] = route;
}

function parseRoutes(menu) {
  if (!menu) return;
  return menu.map(m => ({
    ...routeMap[m.url],
    children: parseRoutes(m.submenu)
  }));
}

function loadRouters(menuList) {
  let temp = parseRoutes(menuList);
  console.log(temp);
  router.addRoutes(temp); // 追加路由，错误页面必须最后装入
}

export { routeMap, registerRoute, loadRouters };
