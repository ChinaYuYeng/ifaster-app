<template>
  <AppLayout>
    <!-- {{ staffData }} -->
    <Panel>
      <UserInfo class="user__info">
        <span>{{ staffData.cnName }}</span>
        <span>{{ staffData.mobile }}</span>
      </UserInfo>
      <!-- <van-cell :icon="staffData.img" :title="staffData.cnName" :label="staffData.mobile" :value="staffData.status"></van-cell> -->
    </Panel>
    <Panel>
      <van-cell title="姓名：" :value="staffData.cnName"></van-cell>
      <van-cell title="电话：" :value="staffData.mobile"></van-cell>
      <btnGroup :leftbtn="'拒 绝'" :rightbtn="'通 过'" :leftFunc="reject" :rightFunc="pass"></btnGroup>
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
  methods: {
    pass() {
      this.$router.push("/staff/permission");
      this.savePassFlag(true);
    },
    reject() {
      return this.$apis.audit({ id: this.staffData.id, status: 0 }).then(res => {
        console.log(res.data);
        if (res.code == 1) {
          this.$toast.success("已成功拒绝！");
          this.$router.push("/staff");
        } else {
          this.$toast.fail("拒绝失败！");
        }
      });
    }
  },
  created() {
    this.staffData = this.getStaffInfo;
  }
};
</script>

<style></style>
