export default {
  methods: {
    fetchData() {
      console.log("data is loading");
    },
    routerTo(route, method = "push") {
      this.$router[method](route);
    }
  }
};
