<template>
  <van-form label-width="34px" ref="form" validate-trigger="onSubmit">
    <Select label="类型" placeholder="请选择类型" v-model="searchForm.status1" :close-on-click-action="true"></Select>
    <DatePick label="日期" v-model="searchForm.date"></DatePick>
    <BtnGroup>
      <SubmitBtn text="搜索" size="small" :onSubmit="submit" width="60%"></SubmitBtn>
    </BtnGroup>
  </van-form>
</template>

<script>
import DatePick from "@@/components/form/datePick";
import Select from "@@/components/form/select";
export default {
  components: { DatePick, Select },
  props: {
    onSearch: {
      type: Function,
      default: () => Promise.resolve()
    }
  },
  data() {
    return {
      searchForm: {
        status1: 1,
        date: new Date().toUTCString()
      }
    };
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
