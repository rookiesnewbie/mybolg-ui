<template>
    <div>   

      <!-- 返回顶部 -->
      <el-backtop :bottom="100" :visibility-height="80"
        style="{
          font-size: 39px;
          text-align: center;
          background: lightslategray;
          
          box-shadow: 0 0 6px rgba(0,0,0, .12);
          text-align: center;
          line-height: 50px;
          color: #1989fa;
        }"
      >
      </el-backtop>



      <p style="font-size:35px;text-align: center;margin-top: 30px;margin-bottom: 0px;"> {{ blog.title }}</p>
         
      <div>
       <el-button type="info" circle style="font-size:20px;" icon="el-icon-arrow-left" @click="goBack($route.params.blogId)"></el-button>
       <el-button type="warning" round style="font-size:20px;" icon="el-icon-edit" v-if ="blog.userId === user.id" @click="editBlog($route.params.blogId)"></el-button>
       <el-button type="danger" circle style="font-size:20px;" icon="el-icon-delete" @click="deleteBlog($route.params.blogId)"></el-button>

      </div>
      <div class="mblog">
        
        <!-- <el-divider></el-divider> -->
        <!-- <div class="markdown-body" v-html="blog.content"></div> -->

        <!-- 预览文章内容 -->
        <mavon-editor
          class="md"
          :value="blog.content"
          :subfield="false"
          :defaultOpen="'preview'"
          :toolbarsFlag="true"
          :editable="false"
          :scrollStyle="true"
          boxShadowStyle="0 2px 12px 0 rgba(255, 125, 0, 0.8)"
          previewBackground="rgba(0, 0, 0, 0.1)"
          :ishljs="true"
          codeStyle="srcery"
          :toolbars="toolbars"
          
          @navigationToggle="navigationToggle"
      />
      
      </div>

      <div style="margin: 30px 0">
        <div style="margin: 10px 0">
          <div style="border-bottom: 1px solid orangered; padding: 10px 0; font-size: 20px">评论</div>
          <div style="padding: 10px 0">
            <el-input size="small" type="textarea" v-model="commentForm.content"></el-input>
          </div>
          <div class="pd-10" style="text-align: right">
            <el-button type="primary" size="small" @click="saveComment(commentForm)">评论</el-button>
          </div>
        </div>
       </div>

       <!-- 评论内容 -->
       <div v-for="item in comments" :key="item.id" style="border-bottom: 1px solid #ccc; padding: 10px 0; ">
          <div style="display: flex">
            <div style="width: 100px; text-align: center">
              <el-image src="../../static/img/visity.png" style="width: 50px; height: 50px; border-radius: 50%"></el-image>
            </div> <!--  头像-->
            <div style="flex: 1; font-size: 14px; padding: 5px 0; line-height: 25px">
              <b>{{ item.nickname }}：</b>
              <span>{{ item.content }}</span>

              <div style="display: flex; line-height: 20px; margin-top: 5px">
                <div style="width: 200px;">
                  <i class="el-icon-time"></i><span style="margin-left: 5px">{{ item.createTime }}</span>
                </div>
                <div style="text-align: right; flex: 1">
                  <el-button style="margin-left: 5px" type="text" @click="handleReply(item.id)">回复</el-button>
                  <el-button type="text" style="color: red" @click="delComment(item.id)" v-if="user.id === item.userId || user.role === 1">删除</el-button>
                </div>
              </div>
            </div>   
          </div>
        

          <!-- 回复列表 -->
          <div v-if="item.children.length"  style="padding-left: 200px;">
              <div v-for="subItem in item.children" :key="subItem.id"  style="background-color: #f0f0f0; padding: 5px 20px">
                
                <div style="font-size: 14px; padding: 5px 0; line-height: 25px">
                  <div>
                    <el-image src="../../static/img/visity.png" style="width: 40px; height: 40px; border-radius: 50%;"></el-image>
                    <b>{{ subItem.nickname }} 回复:</b>
                    <b style="color: #3a8ee6" v-if="subItem.pnickname">@{{ subItem.pnickname }}</b>
                  </div>
                  <div style="padding-left: 5px">
                    <!-- <b>{{ subItem.nickname }}：</b> -->
                    <span>{{ subItem.content }}</span>
                  </div>

                  <div style="display: flex; line-height: 20px; margin-top: 5px; padding-left: 5px">
                    <div style="width: 200px;">
                      <i class="el-icon-time"></i><span style="margin-left: 5px">{{ subItem.createTime }}</span>
                    </div>
                    <div style="text-align: right; flex: 1">
                      <el-button style="margin-left: 5px" type="text" @click="handleReply(subItem.id)">回复</el-button>
                      <el-button type="text" style="color: red" @click="delComment(subItem.id)" v-if="user.id === subItem.userId || user.role === 0">删除</el-button>
                    </div>
                  </div>
                </div>   
              </div>
          </div>

        </div>

        <p-dialog title="回复" v-model="dialogFormVisible" width="50%" :toolbar="toolbar">
          <el-form :model="commentForm" :rules="rules" ref="commentForm" label-width="80px" size="small">
            <el-form-item label="回复内容" prop="commentForm"> 
              <el-input type="textarea" v-model="commentForm.contentReply" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <!-- <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false" size="small">取 消</el-button>
            <el-button type="primary" @click="saveComment()"  size="small">确 定</el-button>
          </div> -->
        </p-dialog>
        
    </div>
</template>
  
  <script>
    export default {
      name: "blogDetail",
      data() {
        return {
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
                    this.saveComment()
                }
            }
        ],
          api: process.env.BASE_API,
          blog: {
            userId: 0,
            id:0,
            title: "",
            description: '',
            content: ""
          },
          user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {},
          comments: [],
          commentForm: {},
          id: this.$route.params.blogId,
          ownBlog: false,
          // discusList: ['评论','评论','评论','评论','评论','评论','评论','评论','评论','评论'],
          // discTotal: '',
          dialogFormVisible: false,
        
          rules: {
            contentReply: [
            { required: true, message: '回复不能为空', trigger: 'blur'}
            ]
          },

          toolbars: {
            navigation: true, // 导航目录
            readmodel: true, // 沉浸式阅读
          }

        }
    },

    
     watch: {
      '$route.params.blogId'(newBlogId) {
        // 当路由参数 blogId 发生变化时触发
        this.blogId = newBlogId;

        // 在这里执行根据新的 blogId 加载数据或其他操作
        this.getBlogDetail(newBlogId);
      },
    },

      created() {    
        const blogId = this.$route.params.blogId
        this.getBlogDetail(blogId);

        this.loadComment()
      },

      methods: {
        
        //通过文章id删除文章
        deleteBlog(id){
          if (!this.$cookies.get('access_token')) {
              this.$message.error('还没登录，请先登录！！！')
              return
            }
            this.$confirm("确定删除此文章？", "警告", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            }).then(() => {
              
              const role_id = this.user.role
              if(this.user.id == this.blog.userId || role_id == 1 ){
                // this.$axios.post(`${this.api}/blog/delete/${id}`).then(res => {
                  this.request.post(`/blog/delete/${id}`).then(res => {
                    if (res.code === 200) {
                      this.$store.commit('SET_NEW_ARTICLE', res.data)                 
                      this.$message.success(res.msg)
                      this.$router.push({ path: '/blogList' })
                  }
                })
                
              }else{
                this.$message.error("您没有此操作的权限,请联系管理员")
                return
              } 
            })
          
        },

        // 返回
        goBack() {
           
          try { this.$router.push({ name: 'blogList' }) }catch(e){}
         },

        // 编辑博客
        editBlog(id) {
          try{ this.$router.push({ name: 'editBlog', params: { blogId: id } }) }catch(e){}

        },
        

        //目录内容导航切换
        navigationToggle() {
          this.$nextTick(function () {
            let _aList = document.querySelectorAll(".v-note-navigation-content a");
               for (let i = 0; i < _aList.length; i++) {
              let _aParent = _aList[i].parentNode;
              let _a = _aParent.firstChild;
              if (!_a.id) continue; // 把不属于导航中的a标签去掉，否则会报错
              let _text = _aParent.lastChild;
              let text = _text.textContent;
              _a.href = "#" + _a.id;
              _a.innerText = text;
              _aParent.removeChild(_text);
            }

          });
      },

      //获取文章的详细信息
      getBlogDetail(blogId) {
        this.request.get(`/blog/details/${blogId}`).then(res => {
          if (res.code === 200) {
            this.blog = res.data
          }
        })
      },
  
        
        //评论列表
        loadComment() {
            // this.$axios.get(`${this.api}/comment/tree/${this.id}`).then(res => {
              this.request.get(`/comment/tree/${this.id}`).then(res => {
            // console.log(res.data.data);
            // debugger
            this.comments = res.data
          })
        },

        //添加评论
        saveComment(){
          // debugger
          this.commentForm.articleId = this.id
          this.commentForm.userId = this.user.id
          if (this.commentForm.contentReply) {
            this.commentForm.content = this.commentForm.contentReply
          }

          // debugger
          // const role_id = this.user.role
          // if(role_id == 0 || this.user.id != this.blog.userId){
          //   this.$message.error("您没有此操作的权限,请联系管理员")
          //   return
          // }  
          if (!this.$cookies.get('access_token')) {
            this.$message.error('还未登录！请先去登录！！！')
            return
          }
          // this.$axios.post(`${this.api}/comment/addComment`,this.commentForm).then(res => {
            this.request.post(`/comment/addComment`,this.commentForm).then(res => {
            if(res.code === 200){
              this.$message.success(res.msg)
              this.commentForm = {}  //评论成功后清除评论框
              this.loadComment()  //评论成功后重新加载评论列表
              this.dialogFormVisible =false
            }else{
              this.$message.error(res.data.msg)
            }
          })
        },

        //回复评论
        handleReply(pid){
          this.commentForm = { pid: pid }
          this.dialogFormVisible = true
        },

        //删除评论
        delComment(id){
          // debugger
          if (!this.$cookies.get('access_token')) {
              this.$message.error('还没登录，请先登录！！！')
              return
            }
            this.$confirm("确定删除此评论？", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            }).then(()=>{
              // this.$axios.post(`${this.api}/comment/delete/${id}`).then(res => {
            this.request.post(`/comment/delete/${id}`).then(res => {
            if(res.code === 200){
              this.$message.success(res.msg)
              this.loadComment()
            }

          })
            })
        }
      }
    }
  </script>
  
  <style scoped>
    .mblog {
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      max-width: 1095px;
      min-height: auto;
      padding: 15px 15px;
    }

    .md{
      max-width: 1090px;
      height: auto;
    }
  </style>