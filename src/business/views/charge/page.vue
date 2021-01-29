<template>
  <AppLayout ref="report__wrap">
    <van-tabs>
      <van-tab v-for="(t, index) in title" :key="index" :value="index">
        <template #title>
          <span class="iconfont" v-html="t.icon"></span>
          <span>{{ t.name }}</span>
        </template>
        <LoadList :loadData="onLoad" class="mtop10">
          <ChargeList :templatename="dataform"></ChargeList>
        </LoadList>
      </van-tab>
    </van-tabs>
  </AppLayout>
</template>

<script>
import bac from "./testImg/index-bac.png";
import ChargeList from "./components/chargeList";
export default {
  data() {
    return {
      active: 0,
      title: [
        {
          icon: "&#xe609;",
          name: " 电池收费模板"
        },
        {
          icon: "&#xe65c;",
          name: " 电桩收费模板"
        }
      ],
      bac,
      msg: "img",
      dataform: [
        { name: "电池收费模板-01", tips: "(保证金模式)", imgProp: require("./testImg/index-bac.png") },
        { name: "电池收费模板-02", tips: "(预付款模式)", imgProp: require("./testImg/index-bac.png") }
      ]
      // dataform: [
      //   { axc: "1", sss: "2", abc: "123", aaa: "ee", img: require("./testImg/index-bac.png"), id: "1" },
      //   { axc: "33333", sss: "4", abc: "444", aaa: "wfw", img: require("./testImg/index-bac.png"), id: "2" }
      // ]
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
    }
  },
  components: {
    ChargeList
  }
};
</script>

<style lang="less" scoped></style>
