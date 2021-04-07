<template>
  <div>
    <div class="top-bar">
      <img src="../img/index-bac.png" alt="" />
    </div>
    <div class="form-bar">
      <div>
        <van-form ref="form" :show-error-message="false">
          <span class="label">手机</span>
          <van-field class="input" v-model="dataForm.mobile" :rules="telRules" name="mobile" placeholder="请输入手机号码" />
          <span class="label">验证码</span>
          <van-field class="input" v-model="dataForm.verifyCode" :rules="codeRules" placeholder="请输入验证码">
            <button slot="button" class="get-code" @click="getSms" :disabled="code_btn_disable">{{ code_btn_msg }}</button>
          </van-field>
        </van-form>
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
        <!-- <button class="btn login">登 录</button> -->
        <SubmitBtn text="登录" width="100%" :onSubmit="submit" class="btn login"></SubmitBtn>
        <!-- <button class="btn register" @click="gotoRegister()">新用户注册</button> -->
      </div>
      <van-popup v-model="show">
        协议内容
      </van-popup>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      checked: false,
      show: false,
      code_btn_msg: "获取验证码",
      code_btn_disable: false,
      time: 30,
      telRules: [
        {
          required: true,
          message: "手机号不能为空",
          trigger: "onBlur"
        },
        {
          validator: value => {
            return /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/.test(value);
          },
          message: "请输入正确的手机号码",
          trigger: "onBlur"
        }
      ],
      codeRules: [
        {
          required: true,
          message: "验证码不能为空",
          trigger: "onBlur"
        },
        {
          validator: value => {
            return /^[0-9]{6}$/.test(value);
          },
          message: "请输入正确的验证码",
          trigger: "onBlur"
        }
      ],
      dataForm: {
        mobile: "",
        verifyCode: ""
      }
    };
  },
  methods: {
    showPopup() {
      this.show = true;
    },
    submit() {
      if (this.checked) {
        return this.$refs.form.validate().then(() => {
          return this.$apis
            .login(this.dataForm)
            .then(res => {
              this.doLogin(res.data);
              this.routerTo("/home");
            })
            .catch(err => {
              this.$notify(err.msg);
            });
        });
      } else {
        this.$notify("请阅读并同意协议");
        return Promise.resolve();
      }
    },

    getSms() {
      this.$refs.form
        .validate("mobile")
        .then(() => {
          this.$apis
            .sms({ mobile: this.dataForm.mobile, type: 1 })
            .then(res => {
              if (res.code == 1) {
                this.timer = setInterval(() => {
                  this.time--;
                  this.code_btn_disable = true;
                  this.code_btn_msg = "剩余" + this.time + "s";
                  if (this.time === 0) {
                    clearInterval(this.timer);
                    this.code_btn_msg = "获取验证码";
                    this.time = 30;
                    this.code_btn_disable = false;
                  }
                }, 1000);
              }
            })
            .catch(err => {
              this.$notify(err.msg);
            });
        })
        .catch(() => {
          this.$notify("请先填写手机号");
        });
    },
    gotoRegister() {
      this.$router.push("/login/register");
    }
  }
};
</script>
<style scoped>
* {
  color: #cccccc;
}
.form-bar {
  padding-bottom: 50px;
}
.top-bar img {
  width: 35%;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 1.5rem;
}
.proto-bar,
.btn-bar,
.label {
  width: 84%;
  margin-left: 8%;
  margin-top: 10px;
}
.input {
  /* border-bottom: 1px solid #DDDDDD; */
  width: 92%;
  margin-left: 4%;
  margin-top: 0.5rem;
  background-color: #f5f5f5;
  border-radius: 15px;
}
.label {
  font-size: 15px;
  position: relative;
  top: 15px;
}
.get-code {
  background-color: #fff;
  color: #55babb;
  border: 1px solid #55babb;
  border-radius: 5px;
  font-size: 10px;
  padding: 5px 20px;
}
.check {
  float: left;
}
.text {
  color: #55babb;
}
.protocol {
  font-size: 10px;
  margin-left: 0.2rem;
}
.btn {
  width: 100%;
  border: 1px solid #55babb;
  border-radius: 7px;
  padding: 12px 0;
  font-size: 15px;
  margin-top: 20px;
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
