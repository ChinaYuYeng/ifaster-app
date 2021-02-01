<template>
  <AppLayout>
    <PileList :columns="columns" :result="dataForm" :hasArrow="false" :useRoute="false" imgProp="img"></PileList>
    <Panel>
      <tmap></tmap>
      <statusList></statusList>
    </Panel>
    <Panel>
      <listItem :listColumns="listColumns1" :listData="listData1" routePath="/battery/edit"></listItem>
    </Panel>
    <Panel>
      <listItem :listColumns="listColumns2" :listData="listData2" routePath="/battery/log"></listItem>
    </Panel>
  </AppLayout>
</template>

<script>
import tmap from "../components/map";
import statusList from "../components/status_list";
import listItem from "../components/list-item";
export default {
  data() {
    return {
      columns: [
        { label: "编号1", prop: "a" },
        { label: "编号2", prop: "b" },
        { label: "编号3", prop: "c" },
        { label: "编号4", prop: "d" }
      ],
      dataForm: [
        {
          a: "123",
          b: "222",
          c: "331",
          d: "3123",
          img: require("../testImg/index-bac.png")
        }
      ],
      listColumns1: [
        {
          label: "名称1",
          prop: "a1",
          islink: true
        },
        {
          label: "名称2",
          prop: "a2"
        },
        {
          label: "名称3",
          prop: "a3",
          islink: true
        },
        {
          label: "名称4",
          prop: "a4"
        },
        {
          label: "名称5",
          prop: "a5"
        }
      ],
      listData1: {
        a1: "111",
        a2: "222",
        a3: "333",
        a4: "444",
        a5: "555"
      },
      listColumns2: [
        {
          label: "操作日志",
          prop: "a1",
          islink: true
        },
        {
          label: "名称2",
          prop: "a2"
        }
      ],
      listData2: {
        a1: "111",
        a2: "222"
      }
    };
  },
  components: {
    tmap,
    statusList,
    listItem
  }
};
</script>
<style></style>
