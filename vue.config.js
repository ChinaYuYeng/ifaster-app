module.exports = {
  chainWebpack: config => {
    config.module
      .rule("vue")
      .use("vue-loader")
      .loader("vue-loader")
      .tap(options => {
        //   由于*.vue文件依赖configLoad.js，因此关闭vue-load热更新
        options.hotReload = false;
        return options;
      });
  }
};
