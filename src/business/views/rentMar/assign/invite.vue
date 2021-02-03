<template>
  <AppLayout>
    <Select label="邀请注册" placeholder="请选择人员类型" v-model="type" :close-on-click-action="true" :options="options"></Select>
    <img :src="codeImg" />
  </AppLayout>
</template>

<script>
import Select from "@@/components/form/select";
import test from "./test.png";
export default {
  components: { Select },
  data() {
    return {
      type: "",
      codeImg: test,
      options: [
        {
          name: "分账人员",
          value: "1"
        },
        {
          name: "店员(店员)",
          value: "2"
        },
        {
          name: "店员(店长)",
          value: "3"
        }
      ]
    };
  },
  watch: {
    type() {}
  }
};
</script>

<style lang="less" scoped></style>
