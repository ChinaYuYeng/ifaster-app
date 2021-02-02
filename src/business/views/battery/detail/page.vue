<template>
  <AppLayout>
    <van-cell>
      <pileList :columns="columns" :item1="dataForm" :hasArrow="false" :useRoute="false"></pileList>
    </van-cell>

    <Panel @touchmove.native.stop.prevent>
      <div id="rentMar__map" style="width:100%; height:100px;"></div>
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
      <listItem :listColumns="listColumns1" :listData="dataForm" routePath="/battery/edit"></listItem>
    </Panel>
    <Panel>
      <listItem :listColumns="listColumns2" :listData="dataForm" routePath="/battery/log"></listItem>
    </Panel>
    <Panel style="margin-top:10px">
      <listItem :listColumns="listColumns3" :listData="dataForm"></listItem>
    </Panel>
  </AppLayout>
</template>

<script>
import statusList from "../components/status_list";
import listItem from "../components/list-item";
import pileList from "../components/pileList";
export default {
  data() {
    return {
      columns: [
        { label: "电池编号", prop: "id" },
        { label: "电池imei", prop: "imei" },
        { label: "电池类型", prop: "model" }
      ],
      dataForm: {},
      listColumns1: [
        {
          label: "所属门店",
          prop: "onRentPointName",
          islink: true
        },
        {
          label: "设备名称",
          prop: "remark"
        },
        {
          label: "当前温度",
          prop: "temperature"
        },
        {
          label: "充电次数",
          prop: "chargeTimes"
        },
        {
          label: "当前电压",
          prop: "acurrentVoltage5"
        },
        {
          label: "当前容量",
          prop: "currentCapacity"
        }
      ],
      listColumns2: [
        {
          label: "操作日志",
          prop: "unlock_time",
          islink: true
        }
      ],
      listColumns3: [
        {
          label: "租赁状态",
          prop: "rentStatusDesc",
          islink: true
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
  },
  mounted() {
    AMapLoader.load({
      key: "21a1ca7e415887a172fe8399bd114b28",
      version: "2.0"
    }).then(AMap => {
      new AMap.Map("rentMar__map", {
        zoom: 11,
        center: [107.4976, 32.1697]
      });
    });
  },
  methods: {
    getOnlineStatus() {
      let id = this.getbatteryDetail.id;
      this.$apis.online({ id: id }).then(res => {
        console.log(res.msg);
      });
    },
    forceUnlock() {},
    temporaryUnlock() {},
    getBatteryDetail() {
      let id = this.getbatteryInfo.id;
      this.$apis.detail({ id: id }).then(res => {
        console.log(res.data);
        this.dataForm = res.data;
        this.saveDetail(res.data);
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
