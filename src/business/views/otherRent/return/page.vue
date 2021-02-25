<template>
  <AppLayout>
    <van-cell center>
      <UserInfo>
        <span style="font-size:16px;line-height: 16px;">{{ operator.operatorName }}</span>
        <span style="font-size:16px;line-height: 16px;">{{ operator.operatorMobile }}</span>
      </UserInfo>
    </van-cell>
    <van-field v-model="code" center clearable label="填写验证码" placeholder="请输入短信验证码">
      <template #button>
        <van-button size="small" plain type="primary" @click="getSms">发送验证码</van-button>
      </template>
    </van-field>
    <template #body-bottom class="wrap">
      <van-row>
        <van-col span="8" offset="8">
          <van-button type="primary" text="确 定" block @click="returnBattery" size="mini"></van-button>
        </van-col>
      </van-row>
    </template>
  </AppLayout>
</template>

<script>
export default {
  data() {
    return {
      code: "",
      operator: {}
    };
  },
  created() {
    debugger;
    this.operator = this.getManager;
  },
  methods: {
    returnBattery() {
      if (this.code == "") {
        this.$toast("请输入验证码");
        return;
      } else {
        this.$apis.return({ ids: this.getSelectedInfo.ids, code: this.code }).then(res => {
          if (res.code == "1") {
            this.$toast.success(res.msg);
            this.$router.push({ path: "/otherRent" });
          } else {
            this.$toast.fail(res.msg);
          }
        });
      }
    },
    getSms() {
      this.$apis
        .sms({ mobile: this.getManager.operatorMobile, type: 5 })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          this.$notify(err.msg);
        });
    }
  }
};
</script>

<style lang="less" scoped>
.wrap {
  width: 100%;
  text-align: center;
}
</style>
