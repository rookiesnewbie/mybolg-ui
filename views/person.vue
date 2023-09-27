<template>
  <p-dialog 
	v-model="dialogFormVisible" 
	:title="'编辑个人信息'"
	:toolbar="toolbar"
    v-on:input="closeDialog">
      <el-form  label-width="80px" size="small">
        <el-form-item label="昵称">
          <el-input v-model="form.nickName  " autocomplete="off" ></el-input>
        </el-form-item>
        <!-- <el-form-item label="角色">
          <el-input v-if="form.role === 1" v-name="管理员" autocomplete="off" ></el-input>
          <el-input v-else v-name="普通用户" autocomplete="off" ></el-input>
        </el-form-item> -->
        <el-form-item label="邮箱" v-if="form.email != null">
          <el-input v-model="form.email" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="电话" >
          <el-input v-model="form.phone" autocomplete="off" ></el-input>
        </el-form-item>
        <el-form-item label="地址" >
          <el-input type="textarea" v-model="form.provinces" autocomplete="off" ></el-input>
        </el-form-item>
      </el-form>
  </p-dialog>
</template>

<script>
import { isValidatePhone } from "@/utils/validate";

export default {
  name: "person",
  data () {
    return {
        toolbar: [
            {
                text: '取消',
                type: 'default',
                func: () => {
                    this.closeDialog()
                    this.dialogFormVisible = false
                }
            },
            {
                text: '确定',
                func: () => {
                    this.info()
                }
            }
        ],
      dialogFormVisible: true,
      api: process.env.BASE_API,
      form: {},
      user:localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {}
      }
  },
  methods:{//编辑用户弹窗
      info(){
        //判断手机号格式是否正确
        if (!isValidatePhone(this.form.phone)) {
          this.$message({
              message: '电话格式不正确',
              type: 'warning',
              duration: 2000
          });
          return
        }

        this.$store.dispatch("updateUser", this.form).then(res => {
          if (res.code === 200) {
            this.$message({
              message: '编辑成功',
              type: 'success',
              duration: 1000
            });
            this.dialogFormVisible = false; //关闭弹出框             
            this.$router.push({ path: '/myCenter' }) //跳转到个人信息页
          }

        });
    },
    closeDialog() {
        this.$router.push({path: '/myCenter'})
    },
    //绑定取消按钮键
    cancel(){
        this.dialogFormVisible = false;
        this.$router.push({path: '/myCenter'})
    }
    // handleAvatar(res) {
    //   this.form.avatarUrl = res.records.avatarUrl;
    // },
  },
  created(){
    //console.log("this.user.id:",this.user.nickname);
    // this.$axios.post(`${this.api}/user/info/${this.user.id}`).then(res => {
      this.request.post(`/user/info/${this.user.id}`).then(res => {

          // Object.assign(this.info, {figureurl_qq_2: res.data.url, nickname:res.data.nickname})
        // console.log(res)
        if (res.code === 200) {
          this.form = res.data
        } else {
          this.$router.push({ path: '/' })

        }
      })

  }
}
</script>

<style scoped>
.v-modal {
    z-index: -3 !important;
}
</style>