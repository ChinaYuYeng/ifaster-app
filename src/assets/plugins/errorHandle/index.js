function report() {
  // 执行错误收集，上报等功能
  console.log("发生了错误", ...arguments);
}
export default {
  install(vue) {
    // 捕获全局没有被errorHandler捕获的错误
    window.onerror = function(message, source, lineno, colno, error) {
      report(message, source, lineno, colno, error);
    };

    // 捕获全局没有被捕获的promise抛出的错误
    window.addEventListener("unhandledrejection", function(e) {
      report(e);
      e.preventDefault(); //是否阻止默认错误处理
    });

    // 捕获vue内部分布在各处try-catch捕获的错误
    vue.config.errorHandler = function(err, vm, info) {
      report(err, vm, info);
    };
  }
};
