<template>
  <AppLayout ref="report__wrap" :showHeader="true" :onRefresh="onRefresh">
    <LoadList :loadStatus="loadStatus">
      <van-cell v-for="(item, index) in dataList" :key="index" @click="goDetail(item)">
        <pileList :columns="list" :item1="item" imgProp="chargeFeeTemplateImg" class="pile"></pileList>
      </van-cell>
    </LoadList>
    <template #search="scope">
      <Search
        v-on:setSearchForm="resetForm"
        :onSearch="onSearch.bind(this, scope)"
        :searchForm="searchForm"
        :model="modelList"
        :template="tempList"
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
      tempList: [],
      list: [
        { label: "电桩编号", prop: "number" },
        { label: "所在地点", prop: "address" },
        { label: "收费模板", prop: "chargeFeeTemplateName" },
        { label: "状态", prop: "chargeStatusDesc" }
      ],
      searchForm: {
        operator: "",
        address: "",
        chargeFeeTemplateId: "",
        chargeStatus: [],
        isOnline: [],
        model: "",
        name: "",
        number: "",
        status: [],
        type: []
      },
      dataList: []
    };
  },
  activated() {
    this.searchForm.operator = this.$route.params.id || "";
    this.setListLoader(paging => {
      return this.$apis.list({ ...this.searchForm, ...paging });
    });
    this.getModel();
    this.getTemp();
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
      this.$router.push("/pile/detail");
    },
    resetForm() {
      this.searchForm = {
        address: "",
        chargeFeeTemplateId: "",
        chargeStatus: [],
        isOnline: [],
        model: "",
        name: "",
        number: "",
        status: [],
        type: []
      };
    },
    getModel() {
      this.$apis.pileModel({}).then(res => {
        this.modelList = res.data;
      });
    },
    getTemp() {
      this.$apis.pileTemp({}).then(res => {
        this.tempList = res.data;
      });
    }
  }
};
</script>

<style></style>
