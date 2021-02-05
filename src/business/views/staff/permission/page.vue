<template>
  <AppLayout>
    <!-- {{ staffData }} -->
    <Panel>
      <UserInfo class="user__info">
        <span>{{ staffData.cnName }}</span>
        <span>{{ staffData.mobile }}</span>
      </UserInfo>
    </Panel>
    <Panel>
      <van-cell title="姓名：" :value="staffData.cnName"></van-cell>
      <van-cell title="电话：" :value="staffData.mobile"></van-cell>
      <van-cell title="权限：" :value="staffData.statusName" is-link @click="gotoTemp"></van-cell>
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
    this.staffData = this.getStaffInfo;
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
