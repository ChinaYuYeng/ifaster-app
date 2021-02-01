export default {
  methods: {
    routerTo(route, method = "push") {
      this.$router[method](route);
    }
  }
};
