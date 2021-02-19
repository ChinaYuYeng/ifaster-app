<template>
  <AppLayout>
    <Info :obj="obj" :headImg="dataForm.info.img"></Info>
    <van-divider :style="{ height: '20px', lineHeight: '20px', color: '#fff', backgroundColor: '#fff' }"></van-divider>
    <van-row>
      <van-col span="24"><Percent ref="percent"></Percent></van-col>
    </van-row>
    <template #body-bottom class="wrap">
      <van-row>
        <van-col span="8" offset="8">
          <van-button type="primary" text="下一步" block @click="next" size="mini"></van-button>
        </van-col>
      </van-row>
    </template>
  </AppLayout>
</template>

<script>
import Info from "../components/info";
import Percent from "../components/percent";
export default {
  components: {
    Info,
    Percent
  },
  data() {
    return {
      dataForm: {
        info: {},
        percent: {}
      },
      defaultImg: "",
      obj: []
    };
  },
  created() {
    // debugger;
    // 电池还是电桩
    if (this.getOperationType == 0) {
      this.dataForm.info = this.getSelectedBatteryInfo;
    } else {
      this.dataForm.info = this.getSelectedPileInfo;
    }
    this.obj.push({ label: "设备来源：", value: this.dataForm.info.operator });
    this.obj.push({ label: "分成比例：", value: this.dataForm.info.percent });
    this.obj.push({ label: "设备型号：", value: this.dataForm.info.model });
    this.obj.push({ label: "设备数量：", value: this.dataForm.info.cnt });
  },
  methods: {
    next() {
      // 保存数据
      debugger;
      console.log(this.getSelectedBatteryInfo);
      if (this.getOperationType == 0) {
        let bInfo = {
          operator: this.getSelectedBatteryInfo.operator,
          percent: this.getSelectedBatteryInfo.percent,
          model: this.getSelectedBatteryInfo.model,
          cnt: this.getSelectedBatteryInfo.cnt,
          subPercent: this.$refs.percent.dataForm.percent,
          limit: this.$refs.percent.dataForm.limit
        };
        this.setSelectedBatteryInfo(bInfo);
      } else {
        let pInfo = Object.assign(...this.getSelectedPileInfo, { percent: this.$refs.percent.dataForm });
        this.setSelectedPileInfo(pInfo);
      }
      // 下一步
      this.$router.push({ path: "/store/transfer/select" });
    }
  }
};
</script>
<style lang="less" scoped>
.wrap {
  width: 100%;
  text-align: center;
}
</style>
