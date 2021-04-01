<template>
  <AppLayout>
    <Select label="邀请注册" placeholder="请选择人员类型" v-model="roleId" :close-on-click-action="true" :options="options"></Select>
    <div class="qrcode" ref="qrCodeUrl"></div>
  </AppLayout>
</template>

<script>
import Select from "@@/components/form/select";
import QRCode from "qrcodejs2";
export default {
  components: { Select },
  data() {
    return {
      roleId: "",
      options: []
    };
  },
  created() {
    this.$apis.getRegisterRoleList().then(res => {
      this.options = res.data;
      this.qrcode = new QRCode(this.$refs.qrCodeUrl, {
        width: 160,
        height: 160,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
      });
    });
  },
  methods: {
    creatQrCode() {
      let operator = this.$store.getters["home/getOperator"];
      let url = `${window.location.protocol}//${window.location.host}${window.location.pathname}#/login/register?operator=${operator.operatorName}&operatorId=${operator.operatorId}&roleId=${this.roleId}`;
      this.qrcode.clear();
      this.qrcode.makeCode(url);
    }
  },
  watch: {
    roleId() {
      this.creatQrCode();
    }
  }
};
</script>

<style lang="less" scoped>
.qrcode {
  display: flex;
  height: 300px;
  justify-content: center;
  align-items: center;
}
</style>
