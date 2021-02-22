<template>
  <AppLayout>
    <Info :obj="obj" :headImg="dataForm.info.img"></Info>
    <van-divider :style="{ height: '20px', lineHeight: '20px', color: '#fff', backgroundColor: '#fff' }"></van-divider>
    <van-row class="rw">
      <van-col span="12" class="rw-right">认领为：</van-col>
      <van-col span="12" class="rw-left">
        <van-radio-group v-model="dataForm.saleType" direction="horizontal" checked-color="#55BABB">
          <van-radio name="2" icon-size="16px">销售</van-radio>
          <van-radio name="1" icon-size="16px">租赁</van-radio>
        </van-radio-group>
      </van-col>
    </van-row>
    <van-row class="rw">
      <van-col span="12" offset="12">注意：一经确定，无法修改</van-col>
    </van-row>
    <!-- <van-row v-if="dataForm.saleType == 1">
      <van-col span="24"><Percent ref="percent"></Percent></van-col>
    </van-row> -->
    <template #body-bottom class="wrap">
      <van-row>
        <van-col span="8" offset="8">
          <van-button type="primary" text="确定" block @click="sure" size="mini"></van-button>
        </van-col>
      </van-row>
    </template>
  </AppLayout>
</template>

<script>
import Info from "../components/info";
// import Percent from "../components/percent";
export default {
  components: {
    Info
  },
  data() {
    return {
      obj: [],
      dataForm: {
        info: {},
        saleType: "2"
      }
    };
  },
  created() {
    debugger;
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
    sure() {
      //       {
      // 	"amount": 0,
      // 	"ids": [],
      // 	"operateType": 0,
      // 	"percent": 0,
      // 	"saleType": 0,
      // 	"targetOperatorId": 0
      // }
      if (this.getOperationType == 0) {
        // 电池
        let params = {
          operateType: 2,
          amount: 0,
          ids: this.getSelectedBatteryInfo.ids,
          percent: 0,
          saleType: this.dataForm.saleType,
          targetOperatorId: 0
        };
        debugger;
        this.$apis.battery.operate(params).then(res => {
          if (res.code == "1") {
            this.$toast.success(res.msg);
            this.$router.push({ path: "/store" });
          } else {
            this.$toast.fail(res.msg);
          }
        });
      } else {
        // 电桩
        let params = {
          operateType: 2,
          amount: 0,
          ids: this.getSelectedPileInfo.ids,
          percent: 0,
          saleType: this.dataForm.saleType,
          targetOperatorId: 0
        };
        debugger;
        this.$apis.pile.operate(params).then(res => {
          if (res.code == "1") {
            this.$toast.success(res.msg);
            this.$router.push({ path: "/store" });
          } else {
            this.$toast.fail(res.msg);
          }
        });
      }
    }
  }
};
</script>
<style lang="less" scoped>
.rw {
  background-color: #fff;
  color: #000;
  font-size: 14px;
  .rw-right {
    color: #000;
  }
  .rw-let {
    color: #000;
    text-align: left;
  }
}
</style>
