// 业务逻辑的入口，初始化设置
// 在business除了entry.js 其他文件可任意删除或者修改而不影响系统正确运行
export default function(router, store) {
  router.beforeEach((to, from, next) => {
    next();
  });

  router.afterEach(to => {
    console.log(to, store);
  });
}

export const entryVars = {
  viewsPath: "/business/views"
};
