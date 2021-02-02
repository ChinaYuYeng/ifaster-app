<template>
  <AppLayout ref="report__wrap" :showHeader="true">
    <LoadList :loadData="onLoad" class="pile">
      <van-cell v-for="(item, index) in dataList" :key="index" @click="goDetail(item)">
        <pileList routePath="/pile/detail" :columns="list" :item1="item" :result="dataList" imgProp="chargeFeeTemplateImg" class="pile"></pileList>
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
      list: [
        { label: "电桩编号", prop: "number" },
        { label: "所在地点", prop: "address" },
        { label: "收费模板", prop: "chargeFeeTemplateName" },
        { label: "状态", prop: "chargeStatusDesc" }
      ],
      searchForm: {
        address: "",
        chargeFeeTemplateId: "",
        chargeStatus: [],
        isOnline: [],
        model: "",
        name: "",
        number: "",
        status: [],
        type: [],
        pageIndex: 1,
        pageSize: 10
      },
      dataList: []
    };
  },
  created() {
    this.getPileList();
  },
  components: {
    Search,
    pileList
  },
  provide() {
    return {
      parent: this
    };
  },
  methods: {
    goDetail(item) {
      this.saveMessage(item);
      this.$router.push("/pile/detail");
    },
    getPileList() {
      this.$apis.list(this.searchForm).then(res => {
        this.dataList = res.data.rows;
      });
    },
    onSearch() {
      //写入后台交互
      this.getPileList();
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
