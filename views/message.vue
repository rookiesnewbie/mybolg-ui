<template>
  <div class="mesage">
    <div class="info-box" v-show="infoShow">
      <el-form 
      :model="infoForm" 
      :inline="true"
      ref="info" 
      class="info">
        <el-form-item
          prop="name"
          label=""
          :rules="[
            { required: true, message: '请输入昵称/称呼（必填）', trigger: 'blur' },
          ]"
        >
          <el-input v-model="infoForm.name" placeholder="请填写昵称/称呼（必填）"></el-input>
        </el-form-item>
        <el-form-item
          prop="email"
          label=""
          :rules="[
            { required: true, message: '请输入邮箱地址', trigger: 'blur' },
            { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }
          ]"
        >
          <el-input v-model="infoForm.email" placeholder="请填写邮箱地址"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-input v-model="infoForm.net" placeholder="请填写网站"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="msg-bord">
      <el-form 
        :model="fomrData" 
        :rules="rules"
        ref="dynamicValidateForm" 
        class="demo-dynamic">
          <el-form-item
            prop="content"
            label="">
            <el-input
              type="textarea"
              :rows="5"
              placeholder="来了就顺便表示一下吧！"
              v-model="fomrData.content"
              @keyup.enter.prevent=""
              >
            </el-input>
          </el-form-item>
        </el-form>
      <!-- <el-input
        type="textarea"
        :rows="5"
        placeholder="来了就顺便表示一下吧！"
        v-model="textarea">
      </el-input> -->
      
      <div class="dicus-box">
        <div class="file">

        </div>
        <div class="btn">
          <el-button type="primary"  @click="sendMsg">@一下</el-button>
        </div>
      </div>
    </div>
    <div class="msg-list">
      <figure>
        <h1 v-for="(item, index) in discusList" :key="index">{{item}}</h1>
      </figure>
      <div class="comeing">
        <el-badge :value="visitCount" class="item">
          <h3>人来过</h3>
        </el-badge>
      </div>
      <div class="person-discu">
        <el-badge :value="discTotal" class="item">
          <h3>评论</h3>
        </el-badge>
      </div>
    </div>
    <ul class="content-box">
      <li v-for="(item, index) in msgList" :key="index" :class="index % 2 === 0 ? 'visit' : 'visits'">
        <div class="pic">
          <img :src="item.url? item.url : '../static/img/visity.png'" alt="">
        </div>
        <div class="msg-content">
          <div class="content-head">
            <div class="name">
              <h4>{{item.nickname}}</h4>
            </div>
            <div class="create-date">
              <span>发布时间:</span>
              <span>{{item.createTime}}</span>
            </div>
          </div>
          <p class="content" style="text-indent:2em;">{{item.text}}</p>
          <div class="repeat-box">
            <!-- 通过对象来删除留言 -->
            <!-- <span class="del" @click="delDiscuss(item)" v-if='!delMsg'>删除</span> -->

            <!-- 通过id来逻辑删除留言 -->
            <span class="del" @click="delDiscuss(item.id)" v-if="user.id === item.uid || user.role == 1">删除</span>
            <span style="margin: 0 5px">回复</span>
            <span>点赞</span>
          </div>
        </div>
      </li>
    </ul>
    <!-- <p v-for="(item, index) in list" :key="index" v-if="(item%2)">{{item}}</p> -->
    <div 
    class="next" 
    v-if="this.msgList.length < pageInfo.totalPage"
    @click="showMore"
    >加载更多...</div>
    <div class="next" v-else>全部数据已加载完毕！</div>
  </div>
</template>

<script>
export default {
  name: 'Message',
  data () {
    return {
      delMsg: false,
      infoShow: false,
      infoForm: {
        name: '',
        email: '',
        net: '',
        url: '',
      },
      discTotal: '',
      visitCount : 0,
      rules: {
        content: [
          { required: true, message: '什么都没留下哦！', trigger: 'blur' },
        ],
      },
      fomrData: {
        content: '',
        uid: 0
      },
      pageInfo: {
        currentPage: 1,
        pageSize: 5,
        totalPage: 0
      },
      discusList: ['评论','评论','评论','评论','评论','评论','评论','评论','评论','评论'],
      api: process.env.BASE_API,
      msgList: [],
      textarea: '',
      user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {}
    }
  },
  created () {
    this.delMsg = false
    // this.delMsg = this.user.nickname
    if(this.$cookies.get('rt') === '780c2dc1d58d6f5e6a870ea08ec7c7ac') {
      this.delMsg = true
    }
    const currentCount  = localStorage.getItem('visitCount');
    if (currentCount) {
      this.visitCount = parseInt(currentCount);
    }

    // 增加计数
    this.visitCount++;

    // 将新计数保存到本地存储
    localStorage.setItem('visitCount', this.visitCount.toString());
    this.getMsg()
  },
  methods: {
    
    delDiscuss (obj) {
      if (!this.$cookies.get('access_token')) {
        this.$message.error('还没登录！先去登录再来删除留言嘞！')
        return
      }
      this.$confirm("确定删除此评论？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {       
        //this.$axios.post(`${this.api}/content/delDiscuss`,obj).then(res => { //通过对象来删除
        // this.$axios.post(`${this.api}/content/delDiscuss/${obj}`).then(res => {  //通过id来逻辑删除留言
          this.request.post(`/content/delDiscuss/${obj}`).then(res => {  //通过id来逻辑删除留言
          // this.msgList.forEach((item,index) => {
          //   if (item.msg_id === obj.msg_id) {
          //     this.msgList.splice(index, 1)
          //   }
          // })
          if(res.code === 200){
            this.$message.success('评论已删除！')
            this.resetPage()
            this.getMsg()
          }
        })
      });
    },
    showMore () {
      this.pageInfo.currentPage = this.pageInfo.currentPage + 1
      this.getMsg()
    },
    dateAction (val) {
      if (val < 10) {
        val = '0' + val
      }
      return val
    },
    setuser() {
      
			this.user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {}
		},
    
    sendMsg () {
      // let addStatus = ''
      // this.$refs.info.validate((valid) => {
      //   addStatus = valid
      //   this.infoShow = !valid
      // })
      // if (!addStatus) {
      //   return
      // }
      if (!this.$cookies.get('access_token')) {
        this.$message.error('还没登录！先去登录再来留言嘞！')
        return
      }
      this.setuser()
      this.$refs.dynamicValidateForm.validate((valid) => {
        if (valid) {
          // this.$axios.post(`${this.api}/content/addMessage`,
          this.request.post(`/content/addMessage`,
            Object.assign({},{
              text: this.fomrData.content,
              uid: this.user.id
              // userName: this.infoForm.name, 
              // email: this.infoForm.email,
              // net: '',
              // url: this.infoForm.url,
              // userCode: '00',
              // openId: localStorage.getItem("openid")? localStorage.getItem("openid"): this.$cookies.get("uid")
            })
          ).then(res => {
            if(res.code === 200){
              this.$message.success(res.msg)
              this.fomrData.content = ''
              this.resetPage()
              this.getMsg()
            }
          })
        }
      });
    },
    resetPage() {
      this.pageInfo.currentPage = 1
      this.msgList = []
    },
    getMsg () {
        // this.$axios.post(`${this.api}/content/getMessageList/${this.pageInfo.currentPage}/${this.pageInfo.pageSize}`).then(res => {
        // this.$axios.get(`${this.api}/content/getMessageList`,{params: {
          this.request.get(`${this.api}/content/getMessageList`,{params: {
          currentPage: this.pageInfo.currentPage,
          pageSize: this.pageInfo.pageSize}}).then(res => {
        // this.msgList = res.data.data.records
        // this.totalPage = res.data.total
        // this.discTotal = res.data.data.total        
        // Object.assign(this.pageInfo, {totalPage: res.data.data.total})
        // this.msgList = [...this.msgList, ...res.data.data.records]
        // console.log(res);
        
        this.totalPage = res.data.total
        this.discTotal = res.data.total        
        
        Object.assign(this.pageInfo, {totalPage: res.data.total})
        // debugger
        // this.msgList = [...this.msgList, ...res.data.data.records]  //es6解构赋值
        this.msgList = [...this.msgList, ...res.data.records]  //es6解构赋值
        
        // 去重
        let obj= {};
        this.msgList = this.msgList.reduce((preVal, curVal) => {
        obj[curVal.id] ? '' : obj[curVal.id] = true && preVal.push(curVal);
        return preVal
        }, [])
      })
    }
  }
}
</script>
<style scoped>
  .info .el-input__inner {
    border: none;
    background: #ade3e3;
    border-bottom: 1px solid #348e8d;
    border-radius: unset;
  }
  .el-badge__content {
    background-color: #3bafad;
  }
  .el-textarea__inner {
    background: #ade3e3;
  }
</style>
<style lang="less" scoped>
.del {
  cursor: pointer;
}
.info-box {
    margin-top: 12px;
    margin-bottom: 11px;
    width: 100%;
    -webkit-transform: skewX(-15deg);
    transform: skewX(15deg);
    -webkit-box-shadow: 10px 8px 8px #1fb7a6;
    box-shadow: -10px 8px 8px #1fb7a6;
    border: 2px solid #a0fff9;
    padding-left: 0;
    margin-left: 12px;
    text-align: center;
}
.next {
  margin-top: 20px;
  text-align: center;
  font-size: 17px;
  font-family: sans-serif;
  cursor: pointer;
  position: absolute;
  left: 50%;
  margin-left: -40px;
}
.repeat-box {
  text-align: right;
}
.content-head {
  display: flex
}
.name, .create-date {
  flex: 1
}
.name {
  h4 {
    font-size: 18px;
    font-weight: bold;
  }
}
.pic {
  flex: 1;
  img {
    margin: 6px 0 6px 6px;
    max-width: 70px;
    max-height: 55px;
    border-radius: 50%;
  }
}
.msg-content {
  flex: 12;
  margin: 10px
}
.visit {
  display: flex;
  // min-height: 100px;
  -webkit-transform: skewX(-15deg);
  transform: skewX(-15deg);
  -webkit-box-shadow: 10px 8px 8px #1fb7a6;
  box-shadow: 10px 8px 8px #1fb7a6;
  border: 2px solid #a0fff9;
}
.visits {
  display: flex;
  // min-height: 100px;
  -webkit-transform: skewX(15deg);
  transform: skewX(15deg);
  -webkit-box-shadow: 10px 8px 8px #1fb7a6;
  box-shadow: -10px 8px 8px #1fb7a6;
  border: 2px solid #a0fff9;
}
.dicus-box {
  display: flex;
  .file {
    flex:1;
  }
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
}
.person-discu {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid #fdffff;
  line-height: 40px;
  text-align: center;
  margin: 0px 20px 10px 0;
  color: #08a2b3;
}
.comeing {
   position: absolute;
  left: 0;
  top: 0;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  border: 1px solid #fdffff;
  line-height: 45px;
  text-align: center;
  margin: 10px;
  color: #08a2b3;
}

.mesage {
  margin-top: 10px;
}
.msg-list {
  position: relative;
  height: 146px;
  margin-top: 12px;
  width: 100%;
  -webkit-transform: skewX(-15deg);
  transform: skewX(15deg);
  -webkit-box-shadow: 10px 8px 8px #1fb7a6;
  box-shadow: -10px 8px 8px #1fb7a6;
  border: 2px solid #a0fff9;
  .msg-list {
  // background:#0a0a0a;
  overflow:hidden;
  text-align:center;
}

figure {
  animation:wobble 5s ease-in-out infinite;
  transform-origin:center center;
  transform-style:preserve-3d;
}

@keyframes wobble {
  0%,100%{ transform:rotate3d(1,1,0,40deg); }
  25%{ transform:rotate3d(-1,1,0,40deg); }
  50%{ transform:rotate3d(-1,-1,0,40deg); }
  75%{ transform:rotate3d(1,-1,0,40deg); }
}

h1 {
  display:block;
  width:100%;
  // padding:40px;
  text-align: center;
  line-height:1.5;
  font:900 5em 'Concert One', sans-serif;
  text-transform:uppercase;
  position:absolute;
  color: white;
  top: 28px;
}

@keyframes glow {
  0%,100%{ text-shadow:0 0 25px rgb(42, 139, 184); }
  25%{ text-shadow:0 0 25px rgb(190, 207, 114); }
  50%{ text-shadow:0 0 25px forestgreen; }
  75%{ text-shadow:0 0 25px cyan; }
}

h1:nth-child(2){ transform:translateZ(5px); }
h1:nth-child(3){ transform:translateZ(10px);}
h1:nth-child(4){ transform:translateZ(15px); }
h1:nth-child(5){ transform:translateZ(20px); }
h1:nth-child(6){ transform:translateZ(25px); }
h1:nth-child(7){ transform:translateZ(25px); }
h1:nth-child(8){ transform:translateZ(35px); }
h1:nth-child(9){ transform:translateZ(40px); }
h1:nth-child(10){ transform:translateZ(45px); }
}
h1 {
  animation:glow 10s ease-in-out infinite;
}
.msg-bord {
    // z-index: -1;
    position: relative;
    transform: skewX(-15deg);
    box-shadow: 10px 8px 8px #1fb7a6;
    border: 2px solid #a0fff9;
}
.content-box li {
  // border: 1px solid gray;
  margin-top: 10px;
}
.content {
  margin: 10px 0;
}
.create-date {
  text-align: right;
}
.el-textarea {
  /* z-index: -1; */
}
.info .el-form-item {
  display: inline-block !important;
  width: 200px;
  display: flex;
}
</style>
