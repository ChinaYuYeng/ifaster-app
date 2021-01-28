<template>
  <div>
    登录
    <!-- <div class="top-bar">
          <img src="../../../static/img/index-bac.png" alt="">
      </div>
      <div class="form-bar">
          <div class="form">
              <span class="label">手机</span>
              <van-field class="input" v-model="dataForm.phone" placeholder="请输入手机号码"/>
              <span class="label">验证码</span>
              <van-field class="input" v-model="dataForm.code" placeholder="请输入验证码"/>
              <button class="get-code">获取验证码</button>
          </div>
          <div class="proto-bar">
              <van-checkbox class="check" icon-size="15px" v-model="checked" shape="square" checked-color="#55BABB"></van-checkbox>
              <a @click="showPopup" class="protocol">
                    我同意
                    <span class="text">《iFaster充电平台运营协议》</span>
                    、
                    <span class="text">《隐私协议》</span>
              </a>
          </div>
          <div class="btn-bar">
              <button class="btn login">登  录</button>
              <button class="btn register" @click="gotoRegister()">新用户注册</button>
          </div>
          <van-popup v-model="show">
            协议内容</van-popup>
      </div> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      checked: false,
      show: false,
      dataForm: {
        phone: "",
        code: ""
      }
    };
  },
  methods: {
    showPopup() {
      this.show = true;
    },
    gotoRegister() {
      this.$router.push("/register");
    }
  }
};
</script>
<style scoped>
* {
  color: #cccccc;
}
.top-bar img {
  width: 35%;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 3rem;
}
.proto-bar,
.btn-bar,
.label {
  width: 84%;
  margin-left: 8%;
}
.input {
  /* border-bottom: 1px solid #DDDDDD; */
  width: 92%;
  margin-left: 4%;
  margin-top: 0.5rem;
}
.label {
  font-size: 0.5rem;
  position: relative;
  top: 0.5rem;
}
.get-code {
  background-color: #fff;
  color: #55babb;
  border: 1px solid #55babb;
  border-radius: 5px;
  font-size: 0.7rem;
  padding: 0.2rem 1rem;
  position: relative;
  top: -2rem;
  left: 11.5rem;
}
.check {
  float: left;
  margin-top: 0.2rem;
}
.text {
  color: #55babb;
}
.protocol {
  font-size: 0.5rem;
  margin-left: 0.2rem;
}
.btn {
  width: 100%;
  border: 1px solid #55babb;
  border-radius: 7px;
  padding: 0.5rem 0;
  font-size: 0.7rem;
  margin-top: 1rem;
}
.btn.login {
  background-color: #55babb;
  color: #fff;
}
.btn.register {
  color: #55babb;
  background-color: #fff;
}
</style>
