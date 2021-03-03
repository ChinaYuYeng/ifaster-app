<template>
  <AppLayout ref="report__wrap" :onRefresh="onRefresh" @onshow="onRefresh">
    <LoadList :loadStatus="loadStatus">
      <Panel v-for="item in dataList" :key="item.date" class="mtop10">
        <div class="content__item order__header" slot="header">
          <span>订单编号：{{ item.number }}</span>
          <span>{{ item.statusName }}</span>
        </div>
        <div class="content__item">
          <span>电池imei:</span>
          <span>{{ item.batteryImei }}</span>
        </div>
        <div class="content__item">
          <span>租点:</span>
          <span>{{ item.rentPointName }}</span>
        </div>
        <div class="content__item">
          <span>还点:</span>
          <span>{{ item.returnPointName }}</span>
        </div>
        <div class="content__item">
          <span>用户姓名:</span>
          <span>{{ item.customerName }}</span>
        </div>
        <div class="content__item">
          <span>用户手机:</span>
          <span>{{ item.customerMobile }}</span>
        </div>
        <div class="content__item order__footer" slot="footer">
          <span>{{ item.returnTime }}</span>
          <!-- <span>营收：{{ item.payFee }}元</span>
          <span>实收：{{ item.realIncome }}元</span> -->
          <van-button plain type="info" size="mini" @click="routerTo({ name: '/return/detail', params: item })">查看详情</van-button>
        </div>
      </Panel>
    </LoadList>
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
      searchForm: {
        status1: 1,
        date: new Date().toUTCString()
      }
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
    },
    onSearch({ close }) {
      return this.setListLoader().then(close);
    }
  }
};
</script>

<style lang="less" scoped></style>
