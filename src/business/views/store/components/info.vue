<template>
  <van-row>
    <van-col span="8">
      <van-image :src="headImg" width="150" height="150"></van-image>
    </van-col>
    <van-col span="8" v-for="(l, index) in label" :key="index" class="text-black">{{ l }}</van-col>
    <van-col span="8" v-for="(v, index) in value" :key="index">{{ v }}</van-col>
  </van-row>
</template>

<script>
export default {
  name: "info",
  props: {
    headImg: {
      type: String
    },
    label: {
      type: Array
    },
    value: {
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
</style>
