<template>
  <AppLayout ref="report__wrap" @onshow="initChart">
    <template slot="body-top">
      <span class="report__title">统计数据</span>
      <canvas id="report__chart"></canvas>
    </template>
    <LoadList :loadStatus="loadStatus">
      <van-cell
        is-link
        center
        v-for="item in dataList"
        :key="item.date"
        @click="routerTo({ name: '/report/statement', params: { ...item, ...routeData } })"
      >
        <van-grid>
          <van-grid-item>
            <span v-html="item.date.replace(/(\d+)-/, '<b>$1</b><br>')"></span>
          </van-grid-item>
          <van-grid-item>
            <span>营收</span>
            <span>{{ item.payFee }}</span>
          </van-grid-item>
          <van-grid-item>
            <span>分账</span>
            <span>{{ item.settle }}</span>
          </van-grid-item>
          <van-grid-item>
            <span>支出</span>
            <span>{{ item.expend }}</span>
          </van-grid-item>
        </van-grid>
      </van-cell>
    </LoadList>
    <template #search="scope">
      <Search :onSearch="onSearch.bind(this, scope)" :searchForm="searchForm"></Search>
    </template>
  </AppLayout>
</template>

<script>
import F2 from "@antv/f2";
import Search from "./components/search";
import loadList from "@@/mixins/loadList";
export default {
  components: { Search },
  mixins: [loadList],
  data() {
    return {
      routeData: this.$route.params,
      searchForm: {
        earningType: 1,
        date: "",
        orderType: this.$route.params.orderType
      }
    };
  },
  created() {
    this.setListLoader(paging => {
      return this.$apis.getList({ ...this.searchForm, ...paging });
    });
  },
  mounted() {
    this.initChart();
  },
  computed: {
    chartData() {
      return this.dataList.map((v, index) => ({ genre: index, sold: v.realIncome }));
    }
  },
  methods: {
    onSearch({ close }) {
      return this.setListLoader().then(close);
    },
    onRefresh() {
      return this.setListLoader();
    },
    initChart() {
      this.$nextTick(() => {
        let width = this.$refs.report__wrap.$el.getBoundingClientRect().width - 20;
        const chart = (this.chart = new F2.Chart({
          id: "report__chart",
          pixelRatio: window.devicePixelRatio, // 指定分辨率
          width,
          height: 200
        }));
        chart.legend(false);

        chart.source(this.chartData || []);

        chart
          .interval()
          .position("genre*sold")
          .color("genre", ["#55BABB"]);

        chart.render();
      });
    },
    getCahrtData() {}
  },
  watch: {
    dataList(val, old) {
      if (val.length !== old.length) {
        this.chart.changeData(this.chartData);
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
