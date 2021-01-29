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
      <button class="btn" @click="$router.push({ path: '/login/login' })">登 录</button>
      <button class="btn register" @click="$router.push({ path: '/login/register' })">注 册</button>
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
.top-bar img {
  width: 35%;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 1.5rem;
  // margin-top: 3rem;
}
.text-bar {
  width: 70%;
  text-align: center;
  margin-left: 15%;
}
.text-bar .title {
  font-size: 20px;
  color: #455d78;
  font-weight: 600;
}
.text-bar p {
  font-size: 15px;
  color: #455d78;
}
.btn {
  width: 90%;
  font-size: 15px;
  margin-top: 20px;
  padding: 10px 0;
  border: 1px solid #55babb;
  border-radius: 7px;
  color: #fff;
  background-color: #55babb;
  position: relative;
  left: 20%;
}
.btn.register {
  width: 90%;
  font-size: 15px;
  margin-top: 20px;
  padding: 10px 0;
  border: 1px solid #55babb;
  border-radius: 7px;
  color: #55babb;
  background-color: #fff;
  position: relative;
  left: 20%;
}
</style>
