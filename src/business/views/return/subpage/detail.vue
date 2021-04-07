<template>
  <AppLayout ref="report__wrap">
    <template slot="body-top">
      <Panel>
        <div class="content__item order__header" slot="header">
          <span>订单编号：{{ routeData.number }}</span>
          <span>{{ routeData.statusName }}</span>
        </div>
        <div class="content__item">
          <span>电池imei:</span>
          <span>{{ routeData.batteryImei }}</span>
        </div>
        <div class="content__item">
          <span>租点:</span>
          <span>{{ routeData.rentPointName }}</span>
        </div>
        <div class="content__item">
          <span>还点:</span>
          <span>{{ routeData.returnPointName }}</span>
        </div>
        <div class="content__item">
          <span>用户姓名:</span>
          <span>{{ routeData.customerName }}</span>
        </div>
        <div class="content__item">
          <span>用户手机:</span>
          <span>{{ routeData.customerMobile }}</span>
        </div>
        <div class="content__item">
          <span>起租时间:</span>
          <span>{{ routeData.startTime }}</span>
        </div>
        <div class="content__item">
          <span>归还时间:</span>
          <span>{{ routeData.realEndTime }}</span>
        </div>
        <div class="content__item">
          <span>租赁类型:</span>
          <span>{{ routeData.typeName }}</span>
        </div>
        <div class="content__item order__footer" slot="footer">
          <span>{{ routeData.returnTime }}</span>
          <span>营收：{{ routeData.payFee }}元</span>
          <span>实收：{{ routeData.realIncome }}元</span>
        </div>
      </Panel>
    </template>
    <PanelGroup>
      <Panel>
        <van-cell-group title="用户信息">
          <van-cell title="用户姓名：" :value="routeData.customerName" />
          <van-cell title="联系电话：" :value="routeData.customerMobile" />
        </van-cell-group>
      </Panel>
      <Panel>
        <van-cell-group title="设备信息">
          <van-cell title="电池imei：" :value="routeData.batteryImei" />
          <van-cell title="电池编号：" :value="routeData.batteryNo" />
        </van-cell-group>
      </Panel>
    </PanelGroup>
    <van-button text="同意还车" block type="primary" @click="routerTo({ name: '/return/detail/settle', params: routeData })"></van-button>
  </AppLayout>
</template>

<script>
export default {
  data() {
    return {
      activeName: "1",
      routeData: this.$route.params
    };
  },
  methods: {}
};
</script>

<style lang="less" scoped></style>
