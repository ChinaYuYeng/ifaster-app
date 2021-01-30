<template>
  <AppLayout>
    <!-- {{ staffData }} -->
    <Panel>
      <van-cell :icon="staffData.img" :title="staffData.name" :label="staffData.phone" :value="staffData.status"></van-cell>
    </Panel>
    <Panel>
      <van-cell title="姓名：" :value="staffData.name"></van-cell>
      <van-cell title="电话：" :value="staffData.phone"></van-cell>
      <btnGroup :leftbtn="'拒 绝'" :rightbtn="'通 过'"></btnGroup>
    </Panel>
  </AppLayout>
</template>

<script>
import btnGroup from "../components/btnGroup";
export default {
  data() {
    return {
      staffData: {}
    };
  },
  components: {
    btnGroup
  },
  created() {
    this.staffData = this.$route.query.data;
  }
};
</script>

<style></style>
