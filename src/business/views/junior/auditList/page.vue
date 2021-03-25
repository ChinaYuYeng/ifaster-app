<template>
  <AppLayout>
    <span v-if="auditList.length == 0" class="audit__list_span">暂无审核信息</span>
    <Panel v-if="auditList.length != 0">
      <div v-for="(item, index) in auditList" :key="index" style="margin-top:5px">
        <UserInfo>
          <span class="title__name">{{ item.name }}</span>
          <span>{{ item.mobile }}</span>
        </UserInfo>
        <van-button text="审 核" class="audit__btn" @click="showDialog(item)"></van-button>
      </div>
    </Panel>
    <van-dialog
      v-model="show"
      title="审核操作"
      message="请审核申请人员信息，点击通过即可完成审核"
      confirm-button-text="通过"
      confirm-button-color="#55babb"
      cancel-button-text="拒绝"
      cancel-button-color="grey"
      show-cancel-button
      :before-close="beforeClose"
    ></van-dialog>
  </AppLayout>
</template>

<script>
export default {
  data() {
    return {
      auditList: [],
      show: false,
      id: ""
    };
  },
  created() {
    this.getAuditList();
  },
  methods: {
    showDialog(item) {
      this.show = true;
      this.id = item.id;
    },
    beforeClose(action, done) {
      if (action === "confirm") {
        // console.log(this.id);
        this.$apis.audit({ id: this.id, operate: 1 }).then(res => {
          if (res.code == 1) {
            this.$toast.success("已通过申请");
            this.getAuditList();
            done();
          } else {
            this.$toast.fail("通过申请失败");
            done();
          }
        });
      } else if (action === "cancel") {
        this.$apis.audit({ id: this.id, operate: -1 }).then(res => {
          if (res.code == 1) {
            this.$toast.success("已拒绝申请");
            this.getAuditList();
            done();
          } else {
            this.$toast.fail("拒绝申请失败");
            done();
          }
        });
      }
    },
    getAuditList() {
      this.$apis.auditList({}).then(res => {
        this.auditList = res.data;
      });
    }
  }
};
</script>

<style scoped>
.audit__btn {
  border: 1px solid #55babb;
  border-radius: 5px;
  color: #55babb;
  background-color: #fff;
  width: 25%;
  height: 20px;
  float: right;
  margin-top: -30px;
  margin-right: 15px;
}
.audit__list_span {
  display: inline-block;
  width: 100%;
  /* margin: 0 auto; */
  text-align: center;
}
</style>
