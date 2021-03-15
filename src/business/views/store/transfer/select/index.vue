<template>
  <AppLayout>
    <template #body-top>
      <van-search
        label="手机号："
        shape="round"
        placeholder="请输入对方手机号码"
        left-icon=""
        maxlength="11"
        @search="onSearch"
        v-model="searchForm.mobile"
      >
        <template #right-icon>
          <van-icon name="search" @click="onSearch" />
        </template>
      </van-search>
    </template>
    <van-cell center v-for="item in dataList" :key="item.id">
      <UserInfo>
        <span style="font-size:12px;line-height: 12px;">{{ item.name }}</span>
        <span style="font-size:12px;line-height: 12px;">{{ item.mobile }}</span>
        <template #otherInfo>
          <van-button text="调拨" size="mini" @click="transfer(item.id)"></van-button>
        </template>
      </UserInfo>
    </van-cell>
  </AppLayout>
</template>

<script>
export default {
  data() {
    return {
      searchForm: { mobile: "" },
      dataList: []
    };
  },
  created() {
    this.dataList = [];
  },
  methods: {
    onSearch() {
      if (this.searchForm.mobile.length < 6) {
        this.$toast("最少输入6位数字");
        return;
      }
      this.$apis.search({ ...this.searchForm }).then(res => {
        this.dataList = res.data;
      });
    },
    transfer(id) {
      if (this.getOperationType == 0) {
        // 电池
        let params = {
          operateType: 1,
          amount: this.getSelectedBatteryInfo.limit,
          ids: this.getSelectedBatteryInfo.ids,
          percent: this.getSelectedBatteryInfo.subPercent / 100,
          saleType: 0,
          targetOperatorId: id
        };
        this.$apis.battery.operate(params).then(res => {
          if (res.code == "1") {
            this.$toast.success(res.msg);
            this.$router.push({ path: "/store" });
          } else {
            this.$toast.fail(res.msg);
          }
        });
      } else {
        // 电桩
        let params = {
          operateType: 1,
          amount: this.getSelectedPileInfo.limit,
          ids: this.getSelectedPileInfo.ids,
          percent: this.getSelectedPileInfo.subPercent / 100,
          saleType: 0,
          targetOperatorId: id
        };
        this.$apis.pile.operate(params).then(res => {
          if (res.code == "1") {
            this.$toast.success(res.msg);
            this.$router.push({ path: "/store" });
          } else {
            this.$toast.fail(res.msg);
          }
        });
      }
    }
  }
};
</script>

<style lang="less" scoped></style>
