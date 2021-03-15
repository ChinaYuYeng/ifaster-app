<template>
  <van-form label-width="34px" ref="form" validate-trigger="onSubmit">
    <!-- {{ searchForm }} -->
    <van-field label="店员手机" label-width="100px" placeholder="请输入手机号码" v-model="searchForm.mobile" />
    <Select
      label-width="100px"
      label="租还点"
      placeholder="请选择租还点"
      v-model="searchForm.rentPointId"
      :options="point"
      :close-on-click-action="true"
    ></Select>
    <Select
      label-width="100px"
      label="账号状态"
      placeholder="请选择账号状态"
      v-model="searchForm.status"
      :options="statusList"
      :close-on-click-action="true"
    ></Select>
    <BtnGroup>
      <SubmitBtn class="search" text="搜索" size="small" :onSubmit="submit" width="30%"></SubmitBtn>
      <button class="reset" @click="reset">重置</button>
    </BtnGroup>
  </van-form>
</template>

<script>
import Select from "@@/components/form/select";
export default {
  components: { Select },
  props: {
    onSearch: {
      type: Function,
      default: () => Promise.resolve()
    },
    searchForm: {
      type: Object
    },
    point: Array
  },
  data() {
    return {
      statusList: [
        { name: "禁用", value: -1 },
        { name: "未审", value: 0 },
        { name: "可用", value: 1 }
      ]
    };
  },
  methods: {
    submit() {
      return this.$refs.form.validate().then(() => {
        return this.onSearch(this.searchForm);
      });
    },
    reset() {
      this.$emit("setSearchForm", "重置搜索条件");
      return this.$refs.form.validate().then(() => {
        return this.onSearch(this.searchForm);
      });
    }
  }
};
</script>

<style lang="less" scoped>
.reset {
  width: 30%;
  border: 1px solid #55babb;
  background-color: #fff;
  color: #55babb;
}
</style>
