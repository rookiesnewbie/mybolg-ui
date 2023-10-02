<template>
  <div>
    <div class="mcontaner">   
      <div style="margin: 10px 0">
        <el-input style="width: 200px" placeholder="请输入关键字搜索" suffix-icon="el-icon-search" v-model="keyWorld"  @keyup.enter.native="page"/>
        <el-button class="ml-5" type="primary" @click="page" icon="el-icon-search">搜索</el-button>
        <el-button type="warning" @click="reset">重置</el-button>
        <el-button type="warning" @click="uploadVideo" icon="el-icon-s-promotion" v-if="user.role === 1">上传视频</el-button>

      </div>
      <div class="block" >

        
          <div class="video-card" v-for="video in videoList" :key="video.id" @click="videoDetail(video.id)">
          <div>发布时间：{{ video.createTime }}</div>
             
            <h4>
              {{ video.title }}
            </h4>
                  
                  
          </div>
       
      </div>

      <div>
        <el-pagination
                class="pagination"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="pageNum"
                :page-sizes="[10, 20, 25, 35, 40, 50]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
                >
        </el-pagination>
      </div>
   
    </div>

    <!-- 添加和修改课时表单 -->
  <p-dialog v-model="dialogVisible" title="上传视频" :toolbar="toolbar">
    <el-form :model="video" label-width="120px">
      
      <!-- 上传视频 -->
      <el-form-item label="上传视频">
        <el-upload
          ref="upload"
          :auto-upload="false"
          :on-success="handleUploadSuccess"
          :on-error="handleUploadError"
          :on-exceed="handleUploadExceed"
          :file-list="fileList"
          :limit="1"
          :before-remove="handleBeforeRemove"
          :on-remove="handleOnRemove"
          :action="`${api}/video/upload`">
          <el-button slot="trigger" size="small" type="primary">选择视频</el-button>
          <el-button
            :disabled="uploadBtnDisabled"
            style="margin-left: 10px;"
            size="small"
            type="success"
            @click="submitUpload()">上传</el-button>
        </el-upload>
      </el-form-item>
    </el-form>
  </p-dialog>
 

  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  
    data() {
      return {
        api: process.env.BASE_API,
        toolbar: [
            {
                text: '取消',
                type: 'default',
                func: () => {
                    this.dialogVisible = false
                }
            },
            {
                text: '确定',
                func: () => {
                    this.saveVideo()
                }
            }
        ],

        videoForm: {
          title: ''
        },
        fileList: [], // 上传文件列表
        keyWorld: '',
        pageNum: 0,
        pageSize: 9,
        total: 0,
        videoList: {},
        dialogVisible: false,
        video:{title: '',},
        uploadBtnDisabled: false,
     
      };
    },
    computed: {
    ...mapGetters(['user'])
  },
    methods: {
      // submitForm(formName) {
      //   this.$refs[formName].validate((valid) => {
      //     if (valid) {

      //       if (!this.$cookies.get('access_token')) {
      //         this.$message.error('还没登录，请先登录！！！')
      //         return
      //       }
      //       debugger
      //       this.ruleForm.userId = this.user.id
      //         this.request.post(`/video/upload`, this.videoForm).then(res => {
      //         if(res.code === 200){
      //           this.$message.success(res.msg)
      //         }
      //       })

      //     //  this.$message.success("提交成功");
      //     } else {
      //       console.log('error submit!!');
      //       return false;
      //     }
      //   });
      // },
      // resetForm(formName) {
      //   this.$refs[formName].resetFields();
      // },

      page() {       
          this.request.get(`/video/page`,{
          params: {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          keyWorld: this.keyWorld
          }
        }
           ).then(res => {
            // console.log(res.data.records);
            this.videoList = res.data.records 
            
            //console.log(res.data.total);
             this.total = res.data.total   
          })
        },

      videoDetail(id) {
        try { this.$router.push({ name: 'videoDetail', params: { videoId: id } }) } catch (e) { }
      },
        //重置按钮事件
        reset(){
          this.keyWorld = '';
          this.page()
        },

        //没有显示几条数据
        handleSizeChange(pageSize){
          this.pageSize = pageSize;
          this.page();
        },

        //当前页
        handleCurrentChange(pageNum) {
          this.pageNum = pageNum;
          this.page();
        },

        //绑定上传视频按钮，显示文件上传出弹出框
        uploadVideo(){
          this.dialogVisible = true
        },

        //绑定确定按钮
        saveVideo(){
          this.dialogVisible = false
          this.page()
        },

        // 视频上传成功的回调
        handleUploadSuccess(response, file, fileList) {
          
          this.uploadBtnDisabled = false
          this.video.videoSourceId = response.data
          this.video.videoOriginalName = file.name
          this.$message.success('上传成功')
          
        },

        // 失败回调
        handleUploadError() {
          // debugger
          this.uploadBtnDisabled = false
          this.$message.error('上传失败')
        },

          // 上传多于一个视频
        handleUploadExceed(files, fileList) {
          this.$message.warning('想要重新上传视频，请先删除已上传的视频')
        },

        // 删除视频文件确认
        handleBeforeRemove(file, fileList) {
          return this.$confirm(`确定移除 ${file.name}？`)
        },

      // 执行视频文件的删除
        handleOnRemove(file, fileList) {
          if (!this.video.videoSourceId) {
            return
          }
        },

        // 上传
        submitUpload() {
          if (!this.$cookies.set('access_token')) {
              this.$message.error('还没登录，请先登录！！！')
              return
            }
          this.uploadBtnDisabled = true
          this.$refs.upload.submit() // 提交上传请求
         
        },
      },


      created() {
        this.page()
      }
    
  }
</script>

<style scoped>
  
  .pagination {
    margin: 3rem auto;
    display: flex;
    justify-content: center;
  }

  /* 整体容器 */
  .mcontaner {
    display: flex;
    flex-direction: column;
  }

  

  /* 视频容器 */
  .block {
    display: flex;
    flex-wrap: wrap;
    
  }
  

  /* 视频卡片样式 */
  .video-card {
    justify-content: space-between; /* 水平排列卡片，等距离分布 */
    align-items: flex-start;; /* 垂直居中对齐卡片 */
    width: 100%;
    height: 115px;
    max-width: 342px; /* 控制每个卡片的最大宽度 */
    border-radius: 25px;
    margin: 15px 0px 10px 13px;
    -webkit-transition: all .3s;
    border: 1px solid #eee;
    padding: 10px 12px;
    transition: all .3s;
    background:#ffffff;
    position: relative;
    transition: transform 0.3s ease; /* 添加过渡效果，当 transform 属性改变时，以 0.3 秒的速度进行平滑过渡 */
  }

  /* 最后一项的右边距设置为 0，防止换行时出现多余空白 */
  /* .video-card:nth-child(3n) {
      margin-right: 0;
    } */

    /* 当鼠标悬浮在video-card上时的样式 */
  .video-card:hover{
    transform: scale(1.025); /* 放大video-card到 102.5% 的尺寸 */
    background: rgba(0, 187, 85, 0.5);
    border: 1px solid rgba(119, 110, 120, 0.5);
    cursor: pointer;
  }

  /* 分页样式 */
  .pagination {
    margin-top: 10px;
    text-align: center;
  }

  h4{
    text-align: center;
    margin-top: 22px;
    white-space: nowrap; /* 防止文字换行 */
    overflow: hidden; /* 隐藏超出容器的内容 */
    text-overflow: ellipsis; /* 在超出容器时显示省略号 (...) */
  }
</style>