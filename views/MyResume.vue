<template>
  <div>
    <el-upload v-if="flag"
      class="upload-demo"
      ref="upload"
      :before-upload="uploadResume"
      :action="`${api}/resume/uploadResume/${user.id}`"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :file-list="fileList"
      :auto-upload="false"
    >
      <el-button slot="trigger" size="small" type="primary" style="margin-top: 5px;">选择简历</el-button>
      <el-button
        style="margin-left: 10px;margin-top: 5px;"
        size="small"
        type="success"
        @click="submitUpload"
        
        >上传到服务器</el-button
      >
    </el-upload>
    <embed :src="fileUrl" type="application/pdf" width="100%" height="1000" style="margin-top: 5px;"/>
  </div>
</template>
<script>
import Embed from "vue-embed";
import axios from "axios";
export default {
  name: "FileView",
  components: {
    Embed,
  },
  data() {
    return {
      api: process.env.BASE_API,
      user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {},
      flag: false,
      fileList: [
      ],
    
    //   fileUrl:"https://ltmyblog.oss-cn-shenzhen.aliyuncs.com/myBlog/jianli/%E6%9D%8E%E8%85%BE%E7%AE%80%E5%8E%86_java%E5%B7%A5%E7%A8%8B%E5%B8%882.pdf",
    fileUrl: "",
    };
  },
  created() {
    if (this.user.role === 1) {
      this.flag = true;
    }
    this.getResume()
  },

    methods: {
        //获取简历信息
      getResume() {
            let userId = this.user.id
            this.request.get(`/resume/userId`,userId).then(response => {
                
              this.fileUrl = response.data.url;
                
            })
        },
           

        //上传简历信息
        uploadResume() {
            if (!this.$cookies.get('access_token')) {
                this.$message.error('还没登录，请先登录！！！')
                return
            }
        },

        
    submitUpload() {
      // if (!this.$cookies.set('access_token')) {
      //   this.$message.error('还没登录，请先登录！！！')
      //   return
      // }
      this.$refs.upload.submit() // 提交上传请求
       // 接口调用成功后强制刷新页面
       window.location.reload();
    },
    handleRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    handlePreview(file) {
      
    },
  },
};
</script>