<template>
  <AppLayout>
    <Panel>
      <van-cell title="权限"></van-cell>
      <van-collapse v-model="activeNames">
        <van-collapse-item v-for="(item, index) in perList" :key="index" :name="item.id">
          <div slot="title">
            {{ item.name }}
          </div>
          <van-checkbox-group v-model="result">
            <van-checkbox v-for="(item1, index) in item.child" :key="index" checked-color="#55BABB" shape="square" icon-size="15px" :name="item1.id">
              {{ item1.name }}
            </van-checkbox>
          </van-checkbox-group>
        </van-collapse-item>
      </van-collapse>
    </Panel>
    <template #body-bottom>
      <SubmitBtn :onSubmit="confirm" text="保存"></SubmitBtn>
    </template>
  </AppLayout>
</template>

<script>
export default {
  data() {
    return {
      activeNames: [],
      result: [],
      perList: []
    };
  },
  created() {
    this.getAuthList();
    this.getEditData();
  },
  methods: {
    getEditData() {
      if (this.$route.params.auths) {
        console.log(this.$route.params);
        this.result = this.$route.params.auths;
        this.hasChecked(this.perList);
      } else {
        console.log(this.getStaffInfo);
        this.result = this.getStaffInfo.authList || [];
        this.hasChecked(this.perList);
      }
    },
    getAuthList() {
      this.$apis.authList().then(res => {
        this.perList = res.data;
        this.hasChecked(res.data);
      });
    },
    hasChecked(List) {
      for (let i = 0; i < List.length; i++) {
        let child = List[i].child;
        for (let j = 0; j < child.length; j++) {
          if (this.result.indexOf(child[j].id) != -1) {
            this.activeNames.push(List[i].id);
            this.activeNames = [...new Set(this.activeNames)];
          }
        }
      }
    },
    confirm() {
      return this.$apis.audit({ authList: this.result, id: this.getStaffInfo.id, status: 1 }).then(res => {
        if (res.code == 1) {
          this.$toast.success("个人权限保存成功！");
          this.$router.go(-1);
          this.$router.go(-1);
        } else {
          this.$toast.fail("个人权限保存失败！");
        }
      });
    }
  }
};
</script>

<style></style>
