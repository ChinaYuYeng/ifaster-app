export default function() {
  const apis = {
    login() {
      console.log("usermenu");
    },
    loginout() {
      console.log("usermenu");
    }
  };

  const store = {
    state: {
      test: "454646"
    },
    getters: {
      test(state) {
        return state.test;
      }
    }
  };

  const route = {
    name: "",
    path: "/system/menu",
    meta: {}
  };
  return {
    apis,
    store,
    route
  };
}
