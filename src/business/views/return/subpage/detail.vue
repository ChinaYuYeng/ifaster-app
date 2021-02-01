<template>
  <AppLayout ref="report__wrap">
    <template slot="body-top">
      <Panel>
        <div class="content__item order__header" slot="header">
          <span>订单编号：1234</span>
          <span>已完成</span>
        </div>
        <div class="content__item">
          <span>电池imei:</span>
          <span>2</span>
        </div>
        <div class="content__item">
          <span>电池imei:</span>
          <span>2</span>
        </div>
        <div class="content__item">
          <span>电池imei:</span>
          <span>2</span>
        </div>
        <div class="content__item">
          <span>电池imei:</span>
          <span>2</span>
        </div>
        <div class="content__item order__footer" slot="footer">
          <span>2013-1-1 10:1:1</span>
          <span>营收：12元</span>
          <span>营收：12元</span>
        </div>
      </Panel>
    </template>
    <PanelGroup>
      <Panel>
        <van-cell-group title="用户信息">
          <van-cell title="用户姓名：" value="内容" />
          <van-cell title="联系电话：" value="内容" />
        </van-cell-group>
      </Panel>
      <Panel>
        <van-cell-group title="设备信息">
          <van-cell title="电池imei：" value="内容" />
          <van-cell title="设备编号：" value="内容" />
        </van-cell-group>
      </Panel>
    </PanelGroup>
    <van-button text="同意还车" block type="primary" @click="routerTo({ name: '/return/detail/settle' })"></van-button>
  </AppLayout>
</template>

<script>
export default {
  data() {
    return {
      activeName: "1"
    };
  },
  methods: {}
};
</script>

<style lang="less" scoped></style>
