<template>
  <van-nav-bar :title="title" left-text="返回" left-arrow @click-left="goback">
    <template #right v-if="showIcon">
      <van-icon name="search" size="18" @click="$emit('click')" />
    </template>
  </van-nav-bar>
</template>

<script>
export default {
  props: {
    showIcon: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    title() {
      return this.$route.meta.title || "未知";
    }
  },
  methods: {
    goback() {
      this.$router.back();
    }
  }
};
</script>

<style lang="less" scoped></style>
