<template>
  <AppLayout>
    <!-- {{ dataForm }} -->
    <Panel>
      <UserInfo class="user__info">
        <span>{{ staffData.cnName }}</span>
        <span>{{ staffData.mobile }}</span>
      </UserInfo>
    </Panel>
    <Panel>
      <van-cell title="姓名：" :value="staffData.cnName"></van-cell>
      <van-cell title="电话：" :value="staffData.mobile"></van-cell>
      <van-cell title="选择权限模板：" is-link @click="gotoTemp"></van-cell>
      <btnGroup :leftbtn="'删除店员'" :rightbtn="'保 存'" :leftFunc="deleteStaff" :rightFunc="save"></btnGroup>
    </Panel>
  </AppLayout>
</template>

<script>
import btnGroup from "../components/btnGroup";
export default {
  data() {
    return {
      staffData: {},
      templateName: "",
      dataForm: {
        id: "",
        status: "",
        template: ""
      }
    };
  },

  created() {
    this.staffData = this.getStaffInfo;
    console.log(this.getTemplateInfo);
    this.getStaffDetail();
  },
  methods: {
    gotoTemp() {
      this.$router.push("/staff/template");
    },
    getStaffDetail() {
      this.$apis.detail({ id: this.staffData.id }).then(res => {
        // console.log(res.data);
        this.templateName = res.data.templateName;
        this.dataForm.id = this.staffData.id;
        this.dataForm.status = 1;
        this.dataForm.template = res.data.templateId;
      });
    },

    save() {
      this.$apis.audit(this.dataForm).then(res => {
        console.log(res.data);
        this.$router.push("/staff");
      });
    },
    deleteStaff() {
      this.$apis.audit({ id: this.staffData.id, status: 0 }).then(res => {
        console.log(res.data);
      });
      this.$router.push("/staff");
    }
  },
  components: {
    btnGroup
  }
};
</script>

<style></style>
