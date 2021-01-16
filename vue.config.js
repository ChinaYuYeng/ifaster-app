const path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  configureWebpack: {
    module: {
      // 解决require方法报错，在configLoad.js 中
      unknownContextCritical: false
    }
  },
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
  }
};
