<template>
  <AppLayout ref="report__wrap">
    <PileList :columns="list" :result="dataform" :imgProp="msg"></PileList>
  </AppLayout>
</template>

<script>
import bac from "./testImg/index-bac.png";
export default {
  data() {
    return {
      bac,
      msg: "img",
      list: [
        { label: "编号编号", prop: "axc" },
        { label: "编号", prop: "sss" },
        { label: "编号", prop: "abc" },
        { label: "id", prop: "id" }
      ],
      dataform: [
        { axc: "1", sss: "2", abc: "123", aaa: "ee", img: require("./testImg/index-bac.png"), id: "1" },
        { axc: "33333", sss: "4", abc: "444", aaa: "wfw", img: require("./testImg/index-bac.png"), id: "2" }
      ]
    };
  }
};
</script>

<style></style>
