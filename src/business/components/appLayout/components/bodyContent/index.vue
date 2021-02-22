<template>
  <div class="layout__body" :style="{ padding: padding }">
    <slot name="top"></slot>
    <div class="layout__body-content" :class="{ 'layout__main-content--scroll': isScroll }">
      <van-pull-refresh
        v-model="isLoading"
        success-text="刷新成功"
        @refresh="_onRefresh"
        :disabled="disRefresh"
        style="overflow-y:scroll;height:100%;"
      >
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
      type: Function
    },
    padding: {
      type: String,
      default: "10px"
    }
  },
  data() {
    return {
      isLoading: false
    };
  },
  computed: {
    disRefresh() {
      return !this.onRefresh;
    }
  },
  methods: {
    _onRefresh() {
      this.onRefresh().finally(() => {
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
