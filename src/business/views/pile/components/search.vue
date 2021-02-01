<template>
  <van-form label-width="34px" ref="form" validate-trigger="onSubmit">
    <Select label="类型" :options="options1" placeholder="请选择类型" v-model="parent.searchForm.type" :close-on-click-action="true"></Select>
    <!-- <DatePick label="日期" v-model="parent.searchForm.date"></DatePick> -->
    <van-field v-model="parent.searchForm.name" placeholder="请输入用户名" />
    <Select :options="options2" placeholder="请选择类型" v-model="parent.searchForm.type" :close-on-click-action="true"></Select>
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
      options1: [
        { name: "电桩编号", value: 1 },
        { name: "电桩名称", value: 2 },
        { name: "电桩地址", value: 3 }
      ],
      options2: [
        { name: "认领设备", value: 1 },
        { name: "分账设备", value: 2 }
      ],
      options3: [
        { name: "收费模板-1", value: 1 },
        { name: "收费模板-2", value: 2 }
      ],
      options4: [
        { name: "在线", value: 1 },
        { name: "离线", value: 2 }
      ],
      options5: [
        { name: "停运", value: 1 },
        { name: "暂时关闭", value: 2 },
        { name: "运营中", value: 3 }
      ],
      options6: [
        { name: "充电中", value: 1 },
        { name: "空闲", value: 2 }
      ]
    };
  },
  methods: {
    submit() {
      this.$refs.form.validate().then(valid => {
        if (valid) {
          this.parent.onSearch();
        }
      });
    }
  }
};
</script>

<style lang="less" scoped></style>
