<template>
  <div v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      style="height: 100vh;width: 100%;">
  </div>
</template>

<script>
export default {
  name: "QqLoginCallback",
  data() {
    return {
      api: process.env.BASE_API,
      loading: true,
      user: {},
      searchobj: {
        code: '',
        state:''
      },
    }
  },
  methods: {
    login() {

      this.searchobj = {code: this.$route.query.code, state:this.$route.query.state}
      // let code = this.$route.query.code
      // let state = this.$route.query.state
      // this.request.get(`/user/qqLogin/callback`, {
      //   params: {
      //     code,
      //     state
      //   }
      // })
        this.$store.dispatch("qqLogin", this.searchobj).then(res => {
       
        if (res.code === 200) {
          this.$cookies.set('access_token', res.data.userInfo.token)
          this.$cookies.set('uid', res.data.userInfo.id)
          localStorage.setItem('user', JSON.stringify(res.data.userInfo));//保存用户信息到浏览器

          this.$message.success(res.msg)

          this.$router.push({path:"/"})
          this.loading = false
          
        } else {

          setTimeout(function () {
            this.$message.error(res.msg)
            this.$router.push("/")
            this.loading = false
          }, 1000)
          
        }
      })
      
    },

    qqLoginCallback(){},

    setuser() {
			this.user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {}
    },

  },
  created() {
    this.login();
  }
}
</script>

<style scoped>
body {
    margin: 0;
  }
</style>