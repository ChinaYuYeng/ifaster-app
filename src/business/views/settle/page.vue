<template>
  <AppLayout ref="report__wrap">
    <LoadList :loadData="onLoad">
      <van-cell
        is-link
        style="padding:6px 0;align-items: center;"
        v-for="item in datalist"
        :key="item.date"
        @click="$router.push({ name: '/report/statement', params: item })"
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
      datalist: [
        {
          date: "2021-01-16",
          income: "123",
          pay: "123",
          assignment: "1212"
        },
        {
          date: "2021-01-17",
          income: "123",
          pay: "123",
          assignment: "1212"
        },
        {
          date: "2021-01-18",
          income: "123",
          pay: "123",
          assignment: "1212"
        },
        {
          date: "2021-01-19",
          income: "123",
          pay: "123",
          assignment: "1212"
        }
      ]
    };
  },
  methods: {
    onLoad() {
      return new Promise(resolve => {
        setTimeout(() => {
          this.datalist.push({
            date: new Date().toDateString(),
            income: "123",
            pay: "123",
            assignment: "1212"
          });
          resolve();
        }, 1000);
      });
    },
    onRefresh() {}
  }
};
</script>

<style lang="less" scoped></style>
