export default {
  data() {
    return {
      routeData: {},
      routeAction: {}
    };
  },
  activated() {
    this.routeData = this.$route.params.$$data || (this.$route.params.$$action ? {} : this.$route.params);
    this.routeAction = this.$route.params.$$action || {};
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
