<template>
  <AppLayout ref="report__wrap">
    <template slot="body-top">
      <Panel>
        <van-cell center>
          <van-grid>
            <van-grid-item>
              <span>{{ routeData.date }}</span>
            </van-grid-item>
            <van-grid-item>
              <span>营收</span>
              <span>{{ routeData.payFee }}</span>
            </van-grid-item>
            <van-grid-item>
              <span>分账</span>
              <span>{{ routeData.settle }}</span>
            </van-grid-item>
            <van-grid-item>
              <span>支出</span>
              <span>{{ routeData.expend }}</span>
            </van-grid-item>
          </van-grid>
        </van-cell>
      </Panel>
    </template>
    <LoadList :loadStatus="loadStatus">
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
          <span>{{ item.date }}</span>
          <!-- <span>营收：{{ item.payFee }}元</span> -->
          <span>实收：{{ item.realIncome }}元</span>
          <van-button plain type="info" size="mini" @click="routerTo({ name: '/report/statement/detail', params: item })">查看详情</van-button>
        </div>
      </Panel>
    </LoadList>
  </AppLayout>
</template>

<script>
import loadList from "@@/mixins/loadList";
export default {
  mixins: [loadList],
  data() {
    return {
      routeData: JSON.parse(JSON.stringify(this.$route.params))
    };
  },
  created() {
    this.setListLoader(paging => {
      return this.$apis.getDetail({ ...paging, ...this.routeData });
    });
  },
  methods: {}
};
</script>

<style lang="less" scoped></style>
