<template>
  <van-nav-bar title="标题" left-text="返回" left-arrow @click-left="goback">
    <template #right>
      <van-icon name="search" size="18" @click="$emit('click')" />
    </template>
  </van-nav-bar>
</template>

<script>
export default {
  methods: {
    goback() {
      this.$router.back();
    }
  }
};
</script>

<style lang="less" scoped></style>
