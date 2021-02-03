<template>
  <AppLayout>
    <Info :obj="obj" :headImg="defaultImg"></Info>
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
// import SidebarCollapse from "@@/components/sidebarCollapse";
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
    this.dataForm.info = this.getSelectedBatteryInfo;

    this.obj.push({ label: "设备来源：", value: "111" });
    this.obj.push({ label: "分成比例：", value: "222" });
    this.obj.push({ label: "设备型号：", value: "333" });
    this.obj.push({ label: "设备数量：", value: "444" });
  },
  methods: {
    next() {
      // 下一步
      // 保存数据
      debugger;
      let percent = this.$refs.percent.dataForm;
      this.setSelectedBattery({ info: this.dataForm.info, percent: percent });
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
