import regexp from "@/assets/lib/regexp.js";
import Vue from "vue";

Vue.use(regexp);
let component = new Vue({});

describe("regexp generator", () => {
  it("get regexp", () => {
    expect(component.$regexp.phone("13112345678")).toBeTruthy();
    expect(component.$regexp.phone("+12-012-1234567")).toBeTruthy();
    expect(component.$regexp.phone("+12-132-18112345678")).toBeTruthy();
  });

  it("set regexp", () => {
    expect(() => {
      component.$regexp.otherReg = `^addg$`;
    }).toThrow();
  });
});
