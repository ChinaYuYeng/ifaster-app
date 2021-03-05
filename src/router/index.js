import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

const baseRoutes = [
  // {
  //   path: "/",
  //   name: "Home"
  // },
  // {
  //   path: "/about",
  //   name: "About"
  // }
];

const router = new VueRouter({
  baseRoutes
});

export default router;

const routeMap = {}; //用于建立完整路由的路由池
const copyRoute = {}; //待复用路由的缓存

function registerRoute(name, route) {
  routeMap[name] = route;
}

function queueCopyRoute(name, route) {
  copyRoute[name] = route;
  // 微任务会延后到loadRouters方法后面导致复用的路由无法正常装载
  // Vue.nextTick((key = name) => {
  //   const from = routeMap[key];
  //   const to = copyRoute[key];
  //   for (let p in from) {
  //     if (!hasOwnProperty.call(to, p)) {
  //       to[p] = from[p];
  //     }
  //   }
  //   to.component._pagePaths.push(to.name);
  //   console.log(to.component._pagePaths, "copy");
  // });
}

function _doCopy() {
  Object.keys(copyRoute).forEach(key => {
    const _from = routeMap[key];
    const _to = copyRoute[key];
    if (!_from.meta.export) {
      throw new Error(`the router named ${_from.name} can't be import , because it do't have "export" sign in meta`);
    }
    function copyObj(from, to) {
      to.name = from.name.replace(new RegExp(`^\\${_from.name}`), _to.name);
      for (let p in from) {
        if (p === "children") {
          to[p] = [];
          for (let k in from[p]) {
            to[p][k] = {};
            copyObj(from[p][k], to[p][k]);
          }
          continue;
        }
        if (!hasOwnProperty.call(to, p)) {
          to[p] = from[p];
        }
        if (p === "component") {
          to.component._pagePaths.push(to.name);
        }
      }
    }
    copyObj(_from, _to);
  });
}

function loadRouters(matchMenuToRoute) {
  _doCopy();
  console.log(routeMap);
  let temp =
    (matchMenuToRoute && matchMenuToRoute.call(this, routeMap)) ||
    Object.entries(routeMap)
      .filter(v => /^\/[^/]+$/.test(v[0]))
      .map(v => v[1]);
  router.addRoutes(temp); // 追加路由，错误页面必须最后装入
}

export { registerRoute, loadRouters, queueCopyRoute };
