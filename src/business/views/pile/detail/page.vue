<template>
  <AppLayout ref="report__wrap">
    <!-- {{ this.$route.query.data }} -->
    <pileList :columns="columns" :result="dataForm" :hasArrow="false" :useRoute="false" imgProp="chargeFeeTemplateImg"></pileList>
    <Panel>
      <tmap></tmap>
      <statusList></statusList>
    </Panel>
    <Panel style="margin-top:10px">
      <listItem :listColumns="listColumns1" :listData="listData" routePath="/pile/edit"></listItem>
    </Panel>
    <Panel style="margin-top:10px">
      <listItem :listColumns="listColumns2" :listData="listData" routePath=""></listItem>
    </Panel>
  </AppLayout>
</template>

<script>
import tmap from "../components/map";
import statusList from "../components/status_list";
import listItem from "../components/list-item";
import pileList from "../components/pileList";
export default {
  data() {
    return {
      msg: "img",
      columns: [
        { label: "电桩编号", prop: "number" },
        { label: "所在地点", prop: "address" },
        { label: "收费模板", prop: "chargeFeeTemplateName" },
        { label: "状态", prop: "chargeStatus" }
      ],
      dataForm: [],
      listColumns1: [
        {
          label: "电桩名称",
          prop: "name",
          islink: true
        },
        {
          label: "电桩编号",
          prop: "number"
        },
        {
          label: "详细地址",
          prop: "address",
          islink: true
        },
        {
          label: "充电次数",
          prop: "chargeTimes"
        },
        {
          label: "租赁充电",
          prop: "rentChargeTimes"
        }
      ],
      listColumns2: [
        {
          label: "收费模板",
          prop: "chargeFeeTemplateName"
        },
        {
          label: "分账",
          prop: "a5"
        },
        {
          label: "运营",
          prop: "a5"
        }
      ],
      listData: {}
    };
  },
  created() {
    this.getDetail();
  },
  methods: {
    getDetail() {
      let id = this.$route.query.data.id;
      this.$apis.detail({ id: id }).then(res => {
        this.dataForm.push(res.data);
        this.listData = res.data;
      });
    },
    getDataForm(data) {
      this.listData = data;
      console.log(data);
    }
  },
  components: {
    tmap,
    statusList,
    listItem,
    pileList
  }
};
</script>

<style></style>
