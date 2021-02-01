<template>
  <AppLayout ref="report__wrap" :onRefresh="onRefresh">
    <LoadList :loadData="onLoad" class="mtop10">
      <Panel v-for="item in dataList" :key="item.id" class="mtop10">
        <div class="content__item order__header" slot="header">
          <span>订单编号：{{ item.number }}</span>
          <span>{{ item.statusName }}</span>
        </div>
        <div class="content__item">
          <span>电桩名称:</span>
          <span>{{ item.pileNo }}</span>
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
          <span>营收：{{ item.payFee }}元</span>
          <span>实收：{{ item.realIncome }}元</span>
          <van-button plain type="info" size="mini" @click="routerTo({ name: '/order/detail', params: item })">查看详情</van-button>
        </div>
      </Panel>
    </LoadList>
    <template #search="scope">
      <Search :onSearch="onSearch.bind(this, scope)"></Search>
    </template>
  </AppLayout>
</template>

<script>
import Search from "./components/search";
export default {
  components: { Search },
  data() {
    return {
      dataList: []
    };
  },
  provide() {
    return {
      parent: this
    };
  },
  methods: {
    onLoad() {
      return this.$apis.getList(Object.assign.apply(null, Array.from(arguments))).then(res => {
        this.dataList = this.dataList.concat(res.data.rows);
        return res;
      });
    },
    onRefresh() {
      return new Promise(resolve => {
        this.onLoad = this.onLoad.bind(this, {});
        this.dataList = [];
        resolve();
      });
    },
    onSearch({ close }, search) {
      this.onLoad = this.onLoad.bind(this, search);
      this.dataList = [];
      close();
    }
  }
};
</script>

<style lang="less" scoped></style>
