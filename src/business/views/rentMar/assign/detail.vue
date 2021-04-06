<template>
  <AppLayout>
    <van-cell is-link center>
      <UserInfo>
        <span style="font-size:12px;line-height: 12px;">{{ routeData.cnName }}</span>
        <span style="font-size:12px;line-height: 12px;">{{ routeData.mobile }}</span>
      </UserInfo>
    </van-cell>
    <van-form label-width="100px" ref="form" validate-trigger="onSubmit">
      <van-field v-model="dataFrom.remark" label="备注：" />
      <van-field v-model="dataFrom.percent" label="分账比例(%)：" />
      <van-field v-model="dataFrom.amount" label="单次收费上限：" />
      <BtnGroup class="mtop10">
        <SubmitBtn text="删除" size="small" :onSubmit="delAssign" block v-if="isEidt"></SubmitBtn>
        <SubmitBtn text="保存" size="small" :onSubmit="saveAssign" block></SubmitBtn>
      </BtnGroup>
    </van-form>
  </AppLayout>
</template>

<script>
export default {
  data() {
    return {
      routeData: this.$route.params,
      dataFrom: {
        percent: "",
        amount: 0,
        remark: "",
        operatorId: "",
        name: "",
        mobile: "",
        pointId: ""
      },
      isEidt: true
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (from.name !== "/rentMar/detail/assign/add") {
        vm.$apis.getAssignDetail({ id: vm.routeData.id }).then(res => {
          Object.assign(vm.dataFrom, res.data);
        });
      } else {
        vm.isEidt = false;
        vm.dataFrom.operatorId = vm.routeData.id;
        vm.dataFrom.mobile = vm.routeData.mobile;
        vm.dataFrom.name = vm.routeData.cnName;
      }
    });
  },
  methods: {
    saveAssign() {
      this.dataFrom.pointId = this.currentPointId;
      return this.$apis.saveAssign(this.dataFrom).then(() => {
        this.$router.back();
      });
    },
    delAssign() {
      return this.$apis.delAssign({ id: this.routeData.id }).then(() => {
        this.$router.back();
      });
    }
  }
};
</script>

<style lang="less" scoped></style>
