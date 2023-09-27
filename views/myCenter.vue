<template>
  <div class="mycter">
    <h1 class="info">基本信息:</h1>
    <div class="info-ct">
      <img :src="info.avatar ? info.avatar: '../../static/img/visity.png'" alt="">
      <div class="nm-bx">
        <span>昵称：</span>     
        <span>{{info.nickName }}</span><br/>

        <span>角色</span>：</span>     
        <span v-if="info.role == 1">管理员</span>
        <span v-if="info.role == 0">普通用户</span><br/>

        <div  v-if="info.email != null">
          <span v-if="info.email != null">邮箱：</span>       
          <span v-if="info.email != null">{{ info.email }}</span><br/>
        </div>
        
         
        <span>地址：</span>    
        <span>{{info.provinces}}</span><br/>
        
        <span>电话：</span>
        <span>{{info.phone}}</span><br/>
      
      </div>     
    </div>
    
    <!-- <span style="font-size:25px" @click="update">编辑</span> --> 
    <!-- <p style="font-size:50px" @click="update">编辑</p> -->
    <el-button type="warning" @click="update" icon="el-icon-edit" plain>编辑个人信息</el-button>
    <template>
      <el-button type="warning" @click="dialogFormVisible=true" icon="el-icon-edit" plain v-if="info.email != null">修改密码</el-button>
    </template>

    <!--    修改密码弹出框-->
    <p-dialog 
    v-model="dialogFormVisible" 
	  :title="'请输入新密码'"
	  :toolbar="toolbar">
      <el-form  label-width="80px" size="small" ref="ruleForm">
        <el-form-item label="新密码" prop="password">
          <el-input placeholder="请输入新密码" v-model="ruleForm.password" autocomplete="off" show-password></el-input>
        </el-form-item>

        <el-form-item label="验证码" prop="validCode">
          <el-input placeholder="请输入验证码" v-model="ruleForm.validCode" autocomplete="off"></el-input>
          <el-button type="primary" :disabled="isButtonDisabled" @click="sendEamilCode" style="margin-top:10px">{{ buttonText }}</el-button>
        </el-form-item>
        
      </el-form>
      <!-- <div slot="footer" class="dialog-footer">
        <el-button type="danger" @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="updatePassword">确 定</el-button>
      </div> -->

    </p-dialog>
  

  </div>
</template>

<script>
export default {
  name: 'Picture',
  data () {
    return {
      isButtonDisabled: false, // 按钮是否可点击
      countdown: 60, // 倒计时时间（秒）
      api: process.env.BASE_API,
      info: {
        // figureurl_qq_2: '',
        // nickname: '',
      },
      user:localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {},
      dialogFormVisible: false,
      
      ruleForm: [{
        password: '',
        validCode: '',
      }],
      toolbar: [
            {
                text: '取消',
                type: 'default',
                func: () => {
                    this.dialogFormVisible = false
                }
            },
            {
                text: '确定',
                func: () => {
                    this.updatePassword()
                }
            }
        ],

    }
  },
  created () {
    this.init()
  },

  computed: {
        buttonText() {
            return this.isButtonDisabled ? `重新发送 (${this.countdown})` : '获取验证码';
        },
    },

  methods: {
    init () {
      if (localStorage.getItem("openid")) {
        this.qqInfo()
      } else {
        this.normalInfo()
      }
    },
    normalInfo () {
      // this.$axios.post(`${this.api}/nInfo`,{ud: this.$cookies.get("uid")}).then(res => {
      //   Object.assign(this.info, {figureurl_qq_2: res.data.url, nickname:res.data.name})
      // })
      //   this.$axios.post(`${this.api}/user/info`,{ud: this.$cookies.get("uid")}).then(res => {
      //     Object.assign(this.info, {figureurl_qq_2: res.data.url, nickname:res.data.nickname})
      // })

      // this.$axios.post(`${this.api}/user/info/${this.user.id}`).then(res => {
        this.request.post(`/user/info/${this.user.id}`).then(res => {

          // Object.assign(this.info, {figureurl_qq_2: res.data.url, nickname:res.data.nickname})
          // console.log(res.data);
          this.info = res.data
      })
    },
    qqInfo () {
      // this.$axios.post(`${this.api}/userDetails`,{openId: localStorage.getItem("openid")}).then(res => {
        this.request.post(`/userDetails`,{openId: localStorage.getItem("openid")}).then(res => {
        this.info = eval('('+res.data.info+')')
      })
    },

    //编辑自己的信息
    update(){
      try { this.$router.push({ path: '/person' }) } catch (e) { }
    },

    //修改自己的密码
    updatePassword(){
      // this.info.password = this.$md5(this.password)
      // this.$axios.get(`${this.api}/user/updataPws/${this.user.id}`,{params: {password:this.$md5(this.password)}}).then(res => {

      if (this.ruleForm.password == null) {
        this.$message.warning('密码不能为空')
        return
      }

      if (this.ruleForm.validCode == null) {
        this.$message.warning('验证码不能为空')
        return
      }

      this.request.get(`/user/updataPws/${this.user.id}`, {
        params: {
          password: this.ruleForm.password,
          validCode: this.ruleForm.validCode,
          email: this.info.email,
        }
      }).then(res => {
        if (res.code === 200) {
          this.$message.success(res.msg)
          localStorage.clear(); // 清除localStorage中的所有数据
          this.$cookies.remove('access_token')
          this.$cookies.remove('token')
          this.$cookies.remove('uid')
          this.$store.commit('RESET_SET_USER')
          this.$store.commit('REMOVE_TOKEN')
          this.$router.push({path: '/login'})
          
          // 导航到首页
          try { this.$router.push({ path: '/' }) } catch (e) { }

        }
      })
       
    },

    //获取验证码
    sendEamilCode() {
      this.request.get(`/user/sendEmailCode`, {
        params: {
          email: this.info.email,
          type: 2,
          password: this.password
        }
      }
      ).then(res => {
        if (res.code === 200) {
          this.$message.success(res.msg)
          this.isButtonDisabled = true; // 禁用按钮
          const timer = setInterval(() => {
            this.countdown--;
            if (this.countdown <= 0) {
              clearInterval(timer);
              this.isButtonDisabled = false; // 启用按钮
              this.countdown = 60; // 重置倒计时
            }
          }, 1000);
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.info-ct {
  display: flex;
  align-items: center;
  margin: 20px 40px;
  .nm-bx {
    margin-left: 10px;
    font-size: 18px;
    font-weight: bold;
    color: #097d88;
  }
  img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    -webkit-transition-property: -webkit-transform;
    -webkit-transition-duration: 1s;
    -moz-transition-property: -moz-transform;
    -moz-transition-duration: 1s;
    -webkit-animation: rotate 10s linear infinite;
    -moz-animation: rotate 10s linear infinite;
    -o-animation: rotate 10s linear infinite;
    animation: rotate 10s linear infinite;
  }
  @-webkit-keyframes rotate{from{-webkit-transform: rotate(0deg)}
        to{-webkit-transform: rotate(360deg)}
    }
    @-moz-keyframes rotate{from{-moz-transform: rotate(0deg)}
        to{-moz-transform: rotate(359deg)}
    }
    @-o-keyframes rotate{from{-o-transform: rotate(0deg)}
        to{-o-transform: rotate(359deg)}
    }
    @keyframes rotate{from{transform: rotate(0deg)}
        to{transform: rotate(359deg)}
    }
}
  .info {
    margin-top: 20px;
    font-size: 16px;
    font-weight: bold;
    color: #097d88;
  }
</style>
