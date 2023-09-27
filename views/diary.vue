<template>
  <div class="diary">
      <el-form 
        :model="fomrData" 
        :rules="rules"
        ref="addValidateForm" 
        class="demo-dynamic">
          <el-form-item
            prop="title"
            label="">
            <el-input
              type="text"
              placeholder="请输入标题"
              class="title-sty"
              v-model="fomrData.title">
            </el-input>
          </el-form-item>
          <el-form-item
            prop="content"
            label="">
            <el-input
              type="textarea"
              :rows="5"
              placeholder="请输入内容"
              class="d_content"
              v-model="fomrData.content">
            </el-input>
          </el-form-item>
      </el-form>
      <div style="position:relative;text-align: right;" class="btn">
        <el-button type="primary"  @click="confirm">保存</el-button>
      </div>
      <ul class="content-box">
        <li v-for="(item, index) in msgList" :key="index" style="border-radius: 4px;">
          <div style="display: flex">
            <h3 style="font-weight: bold; flex: 1;margin-bottom: 5px;font-size: 18px;">{{item.title}}</h3>
            <span style="flex: 1; text-align: right">
              <span>发布时间:</span>
              <span>{{item.createTime}}</span>
            </span>
          </div>
          <p class="content">{{item.content}}</p>
          <div style="position: relative; text-align: right;" v-if="!delMsg">
            <el-button type="primary"  @click="updata(item)">修改</el-button>
            <!-- 通过对象来删除随手记 -->
            <!-- <el-button type="primary"  @click="delDiary(item)">删除</el-button> -->

            <!-- 通过id来逻辑删除随手记 -->
            <el-button type="primary"  @click="delDiary(item.id)">删除</el-button>
          </div>
        </li>
      </ul>
      <p-dialog v-model="updataDialog" :title="'修改笔记'" :toolbar="toolbar">
        <el-form 
        :model="editFomrData" 
        :rules="editRules"
        ref="editValidateForm" 
        class="demo-dynamic">
          <el-form-item
            prop="title"
            label="">
            <el-input
              type="text"
              placeholder="请输入标题"
              class="title-sty"
              v-model="editFomrData.title">
            </el-input>
          </el-form-item>
          <el-form-item
            prop="content"
            label="">
            <el-input
              type="textarea"
              :rows="5"
              placeholder="请输入内容"
              class="d_content"
              v-model="editFomrData.content">
            </el-input>
          </el-form-item>
        </el-form>
      </p-dialog>
  </div>
</template>

<script>
import { type } from 'os';
export default {
  name: 'Diary',
  data () {
    return {
      delMsg: false,
      editFomrData: {
        title: '',
        content: '',
      },
      editRules: {
        title: [
          { required: true, message: '请输入标题！', trigger: 'blur' },
        ],
        content: [
          { required: true, message: '请输入内容！', trigger: 'blur' },
        ],
      },
      rules: {
        title: [
          { required: true, message: '请输入标题！', trigger: 'blur' },
        ],
        content: [
          { required: true, message: '请输入内容！', trigger: 'blur' },
        ],
      },
      fomrData: {
        title: '',
        content: '',
      },
      api: process.env.BASE_API,
      toolbar: [
        {
          text: '取消',
          type: 'default',
          func: () => {
            this.updataDialog = false
          }
        },
        {
          text: '确定',
          func: () => {
            this.confirmUpdata()
          }
        },
      ],
      updataObj: {
        title: '',
        content: ''
      },
      updataDialog: false,
      title: '',
      msgList: [],
      content: '',
      user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {}
    }
  },
  created () {
    this.delMsg = false
    if(this.$cookies.get('rt') === '780c2dc1d58d6f5e6a870ea08ec7c7ac') {
      this.delMsg = true
    }
    this.getDiaryList()
  },
  methods: {
    dateAction (val) {
      if (val < 10) {
        val = '0' + val
      }
      return val
    },
    delDiary (obj) {
      if (!this.$cookies.get('access_token')) {
        this.$message.error('还没登录！先去登录再来删除笔记嘞！')
        return
      }
      const role_id = this.user.role
      if(role_id != 1){
        this.$message.error("您没有此操作的权限,请联系管理员")
        return
       }else{
        this.$confirm("确定删除此日记？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {

        //this.$axios.post(`${this.api}/note/delDiary/${obj}`).then(res => { //通过对象来删除随手记
   
        // this.$axios.post(`${this.api}/note/delDiary/${obj}`).then(res => { //通过id来逻辑删除随手记
          this.request.post(`/note/delDiary/${obj}`).then(res => { //通过id来逻辑删除随手记
            if(res.code === 200){
              this.$message.success('日志已删除！')
              this.getDiaryList()
            }
        })
      });
       }
      
    },
    updata (obj) {
      if (!this.$cookies.get('access_token')) {
        this.$message.error('还没登录！先去登录再来修改笔记嘞！')
        return
      }
      const role_id = this.user.role
       if(role_id != 1){
        this.$message.error("您没有此操作的权限,请联系管理员")
        this.updataDialog = false
        return
       }
      Object.assign(this.editFomrData, obj)
      this.updataDialog = true
    },
    confirmUpdata () {
      if (!this.$cookies.get('access_token')) {
        this.$message.error('还没登录！先去登录再来修改笔记嘞！')
        return
      }
      
      this.$refs.editValidateForm.validate((valid) => {
        if (valid) {
          // this.$axios.post(`${this.api}/note/updataDiary`, 
          this.request.post(`/note/updataDiary`, 

            Object.assign({}, this.editFomrData)
          ).then(res => {
            if(res.code === 200){
              for(let key in this.editFomrData) {
                this.editFomrData[key] = ''
              }
                this.$message.success('修改成功！')
                this.updataDialog = false
                this.getDiaryList()
              }
          })
        }
      });
    },
    confirm () {
      if (!this.$cookies.get('access_token')) {
        this.$message.error('还没登录！先去登录再来添加笔记嘞！')
        return
      }
      this.$refs.addValidateForm.validate((valid) => {
        if (valid) {
          // this.$axios.post(`${this.api}/note/addDiary`, {
            this.request.post(`/note/addDiary`, {
            content: this.fomrData.content,
            title: this.fomrData.title,
            className: 'javascript'
          }).then(res => {
            if(res.code === 200){
              for(let key in this.fomrData) {
              this.fomrData[key] = ''
            }
            this.$message.success('日志保存成功！')
            this.getDiaryList()
            }
          })
        }
      });
    },
    getDiaryList () {
      // this.$axios.get(`${this.api}/note/getDiaryList`).then(res => {
        this.request.get(`/note/getDiaryList`).then(res => {
        this.msgList = res.data
      })
    },

    //权限判断
    isRole(){
       const role_id = this.user.role
       if(role_id != 0){
        this.$message.error("您没有此操作的权限,请联系管理员")
        return
       }
    }
  }
}
</script>

<style lang="less" scoped>
.btn {
  flex: 1;
  text-align: right;
  margin: 10px;
  .el-button {
    background-color: #097d88;
    /* IE10、Firefox and Opera，IE9以及更早的版本不支持 */
    animation-name: breath;                         /* 动画名称 */
    animation-duration: 3s;                         /* 动画时长3秒 */
    animation-timing-function: ease-in-out;         /* 动画速度曲线：以低速开始和结束 */
    animation-iteration-count: infinite;            /* 播放次数：无限 */

    /* Safari and Chrome */
    -webkit-animation-name: breath;                 /* 动画名称 */
    -webkit-animation-duration: 2s;                 /* 动画时长3秒 */
    -webkit-animation-timing-function: ease-in-out; /* 动画速度曲线：以低速开始和结束 */
    -webkit-animation-iteration-count: infinite;    /* 播放次数：无限 */
  }
  @keyframes breath {
  from { opacity: 0.1; }                          /* 动画开始时的不透明度 */
      20%  { opacity:   1; }    
      40%  { opacity:   0.8; }
      60%  { opacity:   0.6; }
      80%  { opacity:   0.4; }                      /* 动画50% 时的不透明度 */
      90%  { opacity:   0.2; }
      to   { opacity: 0.1; }                          /* 动画结束时的不透明度 */    
  }
  
  @-webkit-keyframes breath {
      from { opacity: 0.1; }                          /* 动画开始时的不透明度 */
      50%  { opacity:   1; }                          /* 动画50% 时的不透明度 */
      to   { opacity: 0.1; }                          /* 动画结束时的不透明度 */
  }
}
.el-form-item {
    margin-bottom: 10px;
}
.content-box li {
  border: 1px solid #348e8d;
  margin: 10px 0;
  padding: 10px;
}
.content {
  text-align: left;
  line-height: 30px;
  text-indent: 2em;
  letter-spacing: 1px;
  font-size: 18px;
}
.create-date {
  text-align: right;
}
.el-content {
  /* z-index: -1; */
}
</style>
<style>
.title-sty .el-input__inner {
  border: none;
  background: #ade3e3;
  border-bottom: 1px solid #348e8d;
  border-radius: unset;
}
.d_content .el-textarea__inner {
  margin-top: 10px;
  border: 1px solid #348e8d;
}
</style>