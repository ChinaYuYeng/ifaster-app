<template>
  <AppLayout ref="report__wrap" :showHeader="true" :onRefresh="onRefresh">
    <LoadList :loadStatus="loadStatus">
      <van-cell v-for="(item, index) in dataList" :key="index" @click="goDetail(item)">
        <pileList :columns="list" :item1="item" imgProp="rentFeeTemplateImg"></pileList>
      </van-cell>
    </LoadList>
    <template #search="scope">
      <Search :onSearch="onSearch.bind(this, scope)" :searchForm="searchForm"></Search>
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
      searchForm: {
        imei: "",
        isOnline: "",
        model: "",
        number: "",
        onRentPointId: "",
        rentFeeTemplateId: "",
        rentStatus: "",
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
  created() {
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
    goDetail(item) {
      this.saveMessage(item);
      this.$router.push("/battery/detail");
    }
  }
};
</script>

<style></style>
