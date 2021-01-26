<template>
  <div class="btn-group" :class="direction === 'row' ? 'btn-group--row' : 'btn-group--column'" :style="{ width }">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    direction: {
      type: String,
      default: "row"
    },
    width: {
      type: String,
      default: "100%"
    }
  }
};
</script>

<style lang="less" scoped>
.btn-group {
  display: flex;
}

.btn-group--column {
  flex-direction: column;
  align-items: center;
  > .van-button + .van-button {
    margin-top: 20px;
  }
}

.btn-group--row {
  flex-direction: row;
  justify-content: center;
  .van-button {
    margin: 0 20px;
  }
  > .van-button + .van-button {
    margin-left: 0;
  }
}
</style>
