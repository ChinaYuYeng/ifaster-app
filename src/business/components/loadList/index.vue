<template>
  <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
    <slot></slot>
  </van-list>
</template>

<script>
export default {
  props: {
    loadData: {
      type: Function,
      default: () => Promise.resolve()
    }
  },
  data() {
    return {
      finished: false,
      loading: false
    };
  },
  methods: {
    onLoad() {
      this.loadData().then(res => {
        this.loading = false;
        if (!res || !res.length) this.finished = true;
      });
    }
  }
};
</script>

<style></style>
