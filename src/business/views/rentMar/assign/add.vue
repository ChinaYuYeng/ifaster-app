<template>
  <AppLayout>
    <template #body-top>
      <van-search placeholder="请输入对方手机号码" />
    </template>
    <LoadList>
      <van-cell center @click="routerTo({ name: '/rentMar/detail/assign/detail' })">
        <UserInfo>
          <span style="font-size:12px;line-height: 12px;">打发打发</span>
          <span style="font-size:12px;line-height: 12px;">打发打发</span>
          <template #otherInfo>
            <van-button text="添加" size="mini"></van-button>
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
export default {
  data() {
    return {
      dataList: []
    };
  }
};
</script>

<style lang="less" scoped></style>
