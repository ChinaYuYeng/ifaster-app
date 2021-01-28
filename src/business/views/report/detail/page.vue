<template>
  <AppLayout ref="report__wrap">
    这是详情
    <!-- <template slot="body-top">
      <Panel>
        <van-cell is-link style="padding:6px 0;align-items: center;">
          <van-grid>
            <van-grid-item>
              <span>{{ item.date }}</span>
            </van-grid-item>
            <van-grid-item>
              <span>营收</span>
              <span>{{ item.income }}</span>
            </van-grid-item>
            <van-grid-item>
              <span>分账</span>
              <span>{{ item.assignment }}</span>
            </van-grid-item>
            <van-grid-item>
              <span>支出</span>
              <span>{{ item.pay }}</span>
            </van-grid-item>
          </van-grid>
        </van-cell>
      </Panel>
    </template>
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-cell is-link style="padding:6px 0;align-items: center;" v-for="item in datalist" :key="item.date">
        <van-grid>
          <van-grid-item>
            <span>{{ item.date }}</span>
          </van-grid-item>
          <van-grid-item>
            <span>营收</span>
            <span>{{ item.income }}</span>
          </van-grid-item>
          <van-grid-item>
            <span>分账</span>
            <span>{{ item.assignment }}</span>
          </van-grid-item>
          <van-grid-item>
            <span>支出</span>
            <span>{{ item.pay }}</span>
          </van-grid-item>
        </van-grid>
      </van-cell>
    </van-list> -->
  </AppLayout>
</template>

<script>
export default {
  inject: ["parent"],
  created() {
    console.log(this.parent);
  }
};
</script>

<style lang="less" scoped></style>
