<template>
  <AppLayout ref="report__wrap" :showHeader="true" :onRefresh="onRefresh">
    <p class="total__num">合计数量:{{ this.total }}</p>
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
        { label: "电桩IMEI", prop: "imei" },
        { label: "所在地点", prop: "address" },
        { label: "收费模板", prop: "chargeFeeTemplateName" },
        { label: "状态", prop: "chargeStatusDesc" },
        { label: "设备关系", prop: "operatorPileDesc" }
      ],
      searchForm: {
        operator: "",
        address: "",
        chargeFeeTemplateId: "",
        chargeStatus: [],
        isOnline: [],
        model: "",
        name: "",
        imei: "",
        status: [],
        type: [2, 3]
      },
      dataList: []
    };
  },
  activated() {
    this.setFlag(this.$route.params.flag);
    console.log(this.getFlag);
    this.searchForm.operator = this.$route.params.operId || "";
    this.setListLoader(paging => {
      return this.$apis.list({ ...this.searchForm, ...paging });
    });
    this.getModel();
    this.getTemp();
    this.resetForm();
  },
  beforeDestroy() {
    this.setFlag("");
    console.log(this.getFlag);
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
        operator: "",
        address: "",
        chargeFeeTemplateId: "",
        chargeStatus: [],
        isOnline: [],
        model: "",
        name: "",
        imei: "",
        status: [],
        type: [2, 3]
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

<style scoped>
.total__num {
  text-align: center;
  width: 100%;
}
</style>
