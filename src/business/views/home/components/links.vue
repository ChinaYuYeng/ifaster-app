<template>
  <Panel class="mtop10">
    <van-cell is-link style="padding:6px 0;" v-for="item in links" :key="item.title" @click="routerTo(item.path)">
      <template #title>
        <span class="iconfont index__links-icon" v-html="item.icon"></span>
        <span class="index__links-title">{{ item.title }}</span>
      </template>
    </van-cell>
  </Panel>
</template>

<script>
export default {
  props: {
    links: Array
  },
  methods: {
    routerTo(path) {
      this.$router.push({ path: path });
    }
  }
};
</script>

<style lang="less" scoped>
.index__links-icon {
  font-size: 16px;
  margin-right: 4px;
  color: @theme-color;
}
.van-cell + .van-cell {
  &::after {
    border: none;
  }
}
</style>
