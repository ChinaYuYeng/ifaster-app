<template>
  <div class="wrap">
    <van-row>
      <van-col span="6"><Sidebar :bars="bars"></Sidebar></van-col>
      <van-col span="18"><Collapse :collapses="children"></Collapse></van-col>
    </van-row>
    <ActionBar :btns="btns" :summary="summary"></ActionBar>
  </div>
</template>
<script>
import Collapse from "./components/collapse";
import Sidebar from "./components/sidebar";
import ActionBar from "./components/actionBar";
export default {
  name: "sidebarCollapse",
  props: {
    bars: {
      type: Boolean,
      default: true
    },
    children: {
      type: Array,
      required: true
    },
    btns: {
      type: Array,
      required: true
    },
    summary: {
      type: String
    }
  },
  data: function() {
    return {};
  },
  computed: {
    /* 是否显示当前页面，或者提供router-view */
    showContent() {
      let path = this.$route.fullPath;
      let index = path.indexOf("?");
      path = index >= 0 ? path.slice(0, index) : path;
      return path === this.$pagePath;
    },
    showSearchIcon() {
      return !!this.$slots.search;
    }
  },
  components: {
    Collapse,
    Sidebar,
    ActionBar
  }
};
</script>
<style lang="less" scoped>
.wrap {
  display: flex;
}
</style>
