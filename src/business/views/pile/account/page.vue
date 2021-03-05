<template>
  <AppLayout>
    <van-cell>
      <pileList :columns="columns" :item1="topData" :hasArrow="false" :useRoute="false" imgProp="chargeFeeTemplateImg"></pileList>
    </van-cell>
    <Panel>
      <div v-for="(item, index) in accountList" :key="index" style="margin-top:20px">
        <span>{{ item.operatorName }}</span>
        <van-cell title="分账比例(%)" :value="item.percent * 100"></van-cell>
        <van-cell title="单次金额上限(长租)" :value="item.amount"></van-cell>
      </div>
    </Panel>
  </AppLayout>
</template>

<script>
import pileList from "../components/pileList";
export default {
  components: {
    pileList
  },
  data() {
    return {
      accountList: {},
      topData: {},
      columns: [
        { label: "电桩编号", prop: "number" },
        { label: "所在地点", prop: "address" },
        { label: "收费模板", prop: "chargeFeeTemplateName" },
        { label: "状态", prop: "chargeStatusDesc" }
      ]
    };
  },
  created() {
    this.topData = this.$route.params.data;
    this.getAccount();
  },
  methods: {
    getAccount() {
      this.$apis.account({ id: this.getPileInfo.id }).then(res => {
        this.accountList = res.data;
      });
    }
  }
};
</script>

<style></style>
