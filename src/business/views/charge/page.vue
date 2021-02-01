<template>
  <AppLayout ref="report__wrap">
    <van-tabs :before-change="beforeChange" :active="active">
      <van-tab v-for="(t, index) in title" :key="index" :value="index">
        <template #title>
          <span class="iconfont" v-html="t.icon"></span>
          <span>{{ t.name }}</span>
        </template>
        <!-- <LoadList :loadData="onLoad" class="mtop10">
          <ChargeList :dataList="dataList"></ChargeList>
          <van-button type="primary" size="large">新增模板</van-button>
        </LoadList> -->
        <ChargeList :dataList="dataList"></ChargeList>
        <van-button type="primary" size="large">新增模板</van-button>
      </van-tab>
    </van-tabs>
  </AppLayout>
</template>

<script>
import batteryImg from "../../../assets/images/battery.png";
import chargingImg from "../../../assets/images/charging.png";
import ChargeList from "./components/chargeList";
export default {
  data() {
    return {
      imgSrc: "",
      batteryImg: batteryImg,
      chargingImg: chargingImg,
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
      dataList: [
        { id: 0, name: "收费模板名称-001", rentModel: 1, img: batteryImg },
        { id: 1, name: "收费模板名称-002", rentModel: 2, img: batteryImg },
        { id: 2, name: "收费模板名称-003", rentModel: 0, img: chargingImg }
      ]
    };
  },
  methods: {
    onLoad() {
      return new Promise(resolve => {
        setTimeout(() => {
          this.dataList.push({ name: "4", rentModel: "444", img: require("./testImg/index-bac.png"), id: 3 });
          resolve();
        }, 1000);
      });
    },
    beforeChange(index) {
      if (index == 0) {
        this.dataList = [
          { id: 0, name: "AAA收费模板名称-001", rentModel: 1, img: batteryImg },
          { id: 1, name: "BBB收费模板名称-002", rentModel: 2, img: batteryImg },
          { id: 2, name: "CCC收费模板名称-003", rentModel: 0, img: batteryImg }
        ];
      } else {
        this.dataList = [
          { id: 0, name: "111收费模板名称-001", rentModel: 0, img: chargingImg },
          { id: 1, name: "BBB收费模板名称-002", rentModel: 2, img: chargingImg },
          { id: 2, name: "CCC收费模板名称-003", rentModel: 1, img: chargingImg }
        ];
      }
      this.active = index;
    }
  },
  components: {
    ChargeList
  }
};
</script>

<style lang="less" scoped>
.van-button--large {
  position: fixed;
  width: 95%;
  bottom: 1.2rem;
}
</style>
