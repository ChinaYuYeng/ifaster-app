<template>
  <AppLayout :onRefresh="onRefresh">
    <LoadList :loadStatus="loadStatus">
      <van-cell is-link center @click="routerTo({ name: '/rentMar/detail/assign/detail' })" v-for="item in dataList" :key="item.id">
        <UserInfo>
          <span style="font-size:12px;line-height: 12px;">{{ item.name }}</span>
          <span style="font-size:12px;line-height: 12px;">{{ item.mobile }}</span>
        </UserInfo>
      </van-cell>
    </LoadList>
    <template #body-bottom>
      <van-button text="新增分佣人员" @click="routerTo({ name: '/rentMar/detail/assign/add' })"></van-button>
    </template>
  </AppLayout>
</template>

<script>
import loadList from "@@/mixins/loadList";
export default {
  mixins: [loadList],
  created() {
    this.setListLoader(this.$apis.getAssignList);
  },
  methods: {
    onRefresh() {
      return this.setListLoader();
    }
  }
};
</script>

<style lang="less" scoped></style>
