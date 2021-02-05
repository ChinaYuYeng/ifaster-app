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
    // summary: {
    //   type: String
    // },
    errIcon: {
      type: String
    },
    collapseHeader: {
      type: String
    }
  },
  data() {
    return {
      summary: "",
      actives: []
    };
  },
  created() {
    // this.summary = "比例：20% 数量：99;比例：20% 数量：99;比例：20% 数量：99;";
    // debugger;
    this.bars.map(b => {
      if (b.name.length > 4) {
        b.name = b.name.substring(0, 4);
      }
      return b;
    });
  },
  mounted() {},
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
    // "this.actives": function(val) {
    //   if (val && val.length > 0) {
    //     this.summary = val.map(v => v.name + v.cnt + ",").join();
    //   }
    // },
    children: {
      handler: function(v) {
        debugger;
        console.log(v);
        // 是否选择了 比例型号
        // let hasSelectedPercent = 0;
        let selectedPercent = v.filter(p => p.checked)[0];
        let selectedCopy;
        if (selectedPercent) {
          selectedCopy = JSON.parse(JSON.stringify(selectedPercent));
        }

        v = v.map(c => {
          debugger;
          if (c.checked) {
            if (c == selectedPercent) {
              c.list = c.list.map(t => {
                t.checked = true;
              });
            } else {
              c.checked = false;
              c.list = c.list.map(t => {
                t.checked = false;
              });
            }
          }
        });
        // debugger;
        // let sel = v.find(c => c.checked);
        if (selectedCopy) {
          let name = selectedCopy.name;
          let cnt = selectedCopy.list.reduce((accumulator, currentValue) => {
            if (currentValue.checked) {
              accumulator++;
            }
            // return accumulator;
          });
          this.summary = name + " 数量：" + cnt;
        }
      },
      deep: true
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
