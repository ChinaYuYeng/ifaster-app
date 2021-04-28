export default {
  methods: {
    routerTo(route, method = "push") {
      if (typeof route === "string") {
        route = {
          path: route
        };
      }
      if (route.name && route.name[0] != "/") {
        route.name = this.$route.fullPath + "/" + route.name;
      }
      this.$router[method](route);
    }
  }
};
