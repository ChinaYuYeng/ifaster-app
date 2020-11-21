// 异步注入额外的配置项
export function asyncImport(file, mixins = {}) {
  return () =>
    import(`@/business/views${file}`)
      .then(component => {
        let option = component.default;
        option.mixins
          ? option.mixins.concat(mixins)
          : (option.mixins = [mixins]);
        option.name = file
          .split("/")
          .slice(1, -1)
          .join("-");
        return option;
      })
      .catch(err => {
        return {
          render() {
            return <div>组件加载出错！{err.toString()}</div>;
          }
        };
      });
}

// 同步注入，主要用于开发环境，配合webpack热更新，异步无法热更新
export function syncImport(file, mixins) {
  try {
    let option = require(`@/business/views${file}`).default;
    option.mixins ? option.mixins.concat(mixins) : (option.mixins = [mixins]);
    option.name = file
      .split("/")
      .slice(1, -1)
      .join("-");
    return option;
  } catch (err) {
    return {
      render() {
        return <div>组件加载出错！{err.toString()}</div>;
      }
    };
  }
}
