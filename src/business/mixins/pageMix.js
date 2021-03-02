export default {
  data() {
    return {
      routeData: this.$route.params.$$data || (this.$route.params.$$action ? {} : this.$route.params),
      routeAction: this.$route.params.$$action || {}
    };
  },
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
