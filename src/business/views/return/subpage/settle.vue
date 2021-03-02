<template>
  <AppLayout ref="report__wrap">
    <PanelGroup>
      <Panel>
        <UserInfo>
          <span>{{ routeData.customerName }}</span>
          <span>{{ routeData.customerMobile }}</span>
          <template #otherInfo>
            <span>消费金额</span>
            <span>{{ routeData.payFee }}</span>
          </template>
        </UserInfo>
      </Panel>
      <Panel>
        <van-form ref="form">
          <van-cell title="保证金:" :value="routeData.rentFeeTemplate.deposit" />
          <van-field
            v-model.number="formData.deposit"
            label="保证金扣除:"
            placeholder="请输入金额"
            :rules="[{ validator: $regexp.money, message: '请输入正确的金额' }]"
          />
          <van-field
            v-model="formData.note"
            center
            clearable
            label="验证码:"
            placeholder="请输入短信验证码"
            label-width="52px"
            :rules="[{ required: true, message: '请输入短信验证码' }]"
            v-if="!!formData.deposit"
          >
            <template #button>
              <van-button size="mini" type="primary" @click="getSms">发送验证码</van-button>
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
        deposit: 0,
        note: "",
        id: this.$route.params.id
      },
      routeData: this.$route.params
    };
  },
  methods: {
    onSubmit() {
      return this.$refs.form.validate().then(() => {
        return this.$apis.audit(this.formData).then(() => {
          this.$toast({
            duration: 1000,
            message: "操作成功",
            onClose: () => {
              this.routerTo("/return");
            }
          });
        });
      });
    },
    getSms() {
      this.$apis.sms({ mobile: this.routeData.customerMobile, type: 4 });
    }
  }
};
</script>

<style lang="less" scoped></style>
