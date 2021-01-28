<template>
  <AppLayout ref="report__wrap" :showFooter="false" :showHeader="false">
    <div class="top-bar">
      <img :src="bac" />
    </div>
    <div class="text-bar">
      <h2 class="title">
        欢迎进入 闪开·iFaster
      </h2>
      <p>快充业务简介文章，快充业务简介文案快充业务简介文案快充业务简介文案快充业务 简介文案快充业务简介文案快充业务简介文案快充业务简介文案</p>
    </div>
    <BtnGroup direction="column" width="70%">
      <button text="登录" block @click="$router.push({ path: '/login/login' })">dfdfd</button>
      <button text="登录" block @click="$router.push({ path: '/login/register' })">dfdfd</button>
    </BtnGroup>
  </AppLayout>
</template>

<script>
import bac from "./img/index-bac.png";
export default {
  data() {
    return {
      bac
    };
  },
  methods: {
    onSubmit() {
      this.$router.push({ path: "/login/login" });
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

.top-bar img {
  width: 35%;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 3rem;
}
.text-bar {
  width: 70%;
  text-align: center;
  margin-left: 15%;
  margin-top: 2rem;
}
.text-bar .title {
  font-size: 1rem;
  color: #455d78;
  font-weight: 600;
}
.text-bar p {
  font-size: 0.7rem;
  color: #455d78;
}
.btn {
  width: 60%;
  margin-left: 20%;
  margin-top: 2rem;
  font-size: 0.8rem;
  padding: 0.5rem 0;
  border: 1px solid #55babb;
  border-radius: 7px;
  color: #fff;
  background-color: #55babb;
}
</style>
