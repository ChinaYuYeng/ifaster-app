<template>
  <AppLayout ref="report__wrap" :showHeader="true" :onRefresh="onRefresh">
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
        imei: "",
        isOnline: [],
        model: "",
        number: "",
        onRentPointId: [],
        rentFeeTemplateId: [],
        rentStatus: [],
        type: []
      },
      list: [
        { label: "电池imei", prop: "imei" },
        { label: "所属门店", prop: "onRentPointName" },
        { label: "收费模板", prop: "rentFeeTemplateName" },
        { label: "租赁状态", prop: "rentStatusDesc" }
      ],
      dataform: []
    };
  },
  activated() {
    this.getModel();
    this.getPoint();
    let { id, rentStatus } = this.$route.params;
    this.searchForm.onRentPointId = id || [];
    this.searchForm.rentStatus = rentStatus || [];
    this.setListLoader(paging => {
      return this.$apis.list({ ...this.searchForm, ...paging });
    });
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
        mobile: "",
        rentPointId: "",
        status: ""
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
