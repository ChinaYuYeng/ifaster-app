<template>
  <AppLayout>
    <Select label="邀请注册" placeholder="请选择人员类型" v-model="type" :close-on-click-action="true"></Select>
    <img src="./test.png" />
  </AppLayout>
</template>

<script>
import Select from "@@/components/form/select";
export default {
  components: { Select },
  data() {
    return {
      type: ""
    };
  }
};
</script>

<style lang="less" scoped></style>
