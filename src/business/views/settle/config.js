export default function({ post }) {
  return {
    routes: {
      meta: {
        title: "结算记录"
      }
    },
    apis: {
      getList(params) {
        return post("/remit/list", params);
      }
    }
  };
}
