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
    <LoadList :loadStatus="loadStatus">
      <van-cell center v-for="item in dataList" :key="item.id">
        <UserInfo>
          <span style="font-size:12px;line-height: 12px;">{{ item.name }}</span>
          <span style="font-size:12px;line-height: 12px;">{{ item.mobile }}</span>
          <template #otherInfo>
            <van-button text="调拨" size="mini"></van-button>
          </template>
        </UserInfo>
      </van-cell>
    </LoadList>
  </AppLayout>
</template>

<script>
import loadList from "@@/mixins/loadList";
export default {
  mixins: [loadList],
  data() {
    return {
      searchForm: { mobile: "" }
    };
  },
  created() {
    this.setListLoader(paging => {
      return this.$apis.search({ ...this.searchForm, ...paging });
    });
  },
  methods: {
    onSearch() {
      return this.setListLoader().then(close);
    }
  }
};
</script>

<style lang="less" scoped></style>
