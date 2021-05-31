const path = require("path");
const WebpackBundleAnalyzer = require("webpack-bundle-analyzer");
const CompressionPlugin = require("compression-webpack-plugin");
function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  configureWebpack: {
    devServer: {
      proxy: {
        "/ifaster-v2-wechat": {
          target: "http://192.168.1.16:8899",
          autoRewrite: true
        }
      }
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
    if (process.env.use_analyzer) {
      config.plugin("webpack-bundle-analyzer").use(WebpackBundleAnalyzer.BundleAnalyzerPlugin);
    }

    if (process.env.NODE_ENV === "production") {
      config.plugin("CompressionPlugin").use(CompressionPlugin, [
        {
          // 压缩后的文件名
          filename: "[path].gz[query]",
          //压缩算法
          algorithm: "gzip",
          //匹配文件
          test: /\.js$|\.css$|\.html$/,
          // 对超过10k的数据压缩
          threshold: 10240,
          // 压缩率小于1才会压缩
          minRatio: 0.8,
          //删除原始文件只保留压缩后的文件
          deleteOriginalAssets: false
        }
      ]);
    }
  },
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
          hack: `true; @import "${resolve("./src/business/style/vant-theme.less")}"`
        }
      }
    }
  }
};
