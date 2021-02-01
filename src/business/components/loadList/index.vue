<template>
  <van-list v-model="loading" :finished="finished" :finished-text="finishedText" @load="onLoad">
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
      loading: false,
      finishedText: "",
      paging: {
        pageIndex: 1,
        pageSize: 10
      }
    };
  },
  methods: {
    onLoad() {
      this.loadData(this.paging)
        .then(res => {
          if (this.paging.pageIndex * this.paging.pageSize < res.data.total) {
            this.paging.pageIndex++;
            this.finished = false;
          } else {
            this.finished = true;
            this.finishedText = "没有更多了";
          }
        })
        .catch(err => {
          this.finished = true;
          console.log(err);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    resetLoad() {
      this.paging = {
        pageIndex: 1,
        pageSize: 10
      };
      this.finishedText = "";
      this.onLoad();
    }
  },
  watch: {
    loadData(newfun, oldfun) {
      if (newfun === oldfun) return;
      this.resetLoad();
    }
  }
};
</script>

<style></style>
