<template>
  <AppLayout ref="report__wrap">
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
  </AppLayout>
</template>

<script>
import F2 from "@antv/f2";
import Search from "./components/search";
export default {
  components: { Search },
  data() {
    return {
      loading: false,
      finished: false,
      searchType: 1,
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
  mounted() {
    this.initChart();
  },
  provide() {
    return {
      parent: this
    };
  },
  methods: {
    onSearch() {},
    onLoad() {
      setTimeout(() => {
        this.datalist.push({
          date: new Date().toDateString(),
          income: "123",
          pay: "123",
          assignment: "1212"
        });
        this.loading = false;
      }, 1000);
    },
    onRefresh() {},
    initChart() {
      let width = this.$refs.report__wrap.$el.getBoundingClientRect().width - 20;
      const data = [
        { genre: "1", sold: 275 },
        { genre: "2", sold: 115 },
        { genre: "3", sold: 120 },
        { genre: "4", sold: 350 },
        { genre: "5", sold: 350 },
        { genre: "6", sold: 350 },
        { genre: "7", sold: 350 },
        { genre: "8", sold: 350 },
        { genre: "9", sold: 350 },
        { genre: "10", sold: 350 },
        { genre: "11", sold: 350 },
        { genre: "12", sold: 150 }
      ];

      const chart = new F2.Chart({
        id: "report__chart",
        pixelRatio: window.devicePixelRatio, // 指定分辨率
        width,
        height: 200
      });
      chart.legend(false);

      chart.source(data);

      chart
        .interval()
        .position("genre*sold")
        .color("genre", ["#55BABB"]);

      chart.render();
    }
  },
  watch: {
    "searchForm.type": function(val) {
      if (val == 1) {
        this.searchForm = {
          type: 1
        };
      } else {
        this.searchForm = {
          type: 2
        };
      }
    }
  }
};
</script>

<style lang="less" scoped>
.report__title {
  display: flex;
  justify-content: center;
}
</style>
