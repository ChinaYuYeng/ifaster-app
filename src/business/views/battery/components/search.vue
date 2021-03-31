<template>
  <van-form label-width="34px" ref="form" validate-trigger="onSubmit">
    <div style="height:450px;overflow:scroll">
      <van-field label="电池IMEI" label-width="100px" placeholder="请输入电池IMEI" v-model="searchForm.imei" />
      <van-field label="电池编号" label-width="100px" placeholder="请输入电池编号" v-model="searchForm.number" />
      <Select label-width="100px" label="设备类型" v-model="searchForm.model" :options="modelList"></Select>
      <MultiCheck label="设备关系" v-model="searchForm.type" :options="type"></MultiCheck>
      <MultiCheck label-width="100px" label="所属租还点" v-model="searchForm.onRentPointId" :options="point"></MultiCheck>
      <MultiCheck label="电池状态" v-model="searchForm.isOnline" :options="isOnline"></MultiCheck>
      <MultiCheck label="异常状态" v-model="searchForm.isError" :options="isError"></MultiCheck>
      <MultiCheck label="租赁状态" v-model="searchForm.rentStatus" :options="rentStatus"></MultiCheck>
    </div>
    <BtnGroup style="margin-bottom:20px">
      <SubmitBtn text="搜索" size="small" :onSubmit="submit" width="30%"></SubmitBtn>
      <button class="reset__btn" @click="reset">重置</button>
    </BtnGroup>
  </van-form>
</template>

<script>
import MultiCheck from "@@/components/form/multiCheck";
import Select from "@@/components/form/select";
export default {
  components: { MultiCheck, Select },
  data() {
    return {
      modelList: [],
      type: [
        { name: "闲置", value: 1 },
        { name: "分账", value: 2 },
        { name: "运营", value: 3 }
      ],
      isOnline: [
        { name: "离线", value: 0 },
        { name: "在线", value: 1 }
      ],
      isError: [
        { name: "异常", value: 0 },
        { name: "正常", value: 1 }
      ],
      rentStatus: [
        { name: "未上架", value: 0 },
        { name: "上架未租赁", value: 1 },
        { name: "上架租赁中", value: 2 }
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
    model: Array,
    point: Array
  },
  created() {
    console.log(this.model);
    for (let i = 0; i < this.model.length; i++) {
      this.modelList.push({ name: this.model[i], value: this.model[i] });
    }
  },
  methods: {
    submit() {
      return this.$refs.form.validate().then(() => {
        return this.onSearch(this.searchForm);
      });
    },
    reset() {
      this.$emit("setSearchForm", "重置搜索条件");
      // return this.$refs.form.validate().then(() => {
      //   return this.onSearch(this.searchForm);
      // });
    }
  }
};
</script>

<style lang="less" scoped>
.reset__btn {
  width: 30%;
  border: 1px solid #55babb;
  background-color: #fff;
  color: #55babb;
}
</style>
