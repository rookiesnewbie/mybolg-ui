<template>
    <div >
      <div class="editBlog">

        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" >
        
            <el-form-item label="博客标题" prop="title">
              <el-input v-model="ruleForm.title" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item label="博客摘要" prop="description">
            <el-input type="textarea" v-model="ruleForm.description"></el-input>
          </el-form-item>

          <el-form-item label="分类" prop="categoryId">
              <el-select v-model="ruleForm.categoryId" placeholder="请选择">
              <el-option
                v-for="item in categoryList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>

            <el-form-item label="博客内容" prop="content">
             <div class="md">
               <mavon-editor 
                        ref="md" 
                        v-model="ruleForm.content" 
                        placeholder="请编辑文章内容"
                        boxShadowStyle="0 2px 12px 0 rgba(255, 125, 0, 0.8)"
                        previewBackground="rgba(0, 0, 0, 0.1)"
                        codeStyle="srcery"
                        :ishljs="true" 
                        @imgAdd="imgAdd"
                        @navigationToggle="navigationToggle"
                />
             </div>
   
            </el-form-item>

            <el-form-item>
              <el-button type="danger" @click="resetForm('ruleForm')" icon="el-icon-warning">重 置</el-button>
              <el-button type="primary" @click="submitForm('ruleForm')" icon="el-icon-s-promotion">发 布</el-button>
            </el-form-item>
        
      
        </el-form>

        <!-- 引用返回顶部或返回底部组件 -->
        <toBottomOrTop/>
  

      </div>
     
    </div>
  </template>
  
  <script>
  import toBottomOrTop from '../src/components/common/toBottomOrTop.vue' //导入返回顶部或返回底部组件
  import axios from "axios";
  export default {
    name: "editBlog",
    components:{toBottomOrTop},  //注册返回顶部或返回底部组件
    data() {
      return {
        api: process.env.BASE_API,
        ruleForm: {
          userId: '',
          title: '',
          description: '',
          content: '',
          categoryId:'',
        },
        categoryList: [],
        rules: {
          title: [
            { required: true, message: '请输入标题', trigger: 'blur' },
            { min: 3, max: 20, message: '长度在 3 到 25 个字符', trigger: 'blur' }
          ],
          description: [
            { required: true, message: '请输入摘要', trigger: 'blur' },
          ],
          content: [
            { required: true, message: '请输入内容', trigger: 'blur' }
          ],
          categoryId: [
            { required: true, message: '选择文章的分类', trigger: 'blur' }
          ]
        },
        user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {},
      };
    },

    //编辑渲染页面信息
    created() {

      //判断是否登录
      if (!this.$cookies.get('access_token')) {
        this.$message({
          message: '还未登录，请先登录',
          type: 'warning'
        });
        this.$router.push({ path: '/login' })

      }


      const blogId = this.$route.params.blogId
      if(blogId) {
        // this.$axios.get(`${this.api}/blog/${blogId}`).then(res => {
          this.request.get(`/blog/details/${blogId}`).then(res => {
          const blog = res.data
          this.ruleForm.id = blog.id
          this.ruleForm.title = blog.title
          this.ruleForm.description = blog.description
          this.ruleForm.content = blog.content
          this.ruleForm.categoryId = blog.categoryId
        })
      }

      this.getCategoryList()

    },


    methods: {
      // 绑定@imgAdd event
      imgAdd(pos, $file) {
      let $vm = this.$refs.md
      // 第一步.将图片上传到服务器.
      const formData = new FormData();
      formData.append('file', $file);
      axios({
        // url: 'http://localhost:8088/file/upload',
        url: `${this.api}/blog/file/upload`,
        method: 'post',
        data: formData,
        headers: {'Content-Type': 'multipart/form-data'},
      }).then((res) => {
        // 第二步.将返回的url替换到文本原位置![...](./0) -> ![...](url)
        // console.log(res);
        $vm.$img2Url(pos, res.data.data);
      })
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

      //发布博客
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {

            if (!this.$cookies.get('access_token')) {
              this.$message.error('还没登录，请先登录！！！')
              return
            }

            // const role_id = this.user.role
            // if(role_id != 0 || this.user.id == null ){
            //   this.$message.error("您没有此操作的权限,请联系管理员")
            //   return
            // }
            this.ruleForm.userId = this.user.id
            // this.$axios.post(`${this.api}/blog/edit`, this.ruleForm).then(res => {
              this.request.post(`/blog/edit`, this.ruleForm).then(res => {
                if (res.code === 200) {
                this.$store.commit('SET_NEW_ARTICLE', res.data)
                this.$message.success(res.msg)
                  try {
                  this.$router.push({ path: "/blogList" })

                  } catch (e) { }
              }
            })
          } else {
            // console.log('error submit!!');
            return false;
          }
        });      
      },

      //获取分类列表
      getCategoryList() {
        this.request.get(`/category/list`).then(res => {
          this.categoryList = res.data
        })
      },

      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },
  }
  </script>
  
  <style scoped>
  .editBlog{
     box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
     width: 1095px;
     padding: 15px 15px;
     height: auto;
     position: relative;
     margin-top: 15px;
     margin-left: -5px;
  }

  .md{
    max-width: 1090px;
    margin-right: 50px;
    height: auto;
  }
  </style>