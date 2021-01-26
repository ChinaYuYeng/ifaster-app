<template>
  <van-tabbar v-model="active" :fixed="false" :safe-area-inset-bottom="true">
    <van-tabbar-item icon="home-o">标签</van-tabbar-item>
    <van-tabbar-item icon="search" dot>标签</van-tabbar-item>
    <van-tabbar-item icon="friends-o" badge="5">标签</van-tabbar-item>
    <van-tabbar-item icon="setting-o" badge="20">标签</van-tabbar-item>
  </van-tabbar>
</template>

<script>
export default {
  data() {
    return {
      active: ""
    };
  }
};
</script>

<style lang="less" scoped></style>
