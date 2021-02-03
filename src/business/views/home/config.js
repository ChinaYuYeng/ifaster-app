export default function({ post }) {
  return {
    apis: {
      getInfo(params) {
        return post("account/homepage/info", params);
      }
    },
    store: {
      state: {
        operator: {}
      },
      getter: {
        getOperator(state) {
          return state.operator;
        }
      },
      mutations: {
        setOperator(state, data) {
          return (state.operator = data);
        }
      },
      actions: {
        doOperator({ commit }, data) {
          commit("setOperator", data);
        }
      }
    }
  };
}
