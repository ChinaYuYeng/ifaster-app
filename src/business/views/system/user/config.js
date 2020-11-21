export default function(request /*{ mapGetters }, importInjectMixin*/) {
  const apis = {
    user() {
      console.log("user", request);
    },
    userout() {
      console.log("userout");
    },
    iii() {}
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
    meta: {}
    // component: importInjectMixin("views/system/user/page.vue", {
    //   beforeCreate() {
    //     this.$api = apis;
    //   },
    //   computed: {
    //     ...mapGetters(["test"]),
    //     testtest() {
    //       return "121313";
    //     }
    //   }
    // })
  };
  const mixin = {
    provide: {
      page: function() {
        return this;
      }
    }
  };
  return {
    apis,
    store,
    route,
    mixin
  };
}
