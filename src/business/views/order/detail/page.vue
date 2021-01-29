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
    <van-collapse accordion v-model="activeName" class="mtop10">
      <van-collapse-item title="收支详情" name="1">
        <div class="content__item">
          <span>电池imei:</span>
          <span>2</span>
        </div>
        <div class="content__item">
          <span>电池imei:</span>
          <span>2</span>
        </div>
      </van-collapse-item>
      <van-collapse-item title="收费模板详情" name="2">
        <div class="content__item">
          <span>电池imei:</span>
          <span>2</span>
        </div>
        <div class="content__item">
          <span>电池imei:</span>
          <span>2</span>
        </div>
      </van-collapse-item>
      <van-collapse-item title="用户信息" name="3">
        <div class="content__item">
          <span>电池imei:</span>
          <span>2</span>
        </div>
        <div class="content__item">
          <span>电池imei:</span>
          <span>2</span>
        </div>
      </van-collapse-item>
    </van-collapse>
  </AppLayout>
</template>

<script>
export default {
  created() {
    console.log(this.$route);
  },
  data() {
    return {
      activeName: "1"
    };
  },
  methods: {}
};
</script>

<style lang="less" scoped></style>
