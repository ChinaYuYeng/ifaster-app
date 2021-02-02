<template>
  <van-form label-width="34px" ref="form" validate-trigger="onSubmit">
    <Select label="类型" :options="options1" placeholder="请选择类型" v-model="parent.searchForm.type" :close-on-click-action="true"></Select>

    <van-checkbox-group direction="horizontal" checked-color="#55BABB" v-model="parent.searchForm.isOnline">
      <van-checkbox name="0">离线</van-checkbox>
      <van-checkbox name="1">在线</van-checkbox>
    </van-checkbox-group>

    <van-checkbox-group direction="horizontal" checked-color="#55BABB" v-model="parent.searchForm.status">
      <van-checkbox name="1">正常</van-checkbox>
      <van-checkbox name="2">暂时关闭</van-checkbox>
      <van-checkbox name="3">运营中</van-checkbox>
    </van-checkbox-group>

    <BtnGroup>
      <SubmitBtn text="搜索" size="small" :onSubmit="submit" width="60%"></SubmitBtn>
    </BtnGroup>
  </van-form>
</template>

<script>
// import DatePick from "@@/components/form/datePick";
import Select from "@@/components/form/select";
export default {
  components: { Select },
  inject: ["parent"],
  data() {
    return {
      /*
        searchForm数据：
        address: "",
        chargeFeeTemplateId: 0,
        chargeStatus: [],
        isOnline: [],
        model: "",
        name: "",
        number: "",
        status: [],
        type: [],
        pageIndex: 1,
        pageSize: 10*/
    };
  },
  methods: {
    submit() {
      this.parent.onSearch();
    }
  }
};
</script>

<style lang="less" scoped></style>
