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
      <van-cell v-if="!this.getisUnbindStation" title="选择权限模板：" is-link @click="routerTo({ name: '/staff/template' })"></van-cell>
      <van-cell v-if="!this.getisUnbindStation" title="个人权限" is-link @click="routerTo({ name: '/staff/authList' })"></van-cell>
      <btnGroup :leftbtn="'删除店员'" :rightbtn="'确 定'" :leftFunc="deleteStaff" :rightFunc="save"></btnGroup>
      <!-- <btnGroup v-if="this.getisUnbindStation" :leftbtn="''" :rightbtn="'确 定'" :leftFunc="deleteStaff" :rightFunc="save"></btnGroup> -->
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
    save() {
      if (this.getPassFlag) {
        this.$router.go(-1);
        this.$router.go(-1);
        this.savePassFlag(false);
      } else {
        this.$router.go(-1);
      }
    },
    deleteStaff() {
      console.log(this.getStaffInfo);
      if (this.getisUnbindStation) {
        return this.$apis.deletePointStaff({ id: this.getStaffInfo.id }).then(res => {
          if (res.code == 1) {
            this.$toast.success("该店员已成功解绑！");
            this.$router.go(-1);
          } else {
            this.$toast.fail("店员解绑失败！");
          }
        });
      } else {
        return this.$apis.audit({ id: this.getStaffInfo.id, status: 0, authList: this.getStaffInfo.authList }).then(res => {
          console.log(res.data);
          if (res.code == 1) {
            this.$toast.success("已成功删除该店员！");
            this.$router.go(-1);
          } else {
            this.$toast.fail("删除店员失败！");
          }
        });
      }
    }
  },
  components: {
    btnGroup
  }
};
</script>

<style></style>
