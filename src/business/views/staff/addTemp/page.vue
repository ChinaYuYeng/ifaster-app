<template>
  <AppLayout>
    <Panel>
      <van-cell title="模板"></van-cell>
      <van-cell title="模板名称">
        <van-field v-model="name" placeholder="请输入模板名称" class="input__bar" />
      </van-cell>
    </Panel>
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
      <SubmitBtn :onSubmit="confirm" text="确定"></SubmitBtn>
    </template>
  </AppLayout>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      activeNames: [],
      result: [],
      perList: []
    };
  },
  created() {
    this.getAuthList();
  },
  methods: {
    getAuthList() {
      this.$apis.authList().then(res => {
        this.perList = res.data;
      });
    },
    confirm() {
      let dataForm = {};
      dataForm.name = this.name;
      dataForm.auths = this.result;
      return this.$apis.templateAdd(dataForm).then(res => {
        console.log(res.data);
        if (res.code == 1) {
          this.$toast.success("权限模板保存成功！");
          this.$router.go(-1);
        } else {
          this.$toast.fail("权限模板保存失败！");
        }
      });
    }
  }
};
</script>

<style></style>
