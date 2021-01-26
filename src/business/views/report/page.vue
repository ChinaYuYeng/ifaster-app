<template>
  <!-- <AppLayout ref="report__wrap">
    <template slot="body-top">
      <span class="report__title">统计数据</span>
      <canvas id="report__chart"></canvas>
    </template>
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-cell
        is-link
        style="padding:6px 0;align-items: center;"
        v-for="item in datalist"
        :key="item.date"
        @click="$router.push({ path: '/report/detail' })"
      >
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
    </van-list>
    <template #search>
      <Search :formData="searchForm"></Search>
    </template>
  </AppLayout> -->
  <router-view />
</template>

<script>
export default {};
</script>

<style lang="less" scoped></style>
