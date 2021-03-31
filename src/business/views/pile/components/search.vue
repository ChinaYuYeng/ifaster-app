<template>
  <van-form label-width="34px" ref="form" validate-trigger="onSubmit">
    <div style="height:450px;overflow:scroll">
      <van-field label="电桩编号" label-width="100px" placeholder="请输入电桩编号" v-model="searchForm.number" />
      <van-field label="电桩名称" label-width="100px" placeholder="请输入电桩名称" v-model="searchForm.name" />
      <van-field label="电桩地址" label-width="100px" placeholder="请输入电桩地址" v-model="searchForm.address" />
      <Select label-width="100px" label="设备类型" :options="modelList" v-model="searchForm.model"></Select>
      <Select label-width="100px" label="收费模板" :options="template" v-model="searchForm.chargeFeeTemplateId"></Select>
      <MultiCheck label="设备关系" v-model="searchForm.type" :options="type"></MultiCheck>
      <MultiCheck label="在线状态" v-model="searchForm.isOnline" :options="isOnline"></MultiCheck>
      <MultiCheck label="运营状态" v-model="searchForm.status" :options="status"></MultiCheck>
      <MultiCheck label="充电状态" v-model="searchForm.chargeStatus" :options="chargeStatus"></MultiCheck>
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
      chargeStatus: [
        { name: "空闲", value: 0 },
        { name: "充电中", value: 1 }
      ],
      status: [
        { name: "停运", value: -1 },
        { name: "暂时关闭", value: 0 },
        { name: "正常", value: 1 }
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
    template: Array
  },
  created() {
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
      return this.$refs.form.validate().then(() => {
        return this.onSearch(this.searchForm);
      });
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
