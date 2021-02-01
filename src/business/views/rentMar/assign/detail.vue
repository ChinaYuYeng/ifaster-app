<template>
  <AppLayout>
    <van-cell is-link center>
      <UserInfo>
        <span style="font-size:12px;line-height: 12px;">打发打发</span>
        <span style="font-size:12px;line-height: 12px;">打发打发</span>
      </UserInfo>
    </van-cell>
    <van-form label-width="100px" ref="form" validate-trigger="onSubmit">
      <van-field v-model="dataFrom.name" label="租还点名称：" />
      <van-field v-model="dataFrom.address" label="租还点地址：" />
      <van-field label="异地还车：">
        <template #button>
          <van-switch v-model="dataFrom.yidi" size="20" />
        </template>
      </van-field>
      <van-field label="异点还车：">
        <template #button>
          <van-switch v-model="dataFrom.yidi" size="20" />
        </template>
      </van-field>
      <van-field v-model="dataFrom.price" label="异地还车收费：" />
      <BtnGroup class="mtop10">
        <SubmitBtn text="删除" size="small" :onSubmit="submit" block></SubmitBtn>
        <SubmitBtn text="保存" size="small" :onSubmit="submit" block></SubmitBtn>
      </BtnGroup>
    </van-form>
  </AppLayout>
</template>

<script>
export default {
  data() {
    return {
      dataFrom: {}
    };
  },
  methods: {
    submit() {}
  }
};
</script>

<style lang="less" scoped></style>
