<template>
  <AppLayout @onshow="getTemplateList">
    <Panel v-for="(item, index) in tempList" :key="index" class="temp__bar">
      <tempList :item="item">
        <button class="addTemp__btn" @click="routerTo({ name: '/staff/authList', params: { auths: item.auths } })">使用此模板</button>
        <button class="delTemp__btn" @click="delTemp(item)">删除模板</button>
      </tempList>
    </Panel>
    <template #body-bottom>
      <van-button text="新增模板" class="add__temp" @click="add_temp"></van-button>
    </template>
  </AppLayout>
</template>

<script>
import tempList from "../components/tempList";
export default {
  data() {
    return {
      perList: [],
      tempList: []
    };
  },
  components: {
    tempList
  },
  created() {
    this.getTemplateList();
  },
  methods: {
    add_temp() {
      this.$router.push("/staff/addtemp");
    },
    // useTemp(item) {
    //   this.$router.go(-1);
    //   this.saveTempInfo(item);
    //   this.$apis.audit({ id: this.getStaffInfo.id, status: 1, template: this.getTemplateInfo.id }).then(res => {
    //     console.log(res.data);
    //   });
    //   console.log(this.getTemplateInfo);
    // },
    delTemp(item) {
      this.$apis.templateDel({ id: item.id }).then(res => {
        if (res.code == 1) {
          this.$toast.success("权限模板删除成功！");
          this.getTemplateList();
        } else {
          this.$toast.fail("权限模板删除失败！");
        }
      });
      this.getTemplateList();
    },
    getTemplateList() {
      this.$apis.templateList({}).then(res => {
        console.log(res.data);
        this.tempList = res.data;
      });
    }
  }
};
</script>

<style scoped>
.add__temp {
  font-size: 15px;
  padding: 7px;
  border: 1px solid #55babb;
  border-radius: 7px;
  color: #55babb;
  background-color: #fff;
  margin-top: 20px;
}
</style>
