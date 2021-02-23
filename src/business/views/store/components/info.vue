<template>
  <van-row class="bk-white">
    <van-col span="6">
      <van-image :src="headImg"></van-image>
    </van-col>
    <van-col span="16" offset="2">
      <van-row v-for="(t, index) in obj" :key="index" class="col-left">
        <van-col span="12" class="text-black">{{ t.label }}</van-col>
        <van-col span="12">{{ t.value }}</van-col>
      </van-row>
    </van-col>
  </van-row>
</template>

<script>
export default {
  name: "info",
  props: {
    headImg: {
      type: String
    },
    obj: {
      type: Array
    }
  },
  components: {},
  data() {
    return {};
  },
  methods: {}
};
</script>
<style lang="less" scoped>
.text-black {
  color: #000;
}
.col-left {
  height: 100%;

  .van-col {
    height: 20%;
    margin-top: 3%;
  }
}
.bk-white {
  background-color: #fff;
}
</style>
