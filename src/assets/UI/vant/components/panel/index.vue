<template>
  <div class="panel panel--card">
    <div class="panel__header">
      <slot name="header"></slot>
    </div>
    <slot></slot>
    <div class="panel__footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.panel--card {
  padding: 10px;
  background-color: #fff;
  border-radius: 6px;
  box-shadow: 1px 1px 5px #ebedf0;
}
.panel__header {
  font-weight: 600;
  font-size: 14px;
}
</style>
