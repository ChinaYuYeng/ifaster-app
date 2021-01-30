<template>
  <AppLayout>
    <LoadList>
      <van-cell is-link center @click="routerTo({ name: '/rentMar/detail/assign/detail' })">
        <UserInfo>
          <span style="font-size:12px;line-height: 12px;">打发打发</span>
          <span style="font-size:12px;line-height: 12px;">打发打发</span>
        </UserInfo>
      </van-cell>
      <van-cell is-link center>
        <UserInfo>
          <span style="font-size:12px;line-height: 12px;">打发打发</span>
          <span style="font-size:12px;line-height: 12px;">1213144</span>
        </UserInfo>
      </van-cell>
    </LoadList>
    <template #body-bottom>
      <van-button text="新增分佣人员" @click="routerTo({ name: '/rentMar/detail/assign/add' })"></van-button>
    </template>
  </AppLayout>
</template>

<script>
export default {};
</script>

<style lang="less" scoped></style>
