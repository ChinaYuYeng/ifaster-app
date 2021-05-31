<template>
  <van-popup :value="show" @input="onInput" position="right" :style="{ width: '100%', height: '100%', paddingTop: '50px' }" :closeable="true">
    <slot></slot>
  </van-popup>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onInput(val) {
      this.$emit("update:show", val);
    }
  }
};
</script>

<style lang="less" scoped></style>
