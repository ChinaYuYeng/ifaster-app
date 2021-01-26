<template>
  <div class="login__wrap">
    <BtnGroup direction="column" width="70%">
      <SubmitBtn text="登录" block :onSubmit="onSubmit"></SubmitBtn>
      <SubmitBtn text="注册" block plain></SubmitBtn>
    </BtnGroup>
  </div>
</template>

<script>
export default {
  methods: {
    onSubmit() {
      return this.loginIn(this);
    }
  }
};
</script>

<style lang="less" scoped>
.login__wrap {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
