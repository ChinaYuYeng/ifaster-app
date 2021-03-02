<template>
  <van-row class="bk-white">
    <van-col span="6">
      <van-image :src="headImg" class="list-img"></van-image>
    </van-col>
    <van-col span="16" offset="2">
      <van-row v-for="(t, index) in obj" :key="index" class="col-left">
        <van-col span="8" class="text-black">{{ t.label }}</van-col>
        <van-col span="16" class="text-value">{{ t.value }}</van-col>
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
.text-value {
  float: left;
}
.text-black {
  color: #000;
  float: left;
}
.col-left {
  height: 100%;

  .van-col {
    height: 20%;
  }
}
.col-left + .col-left {
  margin-top: 3%;
}
.bk-white {
  background-color: #fff;
}
.list-img {
  width: 100%;
  border: 1px solid #dddddd;
  float: left;
  margin-left: 10px;
}
</style>
