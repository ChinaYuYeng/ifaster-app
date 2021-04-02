export default function({ post }) {
  return {
    apis: {
      getInfo(params) {
        return post("account/homepage/info", params);
      },
      setPoint(params) {
        return post("/account/staff/choose/point", params);
      }
    },
    store: {
      state: {
        operator: {}
      },
      getters: {
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
