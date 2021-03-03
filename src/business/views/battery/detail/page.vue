<template>
  <AppLayout>
    <van-cell>
      <pileList :columns="columns" :item1="dataForm" :hasArrow="false" imgProp="rentFeeTemplateImg"></pileList>
    </van-cell>
    <Panel @touchmove.native.stop.prevent>
      <div id="rentMar__map" style="width:100%; height:200px;"></div>
    </Panel>
    <Panel>
      <statusList
        :getOnline="getOnlineStatus"
        :temporaryUnlock="temporaryUnlock"
        :forceUnlock="forceUnlock"
        :statusData="this.getbatteryDetail"
      ></statusList>
    </Panel>
    <Panel style="margin-top:10px">
      <van-cell title="电池上架" is-link @click="batteryPutOn"></van-cell>
      <van-cell title="操作日志" :value="dataForm.unlock_time" is-link @click="checkLog"></van-cell>
      <listItem :listColumns="listColumns1" :listData="dataForm"></listItem>
    </Panel>
    <Panel style="margin-top:10px">
      <listItem :listColumns="listColumns2" :listData="dataForm"></listItem>
    </Panel>
    <Panel style="margin-top:10px">
      <van-cell title="收费模板" :value="dataForm.rentFeeTemplateName"></van-cell>
      <van-cell title="分账" is-link></van-cell>
      <van-cell title="运营" is-link></van-cell>
    </Panel>
    <van-popup v-model="isShowPicker1" position="bottom" :style="{ height: '50%', width: '100%' }">
      <van-picker show-toolbar title="设置解锁/锁定" :columns="selectColumn1" @confirm="onConfirm1" @cancel="onCancel1" />
    </van-popup>
    <van-popup v-model="isShowPicker" position="bottom" :style="{ height: '50%', width: '100%' }">
      <van-picker show-toolbar title="设置解锁/锁定" :columns="selectColumn1" @confirm="onConfirm" @cancel="onCancel" />
    </van-popup>
    <van-popup v-model="isShowPicker2" position="bottom" :style="{ height: '50%', width: '100%' }">
      <van-picker show-toolbar title="请选择临时解锁/锁定时间" :columns="selectColumn2" @confirm="onConfirm2" @cancel="onCancel2" />
    </van-popup>
  </AppLayout>
</template>

<script>
import statusList from "../components/status_list";
import listItem from "../components/list-item";
import pileList from "../components/pileList";
export default {
  data() {
    return {
      isShowPicker: false,
      isShowPicker1: false,
      isShowPicker2: false,
      forceLockStatus: "",
      temporaryLockStatus: "",
      selectColumn1: [
        {
          values: ["解锁", "锁定"],
          defaultIndex: 2
        }
      ],
      selectColumn2: [
        {
          values: [],
          defaultIndex: 1
        },
        {
          values: [],
          defaultIndex: 2
        }
      ],
      columns: [
        { label: "电池编号", prop: "number" },
        { label: "电池imei", prop: "imei" },
        { label: "电池类型", prop: "model" }
      ],
      dataForm: {},
      listColumns1: [
        {
          label: "所处租还点",
          prop: "onRentPointName"
        },
        {
          label: "设备名称",
          prop: "remark"
        },
        {
          label: "当前温度(°C)",
          prop: "temperature"
        },
        {
          label: "充电次数(次)",
          prop: "chargeTimes"
        },
        {
          label: "当前电压(V)",
          prop: "currentVoltage"
        },
        {
          label: "当前容量(Ah)",
          prop: "currentCapacity"
        }
      ],
      listColumns2: [
        {
          label: "租赁状态",
          prop: "rentStatusDesc"
        },
        {
          label: "用户姓名",
          prop: "rentUserName"
        },
        {
          label: "联系电话",
          prop: "rentUserMobile"
        }
      ],
      listColumns4: [
        {
          label: "收费模板",
          prop: "rentFeeTemplateName"
        },
        {
          label: "分账",
          prop: "",
          islink: true
        }
      ],
      listColumns6: [
        {
          label: "运营",
          prop: "",
          islink: true
        }
      ]
    };
  },
  created() {
    this.getBatteryDetail();
    this.setSelectColumn2();
  },
  mounted() {
    this.getBatteryDetail();
    setTimeout(() => {
      this.initMap();
    }, 200);
  },
  methods: {
    batteryPutOn() {
      if (this.getFlag) {
        this.$toast.fail("当前权限不可操作！");
      } else {
        this.$router.push({ name: "/battery/puton", params: { data: this.dataForm } });
      }
    },
    checkLog() {
      if (this.getFlag) {
        this.$toast.fail("当前权限不可操作！");
      } else {
        this.$router.push({ name: "/battery/log", params: { data: this.dataForm } });
      }
    },
    selectItem(item) {
      console.log(item);
      this.dataForm.onRentPointName = item.name;
    },
    getOnlineStatus() {
      if (this.getFlag) {
        this.$toast.fail("当前权限不可操作！");
        // console.log("当前权限不可操作");
      } else {
        let id = this.getbatteryDetail.id;
        this.$apis.online({ id: id }).then(res => {
          if (res.code == 1) {
            this.$toast.success("在线状态刷新成功！");
          } else {
            this.$toast.fail("在线状态刷新失败！");
          }
        });
      }
    },
    forceUnlock() {
      if (this.getbatteryDetail.relationType != -1) {
        this.isShowPicker1 = true;
      } else {
        this.$toast.fail("当前权限不可操作!");
      }
    },
    temporaryUnlock() {
      if (this.getFlag) {
        this.$toast.fail("当前权限不可操作!");
      } else {
        this.isShowPicker = true;
      }
    },
    setSelectColumn2() {
      for (let i = 0; i < 25; i++) {
        this.selectColumn2[0].values.push(i + "小时");
      }
      for (let i = 0; i < 59; i++) {
        this.selectColumn2[1].values.push(i + 1 + "分钟");
      }
    },
    onConfirm1(index, value) {
      this.$apis.force({ batteryId: this.getbatteryInfo.id, forceLockStatus: value[0] }).then(res => {
        console.log(res.msg);
        this.getBatteryDetail();
        this.isShowPicker1 = false;
      });
    },
    onCancel() {
      this.isShowPicker = false;
    },
    onConfirm(index, value) {
      this.temporaryLockStatus = value[0];
      this.isShowPicker = false;
      this.isShowPicker2 = true;
    },
    onCancel1() {
      this.isShowPicker1 = false;
    },
    onConfirm2(index, value) {
      let min = value[0] * 60 + value[1] + 1;
      this.$apis
        .temporary({
          batteryId: this.getbatteryInfo.id,
          temporaryLockStatus: this.temporaryLockStatus,
          temporaryLockTime: min
        })
        .then(res => {
          console.log(res.msg);
        });
      this.isShowPicker2 = false;
    },
    onCancel2() {
      this.isShowPicker2 = false;
    },
    getBatteryDetail() {
      let id = this.getbatteryInfo.id;
      this.$apis.detail({ id: id }).then(res => {
        this.dataForm = res.data;
        this.saveDetail(res.data);
      });
    },
    initMap() {
      const lnglat = [this.dataForm.lng || 120.755511, this.dataForm.lat || 30.746992];
      AMapLoader.load({
        key: "21a1ca7e415887a172fe8399bd114b28",
        version: "2.0"
      }).then(AMap => {
        new AMap.Map("rentMar__map", {
          zoom: 15,
          center: lnglat
        }).add(
          new AMap.Marker({
            position: lnglat
          })
        );
      });
    }
  },
  components: {
    statusList,
    listItem,
    pileList
  }
};
</script>
<style></style>
