<template>
  <AppLayout ref="report__wrap" :showHeader="true">
    <LoadList :loadData="onLoad" class="pile">
      <PileList :routeData="data" :routePath="path" :columns="list" :result="dataform" :imgProp="msg" class="pile"></PileList>
    </LoadList>
    <!-- <template #search>
      <Search :formData="searchForm"></Search>
    </template> -->
  </AppLayout>
</template>

<script>
import bac from "./testImg/index-bac.png";
// import Search from "./components/search";
export default {
  data() {
    return {
      bac,
      msg: "img",
      path: "/battery/detail",
      data: "id",
      list: [
        { label: "电池编号1", prop: "axc" },
        { label: "电池编号2", prop: "sss" },
        { label: "电池编号3", prop: "abc" },
        { label: "电池编号4", prop: "id" }
      ],
      dataform: [
        { axc: "1", sss: "2", abc: "123", aaa: "ee", img: require("./testImg/index-bac.png"), id: "1" },
        { axc: "33333", sss: "4", abc: "444", aaa: "wfw", img: require("./testImg/index-bac.png"), id: "2" },
        { axc: "33333", sss: "4", abc: "444", aaa: "wfw", img: require("./testImg/index-bac.png"), id: "2" },
        { axc: "33333", sss: "4", abc: "444", aaa: "wfw", img: require("./testImg/index-bac.png"), id: "2" },
        { axc: "33333", sss: "4", abc: "444", aaa: "wfw", img: require("./testImg/index-bac.png"), id: "2" },
        { axc: "33333", sss: "4", abc: "444", aaa: "wfw", img: require("./testImg/index-bac.png"), id: "2" },
        { axc: "33333", sss: "4", abc: "444", aaa: "wfw", img: require("./testImg/index-bac.png"), id: "2" },
        { axc: "33333", sss: "4", abc: "444", aaa: "wfw", img: require("./testImg/index-bac.png"), id: "2" }
      ]
    };
  },
  //   components: {
  //     Search
  //   },
  methods: {
    onLoad() {
      return new Promise(resolve => {
        setTimeout(() => {
          this.dataform.push({ axc: "33333", sss: "4", abc: "444", aaa: "wfw", img: require("./testImg/index-bac.png"), id: "2" });
          resolve();
        }, 1000);
      });
    }
  }
};
</script>

<style></style>
