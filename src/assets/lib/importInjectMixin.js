// 异步注入额外的配置项
export function asyncImport(file, mixins = {}) {
  const layzLoad = () => {
    return import(`@/business/views${file}`)
      .then(component => {
        let option = component.default;
        if (option._pagePaths) {
          // 有缓存的情况
          option._pagePaths.push(...layzLoad._pagePaths);
        } else {
          option._pagePaths = [...layzLoad._pagePaths];
          layzLoad._pagePaths = [];
          option.mixins ? option.mixins.push(mixins) : (option.mixins = [mixins]);
          option.reserveMixin = mixins;
        }
        return option;
      })
      .catch(err => {
        return {
          render() {
            return <div>组件加载出错！{err.toString()}</div>;
          }
        };
      });
  };
  return layzLoad;
}

// 同步注入
export function syncImport(file, mixins) {
  try {
    let option = require(`@/business/views${file}`).default;
    option.mixins ? option.mixins.push(mixins) : (option.mixins = [mixins]);
    option.reserveMixin = mixins;
    return option;
  } catch (err) {
    return {
      render() {
        return <div>组件加载出错！{err.toString()}</div>;
      }
    };
  }
}
