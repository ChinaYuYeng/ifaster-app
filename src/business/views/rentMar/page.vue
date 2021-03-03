<template>
  <AppLayout :onRefresh="onRefresh" @onshow="onRefresh">
    <LoadList :loadStatus="loadStatus">
      <van-cell center v-for="(item, index) in dataList" :key="index" is-link @click="routerTo({ name: '/rentMar/detail', params: item })">
        <template #title>
          <span class="iconfont theme-font">&#xe635;</span>
          <span style="padding-left:5px;">{{ item.name }}</span>
        </template>
        <template #label>
          <div class="tag__group">
            <van-tag type="success" v-if="item.otherPlaceReturn">异地收</van-tag>
            <van-tag type="success" v-if="item.otherPointReturn">异点收</van-tag>
          </div>
        </template>
        <template #extra v-if="getSelectMod">
          <van-button size="small" icon="plus" style="margin-left:20px;" @click.stop="selectItem(item)"></van-button>
        </template>
      </van-cell>
    </LoadList>
    <template #body-bottom>
      <van-button text="新增租还点" @click="routerTo({ name: '/rentMar/add' })"></van-button>
    </template>
  </AppLayout>
</template>

<script>
import loadList from "@@/mixins/loadList";
export default {
  mixins: [loadList],
  data() {
    return {
      dataList: []
    };
  },
  activated() {
    this.setListLoader(this.$apis.getPointList);
    // 是否开启列表选择模式
    this.setSelectMod(!!this.routeAction.selectItem);
  },
  methods: {
    onRefresh() {
      return this.setListLoader();
    },
    selectItem(item) {
      this.routeAction.selectItem(item);
      this.$router.back();
    }
  }
};
</script>

<style lang="less" scoped></style>
