<template>
  <AppLayout>
    <template #body-top>
      <van-search placeholder="请输入对方手机号码" v-model="searchForm.mobile" @search="onSearch" />
    </template>
    <LoadList :loadStatus="loadStatus">
      <van-cell center v-for="item in dataList" :key="item.id">
        <UserInfo>
          <span style="font-size:12px;line-height: 12px;">{{ item.cnName }}</span>
          <span style="font-size:12px;line-height: 12px;">{{ item.mobile }}</span>
          <template #otherInfo>
            <van-button text="添加" size="mini" @click="add(item)"></van-button>
          </template>
        </UserInfo>
      </van-cell>
    </LoadList>
    <template #body-bottom>
      <van-button text="邀请人员" @click="routerTo({ name: '/rentMar/detail/assign/invite' })"></van-button>
    </template>
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
      return this.$apis.getIviteList({ ...this.searchForm, ...paging });
    });
  },
  methods: {
    onSearch() {
      return this.setListLoader().then(close);
    },
    add(item) {
      this.routerTo({ name: "/rentMar/detail/assign/add/edit", params: item });
    }
  },
  watch: {
    "searchForm.mobile"() {
      clearTimeout(this.timer);
      this.timer = setTimeout(this.onSearch, 500);
    }
  }
};
</script>

<style lang="less" scoped></style>
