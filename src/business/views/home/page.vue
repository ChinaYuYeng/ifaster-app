<template>
  <AppLayout :showHeader="false" :onRefresh="onRefresh">
    <UserInfo>
      <span>{{ operator.operatorName }}</span>
      <span>{{ operator.operatorMobile }}</span>
      <span>{{ operator.operatorNo }}</span>
    </UserInfo>
    <Panel>
      <van-row gutter="10">
        <van-col span="12">
          <div class="index__Income">
            <span class="iconfont">&#xe60e;</span>
            <h5>{{ operator.chargeTotalIncome }}</h5>
            <small>历史充电收益</small>
            <h5>{{ operator.chargeCurrentIncome }}</h5>
            <small>当前充电收益</small>
            <van-button round size="mini" @click="routerTo({ name: '/report' })">
              查看详情
            </van-button>
          </div>
        </van-col>
        <van-col span="12">
          <div class="index__Income">
            <span class="iconfont">&#xe60e;</span>
            <h5>{{ operator.rentTotalIncome }}</h5>
            <small>历史租赁收益</small>
            <h5>{{ operator.rentCurrentIncome }}</h5>
            <small>当前租赁收益</small>
            <van-button round size="mini" @click="routerTo({ name: '/report' })">查看详情</van-button>
          </div>
        </van-col>
      </van-row>
    </Panel>
    <van-row gutter="5" class="mtop10">
      <van-col span="12">
        <Panel @click.native="routerTo({ name: '/pile' })">
          <div slot="header">
            电桩管理
          </div>
          <van-row>
            <van-col>
              <span>{{ operator.onlinePileCount }}</span>
              <span>在线电桩</span>
            </van-col>
            <van-col>
              <span>{{ operator.offlinePileCount }}</span>
              <span>离线电桩</span>
            </van-col>
          </van-row>
        </Panel>
      </van-col>
      <van-col span="12">
        <Panel @click.native="routerTo({ name: '/battery' })">
          <div slot="header">
            电池管理
          </div>
          <van-row>
            <van-col>
              <span>{{ operator.rentedBatteryCount }}</span>
              <span>已租电池</span>
            </van-col>
            <van-col>
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
        { icon: '&#xe62e;', title: '充电订单管理', path: '/order' },
        { icon: '&#xe62e;', title: '租赁订单管理', path: '/order' }
      ]"
    ></Links>
    <Links
      :links="[
        { icon: '&#xe62e;', title: '充电订单管理' },
        { icon: '&#xe62e;', title: '收费设置', path: '/staff' },
        { icon: '&#xe62e;', title: '结算记录', path: '/settle' }
      ]"
    ></Links>
    <Links
      :links="[
        { icon: '&#xe62e;', title: '我的租还点', path: '/rentMar' },
        { icon: '&#xe611;', title: '收费设置', path: '/charge' },
        { icon: '&#xe62e;', title: '仓库管理', path: '/store' },
        { icon: '&#xe62e;', title: '店员管理', path: '/staff' },
        { icon: '&#xe62e;', title: '下级管理', path: '/junior' }
      ]"
    ></Links>
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
.index__Income {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
