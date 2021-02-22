<template>
  <div class="wrap">
    <van-row class="row">
      <van-col span="6"><SidebarIndex :bars="bars" ref="leftSidebar"></SidebarIndex></van-col>
      <van-col span="18">
        <van-row>
          <van-col class="row">
            <van-cell-group>
              <van-cell :value="collapseHeader" value-class="header-cell" />
            </van-cell-group>
          </van-col>
        </van-row>
        <van-row>
          <van-col class="row"><CollapseIndex :collapses="children" :errIcon="errIcon"></CollapseIndex></van-col>
        </van-row>
      </van-col>
    </van-row>
    <van-row class="row action-bar" v-if="showAction">
      <van-col span="24">
        <ActionBar :btns="btns" :summary="summary"></ActionBar>
      </van-col>
    </van-row>
  </div>
</template>
<script>
import CollapseIndex from "./components/collapseIndex";
import SidebarIndex from "./components/sidebarIndex";
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
  inject: ["setSelected"],
  data() {
    return {
      // 默认选中的哪一类
      headChekedIndex: -1,
      // summary: "",
      actives: []
    };
  },
  created() {
    // this.summary = "比例：20% 数量：99;比例：20% 数量：99;比例：20% 数量：99;";
    // debugger;
  },
  updated() {
    this.$nextTick(function() {
      // debugger;
      this.bars.map(b => {
        if (b.name.length > 4) {
          b.name = b.name.substring(0, 4);
        }
        return b;
      });
    });
  },
  methods: {},
  computed: {
    summary() {
      // debugger;
      let sum = "";
      let seleted = this.children.find(c => c.checked == true);
      if (seleted) {
        let name = seleted.name;
        let cnt = seleted.list.reduce((accumulator, currentValue) => {
          if (currentValue.checked) {
            accumulator++;
          }
          return accumulator;
        }, 0);
        sum = name + " 数量：" + cnt;
        // this.showAction = true;
      }
      return sum;
    },
    showAction() {
      let seleted = this.children.find(c => c.checked == true);
      if (seleted) {
        return true;
      }
      return false;
    }
  },
  watch: {
    // "this.actives": function(val) {
    //   if (val && val.length > 0) {
    //     this.summary = val.map(v => v.name + v.cnt + ",").join();
    //   }
    // },
    children: {
      handler: function() {
        this.setSelected();
        return this.summary;
      },
      deep: true
    }
  },
  components: {
    CollapseIndex,
    SidebarIndex,
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
