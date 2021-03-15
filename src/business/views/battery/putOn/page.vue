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
    <van-field readonly clickable label="收费模板" placeholder="选择收费模板" input-align="right" right-icon="arrow" v-model="templateName" />
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
    submit() {
      console.log(this.dataform);
    }
  }
};
</script>

<style></style>
