export default {
  methods: {
    routerTo(route, method = "push") {
      if (typeof route === "string") {
        route = {
          path: route
        };
      }
      this.$router[method](route);
    }
  }
};
