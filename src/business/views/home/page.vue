<template>
  <AppLayout :showHeader="false" :onRefresh="onRefresh" padding="0px">
    <div class="index__bg"></div>
    <div style="position:relative;z-index:1;padding:10px">
      <UserInfo style="color:#fff;">
        <span>{{ operator.operatorName }}</span>
        <span>{{ operator.operatorMobile }}</span>
        <span>{{ operator.operatorNo }}</span>
      </UserInfo>
      <Panel>
        <van-row gutter="10">
          <van-col span="12">
            <div class="index__Income">
              <span class="iconfont income__title">&#xe60e;</span>
              <h5 class="income__num">{{ operator.chargeTotalIncome }}</h5>
              <small>历史充电收益</small>
              <h5 class="income__num">{{ operator.chargeCurrentIncome }}</h5>
              <small>当前充电收益</small>
              <van-button round size="mini" @click="routerTo({ name: '/report', params: { orderType: 1 } })" class="mtop10">查看详情</van-button>
            </div>
          </van-col>
          <van-col span="12">
            <div class="index__Income">
              <span class="iconfont income__title">&#xe62a;</span>
              <h5 class="income__num">{{ operator.rentTotalIncome }}</h5>
              <small>历史租赁收益</small>
              <h5 class="income__num">{{ operator.rentCurrentIncome }}</h5>
              <small>当前租赁收益</small>
              <van-button round size="mini" @click="routerTo({ name: '/report', params: { orderType: 2 } })" class="mtop10">查看详情</van-button>
            </div>
          </van-col>
        </van-row>
      </Panel>
      <van-row gutter="5" class="mtop10">
        <van-col span="12">
          <Panel @click.native="routerTo({ name: '/pile' })">
            <div slot="header">
              <div style="text-align:center;">电桩管理</div>
            </div>
            <van-row class="index__manager">
              <van-col class="index__manager-item">
                <span>{{ operator.onlinePileCount }}</span>
                <span>在线电桩</span>
              </van-col>
              <van-col class="index__manager-item">
                <span>{{ operator.offlinePileCount }}</span>
                <span>离线电桩</span>
              </van-col>
            </van-row>
          </Panel>
        </van-col>
        <van-col span="12">
          <Panel @click.native="routerTo({ name: '/battery' })">
            <div slot="header">
              <div style="text-align:center;">电池管理</div>
            </div>
            <van-row class="index__manager">
              <van-col class="index__manager-item">
                <span>{{ operator.rentedBatteryCount }}</span>
                <span>已租电池</span>
              </van-col>
              <van-col class="index__manager-item">
                <span>{{ operator.freeBatteryCount }}</span>
                <span>空闲电池</span>
              </van-col>
            </van-row>
          </Panel>
        </van-col>
      </van-row>
      <Links
        :links="[
          { icon: '&#xe62e;', title: `还车申请(${operator.pendingRentOrderCount || 0})`, path: '/return' },
          { icon: '&#xe634;', title: '充电订单管理', path: '/chargeOrder' },
          { icon: '&#xe69a;', title: '租赁订单管理', path: '/rentOrder' }
        ]"
      ></Links>
      <Links
        :links="[
          { icon: '&#xe60a;', title: '收费设置', path: '/staff' },
          { icon: '&#xe666;', title: '结算记录', path: '/settle' }
        ]"
      ></Links>
      <Links
        :links="[
          { icon: '&#xe61a;', title: '我的租还点', path: '/rentMar' },
          { icon: '&#xe67f;', title: '仓库管理', path: '/store' },
          { icon: '&#xe62b;', title: '店员管理', path: '/staff' },
          { icon: '&#xe619;', title: '下级管理', path: '/junior' }
        ]"
      ></Links>
    </div>
  </AppLayout>
</template>

<script>
import Links from "./components/links";
export default {
  components: { Links },
  data() {
    return {
      operator: {}
    };
  },
  created() {
    this.onRefresh();
  },
  methods: {
    onRefresh() {
      return this.$apis.getInfo().then(res => {
        this.operator = res.data;
        this.doOperator(this.operator);
      });
    }
  }
};
</script>

<style lang="less" scoped>
.index__bg {
  background: url("./indexBg.png") no-repeat top center;
  background-size: 100%;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 24vh;
  z-index: 0;
}
.index__Income {
  display: flex;
  flex-direction: column;
  align-items: center;
  .income__title {
    font-size: 36px;
    color: #999;
  }
  .income__num {
    color: @theme-color;
    font-size: 16px;
    margin: 8px 0;
  }
}
.index__manager {
  display: flex;
  justify-content: center;
  align-items: center;
}
.index__manager-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 5px;
}
</style>
