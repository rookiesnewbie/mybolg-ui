<template>
  <div class="container">
    <div style="font-size: 30px; text-align: center; padding: 30px 0">欢迎{{actionTitle}}李腾的个人博客</div>
    <el-form :model="loginForm" ref="loginForm" class="login-form">
      <el-form-item
        label="昵  称:"
        prop="name"
        label-width="90px"
        v-if="actionType"
        :rules="[{ required: true, message: '请输入昵称', trigger: 'blur' }]"
      >
        <el-input
          v-model="loginForm.name"
          class="psw"
          placeholder="请输入昵称"
        ></el-input>
      </el-form-item>

      <el-form-item
        label="邮  箱:"
        prop="email"
        label-width="90px"
        :rules="[
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          {
            type: 'email',
            message:
              '请输入正的邮箱地址',
            trigger: 'blur',
          },
        ]"
      >
        <el-input
          v-model="loginForm.email"
          class="psw"
          placeholder="请输入电子邮箱"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="密  码:"
        prop="psw"
        v-if="!fgt"
        label-width="90px"
        :rules="[{ required: true, message: '请输入密码', trigger: 'blur' }]"
      >
        <el-input
          type="password"
          v-model="loginForm.psw"
          class="psw"
          placeholder="请输入密码"
        ></el-input>
      </el-form-item>

      <el-form-item
        label="新密码:"
        prop="npsw"
        v-if="fgt"
        label-width="90px"
        :rules="[{ required: true, message: '请输入新密码', trigger: 'blur' }]"
      >
        <el-input
          type="password"
          v-model="loginForm.npsw"
          class="psw"
          placeholder="请输入新密码"
        ></el-input>
      </el-form-item>

      <el-form-item
        label="验证码:"
        prop="validCode"
        label-width="90px"
        v-if="!fgt"
        :rules="[{ required: true, message: '请输入验证码', trigger: 'blur' }]"
      >
        <el-input
          v-model="loginForm.validCode"
          class="psw"
          placeholder="请输入验证码"
        ></el-input>
        <ValidCode
          @input="createValidCode"
          v-if="code"
          style="margin-left: 180px; background-color: rgb(243, 243, 245)"
        />
        <el-button
          v-if="btn"
          style="
            height: 50px;
            background-color: rgb(228, 236, 218);
            margin-left: 200px;
          "
          plain
          :disabled="isButtonDisabled"
          @click="sendEamilCode"
          >{{ buttonText }}</el-button
        >
      </el-form-item>

      <el-form-item
        label="验证码:"
        prop="validCode"
        label-width="90px"
        v-if="show"
        :rules="[{ required: true, message: '请输入验证码', trigger: 'blur' }]"
      >
        <el-input
          v-model="loginForm.validCode"
          class="psw"
          placeholder="请输入验证码"
        ></el-input>
        <ValidCode
          @input="createValidCode"
          v-if="!show"
          style="margin-left: 5px; background-color: rgb(243, 243, 245)"
        />
        <el-button
          v-if="show"
          style="
            height: 50px;
            background-color: rgb(228, 236, 218);
            margin-left: 200px;
          "
          plain
          :disabled="isButtonDisabled"
          @click="sendEamilCode"
          >{{ buttonText }}</el-button
        >
      </el-form-item>

      <el-form-item label="" label-width="5px" v-if="!fgt">
        <div
          class="login-btn"
          id="qqLoginBtn"
          v-if="!actionType"
          @click="login"
        >
          登录
        </div>
      </el-form-item>
      <el-form-item label="" label-width="5px" v-if="!fgt">
        <div class="login-btn" @click="regist" v-if="actionType">注册</div>
      </el-form-item>
      <el-form-item label="" label-width="5px" v-if="fgt">
        <div class="login-btn" @click="resetPsw">确认</div>
      </el-form-item>
      <el-form-item label="">
        <div class="">
          <span v-if="fgt">
            <span style="cursor: pointer; color: #062ce7" @click="registBtn"
              >注册</span
            >
            <span>|</span>
            <span style="cursor: pointer; color: #062ce7" @click="loginBtn"
              >登录</span
            >
            <span>|</span>
          </span>
          <span v-else>
            <span
              style="cursor: pointer; color: #062ce7"
              v-if="!actionType"
              @click="registBtn"
              >注册</span
            >
            <span
              style="cursor: pointer; color: #062ce7"
              v-if="actionType"
              @click="loginBtn"
              >登录</span
            >
            <span>|</span>
          </span>
          <span style="cursor: pointer; color: #062ce7" @click="fgtBtn"
            >忘记密码？
          </span>

          <span style="cursor: pointer; color: #062ce7" @click="goHome">返回</span>
        </div>
        <div class="login-btn-qq">
          快捷登录 <img src="../static/img/qq.png" alt="" @click="qqLogin" />
                  <img src="../static/img/weixin.png" alt="" @click="wxLogin" />
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import request from "@/utils/request";
import { mapState, mapGetters } from "vuex";
import ValidCode from "@/components/ValidCode";

export default {
  name: "Login",
  components: {
    ValidCode,
  },
  data() {
    return {
      countdown: 60,
      lgBtn: false,
      fgt: false,
      labeWidth: "60px",
      actionTitle: "登录",
      actionType: false,
      btn: false,
      code: true,
      show: false,
      code: true,
      qqCallback: false,
      loginForm: {
        email: "",
        psw: "",
        npsw: "",
        nickname: "",
        validCode: "",
      },
      validCode: "", //验证码
      isButtonDisabled: false, // 获取验证码按钮是否可点击
    };
  },

  watch: {
    actionType: function (nv, ov) {
      this.actionTitle = nv ? "注册" : "登录";
    },
  
  },

  computed: {
    buttonText() {
      return this.isButtonDisabled
        ? `重新发送 (${this.countdown})`
        : "发送验证码";
    },
    ...mapState(["user"]), //获取store在的用户信息
  },

  methods: {
    //忘记密码
    resetPsw() {
      // this.loginForm.npsw = this.$md5(this.loginForm.npsw);
      // this.$axios.get(`${this.api}/user/updataPsw`, {
      if (this.loginForm.validCode == null) {
        this.$message.warning('验证码不能为空')
        return
      }
      this.request
        .get(`/user/updataPsw`, {
          params: {
            email: this.loginForm.email,
            password: this.loginForm.npsw,
            validCode: this.loginForm.validCode,
          },
        })
        .then((res) => {
          if (res.code == 200) {
            this.$message.success("密码重置成功！");
            this.loginBtn();
          }
        });
    },
    fgtBtn() {
      this.fgt = true;
      this.actionType = false;
      this.code = false;
      this.type = 2;
      this.show = true;
      this.btn = true;
      this.labeWidth = "80px";
      this.resetForm();
    },
    registBtn() {
      this.loginDialog = true;
      this.actionType = true;
      this.fgt = false;
      this.code = false;
      this.show = false;
      this.type = 1;
      this.btn = true;
      this.labeWidth = "60px";
      this.isButtonDisabled = false;
      this.resetForm();
    },
    loginBtn() {
      this.actionType = false;
      this.fgt = false;
      this.code = true;
      this.show = false;
      this.btn = false;
      this.labeWidth = "60px";
      this.resetForm();
    },
    resetForm() {
      for (let key in this.loginForm) {
        this.loginForm[key] = "";
      }
    },
    toLogin() {
      this.resetForm();
      this.loginDialog = true;
      this.actionType = false;
    },

    //注册
    regist() {
      // this.loginForm.password = this.$md5(this.loginForm.psw);
      let info = {
        nickname: this.loginForm.name,
        email: this.loginForm.email,
        password: this.loginForm.psw,
        validCode: this.loginForm.validCode,
      };
      if (this.loginForm.validCode == null) {
        this.$message.warning('验证码不能为空')
        return
      }
      // this.$axios.post(`${this.api}/user/regist`, info).then(res => {
      this.request.post(`/user/register`, info).then((res) => {
        if (res.code === 200) {
          this.actionType = false;
          this.loginBtn();
          this.$message.success("注册成功！");
        }
      });
      },
    
      // 接收验证码组件提交的 4位验证码
    createValidCode(data) {
        this.validCode = data
    },

    //登录
    login() {
      // this.loginForm.psw = this.$md5(this.loginForm.psw);
      let info = { email: this.loginForm.email, password: this.loginForm.psw };

      if (
        this.loginForm.validCode.toLowerCase() !== this.validCode.toLowerCase()
      ) {
        this.$message.error("验证码错误");
        return;
      }
      this.$store.dispatch("Login", info).then((res) => {
        this.loginDialog = false;
        this.actionType = false;
        this.lgBtn = true;
        this.$cookies.set("access_token", res.data.token);
        this.$cookies.set("uid", res.data.id);
        // localStorage.setItem('user', res.data);//保存用户信息到浏览器
        this.$message.success(res.msg);
        this.$router.push("/")
      });
    },

    qqLogin() {
      let callbackUrl = this.$route.query.callbackUrl;
      this.request
        .get(`/user/qqLogin`, {
          params: {
            callbackUrl,
          },
        })
        .then((response) => {
          document.location.href = response.data;
        })
        .catch((error) => {
          // 请求失败时执行的代码
          console.error("请求失败:", error);
          // 在这里您可以处理请求失败的情况，例如显示错误消息给用户
          this.$message.error("请求失败，请稍后再试");
        });
    },

    wxLogin() {
      this.$message.success("腾讯太坑了，此功能得花300块钱注册，还是使用QQ登录吧");
      // let callbackUrl = this.$route.query.callbackUrl;
      // this.request
      //   .get(`/user/wxLogin`, {
      //     params: {
      //       callbackUrl,
      //     },
      //   })
      //   .then((response) => {
      //     document.location.href = response.data;
      //   })
      //   .catch((error) => {
      //     // 请求失败时执行的代码
      //     // 在这里您可以处理请求失败的情况，例如显示错误消息给用户
      //     this.$message.error("请求失败，请稍后再试");
      //   });
    },

    setConform() {
      let psw = this.$md5(this.settingForm.psw);
      this.$cookies.set("rt", psw);
      this.settForm = false;
      this.settingForm.psw = "";
    },

    //发送邮箱验证码
    sendEamilCode() {
      this.request
        .get(`/user/sendEmailCode`, {
          params: {
            email: this.loginForm.email,
            type: this.type,
            password: this.loginForm.npsw,
          },
        })
        .then((res) => {
          if (res.code === 200) {
            // debugger
            if (this.code && this.show) {
            }
            // console.log(`this.code=${this.code}, this.show=${this.show}`);
            this.isButtonDisabled = true; // 禁用按钮

            this.$message.success(res.msg);
            //开启定时器
            const timer = setInterval(() => {
              let countdown = this.countdown--;
              if (countdown == 0) {
                clearInterval(timer); //关闭定时器
                this.isButtonDisabled = false; // 启用按钮
                this.countdown = 60; // 重置倒计时
              }
            }, 1000);
          }
        });
    },
    goHome(){
      this.$router.push("/")
    }
  },
};
</script>

<style scoped>
.container {
  width: 100%;
  height: 100hv;
  max-width: 392px;
  border-radius: 25px;
  margin: 100px 185px 60px 816px;
  -webkit-transition: all 0.3s;
  border: 1px solid #eee;
  padding: 10px 12px;
  transition: all 0.3s;
  background: #ffffff;
  /* background-color: rgba(0, 187, 53, 0.5); */
  background-size: cover;
  /* 让图片尽量填充背景区域 */
  background-repeat: no-repeat;
  /* 防止重复平铺 */
  position: relative;
  transition: transform 0.3s ease;
  /* 添加过渡效果，当 transform 属性改变时，以 0.3 秒的速度进行平滑过渡 */
}

.box-card {
  width: 30%;
  margin: 100px auto;
  border: 1px solid #eee;
  border-radius: 25px;
  background-color: white;
}

.login-btn-qq {
    margin-top: 20px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;

  }
  img {
      cursor: pointer;
      margin-left: 10px;
      width: 20px;
    }
.login-btn {
  text-align: center;
  font-size: 18px;
  background: #348e8d;
  height: 38px;
  margin-top: 15px;
  border-radius: 4px;
  color: rgb(255, 255, 255);
  cursor: pointer;
}

.psw .el-input__inner {
  border: none;
  background: #ade3e3;
  border-bottom: 1px solid #348e8d;
  border-radius: unset;
}
</style>
