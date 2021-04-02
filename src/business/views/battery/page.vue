<template>
  <AppLayout ref="report__wrap" :showHeader="true" :onRefresh="onRefresh" @onshow="onRefresh">
    <LoadList :loadStatus="loadStatus">
      <van-cell v-for="(item, index) in dataList" :key="index" @click="goDetail(item)">
        <pileList :columns="list" :item1="item" imgProp="rentFeeTemplateImg"></pileList>
      </van-cell>
    </LoadList>
    <template #search="scope">
      <Search
        v-on:setSearchForm="resetForm"
        :onSearch="onSearch.bind(this, scope)"
        :model="modelList"
        :point="pointList"
        :searchForm="searchForm"
      ></Search>
    </template>
  </AppLayout>
</template>

<script>
import Search from "./components/search";
import loadList from "@@/mixins/loadList";
import pileList from "./components/pileList";
export default {
  mixins: [loadList],
  components: {
    Search,
    pileList
  },
  data() {
    return {
      modelList: [],
      pointList: [],
      searchForm: {
        operator: "",
        imei: "",
        isOnline: [],
        model: [],
        number: "",
        onRentPointId: [],
        rentFeeTemplateId: [],
        rentStatus: [],
        type: [2, 3],
        isError: []
      },
      list: [
        { label: "电池imei", prop: "imei", aprop: "soc" },
        { label: "所属门店", prop: "onRentPointName" },
        { label: "收费模板", prop: "rentFeeTemplateName" },
        { label: "设备关系", prop: "operatorBatteryDesc" },
        { label: "设备状态", prop: "isOnlineDesc", aprop: "rentStatusDesc", bprop: "errorDesc" }
      ],
      dataform: []
    };
  },
  activated() {
    this.getModel();
    this.getPoint();
    this.resetForm();
    this.saveFlag(this.$route.params.flag);
    if (this.$route.params.rentStatus) {
      let { id, rentStatus } = this.$route.params;
      this.searchForm.onRentPointId = id || [];
      this.searchForm.rentStatus = rentStatus || [];
    }
    this.searchForm.operator = this.$route.params.operId || "";

    this.setListLoader(paging => {
      return this.$apis.list({ ...this.searchForm, ...paging });
    });
  },
  beforeDestroy() {
    this.setFlag("");
  },
  methods: {
    onRefresh() {
      return this.setListLoader();
    },
    onSearch({ close }) {
      return this.setListLoader().then(close);
    },
    getModel() {
      this.$apis.batteryModel({}).then(res => {
        this.modelList = res.data;
      });
    },
    resetForm() {
      this.searchForm = {
        operator: "",
        imei: "",
        isOnline: [],
        model: [],
        number: "",
        onRentPointId: [],
        rentFeeTemplateId: [],
        rentStatus: [],
        type: [2, 3],
        isError: []
      };
    },
    getPoint() {
      this.$apis.batteryPoint({}).then(res => {
        this.pointList = res.data;
      });
    },
    goDetail(item) {
      this.saveMessage(item);
      this.$router.push("/battery/detail");
    }
  }
};
</script>

<style></style>
