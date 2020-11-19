// 注入额外的配置项
export default function lazyImport(file, mixins = {}) {
  console.log(file);
  return () =>
    import(`@/business/views${file}`)
      .then(component => {
        let option = component.default;
        option.mixins
          ? option.mixins.concat(mixins)
          : (option.mixins = [mixins]);
        option.name = file
          .split("/")
          .slice(0, -1)
          .join("-");
        return option;
      })
      .catch(err => {
        console.log(err.toString());
        return {
          render() {
            return <div>组件加载出错！{err.toString()}</div>;
          }
        };
      });
}
