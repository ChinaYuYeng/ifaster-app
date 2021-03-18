<template>
  <van-form label-width="76px" ref="form" validate-trigger="onSubmit">
    <van-field v-model="searchForm.name" label="租换点名称:" placeholder="请输入租换点名称" />
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
