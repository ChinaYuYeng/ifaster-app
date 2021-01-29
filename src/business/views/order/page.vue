<template>
  <AppLayout ref="report__wrap">
    <LoadList :loadData="onLoad" class="mtop10">
      <Panel v-for="item in datalist" :key="item.date" class="mtop10">
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
          <van-button plain type="info" size="mini" @click="$router.push({ name: '/order/detail' })">查看详情</van-button>
        </div>
      </Panel>
    </LoadList>
    <template #search>
      <Search :formData="searchForm"></Search>
    </template>
  </AppLayout>
</template>

<script>
import Search from "./components/search";
export default {
  components: { Search },
  data() {
    return {
      item: this.$route.params,
      searchForm: {
        type: 1,
        date: new Date().toUTCString()
      },
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
  provide() {
    return {
      parent: this
    };
  },
  methods: {
    onSearch() {},
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
    }
  }
};
</script>

<style lang="less" scoped></style>
