<template>
  <AppLayout :showHeader="false">
    <UserInfo></UserInfo>
    <Panel>
      <van-row gutter="10">
        <van-col span="12">
          <div class="index__Income">
            <span class="iconfont">&#xe60e;</span>
            <h5>121212121</h5>
            <small>历史充电收益</small>
            <h5>12</h5>
            <small>当前充电收益</small>
            <van-button round size="mini" @click="routeTo('/report')">
              查看详情
            </van-button>
          </div>
        </van-col>
        <van-col span="12">
          <div class="index__Income">
            <span class="iconfont">&#xe60e;</span>
            <h5>121212121</h5>
            <small>历史充电收益</small>
            <h5>12</h5>
            <small>当前充电收益</small>
            <van-button round size="mini" @click="routeTo('/report')">查看详情</van-button>
          </div>
        </van-col>
      </van-row>
    </Panel>
    <van-row gutter="5" class="mtop10">
      <van-col span="12">
        <Panel @click.native="routeTo('/pile')">
          <div slot="header">
            电桩管理
          </div>
          <van-row>
            <van-col>
              <span>49</span>
              <span>在线电桩</span>
            </van-col>
            <van-col>
              <span>0</span>
              <span>离线电桩</span>
            </van-col>
          </van-row>
        </Panel>
      </van-col>
      <van-col span="12">
        <Panel @click.native="routeTo('/battery')">
          <div slot="header">
            电池管理
          </div>
          <van-row>
            <van-col>
              <span>49</span>
              <span>已租电池</span>
            </van-col>
            <van-col>
              <span>0</span>
              <span>空闲电池</span>
            </van-col>
          </van-row>
        </Panel>
      </van-col>
    </van-row>
    <Links
      :links="[
        { icon: '&#xe62e;', title: '还车申请', path: '/return' },
        { icon: '&#xe62e;', title: '充电订单管理', path: '/order' }
      ]"
    ></Links>
    <Links
      :links="[
        { icon: '&#xe62e;', title: '还车申请' },
        { icon: '&#xe62e;', title: '充电订单管理' }
      ]"
    ></Links>
    <Links
      :links="[
        { icon: '&#xe62e;', title: '还车申请' },
        { icon: '&#xe62e;', title: '充电订单管理' }
      ]"
    ></Links>
    <Links
      :links="[
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
  methods: {
    routeTo(path) {
      this.$router.push({ path });
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
