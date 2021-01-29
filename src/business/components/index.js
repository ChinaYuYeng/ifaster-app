import Vue from "vue";
import Panel from "./panel";
import PanelGroup from "./panel/group.vue";
import AppLayout from "./appLayout";
import BtnGroup from "./btnGroup";
import SubmitBtn from "./submitBtn";
import LoadList from "./loadList";
import PileList from "./pileList";
import UserInfo from "./userInfo";

Vue.component("Panel", Panel);
Vue.component("UserInfo", UserInfo);
Vue.component("PanelGroup", PanelGroup);
Vue.component("AppLayout", AppLayout);
Vue.component("BtnGroup", BtnGroup);
Vue.component("SubmitBtn", SubmitBtn);
Vue.component("LoadList", LoadList);
Vue.component("PileList", PileList);
