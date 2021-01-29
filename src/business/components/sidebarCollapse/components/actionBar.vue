<template>
  <van-row gutter="20">
    <van-col :span="span1" class="van-ellipsis">{{ summary }}</van-col>
    <van-col :span="span2">
      <van-button v-for="btn in btns" :key="btn.id" type="primary" @Click="parentClick(btn.click)">{{ btn.name }}</van-button>
    </van-col>
  </van-row>
</template>

<script>
export default {
  name: "actionBar",
  props: {
    btns: {
      type: Array,
      required: true
    },
    summary: {
      type: String
    }
  },
  data() {
    return {
      span1: 12,
      span2: 12
    };
  },
  methods: {
    parentClick(name) {
      this.$emit(name);
    }
  },
  watch: {
    // 计算 按钮与汇总信息 显示所占的 比例
    "this.btns": function() {
      if (this.btns.length == 1) {
        this.span1 = 18;
        this.span2 = 6;
      } else if (this.btns.length == 2) {
        this.span1 = 12;
        this.span2 = 12;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.floatFoot {
  display: flex;
}
</style>
