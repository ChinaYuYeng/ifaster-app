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
  created() {},
  updated() {
    // debugger;
    // this.$nextTick(function() {
    //   this.bars.map(b => {
    //     let short = b.name;
    //     if (b.name.length > 4) {
    //       short = b.name.substring(0, 4);
    //     }
    //     return Object.assign(b, { shortName: short });
    //   });
    // });
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
    bars: function(val) {
      if (val && val.length > 0) {
        this.bars.map(b => {
          let short = b.name;
          if (b.name.length > 4) {
            short = b.name.substring(0, 4);
          }
          return Object.assign(b, { shortName: short });
        });
      }
    },
    children: {
      handler: function() {
        debugger;
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
    position: absolute;
    bottom: 0;
    text-align: center;
  }
}
.header-cell {
  color: @theme-color;
}
</style>
