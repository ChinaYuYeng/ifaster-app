<template>
  <AppLayout :onRefresh="onRefresh" @onshow="onRefresh">
    <p class="total__num">合计数量:{{ this.total }}</p>
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
    <template #search="scope">
      <Search :onSearch="onSearch.bind(this, scope)" :searchForm="searchForm"></Search>
    </template>
  </AppLayout>
</template>

<script>
import Search from "./components/search";
import loadList from "@@/mixins/loadList";
export default {
  components: { Search },
  mixins: [loadList],
  data() {
    return {
      dataList: [],
      routeAction: {},
      searchForm: {
        name: "",
        operator: ""
      }
    };
  },
  activated() {
    this.routeAction = this.$route.params.$$action || {};
    this.setListLoader(paging => this.$apis.getPointList({ ...this.searchForm, ...paging }));
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
    },
    onSearch({ close }) {
      return this.setListLoader().then(close);
    }
  }
};
</script>

<style lang="less" scoped>
.total__num {
  text-align: center;
  width: 100%;
}
</style>
