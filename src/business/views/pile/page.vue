<template>
  <AppLayout ref="report__wrap" :showHeader="true">
    <LoadList :loadData="onLoad" class="pile">
      <pileList routePath="/pile/detail" :columns="list" :result="dataList" imgProp="chargeFeeTemplateImg" class="pile"></pileList>
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
        { label: "状态", prop: "chargeStatus" }
      ],
      searchForm: {
        address: "",
        chargeFeeTemplateId: 0,
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
    this.saveMessage({ name: 2 });
    console.log(this.getPileInfo);
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
    getPileList() {
      this.$apis.list(this.searchForm).then(res => {
        this.dataList = res.data.rows;
      });
    },
    onSearch() {
      //写入后台交互
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
