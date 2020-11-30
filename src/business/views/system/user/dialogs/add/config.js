export default function(/*request, { mapGetters }, importInjectMixin*/) {
  const apis = {
    add() {
      console.log("userdialogs");
    },
    addout() {
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

  // const route = {
  //   name: "",
  //   path: "add",
  //   meta: {}
  // component: importInjectMixin("views/system/user/dialogs/add/page.vue", {
  //   beforeCreate() {
  //     this.$api = apis;
  //   },
  //   computed: {
  //     ...mapGetters(["test"])
  //   }
  // })
  // };
  return {
    apis,
    store
    // route
  };
}
