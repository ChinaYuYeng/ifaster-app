export default function(request, importInjectMixin, { mapGetters }) {
  const apis = {
    login() {
      console.log("user", request);
    },
    loginout() {
      console.log("userout");
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
    },
    actions: {
      testAction() {
        console.log("action");
      }
    }
  };

  const route = {
    name: "",
    path: "/system/user",
    meta: {},
    component: importInjectMixin("views/system/user/page.vue", {
      beforeCreate() {
        this.$api = apis;
      },
      computed: {
        ...mapGetters(["test"]),
        testtest() {
          return "121313";
        }
      }
    })
  };
  return {
    apis,
    store,
    route
  };
}
