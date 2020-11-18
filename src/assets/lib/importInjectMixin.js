// componentName是动态设定组件的name，主要是为了保证route的name和component的name一致，来实现keep-alive的缓存功能，因为include使用的是route的name
export default function lazyImport(file, mixins = {}) {
  return () =>
    import(`@/business/${file}`).then(component => {
      return {
        mixins: [mixins],
        ...component.default
      };
    });
}
