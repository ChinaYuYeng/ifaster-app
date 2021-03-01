<template>
  <AppLayout :onRefresh="onRefresh">
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
      dataList: [],
      routeData: this.$route.params
    };
  },
  created() {
    this.setListLoader(this.$apis.getPointList);
  },
  methods: {
    onRefresh() {
      return this.setListLoader();
    }
  }
};
</script>

<style lang="less" scoped></style>
