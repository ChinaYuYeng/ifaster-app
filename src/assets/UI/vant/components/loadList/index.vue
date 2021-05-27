<template>
  <van-list v-model="loadStatus.loading" :finished="loadStatus.finished" :finished-text="loadStatus.finishedText" @load="loadStatus.loadList">
    <slot></slot>
  </van-list>
</template>

<script>
export default {
  props: {
    loadData: {
      type: Function,
      default: () => Promise.resolve()
    },
    loadStatus: {
      type: Object,
      default: () => ({
        loadList: () => [],
        loading: false,
        finished: true,
        finishedText: "数据准备中..."
      })
    }
  }
};
</script>

<style></style>
