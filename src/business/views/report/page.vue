<template>
  <AppLayout ref="report__wrap" @onshow="onRefresh">
    <template slot="body-top">
      <span class="report__title">统计数据</span>
      <canvas id="report__chart"></canvas>
    </template>
    <LoadList :loadStatus="loadStatus">
      <van-cell
        center
        v-for="item in dataList"
        :key="item.date"
        @click="routerTo({ name: '/report/statement', params: { ...item, ...routeData, earningType: searchForm.earningType } })"
        style="border-bottom:1px solid #ddd;"
      >
        <van-row>
          <van-col span="6">
            <span v-html="item.date.replace(/(\d+)-/, '<b>$1</b><br>')"></span>
          </van-col>
          <van-col span="6">
            <span>营收</span>
            <br />
            <span>{{ item.payFee }}</span>
          </van-col>
          <van-col span="6">
            <span>分账</span>
            <br />
            <span>{{ item.settle }}</span>
          </van-col>
          <van-col span="6">
            <span>实收</span>
            <br />
            <span>{{ item.realIncome }}</span>
          </van-col>
        </van-row>
        <template #right-icon>
          <div style="text-align:center;padding-top:1px;">
            <span>支出</span>
            <br />
            <van-icon name="arrow-down" />
          </div>
        </template>
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
const resetForm = {
  earningType: 1,
  date: "",
  deviceImei: "",
  deviceNo: ""
};
export default {
  components: { Search },
  mixins: [loadList],
  data() {
    return {
      routeData: {},
      searchForm: {
        ...resetForm,
        orderType: ""
      }
    };
  },
  mounted() {
    this.initChart();
  },
  activated() {
    this.routeData = this.$route.params;
    Object.assign(this.searchForm, resetForm, this.routeData);
    this.setListLoader(paging => {
      return this.$apis.getList({ ...this.searchForm, ...paging });
    });
  },
  computed: {
    chartData() {
      return this.dataList.map(v => ({ x: v.date.slice(5), y: v.realIncome }));
    }
  },
  methods: {
    onSearch({ close }) {
      return this.setListLoader().then(close);
    },
    onRefresh() {
      this.initChart();
      // return this.setListLoader();
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
        chart.axis("x", {
          labelOffset: 10,
          label: {
            rotate: 0
          }
        });
        chart.legend(false);

        chart.source(this.chartData || []);

        chart
          .interval()
          .size("x", [6, 6])
          .position("x*y")
          .color("x", ["#55BABB"]);

        chart.render();
      });
    }
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
