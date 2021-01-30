<template>
  <AppLayout ref="report__wrap">
    <PanelGroup>
      <Panel>
        <UserInfo>
          <span>打发打发</span>
          <span>1213144</span>
          <template #otherInfo>
            <span>打发打发</span>
            <span>1213144</span>
          </template>
        </UserInfo>
      </Panel>
      <Panel>
        <van-form>
          <van-cell title="电池imei:" value="内容" />
          <van-cell title="设备编号:" value="内容" />
          <van-field v-model="formData.price" label="保证金扣除:" placeholder="请输入金额" />
          <van-field v-model="formData.code" center clearable label="验证码:" placeholder="请输入短信验证码" label-width="52px">
            <template #button>
              <van-button size="mini" type="primary">发送验证码</van-button>
            </template>
          </van-field>
        </van-form>
      </Panel>
    </PanelGroup>
    <SubmitBtn text="确定" block :onSubmit="onSubmit"></SubmitBtn>
  </AppLayout>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        price: 0,
        code: ""
      }
    };
  },
  methods: {
    onSubmit(values) {
      console.log("submit", values);
    }
  }
};
</script>

<style lang="less" scoped></style>
