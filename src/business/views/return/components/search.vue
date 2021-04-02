<template>
  <van-form label-width="34px" ref="form" validate-trigger="onSubmit">
    <van-field label="电池IMEI" label-width="100px" placeholder="请输入电池IMEI" v-model="searchForm.batteryImei" />
    <van-field label="电池编号" label-width="100px" placeholder="请输入电池编号" v-model="searchForm.batteryNo" />
    <van-field label="用户手机" label-width="100px" placeholder="请输入用户手机" v-model="searchForm.customerMobile" />
    <van-field label="租赁订单编号" label-width="100px" placeholder="请输入租赁订单编号" v-model="searchForm.number" />
    <van-collapse v-model="activeNames">
      <van-collapse-item name="1" title="电池型号">
        <MultiCheck label-width="100px" v-model="searchForm.model" :options="modelList"></MultiCheck>
      </van-collapse-item>
    </van-collapse>
    <MultiCheck label="是否逾期" v-model="searchForm.isTimeout" :options="isTimeout"></MultiCheck>
    <MultiCheck label="门店id" v-model="searchForm.rentPointId" :options="point"></MultiCheck>
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
  data() {
    return {
      activeNames: [1],
      modelList: [],
      isTimeout: [
        { name: "否", value: 0 },
        { name: "是", value: 1 }
      ],
      status: [
        { name: "运营商结束", value: -1 },
        { name: "未开始", value: 0 },
        { name: "进行中", value: 1 },
        { name: "还车中", value: 2 },
        { name: "已结束", value: 3 },
        { name: "已取消", value: 4 }
      ]
    };
  },
  props: {
    onSearch: {
      type: Function,
      default: () => Promise.resolve()
    },
    searchForm: {
      type: Object
    },
    model: {
      type: Array
    },
    point: {
      type: Array
    }
  },
  created() {
    this.model.map(n => {
      this.modelList.push({ name: n, value: n });
    });
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
