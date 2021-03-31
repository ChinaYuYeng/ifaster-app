<template>
  <AppLayout @onshow="getStaffDetail">
    {{ this.$route.params.passFlag }}
    <Panel>
      <UserInfo class="user__info">
        <span>{{ staffData.cnName }}</span>
        <span>{{ staffData.mobile }}</span>
      </UserInfo>
    </Panel>
    <Panel>
      <van-cell title="姓名：" :value="staffData.cnName"></van-cell>
      <van-cell title="电话：" :value="staffData.mobile"></van-cell>
      <!-- <van-cell title="选择权限模板：" is-link @click="routerTo({ name: '/staff/template' })"></van-cell>
      <van-cell title="个人权限" is-link @click="routerTo({ name: '/staff/authList' })"></van-cell> -->
      <btnGroup :leftbtn="'确认添加'" :rightbtn="'取 消'" :leftFunc="save" :rightFunc="cancel"></btnGroup>
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
    this.getStaffDetail();
  },
  methods: {
    getStaffDetail() {
      this.$apis.detail({ id: this.staffData.id }).then(res => {
        this.saveMessage(res.data);
      });
    },
    cancel() {
      this.$router.go(-1);
    },
    save() {
      console.log(this.getPointId, this.staffData.id);
      return this.$apis.bindStation({ rentPointId: 45, staffId: 51 }).then(res => {
        console.log(res.data);
        if (res.code == 1) {
          this.$toast.success("租还点成功添加店员！");
          this.$router.go(-1);
        } else {
          this.$toast.success("店员添加失败！");
        }
      });
    }
  },
  components: {
    btnGroup
  }
};
</script>

<style></style>
