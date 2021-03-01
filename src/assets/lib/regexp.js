// 正则表达式管理
const regexps = {
  phone: `^(((\\+\\d{2}-)?0\\d{2,3}-\\d{7,8})|((\\+\\d{2}-)?(\\d{2,3}-)?([1][3,4,5,7,8][0-9]\\d{8})))$`,
  url: `^http[s]?:\\/\\/.*`,
  email: `^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$`,
  money: `^(0|[1-9]\\d*)(\\.\\d{1,2})?$`,
  identityCard: `^[1-9]\\d{5}[1-9]\\d{3}((0\\d)|(1[0-2]))(([0|1|2]\\d)|3[0-1])\\d{4}$`
};

export default {
  install: function(Vue) {
    Object.defineProperty(Vue.prototype, "$regexp", {
      value: new Proxy(regexps, {
        get(target, property) {
          return function(val) {
            return new RegExp(target[property], "g").test(val);
          };
        },
        set() {
          throw new Error("can't set readyonly property of $regexp");
        }
      })
    });
  }
};
