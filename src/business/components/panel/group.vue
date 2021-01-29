<template>
  <div class="panel__group"><slot></slot></div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.panel__group {
  padding: 10px 0;
  > .panel + .panel {
    margin-top: 10px;
  }
}
</style>
