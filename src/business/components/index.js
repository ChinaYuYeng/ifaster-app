import Vue from "vue";
import AppLayout from "./appLayout";
import BtnGroup from "./btnGroup";
import SubmitBtn from "@@/components/submitBtn";

Vue.component("Panel", () => import("./panel")); //异步加载，代码会分割单个文件
Vue.component("AppLayout", AppLayout);
Vue.component("BtnGroup", BtnGroup);
Vue.component("SubmitBtn", SubmitBtn);
