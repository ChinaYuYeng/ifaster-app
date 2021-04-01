<template>
  <div>
    <div class="top-bar">
      <img :src="bac" alt="" />
    </div>
    <div class="form-bar">
      <div class="form">
        <van-form ref="form">
          <span class="label">运营商</span>
          <van-field class="input" disabled v-model="dataForm.operator" placeholder="请输入合同签约主体名称" />
          <span class="label">姓名</span>
          <van-field class="input" :rules="userName" v-model="dataForm.cnName" placeholder="请输入您的姓名" />
          <span class="label">手机</span>
          <van-field class="input" :rules="telRules" name="mobile" v-model="dataForm.mobile" placeholder="请输入手机号码" />
          <span class="label">验证码</span>
          <van-field class="input" :rules="codeRules" v-model="dataForm.verifyCode" placeholder="请输入验证码">
            <button slot="button" class="get-code" @click="getSms">获取验证码</button>
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
        <!-- <button class="btn">注 册</button> -->
        <SubmitBtn text="注 册" width="100%" :onSubmit="register" class="btn"></SubmitBtn>
      </div>
      <van-popup v-model="show">
        协议内容
      </van-popup>
    </div>
  </div>
</template>

<script>
import bac from "../img/index-bac.png";
export default {
  data() {
    return {
      bac,
      checked: false,
      show: false,
      userName: [
        {
          required: true,
          message: "用户名不能为空",
          trigger: "onBlur"
        },
        {
          validator: value => {
            return /^[\u4e00-\u9fa5]{2,5}$/.test(value);
          },
          message: "请输入2-5位中文",
          trigger: "onBlur"
        }
      ],
      telRules: [
        {
          required: true,
          message: "手机号码不能为空",
          trigger: "onBlur"
        },
        {
          // 自定义校验规则
          validator: value => {
            return /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/.test(value);
          },
          message: "请输入正确格式的手机号码",
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
        operator: "",
        cnName: "",
        mobile: "",
        verifyCode: ""
      }
    };
  },
  methods: {
    showPopup() {
      this.show = true;
    },
    getSms() {
      this.$refs.form
        .validate("mobile")
        .then(() => {
          this.$apis
            .sms({ mobile: this.dataForm.mobile, type: 2 })
            .then(res => {
              console.log(res);
            })
            .catch(err => {
              this.$notify(err.msg);
            });
        })
        .catch(() => {
          this.$notify("请先填写手机号");
        });

      // this.$apis.sms({ mobile: this.dataForm.mobile, type: 2 });
    },
    register() {
      if (this.checked) {
        this.$refs.form.validate().then(() => {
          this.$apis.register(this.dataForm);
        });
      } else {
        this.$notify("请阅读并同意协议");
      }
      // this.$apis.register(this.dataForm);
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
  margin-top: 0px;
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
  background-color: #55babb;
  color: #fff;
}
</style>
