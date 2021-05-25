import Mock from "mockjs";

const { Random } = Mock;

/**
 * @string(upper,20,20) === @string('upper',20,20) === Random.string("upper", 20, 20)
 */
export default [
  "/ifaster-v2-wechat/account/login",
  "post",
  //   { code: "1", data: { token: "@string(upper,20,20)", loginAuthVos: ["admin"] }, msg: "成功" }
  function() {
    //  如果是方法内占位符无法被解析
    // return { code: "1", data: { token: "@string(upper,20,20)", loginAuthVos: ["admin"] }, msg: "成功" };
    return { code: "1", data: { token: Random.string("upper", 20, 20), loginAuthVos: ["admin"] }, msg: "成功" };
  }
];
