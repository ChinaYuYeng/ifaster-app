<template>
  <van-form label-width="72px" ref="form" validate-trigger="onSubmit">
    <van-field v-model="searchForm.batteryImei" label="电池IMEI：" placeholder="请输入电池IMEI" />
    <van-field v-model="searchForm.batteryNo" label="电池编号：" placeholder="请输入电池编号" />
    <MultiCheck label="充电类型" v-model="searchForm.chargeType" :options="chargeTypeOpation"></MultiCheck>
    <van-field v-model="searchForm.customerMobile" label="用户手机：" placeholder="请输入用户手机" />
    <MultiCheck label="是否异常" v-model="searchForm.isError" :options="whether"></MultiCheck>
    <van-field v-model="searchForm.number" label="订单号：" placeholder="请输入充电订单号" />
    <van-field v-model="searchForm.pileImei" label="电桩IMEI：" placeholder="请输入电桩IMEI" />
    <MultiCheck label="订单状态" v-model="searchForm.status" :options="status"></MultiCheck>
    <BtnGroup>
      <SubmitBtn text="搜索" size="small" :onSubmit="submit" width="60%"></SubmitBtn>
    </BtnGroup>
  </van-form>
</template>

<script>
import MultiCheck from "@@/components/form/multiCheck";
export default {
  components: { MultiCheck },
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
      chargeTypeOpation: [
        {
          name: "充满自停",
          value: 1
        },
        {
          name: "计时充电",
          value: 2
        }
      ],
      whether: [
        {
          name: "是",
          value: 1
        },
        {
          name: "否",
          value: 0
        }
      ],
      status: [
        {
          name: "未开始",
          value: 0
        },
        {
          name: "充电中",
          value: 1
        },
        {
          name: "已结束",
          value: 2
        }
      ]
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
