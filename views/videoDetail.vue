<template>
    <div>
      
      <div>
        <el-button type="warning" circle="" style="font-size:20px;margin-left: 5px;" icon="el-icon-back" @click="returnVideo"></el-button>
        <el-button type="warning" circle style="font-size:20px;margin-left: 5px;" icon="el-icon-edit" @click="updateVideoTitle"></el-button>
        <el-button type="danger" circle style="font-size:20px;margin-top: 5px;" icon="el-icon-delete" @click="deleteVideo($route.params.videoId)"></el-button>
      </div>

      <div class='demo'>
        <div style="text-align: center; font-size: 25px;margin-bottom: 20px;">{{ title }}</div>
        <video-player class="video-js vjs-big-play-centered" style="width:auto;height: auto;"
                      ref="videoPlayer"
                      :playsinline="true"
                      :options="playerOptions">
        </video-player>
      </div>


      <!-- 修改 -->
      <p-dialog v-model="dialogVisible" title="修改视频标题" >
            <el-form :model="video" :rules="rules" ref="video" label-width="100px" class="demo-ruleForm" >
            <!-- <el-form :model="video" label-width="120px"> -->
                <el-form-item label="视频标题" prop="title">
                    <el-input v-model="video.title"/>
                </el-form-item>

                <el-form-item>
                    <!-- <el-button type="danger" @click="resetForm('video')" icon="el-icon-warning">重 置</el-button> -->
                    <el-button type="primary" @click="submitForm('video')" icon="el-icon-edit">修改</el-button>
                </el-form-item>
            </el-form>
      </p-dialog>
    </div>
  </template>
  
  <script>
  import 'video.js/dist/video-js.css'
  import { videoPlayer } from 'vue-video-player'
  
  export default {
    name: "videoDetail",
    components: {
      videoPlayer
    },
    data() {
      return {
        
        dialogVisible: false,
        title:'',
        
        playerOptions: {
          
          playbackRates: [0.5, 1.0, 1.5, 2.0, 3.0], // 可选的播放速度
          autoplay: false, // 如果为true,浏览器准备好时开始回放。
          muted: false, // 默认情况下将会消除任何音频。
          loop: false, // 是否视频一结束就重新开始。
          preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
          language: 'zh-CN',
          aspectRatio: '4:3', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
          fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
          sources: [{
            type: "video/mp4", // 类型
            src: '' // url地址
          }],
          poster: '', // 封面地址
          notSupportedMessage: '此视频暂无法播放，请稍后再试', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
          controlBar: {
            timeDivider: true, // 当前时间和持续时间的分隔符
            durationDisplay: true, // 显示持续时间
            remainingTimeDisplay: true, // 是否显示剩余时间功能
            fullscreenToggle: true // 是否显示全屏按钮
          },
         
        },
        user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {},

        video:{title:''},
        rules: {
          title: [
            { required: true, message: '请输视频的标题', trigger: 'blur' },
          ]
          
        },
        videoId: this.$route.params.videoId,
      }
    },
    created() {

      const videoId = this.$route.params.videoId
      this.request(`/video/detail/${videoId}`).then(res => {
        // console.log(res.data)
        // this.video = res.data
        this.playerOptions.sources[0].src = res.data.url
        // this.playerOptions.sources[0].src = "http://vjs.zencdn.net/v/oceans.mp4"
        this.title = res.data.title
      })
    },
    methods: {
        deleteVideo(videoId){

            if (!this.$cookies.get('access_token')) {
              this.$message.error('还没登录，请先登录！！！')
              return
            }
            this.$confirm("确定删除此视频？", "警告", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            }).then(() => {
              
              const role_id = this.user.role
              if(role_id != 1 ){
                this.$message.error("您没有此操作的权限,请联系管理员")
                return        
              }else{
                
                this.request.delete(`/video/delete/${videoId}`).then(res => {
                    if(res.code === 200){
                        this.$message.success(res.msg)
                        try{ this.$router.push({ path: '/video' }) }catch(e){}
                    }
                })     
              } 
            })
            
            
        },

        updateVideoTitle(){
            this.dialogVisible = true
        },
        saveVideo(){
            this.dialogVisible = false
        },

        //编辑视频的标题
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
            if (valid) {

                if (!this.$cookies.get('access_token')) {
                this.$message.error('还没登录，请先登录！！！')
                return
                }

               if(this.user.role != 1){
                this.$message.error('您没有此操作的权限,请联系管理员')
                return
               }else{
                    this.request.get(`/video/edit/${this.videoId}`, {params:
                        {
                            title:this.video.title
                        }
                    }).then(res => {
                        if(res.code === 200){
                            this.$message.success(res.msg)
                            this.video.title = ''
                            try { this.$router.push("/video") } catch (e) { }
                        }
                        })
                    } 
            }else {
            // console.log('error submit!!');
            return false;
          }
        });
            },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },

        returnVideo(){
          try{ this.$router.push("/video") } catch (e){}
        }

    }
  }
  </script>
  
  <style scoped>
   .demo{
      width:550px;
      height: auto;
      margin-left: 26%;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      padding: 80px 15px;
   }
  </style>