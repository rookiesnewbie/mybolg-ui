<template>
  <div class="picture">
    
    <div style="margin-top: 15px;">
      
        <el-upload
          class="upload-demo"
          :action="`${this.api}/file/upload`"
          :before-upload="beforePictureUpload"
          multiple
          >
          <el-button size="small" type="primary" v-if="user.role === 1">上传图片</el-button>
        </el-upload>
      </div>

    
    <!--/*外层最大容器*/-->
  		<div class="wrap" v-if="picList.length > 0">
  			<!--	/*包裹所有元素的容器*/-->
  			<div class="cube">
  				<!--前面图片 -->
  				<div class="out_front">
  					<img :src="picList[0].url" class="pic" />
  				</div>
  				<!--后面图片 -->
  				<div class="out_back">
  					<img :src="picList[1].url" class="pic"/>
  				</div>
  				<!--左图片 -->
  				<div class="out_left">
  					<img :src="picList[2].url" class="pic" />
  				</div>
          <!--右图片 -->
  				<div class="out_right">
  					<img :src="picList[3].url" class="pic" />
  				</div>
  				<div class="out_top">
  					<img :src="picList[4].url" class="pic" />
  				</div>
  				<div class="out_bottom">
  					<img :src="picList[5].url" class="pic" />
  				</div>
  				<!--小正方体 -->
  				<span class="in_front">
  					<img :src="picList[6].url" class="in_pic" />
  				</span>
  				<span class="in_back">
  					<img :src="picList[7].url" class="in_pic" />
  				</span>
  				<span class="in_left">
  					<img :src="picList[8].url" class="in_pic" />
  				</span>
  				<span class="in_right">
  					<img :src="picList[9].url" class="in_pic" />
  				</span>
  				<span class="in_top">
  					<img :src="picList[10].url" class="in_pic" />
  				</span>
  				<span class="in_bottom">
  					<img :src="picList[11].url" class="in_pic" />
  				</span>
  			</div>
  		</div>
  		
  		<!-- 本地音乐，双击index.html -->
  		<div style="position:absolute;left:10px;bottom:80px;">
  			<!-- 隐藏播放条：删除controls="controls"部分 -->
  			<audio autoplay="autopaly" loop="loop" controls="controls" id="audios">
  				<source src="https://ltmyblog.oss-cn-shenzhen.aliyuncs.com/myBlog/video/%E9%9D%92%E9%B8%9F%E9%A3%9E%E9%B1%BC%20-%20%E6%AD%A4%E7%94%9F%E4%B8%8D%E6%8D%A2.mp3" type="audio/mp3" />
  			</audio>
  		</div>

   
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: "Album",
  data() {
    return {
      api: process.env.BASE_API,
      imgUrl: "",
      activeMenu: "1",
      fileLists: [],
      picList: [],
    };
  },

  computed:{
    ...mapGetters(['user'])
  },

  created() {
    this.getPictureList()
  },

  //监视图片列表的变化，取最近的12张图片来展示
  watch: {
    picList: {
      handler(newValue) {
       this.picList = newValue;
      },
      deep: true,
    },
  },
 

  methods: {
    
    handleSuccess(response, file, fileList) {
      this.imgUrl = file.url;
      this.fileLists = fileList;
    },
    getPictureList() {
      
      this.request.get(`/file/pictureList`).then((res) => {
        this.picList = res.data;
      });
    },

    // 上传图片校验
    beforePictureUpload(file) {
      if (!this.$cookies.get("access_token")) {
        this.$message.error("还没登录，请先登录！！！");
        return;
      }
      // const isJPG = file.type === 'image/jpg'
      const isJPEG = file.type === "image/jpeg";

      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPEG) {
        this.$message.error("上传图片只能是 jpg 或 jpeg 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 2MB!");
      }
      return isJPEG && isLt2M;
    },
  },
};
</script>

  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style lang="less" scoped>
 
  /*最外层容器样式*/
  .wrap{
  	width: 400px;
  	height: 400px;
  	/*改变左右上下,图片方块移动*/
  	margin: 150px auto;
  	position: relative;
	
  }
  /*包裹所有容器样式*/
  .cube{
  	width: 200px;
  	height: 200px;
  	margin: 0 auto;
  	transform-style: preserve-3d;
  	transform: rotateX(-30deg) rotateY(-80deg);
  	-webkit-animation: rotate 20s infinite;
  	/*匀速*/
  	animation-timing-function: linear;
  }
  @-webkit-keyframes rotate{
  	from{transform: rotateX(0deg) rotateY(0deg);}
  	to{transform: rotateX(360deg) rotateY(360deg);}
  }
  .cube div{
  	position: absolute;
  	width: 200px;
  	height: 200px;
  	opacity: 0.8;
  	transition: all .4s;
  }
  /*定义所有图片样式*/
  .pic{
  	width: 200px;
  	height: 200px;
  }
  .cube .out_front{
  	transform: rotateY(0deg) translateZ(100px);
  }
  .cube .out_back{
  	transform: translateZ(-100px) rotateY(180deg);
  }
  .cube .out_left{
  	transform: rotateY(90deg) translateZ(100px);
  }
  .cube .out_right{
  	transform: rotateY(-90deg) translateZ(100px);
  }
  .cube .out_top{
  	transform: rotateX(90deg) translateZ(100px);
  }
  .cube .out_bottom{
  	transform: rotateX(-90deg) translateZ(100px);
  }
  /*定义小正方体样式
  */
  .cube span{
  	display: bloack;
  	width: 100px;
  	height: 100px;
  	position: absolute;
  	top: 50px;
  	left: 50px;
  }
  .cube .in_pic{
  	width: 100px;
  	height: 100px;
  }
  .cube .in_front{
  	transform: rotateY(0deg) translateZ(50px);
  }
  .cube .in_back{
  	transform: translateZ(-50px) rotateY(180deg);
  }
  .cube .in_left{
  	transform: rotateY(90deg) translateZ(50px);
  }
  .cube .in_right{
  	transform: rotateY(-90deg) translateZ(50px);
  }
  .cube .in_top{
  	transform: rotateX(90deg) translateZ(50px);
  }
  .cube .in_bottom{
  	transform: rotateX(-90deg) translateZ(50px);
  }
  /*鼠标移入后样式*/
  .cube:hover .out_front{
  	transform: rotateY(0deg) translateZ(200px);
  }
  .cube:hover .out_back{
  	transform: translateZ(-200px) rotateY(180deg);
  }
  .cube:hover .out_left{
  	transform: rotateY(90deg) translateZ(200px);
  }
  .cube:hover .out_right{
  	transform: rotateY(-90deg) translateZ(200px);
  }
  .cube:hover .out_top{
  	transform: rotateX(90deg) translateZ(200px);
  }
  .cube:hover .out_bottom{
  	transform: rotateX(-90deg) translateZ(200px);
  }
</style>
