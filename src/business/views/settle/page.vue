<template>
  <AppLayout ref="report__wrap" :onRefresh="onRefresh">
    <LoadList :loadStatus="loadStatus">
      <van-cell center style="padding:6px 0;" v-for="item in dataList" :key="item.id" @click="routerTo({ name: '/report/statement', params: item })">
        <van-grid>
          <van-grid-item>
            <span>{{ item.remitDate }}</span>
          </van-grid-item>
          <van-grid-item>
            <span>充电</span>
            <span>{{ item.chargeAmount }}</span>
          </van-grid-item>
          <van-grid-item>
            <span>租赁</span>
            <span>{{ item.rentAmount }}</span>
          </van-grid-item>
          <van-grid-item>
            <span>合计</span>
            <span>{{ item.totalAmount }}</span>
          </van-grid-item>
        </van-grid>
      </van-cell>
    </LoadList>
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
  created() {
    this.setListLoader(paging => {
      return this.$apis.getList({ ...this.searchForm, ...paging });
    });
  },
  methods: {
    onRefresh() {
      return this.setListLoader();
    }
  }
};
</script>

<style lang="less" scoped></style>
