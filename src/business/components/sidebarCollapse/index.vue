<template>
  <div class="wrap">
    <van-row class="row">
      <van-col span="6"><Sidebar :bars="bars"></Sidebar></van-col>
      <van-col span="18">
        <van-row>
          <van-col class="row">
            <van-cell-group>
              <van-cell :value="collapseHeader" value-class="header-cell" />
            </van-cell-group>
          </van-col>
        </van-row>
        <van-row>
          <van-col class="row"><Collapse :collapses="children" :errIcon="errIcon"></Collapse></van-col>
        </van-row>
      </van-col>
    </van-row>
    <van-row class="row action-bar">
      <van-col span="24">
        <ActionBar :btns="btns" :summary="summary"></ActionBar>
      </van-col>
    </van-row>
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
      type: Array,
      required: true
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
    },
    errIcon: {
      type: String
    },
    collapseHeader: {
      type: String
    }
  },
  data() {
    return {
      actives: []
    };
  },
  created() {
    this.summary = "比例：20% 数量：99;比例：20% 数量：99;比例：20% 数量：99;";
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
  watch: {
    "this.actives": function(val) {
      if (val && val.length > 0) {
        this.summary = val.map(v => v.name + v.cnt + ",").join();
      }
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
  .row {
    width: 100%;
  }
  .action-bar {
    position: fixed;
    bottom: 50px;
    text-align: center;
  }
}
.header-cell {
  color: @theme-color;
}
</style>
