<template>
  <van-form label-width="72px" ref="form" validate-trigger="onSubmit">
    <van-field v-model="searchForm.batteryImei" label="电池IMEI：" placeholder="请输入电池IMEI" />
    <van-field v-model="searchForm.batteryNo" label="电池编号：" placeholder="请输入电池编号" />
    <MultiCheck label="电池型号：" v-model="searchForm.batteryModel" :options="models"></MultiCheck>
    <van-field v-model="searchForm.customerMobile" label="用户手机：" placeholder="请输入用户手机" />
    <MultiCheck label="是否超时" v-model="searchForm.isTimeout" :options="whether"></MultiCheck>
    <van-field v-model="searchForm.number" label="订单号：" placeholder="请输入充电订单号" />
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
  inject: ["parent"],
  created() {
    this.parent.$apis.getModel().then(res => {
      this.models = res.data;
    });
  },
  data() {
    return {
      models: [],
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
          name: "运营商结束",
          value: -1
        },
        {
          name: "未开始",
          value: 0
        },
        {
          name: "进行中",
          value: 1
        },
        {
          name: "还车中",
          value: 2
        },
        {
          name: "已结束",
          value: 3
        },
        {
          name: "已取消",
          value: 4
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
