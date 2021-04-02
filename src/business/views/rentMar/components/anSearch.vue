<template>
  <van-form label-width="76px" ref="form" validate-trigger="onSubmit">
    <van-field v-model="searchForm.name" label="姓名:" placeholder="请输入分佣人员姓名" />
    <van-field v-model="searchForm.mobile" label="手机号:" placeholder="请输入手机号" />
    <van-field v-model="searchForm.pointId" label="电池id:" placeholder="请输入电池id" />
    <van-field v-model="searchForm.percent" label="分账比例:" placeholder="请输入分账比例" />
    <BtnGroup>
      <SubmitBtn text="搜索" size="small" :onSubmit="submit" width="60%"></SubmitBtn>
    </BtnGroup>
  </van-form>
</template>

<script>
export default {
  props: {
    onSearch: {
      type: Function,
      default: () => Promise.resolve()
    },
    searchForm: {
      type: Object
    }
  },
  methods: {
    submit() {
      return this.$refs.form.validate().then(() => {
        return this.onSearch(this.searchForm);
      });
    }
  }
};
</script>

<style lang="less" scoped></style>
