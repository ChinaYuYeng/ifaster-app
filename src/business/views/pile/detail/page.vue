<template>
  <AppLayout ref="report__wrap" @onshow="onRefresh">
    <van-cell>
      <pileList :columns="columns" :item1="dataForm" :hasArrow="false" :useRoute="false" imgProp="chargeFeeTemplateImg"></pileList>
    </van-cell>
    <Panel @touchmove.native.stop.prevent>
      <div id="rentMar__map" style="width:100%; height:200px;"></div>
    </Panel>
    <Panel>
      <statusList
        :statusData="this.getPileDetail"
        :getOnlineStatus="getOnlineStatus"
        :setOperateStatus="setOperateStatus"
        :getUseStatus="getUseStatus"
      ></statusList>
    </Panel>
    <Panel style="margin-top:10px">
      <van-cell title="电桩名称" :value="listData.name" is-link @click="nameEdit"></van-cell>
      <van-cell title="详细地址" :value="listData.address" is-link @click="addressEdit"></van-cell>
      <listItem :listColumns="listColumns1" :listData="listData" routePath="/pile/edit"></listItem>
    </Panel>
    <Panel style="margin-top:10px">
      <listItem :listColumns="listColumns2" :listData="listData" routePath=""></listItem>
      <van-cell title="分账" is-link @click="checkAccount"></van-cell>
    </Panel>
    <van-popup v-model="isShowPicker" position="bottom" :style="{ height: '50%', width: '100%' }">
      <van-picker show-toolbar title="选择运营状态" :columns="selectList" @cancel="onCancel" @confirm="onConfirm" />
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
      selectList: ["停运", "暂时关闭", "正常"],
      status: "",
      columns: [
        { label: "电桩编号", prop: "number" },
        { label: "所在地点", prop: "address" },
        { label: "收费模板", prop: "chargeFeeTemplateName" },
        { label: "状态", prop: "chargeStatusDesc" }
      ],
      dataForm: {},
      listColumns1: [
        {
          label: "电桩编号",
          prop: "number"
        },
        {
          label: "充电次数(次)",
          prop: "chargeTimes"
        },
        {
          label: "租赁充电(次)",
          prop: "rentChargeTimes"
        }
      ],
      listColumns2: [
        {
          label: "收费模板",
          prop: "chargeFeeTemplateName",
          islink: true
        },
        {
          label: "运营",
          prop: "",
          islink: true
        }
      ],
      listData: {}
    };
  },
  created() {
    console.log(this.getPileInfo);
    this.dataForm = this.getPileInfo;
    this.getDetail();
  },
  mounted() {
    // this.getDetail();
    setTimeout(() => {
      this.initMap();
    }, 600);
  },
  methods: {
    onRefresh() {
      this.getDetail().then(this.initMap);
    },
    nameEdit() {
      if (this.getFlag) {
        this.$toast.fail("当前权限不可操作");
      } else {
        this.$router.push({ name: "/pile/edit", params: { data: this.listData, flag: "name" } });
      }
    },
    addressEdit() {
      if (this.getFlag) {
        this.$toast.fail("当前权限不可操作");
      } else {
        this.$router.push({ name: "/pile/edit", params: { data: this.listData, flag: "address" } });
      }
    },
    checkAccount() {
      if (this.getFlag) {
        this.$toast.fail("当前权限不可操作");
      } else {
        this.$router.push({ name: "/pile/account", params: { data: this.dataForm } });
      }
    },
    getOnlineStatus() {
      if (this.getFlag) {
        this.$toast.fail("当前权限不可操作");
      } else {
        this.$apis.online({ id: this.getPileInfo.id }).then(res => {
          if (res.code == 1) {
            this.$toast.success("在线状态检测成功！");
            this.getDetail();
          } else {
            this.$toast.fail("在线状态检测出错！");
          }
          // console.log(res.msg);
        });
      }
    },
    getUseStatus() {
      if (this.getFlag) {
        this.$toast.fail("当前权限不可操作");
      } else {
        this.$apis.use({ id: this.getPileInfo.id }).then(res => {
          if (res.code == 1) {
            this.$toast.success("使用状态刷新成功！");
            this.getDetail();
          } else {
            this.$toast.fail("使用状态检测出错！");
          }
        });
      }
    },
    setOperateStatus() {
      if (this.getFlag) {
        this.$toast.fail("当前权限不可操作");
      } else {
        this.isShowPicker = true;
      }
    },
    onConfirm(value, index) {
      this.status = index - 1;
      console.log(this.status);
      this.$apis.operate({ id: this.getPileDetail.id, status: this.status }).then(res => {
        if (res.code == 1) {
          this.$toast.success("运营状态设置成功！");
          this.getDetail();
        } else {
          this.$toast.fail("运营状态检测出错！");
        }
      });
      this.status = "";
      this.isShowPicker = false;
    },
    onCancel() {
      this.isShowPicker = false;
    },
    getDetail() {
      let id = this.getPileInfo.id;
      this.$apis.detail({ id: id }).then(res => {
        this.listData = res.data;
        this.saveDetail(res.data);
      });
    },
    initMap() {
      const lnglat = [this.listData.lng || 120.755511, this.listData.lat || 30.746992];
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
