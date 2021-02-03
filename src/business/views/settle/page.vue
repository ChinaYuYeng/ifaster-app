<template>
  <AppLayout ref="report__wrap" :onRefresh="onRefresh">
    <LoadList :loadData="onLoad">
      <van-cell
        is-link
        center
        style="padding:6px 0;"
        v-for="item in dataList"
        :key="item.id"
        @click="routerTo({ name: '/report/statement', params: item })"
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
    </LoadList>
  </AppLayout>
</template>

<script>
export default {
  data() {
    return {
      dataList: []
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
