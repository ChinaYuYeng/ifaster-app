<template>
  <AppLayout>
    <van-field
      readonly
      clickable
      label="收费模板"
      placeholder="选择收费模板"
      input-align="right"
      right-icon="arrow"
      v-model="templateName"
      @click="routerTo({ name: '/charge', params: { $$action: { selectChargeItem }, chooseFlag: 1 } })"
    />
    <template #body-bottom>
      <SubmitBtn :onSubmit="submit" text="确定"></SubmitBtn>
    </template>
  </AppLayout>
</template>

<script>
export default {
  data() {
    return {
      templateName: "",
      dataForm: {
        id: "",
        chargeTemplateId: ""
      }
    };
  },
  created() {
    this.dataForm.id = this.getPileDetail.id;
    this.dataForm.chargeTemplateId = this.getPileDetail.chargeFeeTemplateId;
    this.templateName = this.getPileDetail.chargeFeeTemplateName;
  },
  methods: {
    selectChargeItem(item) {
      console.log(item);
      this.templateName = item.name;
      this.dataForm.chargeTemplateId = item.id;
    },
    submit() {
      return this.$apis.template(this.dataForm).then(res => {
        if (res.code == "1") {
          this.$toast.success(res.msg);
          this.$router.go(-1);
        } else {
          this.$toast.fail(res.msg);
        }
      });
    }
  }
};
</script>

<style></style>
