<template>
  <div class="layout__body">
    <slot name="top"></slot>
    <div class="layout__body-content" :class="{ 'layout__main-content--scroll': isScroll }">
      <van-pull-refresh v-model="isLoading" success-text="刷新成功" @refresh="_onRefresh" style="overflow-y:scroll;min-height:100%;">
        <slot><van-empty description="暂无内容" /></slot>
      </van-pull-refresh>
    </div>
    <slot name="bottom"></slot>
  </div>
</template>

<script>
export default {
  props: {
    isScroll: {
      type: Boolean,
      default: false
    },
    onRefresh: {
      type: Function,
      default: () => Promise.resolve()
    }
  },
  data() {
    return {
      isLoading: false
    };
  },
  methods: {
    _onRefresh() {
      this.onRefresh().then(() => {
        this.isLoading = false;
      });
    }
  }
};
</script>

<style lang="less" scoped>
.layout__body {
  flex: 1;
  display: flex;
  overflow: hidden;
  flex-direction: column;
  padding: 10px;
  background-color: #fafafa;
}

.layout__body-content {
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  .content__tip {
    display: flex;
    height: 100%;
    justify-content: center;
    align-items: center;
  }
}

.layout__main-content--scroll {
  overflow-y: scroll;
}
</style>
