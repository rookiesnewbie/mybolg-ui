<template>
    <div style="width: 100%; height: 100vh; overflow: hidden;background-color:#0f9876;">
        <div class="box-card">
            <div style="font-size: 30px; text-align: center; padding: 30px 0">欢迎注册</div>
            <el-form ref="form" :model="form" size="normal" :rules="rules">
                <el-form-item prop="username" label="帐号">
                    <el-input prefix-icon="el-icon-user-solid" v-model="form.username"></el-input>
                </el-form-item>
                <el-form-item prop="password" label="密码">
                    <el-input prefix-icon="el-icon-lock" v-model="form.password" show-password></el-input>
                </el-form-item>
                <el-form-item prop="confirm" label="确认密码">
                    <el-input prefix-icon="el-icon-lock" v-model="form.confirm" show-password></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button style="width: 100%" type="primary" @click="register">注册</el-button>
                </el-form-item>
                <el-form-item><el-button type="text" @click="$router.push('/login')">&lt;&lt;返回登录
                    </el-button></el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import request from "@/utils/request";

export default {
    name: "register",
    data() {
        return {
            form: {},
            rules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                ],
                confirm: [
                    { required: true, message: '请确认密码', trigger: 'blur' },
                ],
            }
        }
    },
    methods: {
        register() {

            if (this.form.password !== this.form.confirm) {
                this.$message({
                    type: "error",
                    message: '2次密码输入不一致！'
                })
                return
            }

            this.$refs['form'].validate((valid) => {
                if (valid) {
                    request.post("/user/register", this.form).then(res => {
                        if (res.code === '0') {
                            this.$message({
                                type: "success",
                                message: "注册成功"
                            })
                            this.$router.push("/login")  //登录成功之后进行页面的跳转，跳转到主页
                        } else {
                            this.$message({
                                type: "error",
                                message: res.msg
                            })
                        }
                    })
                }
            })
        }
    }
}
</script>

<style scoped>

.box-card{
    width: 30%; 
    margin: 100px auto;
    border: 1px solid #eee; 
    border-radius: 25px;
    background-color: white;
}

</style>
