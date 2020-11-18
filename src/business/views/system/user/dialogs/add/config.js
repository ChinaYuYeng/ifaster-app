export default function() {
  const apis = {
    login() {
      console.log("userdialogs");
    },
    loginout() {
      console.log("userdialogs");
    }
  };

  const store = {
    state: {
      test: "1213"
    },
    getters: {
      test(state) {
        return state.test;
      }
    }
  };

  const route = {
    name: "",
    path: "add",
    meta: {}
  };
  return {
    apis,
    store,
    route
  };
}
