<template>
  <AppLayout>
    <template #body-top>
      <van-search
        label="手机号："
        shape="round"
        placeholder="请输入对方手机号码"
        right-icon="search"
        left-icon=""
        @search="onSearch"
        v-model="searchForm.mobile"
      />
    </template>
    <!-- <LoadList :loadStatus="loadStatus"> -->
    <van-cell center v-for="item in dataList" :key="item.id">
      <UserInfo>
        <span style="font-size:12px;line-height: 12px;">{{ item.name }}</span>
        <span style="font-size:12px;line-height: 12px;">{{ item.mobile }}</span>
        <template #otherInfo>
          <van-button text="调拨" size="mini" @click="transfer(item.id)"></van-button>
        </template>
      </UserInfo>
    </van-cell>
    <!-- </LoadList> -->
  </AppLayout>
</template>

<script>
import loadList from "@@/mixins/loadList";
export default {
  mixins: [loadList],
  data() {
    return {
      searchForm: { mobile: "" },
      dataList: []
    };
  },
  created() {
    // this.setListLoader(paging => {
    //   return this.$apis.search({ ...this.searchForm, ...paging });
    // });
    // this.loadStatus.finished = true;
    // this.loadStatus.loading = false;
    this.dataList = [];
    // this.setLoader();
  },
  methods: {
    onSearch() {
      // this.setLoader();
      this.$apis.search({ ...this.searchForm }).then(res => {
        this.dataList = res.data;
      });
    },
    transfer(id) {
      //       {
      // 	"amount": 0,
      // 	"ids": [],
      // 	"operateType": 0,
      // 	"percent": 0,
      // 	"saleType": 0,
      // 	"targetOperatorId": 0
      // }
      debugger;
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
        debugger;
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
          ids: this.getSelectedBatteryInfo.ids,
          percent: this.getSelectedPileInfo.subPercent / 100,
          saleType: 0,
          targetOperatorId: id
        };
        debugger;
        this.$apis.pile.operate(params);
      }
    }
  }
};
</script>

<style lang="less" scoped></style>
