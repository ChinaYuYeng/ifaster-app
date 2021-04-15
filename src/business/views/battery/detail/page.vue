<template>
  <AppLayout>
    <van-cell>
      <pileList :columns="columns" :item1="dataForm" :hasArrow="false" imgProp="rentFeeTemplateImg"></pileList>
    </van-cell>
    <Panel @touchmove.native.stop.prevent>
      <div id="battery__map" style="width:100%; height:200px;"></div>
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
      <van-cell title="电池下架" is-link @click="batteryOff"></van-cell>
      <van-cell title="前往导航" is-link @click="goNavigation"></van-cell>
      <van-cell title="操作日志" :value="dataForm.unlock_time" is-link @click="checkLog"></van-cell>
      <listItem :listColumns="listColumns1" :listData="dataForm"></listItem>
    </Panel>
    <Panel style="margin-top:10px">
      <listItem :listColumns="listColumns2" :listData="dataForm"></listItem>
    </Panel>
    <Panel style="margin-top:10px">
      <van-cell title="收费模板" :value="dataForm.rentFeeTemplateName"></van-cell>
      <van-cell title="分账" is-link @click="checkAccount"></van-cell>
      <van-cell title="运营" is-link></van-cell>
    </Panel>
    <van-popup v-model="isShowPicker1" position="bottom" :style="{ height: '50%', width: '100%' }">
      <van-picker show-toolbar title="设置解锁/锁定" :columns="selectColumn1" @confirm="onConfirm1" @cancel="onCancel1" />
    </van-popup>
    <van-popup v-model="isShowPicker" position="bottom" :style="{ height: '50%', width: '100%' }">
      <van-picker show-toolbar title="请选择临时解锁时间" :columns="selectColumn2" @confirm="onConfirm2" @cancel="onCancel2" />
    </van-popup>
    <van-dialog
      v-model="show"
      title="下架电池"
      message="是否下架该电池"
      confirm-button-text="确定"
      confirm-button-color="#55babb"
      cancel-button-text="取消"
      cancel-button-color="grey"
      show-cancel-button
      :before-close="beforeClose"
    ></van-dialog>
  </AppLayout>
</template>

<script>
import statusList from "../components/status_list";
import listItem from "../components/list-item";
import pileList from "../components/pileList";
export default {
  data() {
    return {
      show: false,
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
          prop: "rentFeeTemplateName"
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
        },
        {
          label: "异常状态",
          prop: "errorDesc"
        },
        {
          label: "上传时间",
          prop: "updateTime"
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
    }, 500);
  },
  methods: {
    batteryPutOn() {
      if (this.getFlag) {
        this.$toast.fail("当前权限不可操作！");
      } else {
        if (this.dataForm.relationType == 1) {
          if (this.dataForm.rentFeeTemplateId == 0) {
            this.$router.push({ name: "/battery/puton", params: { data: this.dataForm } });
          } else {
            this.$toast.fail("该电池已上架，不可重复上架！");
          }
        } else {
          this.$toast.fail("当前用户不是运营人员，无法操作！");
        }
      }
    },
    batteryOff() {
      if (this.getFlag) {
        this.$toast.fail("当前权限不可操作！");
      } else {
        if (this.dataForm.relationType == 1) {
          if (this.dataForm.rentFeeTemplateId !== 0) {
            this.show = true;
          } else {
            this.$toast.fail("该电池未上架！");
          }
        } else {
          this.$toast.fail("当前用户不是运营人员，无法操作！");
        }
      }
    },
    beforeClose(action, done) {
      if (this.getFlag) {
        this.$toast.fail("当前权限不可操作！");
      } else {
        if (action === "confirm") {
          // console.log(this.id);
          this.$apis.Off({ ids: [this.dataForm.id] }).then(res => {
            if (res.code == 1) {
              this.$toast.success("电池已下架");
              this.getBatteryDetail();
              done();
            } else {
              this.$toast.fail("电池下架失败");
              done();
            }
          });
        } else if (action === "cancel") {
          done();
        }
      }
    },
    checkLog() {
      if (this.getFlag) {
        this.$toast.fail("当前权限不可操作！");
      } else {
        if (this.dataForm.relationType == 1) {
          this.$router.push({ name: "/battery/log", params: { data: this.dataForm } });
        } else {
          this.$toast.fail("当前用户不是运营人员，无法操作！");
        }
      }
    },
    checkAccount() {
      if (this.getFlag) {
        this.$toast.fail("当前权限不可操作！");
      } else {
        this.$router.push({ name: "/battery/account", params: { data: this.dataForm } });
      }
    },
    selectItem(item) {
      this.dataForm.onRentPointName = item.name;
    },
    getOnlineStatus() {
      //刷新在线状态
      if (this.getFlag) {
        this.$toast.fail("当前权限不可操作！");
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
      //运营商强锁
      if (this.getbatteryDetail.relationType != -1) {
        this.isShowPicker1 = true;
      } else {
        this.$toast.fail("当前权限不可操作!");
      }
    },
    temporaryUnlock() {
      //运营商临时改变锁状态
      if (this.getFlag) {
        this.$toast.fail("当前权限不可操作!");
      } else {
        this.isShowPicker = true;
      }
    },
    setSelectColumn2() {
      //临时解锁时间选择
      for (let i = 0; i < 25; i++) {
        this.selectColumn2[0].values.push(i + "小时");
      }
      for (let i = 0; i < 59; i++) {
        this.selectColumn2[1].values.push(i + "分钟");
      }
    },
    onConfirm1(index, value) {
      //运营商强锁确定
      this.$apis.force({ batteryId: this.getbatteryInfo.id, forceLockStatus: value[0] }).then(res => {
        if (res.code == 1) {
          this.$toast.success("运营商强锁成功！");
          this.getBatteryDetail();
          this.isShowPicker1 = false;
        } else {
          this.$toast.success("运营商强锁失败！");
          this.isShowPicker1 = false;
        }
      });
    },
    onCancel() {
      this.isShowPicker = false;
    },
    onCancel1() {
      this.isShowPicker1 = false;
    },
    onConfirm2(index, value) {
      //运营商临时解锁选择时间
      let min = value[0] * 60 + value[1];
      // console.log(min);
      if (min == 0) {
        this.$apis
          .temporaryLock({
            batteryId: this.getbatteryInfo.id,
            temporaryLockStatus: 1
          })
          .then(res => {
            if (res.code == 1) {
              this.$toast.success("运营商临时锁定成功！");
              this.getBatteryDetail();
              this.isShowPicker = false;
            } else {
              this.$toast.success("运营商临时锁定失败！");
              this.isShowPicker = false;
            }
          });
      } else {
        this.$apis
          .temporary({
            batteryId: this.getbatteryInfo.id,
            temporaryLockStatus: 0,
            temporaryLockTime: min
          })
          .then(res => {
            if (res.code == 1) {
              this.$toast.success("运营商临时解锁成功！");
              this.getBatteryDetail();
              this.isShowPicker = false;
            } else {
              this.$toast.success("运营商临时解锁失败！");
              this.isShowPicker = false;
            }
          });
      }
    },
    onCancel2() {
      this.isShowPicker = false;
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
      this.divMap = document.createElement("div");
      this.divMap.style.cssText = "width:100%; height:100%;";
      document.getElementById("battery__map").appendChild(this.divMap);
      AMapLoader.load({
        key: "21a1ca7e415887a172fe8399bd114b28",
        version: "2.0"
      }).then(AMap => {
        (this.map = new AMap.Map(this.divMap, {
          zoom: 15,
          center: lnglat
        })).add(
          new AMap.Marker({
            position: lnglat
          })
        );
      });
    },
    goNavigation() {
      if (this.getFlag) {
        this.$toast.fail("当前权限不可操作！");
      } else {
        if (this.dataForm.relationType == 1) {
          const url =
            "https://uri.amap.com/marker?position=" + this.dataForm.lng + "," + this.dataForm.lat + "&src=mypage&coordinate=gaode&callnative=1";
          window.open(url, "_blank");
        } else {
          this.$toast.fail("当前用户不是运营人员，无法操作！");
        }
      }
    }
  },
  components: {
    statusList,
    listItem,
    pileList
  },
  beforeDestroy() {
    this.map && this.map.destroy();
    this.map = null;
    this.divMap.remove();
    this.divMap = null;
  }
};
</script>
<style></style>
