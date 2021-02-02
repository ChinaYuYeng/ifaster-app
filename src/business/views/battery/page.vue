<template>
  <AppLayout ref="report__wrap" :showHeader="true">
    <LoadList :loadData="onLoad" class="pile">
      <van-cell v-for="(item, index) in dataform" :key="index" @click="goDetail(item)">
        <pileList :columns="list" :item1="item"></pileList>
      </van-cell>
    </LoadList>
    <template #search>
      <Search :formData="searchForm"></Search>
    </template>
  </AppLayout>
</template>

<script>
import Search from "./components/search";
import pileList from "./components/pileList";
export default {
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
        type: [],
        pageIndex: 1,
        pageSize: 10
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
  components: {
    Search,
    pileList
  },
  created() {
    this.getBatteryList();
  },
  provide() {
    return {
      parent: this
    };
  },
  methods: {
    onSearch() {
      //写入后台交互
    },
    goDetail(item) {
      this.saveMessage(item);
      this.$router.push("/battery/detail");
    },
    getBatteryList() {
      this.$apis.list(this.searchForm).then(res => {
        this.dataform = res.data.rows;
      });
    },
    onLoad() {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve();
        }, 1000);
      });
    }
  }
};
</script>

<style></style>
