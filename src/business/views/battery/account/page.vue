<template>
  <AppLayout>
    <!-- {{ topData }} -->
    <van-cell>
      <pileList :columns="columns" :item1="topData" :hasArrow="false" :useRoute="false" imgProp="rentFeeTemplateImg"></pileList>
    </van-cell>
    <Panel>
      <div v-for="(item, index) in accountList" :key="index" style="margin-top:20px">
        <span>{{ item.operatorName }}</span>
        <van-cell title="分账比例(%)" :value="(item.percent * 100).toFixed()"></van-cell>
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
        { label: "电池编号", prop: "number" },
        { label: "电池imei", prop: "imei" },
        { label: "电池类型", prop: "model" }
      ]
    };
  },
  created() {
    this.topData = this.$route.params.data;
    this.getAccount();
  },
  methods: {
    getAccount() {
      this.$apis.account({ id: this.getbatteryInfo.id }).then(res => {
        this.accountList = res.data;
      });
    }
  }
};
</script>

<style></style>
