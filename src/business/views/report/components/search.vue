<template>
  <van-form label-width="75px" ref="form" validate-trigger="onSubmit">
    <van-field v-model="searchForm.deviceNo" label="设备编号：" placeholder="请输入设备编号" />
    <van-field v-model="searchForm.deviceImei" label="设备IMEI：" placeholder="请输入设备IMEI" />
    <Select label="报表类型：" placeholder="请选择类型" v-model="searchForm.earningType" :options="options"></Select>
    <DatePick label="时间：" v-model="searchForm.date" :dateType="dateType"></DatePick>
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
    },
    searchForm: {
      type: Object
    }
  },
  data() {
    return {
      dateType: "date",
      options: [
        {
          name: "日报",
          value: 1
        },
        {
          name: "月报",
          value: 2
        }
      ]
    };
  },
  methods: {
    submit() {
      return this.$refs.form.validate().then(() => {
        return this.onSearch();
      });
    }
  },
  watch: {
    "searchForm.earningType"(val) {
      this.searchForm.date = "";
      if (val == 1) {
        this.dateType = "date";
      } else if (val == 2) {
        this.dateType = "year-month";
      }
    }
  }
};
</script>

<style lang="less" scoped></style>
