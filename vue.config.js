const path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  chainWebpack: config => {
    config.resolve.alias.set("@@", resolve("src/business"));
    config.module
      .rule("vue")
      .use("vue-loader")
      .loader("vue-loader")
      .tap(options => {
        //   由于*.vue文件依赖configLoad.js，因此关闭vue-load热更新
        options.hotReload = true;
        return options;
      });
  },
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
          hack: `true; @import "${resolve(
            "./src/business/style/vant-theme.less"
          )}"`
        }
      }
    }
  }
};
