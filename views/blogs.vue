<!-- 多对一查询 -->
<template>
  <div>
    <div class="mcontaner">
      <div style="margin: 10px 0">
        <el-input
          style="width: 200px"
          placeholder="请输入关键字搜索"
          suffix-icon="el-icon-search"
          v-model="keyWorld"
          @keyup.enter.native="page"
        />
        <el-button
          class="ml-5"
          type="primary"
          @click="page"
          icon="el-icon-search"
          >搜索</el-button
        >
        <el-button type="warning" @click="reset">重置</el-button>
      </div>
      <div class="block">
        <div
          class="blog-card"
          v-for="blog in blogList"
          :key="blog.id"
          :style="{ 'background-image': 'url(' + getBlogCover(blog.tcategory.name) + ')' }"
          @click="blogDetail(blog.id)"
        >
          <div class="info-container">
            <div class="release-time">发布时间：{{ blog.updateTime }}</div>
            <div class="author">
              <i class="el-icon-user-solid"></i>
              <span>作者：{{ blog.tuser.nickName }}</span>
            </div>
          </div>
          <div class="info-container">
            <div class="release-time">分类：</div>
            <div class="fenlei">
              <el-tag v-if="blog.tcategory.name != null && blog.tcategory.name !=''">{{ blog.tcategory.name }}</el-tag>
            </div>
          </div>

          <div class="info-container">
              <div class="release-time">标题：</div>
              <div class="fenlei">
                <el-tag v-if="blog.title != null && blog.title != ''" class="tag">{{ blog.title }}</el-tag>
              </div>
          </div>
         
        </div>
      </div>
    </div>

    <div>
      <el-pagination
        class="pagination"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNum"
        :page-sizes="[10, 20, 30, 40, 50]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>
  

  <script>
    export default {
      name: "blogs",
      data() {
        return {
          api: process.env.BASE_API,
          blogList: {},
          keyWorld: '',
          pageNum: 1,
          pageSize: 9,
          total: 0,
          articleAuthor: '',
          backgroundImageUrl: '',
          articleCover: [
                {
                url: '../static/img/blog/spring.png',
                title: "spring"
              },
                {
                url: '../static/img/blog/springmvc.png',
                  title: "springmvc"
              },
                {
                url: '../static/img/blog/springsecurity.png',
                  title: "springsecurity"
              },
                {
                url: '../static/img/blog/mybatis.png',
                  title: "mybatis"
              },
                {
                url: '../static/img/blog/mybatisplus.png',
                  title: "mybatisplus"
              },
                {
                url: '../static/img/blog/springboot.png',
                  title: "springboot"
              },
                {
                url: '../static/img/blog/springcloud.png',
                  title: "springcloud"
              },
                {
                url: '../static/img/blog/Vue.png',
                  title: "Vue"
              },
                {
                url: '../static/img/blog/react.gif',
                  title: "react"
              },
                {
                 url: '../static/img/blog/mysql.png',
                 title: "mysql"
              },
              {
                url: '../static/img/blog/docker.png',
                title: "docker"
              },
              {
                url: '../static/img/blog/hadoop.png',
                title: "hadoop"
              },
              {
                url: '../static/img/blog/git.png',
                title: "git"
              },
              {
                url: '../static/img/blog/java.gif',
                title: "juc"
              },
              {
                url: '../static/img/blog/java.gif',
                title: "java"
              },
              {
                url: '../static/img/blog/nodejs.png',
                title: "nodejs"
              },
              {
                url: '../static/img/blog/nginx.png',
                title: "nginx"
              }, {
                url: '../static/img/blog/c.png',
                title: "c"
              }, {
                url: '../static/img/blog/c++.png',
                title: "c++"
                },
                {
                url: '../static/img/blog/c3.png',
                title: "c#"
              },
              {
                url: '../static/img/blog/python.png',
                title: "python"
              }, {
                url: '../static/img/blog/go.png',
                title: "go"
              }, {
                url: '../static/img/blog/php.png',
                title: "php"
              }, {
                url: '../static/img/blog/jvm.png',
                title: "jvm"
              },
              {
                url: '../static/img/blog/css.png',
                title: "css"
              },

              {
                url: '../static/img/blog/html.png',
                title: "html"
              },
              {
                url: '../static/img/blog/javascript.png',
                title: "javascript"
              },
              {
                url: '../static/img/blog/angular.png',
                title: "angular"
              },
              {
                url: '../static/img/blog/Oracle.png',
                title: "Oracle"
              },
              {
                url: '../static/img/blog/ssm.png',
                title: "ssm"
              },
              {
                url: '../static/img/blog/RabbitMQ.png',
                title: "RabbitMQ"
              },

               {
                url: '../static/img/blog/jenkins.png',
                title: "jenkins"
              },
              {
                url: '../static/img/blog/chatGPT.png',
                title: "chatGPT"
              },
              {
                url: '../static/img/blog/Redis.png',
                title: "Redis"
              },

              {
                url: '../static/img/blog/Vuex.png',
                title: "Vuex"
              },
              {
              url: '../static/img/blog/VueRouter.png',
              title: "VueRouter"
            },{
               url: '../static/img/blog/Element.png',
              title: "ElementUI"
            },

            {
            url: '../static/img/blog/bianliang.png',
            title: "环境变量配置"
          },
             
            ]
        }
    },
      
      
      methods: {
        page() {       
          this.request.get(`/blog/blogs`,{
          params: {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          keyWorld: this.keyWorld
          }
        }
           ).then(res => {
           
            this.blogList = res.data.records           
            this.total = res.data.total

          })
        },

        //获取文章封面
        getBlogCover(name) {
            let mainString 
            if (name != null) {
             mainString = name.toLowerCase(); // 将主字符串转换为小写
            }
            
            for (let i = 0; i < this.articleCover.length; i++) { 
                const subString = this.articleCover[i].title;
                if (mainString===subString.toLowerCase()) {
                  return this.articleCover[i].url;
                } 
                
                
            }    

        },

        

        //文章详情
        blogDetail(id) {
            try { this.$router.push({ name: 'blogDetail', params: { blogId: id } }) } catch (e) { }
        },

        //重置按钮事件
        reset(){
          this.keyWorld = '';
          this.page()
        },

        //每页显示几条数据
        handleSizeChange(pageSize){
          this.pageSize = pageSize;
          this.page();
        },

        //当前页
        handleCurrentChange(pageNum) {
          this.pageNum = pageNum;
          this.page();
        },
      },
      created() {
        this.page()
       
    },

    mounted() {
         

      }
      
    }
  </script>
  
  <style scoped>
.pagination {
  /* margin: 3rem auto;; */
  text-align: center;
}

/* 整体容器 */
.mcontaner {
  display: flex;
  flex-direction: column;
}

/* blog容器 */
.block {
  display: flex;
  flex-wrap: wrap;
}

.info-container {
  display: flex; /* 将子元素变为弹性盒子 */
  align-items: center; /* 垂直居中子元素 */
}

.release-time,
.author {
  white-space: nowrap; /* 防止文本自动换行 */
  margin-right: 10px; /* 可以根据需要调整间距 */
  overflow: hidden; /* 隐藏超出容器的内容 */
  text-overflow: ellipsis; /* 在超出容器时显示省略号 (...) */
}

.fenlei{
  white-space: nowrap; /* 防止文本自动换行 */
  margin-right: 5px; /* 可以根据需要调整间距 */
}

el-tag{
  margin-right: 5px;
}

/* 博客卡片样式 */
.blog-card {
  justify-content: space-between; /* 水平排列卡片，等距离分布 */
  align-items: flex-start; /* 垂直居中对齐卡片 */
  width: 100%;
  height: 220px;
  max-width: 342px; /* 控制每个卡片的最大宽度 */
  border-radius: 25px;
  margin: 15px 0px 10px 13px;
  -webkit-transition: all 0.3s;
  border: 1px solid #eee;
  padding: 10px 12px;
  transition: all 0.3s;
  /* background:#ffffff; */
  background-color: rgba(0, 187, 53, 0.5);
  background-size: cover; /* 让图片尽量填充背景区域 */
  background-repeat: no-repeat; /* 防止重复平铺 */
  position: relative;
  transition: transform 0.3s ease; /* 添加过渡效果，当 transform 属性改变时，以 0.3 秒的速度进行平滑过渡 */
}

/* 最后一项的右边距设置为 0，防止换行时出现多余空白 */
/* .blog-card:nth-child(3n) {
  margin-right: 0;
} */

/* 当鼠标悬浮在video-card上时的样式 */
.blog-card:hover {
  transform: scale(1.025); /* 放大video-card到 102.5% 的尺寸 */
  cursor: pointer;
}

.tag{
  margin-top: 5px;
  margin-left: 1px;
  width: auto; /* 设置容器宽度，根据实际情况调整 */
  position: relative; /* 让伪元素相对于容器定位 */
  white-space: nowrap; /* 防止文字换行 */
  overflow: hidden; /* 隐藏超出容器的内容 */
  text-overflow: ellipsis; /* 在超出容器时显示省略号 (...) */
}

h4 {
  text-align: center;
  margin-top: 22px;
  width: 344px; /* 设置容器宽度，根据实际情况调整 */
  position: relative; /* 让伪元素相对于容器定位 */
  white-space: nowrap; /* 防止文字换行 */
  overflow: hidden; /* 隐藏超出容器的内容 */
  text-overflow: ellipsis; /* 在超出容器时显示省略号 (...) */
}
.blog-card:hover {
  overflow: visible; /* 鼠标悬浮时取消内容隐藏 */
  /* background: rgba(119, 110, 120, 0.5);
      border: 1px solid rgba(119, 110, 120, 0.5); */
  .release-time {
    font-family: Arial, Helvetica, sans-serif;
    font-weight: bold;
  }
}

.blog-card::before {
  content: attr(data-text); /* 设置悬浮内容为文本的 data-text 属性 */
  position: absolute; /* 绝对定位 */
  top: 0; /* 悬浮元素顶部与容器顶部对齐 */
  left: 100%; /* 悬浮元素左边界与容器右边界对齐 */
  background-color: rgba(0, 0, 0, 0.8); /* 悬浮背景颜色 */
  color: #fff; /* 悬浮文本颜色 */
  padding: 5px; /* 内边距，增加可读性 */
  white-space: normal; /* 允许悬浮内容自动换行 */
  display: none; /* 初始状态下隐藏悬浮元素 */
}

.blog-card:hover::before {
  opacity: 1; /* 鼠标悬浮时显示提示框 */
}
</style>