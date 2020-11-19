export default function() {
  const apis = {
    root: {
      loginout() {
        console.log("out");
      }
    }
  };

  const store = {
    actions: {
      loginout: {
        root: true,
        handler: function() {
          apis.root.loginout();
        }
      }
    }
  };
  const route = {
    path: "/login"
  };
  return {
    apis,
    store,
    route
  };
}
