<template>
  <AppLayout>
    <!-- {{ staffData }} -->
    <Panel>
      <van-cell :icon="staffData.img" :title="staffData.name" :label="staffData.phone"></van-cell>
    </Panel>
    <Panel>
      <van-cell title="姓名：" :value="staffData.name"></van-cell>
      <van-cell title="电话：" :value="staffData.phone"></van-cell>
      <van-cell title="权限：" :value="staffData.status" is-link @click="gotoTemp"></van-cell>
      <btnGroup :leftbtn="'删除店员'" :rightbtn="'保 存'"></btnGroup>
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
  created() {
    this.staffData = this.$route.query.data;
  },
  methods: {
    gotoTemp() {
      this.$router.push("/staff/template");
    }
  },
  components: {
    btnGroup
  }
};
</script>

<style></style>
