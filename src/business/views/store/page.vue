<template>
  <AppLayout>
    <van-tabs :active="active" :before-change="beforeChange">
      <van-tab v-for="(t, index) in tabs" :key="index" :value="index">
        <template #title>
          <span class="iconfont" v-html="t.icon"></span>
          <span class="iconfont">{{ t.name }}</span>
        </template>
      </van-tab>
    </van-tabs>
    <SidebarCollapse :bars="bars" :children="children" :btns="btns" :summary="summary"></SidebarCollapse>
  </AppLayout>
</template>

<script>
// import SidebarCollapse from "@@/components/sidebarCollapse";
export default {
  components: {},
  data() {
    return {
      active: 0,
      tabs: [
        {
          icon: "&#xe609;",
          name: " 电池"
        },
        {
          icon: "&#xe65c;",
          name: " 电桩"
        }
      ],
      bOperatorList: [],
      batteries: [],
      pOperatorList: [],
      piles: [],
      bars: null,
      children: null,
      btns: null,
      summary: null
    };
  },
  created() {
    let operator = {
      id: 1,
      name: "测试1"
    };
    this.bOperatorList.push(operator);
    this.bOperatorList.push(operator);
  },
  methods: {
    beforeChange(index) {
      if (index == 0) {
        // 电池
        console.log(1);
      } else {
        // 电桩
        console.log(2);
      }
      this.active = index;
    },
    routeTo(path) {
      this.$router.push({ path });
    }
  }
};
</script>

<style lang="less" scoped>
.index__Income {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
