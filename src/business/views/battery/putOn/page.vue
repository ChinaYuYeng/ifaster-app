<template>
  <AppLayout>
    <!-- {{ dataform }}
    {{ this.getbatteryDetail }} -->
    <van-field
      readonly
      clickable
      label="门店"
      placeholder="选择门店"
      input-align="right"
      right-icon="arrow"
      @click="routerTo({ name: '/rentMar', params: { $$action: { selectItem } } })"
      v-model="pointName"
    />
    <van-field
      readonly
      clickable
      label="收费模板"
      placeholder="选择收费模板"
      input-align="right"
      right-icon="arrow"
      v-model="templateName"
      @click="routerTo({ name: '/charge', params: { $$action: { selectChargeItem } } })"
    />
    <template #body-bottom>
      <SubmitBtn :onSubmit="submit" text="上架"></SubmitBtn>
    </template>
  </AppLayout>
</template>

<script>
export default {
  data() {
    return {
      pointName: "",
      templateName: "",
      dataform: {
        ids: [],
        pointId: "",
        templateId: ""
      }
    };
  },
  created() {
    this.dataform.ids = [this.getbatteryDetail.id];
  },
  methods: {
    selectItem(item) {
      console.log(item);
      this.pointName = item.name;
      this.dataform.pointId = item.id;
    },
    selectChargeItem(item) {
      console.log(item);
      this.templateName = item.name;
      this.dataform.templateId = item.id;
    },
    submit() {
      return this.$apis.putOn(this.dataform).then(res => {
        if (res.code == "1") {
          this.$toast.success(res.msg);
          this.$router.go(-1);
        } else {
          this.$toast.fail(res.msg);
        }
      });
      // console.log(this.dataform);
    }
  }
};
</script>

<style></style>
