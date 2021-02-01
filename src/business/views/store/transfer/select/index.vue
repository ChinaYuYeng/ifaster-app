<template>
  <AppLayout>
    <template #body-top>
      <van-search label="手机号：" shape="round" placeholder="请输入对方手机号码" right-icon="search" left-icon="" />
    </template>
    <LoadList>
      <van-cell center @click="search">
        <UserInfo>
          <span style="font-size:12px;line-height: 12px;">打发打发</span>
          <span style="font-size:12px;line-height: 12px;">打发打发</span>
          <template #otherInfo>
            <van-button text="添加" size="mini"></van-button>
          </template>
        </UserInfo>
      </van-cell>
    </LoadList>
  </AppLayout>
</template>

<script>
export default {
  data() {
    return {
      dataList: []
    };
  },
  methods: {
    search() {}
  }
};
</script>

<style lang="less" scoped></style>
