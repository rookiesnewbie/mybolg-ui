<template>
  <div class="introduce">
    <el-header class="head">
      <div class="imgbox">
        <!-- <img src="../static/img/me.jpg" alt=""> -->
        <img src="../static/img/me/me.png" alt="me">
      </div>
      <h3 class="myself">关于博主</h3>
    </el-header>
    <el-main style="padding: 10px 0">
      
      <p>
        来自于贵州黔南，李腾博客的创始人，热爱编程，业余也学学python，编程九九八十一难，因为不是没次都有人为我们抵挡，因此在编程道路上要学会72变。
        世界多姿多彩，人生百态，生活中苦中作乐，生活就像一面镜子，你对它微笑，它也对你微笑！积极向上的生活态度，最喜欢的人生格言: “明天的你会感谢今天奋斗的自己” 。
      </p>
      <h3 style="letter-spacing: 1px; font-size: 18px; font-weight: bold; font-style: italic;">个人技能树：</h3>
      <div style="height: 600px;" id="technology"></div>
      <div style="position: relative; height: 400px;">
        <!-- <ul class="box">
          <li>
            <img src="../static/img/conect.png"/>
          </li>
          <li>
            <img src="../static/img/conect.png"/>
          </li>
          <li>
            <img src="../static/img/conect.png"/>
          </li>
          <li>
            <img src="../static/img/conect.png"/>
          </li>
          <li>
            <img src="../static/img/conect.png"/>
          </li>
          <li>
            <img src="../static/img/conect.png"/>
          </li>
        </ul> -->
        <div class="box" :style="{width:size.x+'px',height:size.z+'px'}">
          <div id="top" :style="styleTop"></div>
          <div id="bottom" :style="styleBottom"></div>
          <div id="left" :style="styleLeft"></div>
          <div id="right" :style="styleRight"></div>
          <div id="pre" :style="stylePre"></div>
          <div id="back" :style="styleBack"></div>
        </div>
        <p>个人微信和QQ,可以扫码联系我(或打赏☺☺☺)哦！:</p>
      </div>
      <div style="text-align: center;">你也可以用鼠标拖动它旋转起来哦！</div>
    </el-main>
  </div>
</template>

<script>
import echarts from 'echarts'
import $ from 'jquery'
import '../static/js/jquery-touchrotate.js'
import '../static/js/jquery-1.11.3.min.js'

export default {
  name: 'Introduce',
  data () {
    let x = '200', y = '200', z = '200';
    return {
      size:{
				x:x,
				y:y,
				z:z
			},
			styleLeft:{
				backgroundImage: `url(../static/img/me/q1.png)`,
				transform: '',
				width:'',
				height:''
			},
			styleRight:{
				backgroundImage: `url(../static/img/me/q2.png)`,
				transform: ``,
				width:'',
				height:''
			},
			styleTop:{
				backgroundImage: `url(../static/img/me/w1.png)`,
				transform: ``,
				width:'',
				height:''
			},
			styleBottom:{
				backgroundImage: `url(../static/img/me/w2.png)`,
				transform: ``,
				width:'',
				height:''
			
			},
			stylePre:{
				backgroundImage: `url(../static/img/me/q3.png)`,
				transform: ``,
				width:'',
				height:''
			},
			styleBack:{
				backgroundImage: `url(../static/img/me/q4.png)`,
				transform: ``,
				width:'',
				height:''
	
			},
      api: process.env.BASE_API
    }
  },
  mounted () {
    this.showTechnology()
  },
  computed:{
			preZ(){
				return Math.floor(this.size.y/2) + 'px'
			}, 
			backZ(){
				return Math.floor(this.size.y/2) + 'px'
			}, 
			leftZ(){
				return Math.floor(this.size.y/2) + 'px'
			}, 
			rightZ(){
				return Math.floor(this.size.x - this.size.y/2) + 'px'
			}, 
			topZ(){
				return Math.floor(this.size.y/2) + 'px'
			}, 
			bottomZ(){
				return Math.floor(this.size.z - this.size.y/2) + 'px'
			}
		},
		created(){
      $(function(){
        $('.box').touchrotate({
          //初始3D旋转
          rotateX: -15,
          rotateY: 15,
          //数值越小 , 旋转速度越快
          speedX: 2,
          speedY: 2,
          // 旋转的倍数, 越大旋转的圈数越多
          multipleX: 50,
          multipleY: 50,
          // 动画持续的时间, 单位是S
          time: 2,
          //模式 0:表示匀速运动 , 运动中途可以重新开始 , 1表示先加速后减速(动画过程中不可滑动,体验效果差)
          model: 0
        });
      })
			this.creat()
		},
		watch:{
			size:{
				handler(){
					this.creat()
				},
				deep:true
			}
		},
  methods: {
    creat(){
				this.styleLeft.width = this.styleRight.width = this.size.y + 'px';
				this.styleLeft.height = this.styleRight.height = this.size.z + 'px';
				this.styleTop.width = this.styleBottom.width = this.size.x + 'px';
				this.styleTop.height = this.styleBottom.height = this.size.y + 'px';
				this.stylePre.width = this.styleBack.width = this.size.x + 'px';
				this.stylePre.height = this.styleBack.height = this.size.z + 'px';

				this.styleLeft.transform = `rotateY(-90deg) translateZ(${this.leftZ})`;
				this.styleRight.transform = `rotateY(90deg) translateZ(${this.rightZ})`;
				this.styleTop.transform = `rotateX(90deg) translateZ(${this.topZ})`;
				this.styleBottom.transform = `rotateX(-90deg) translateZ(${this.bottomZ})`;
				this.stylePre.transform = `translateZ(${this.preZ})`;
				this.styleBack.transform = `rotateY(180deg) translateZ(${this.backZ})`;
			},
    showTechnology () {
      var myChart = echarts.init(document.getElementById('technology'));
      // app.title = '个人技能树'
      app.title = ''
      let option = {
        tooltip : {
          trigger: 'axis',
          axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          // data: ['javaScript','html','css','Vue','angular','react','python', 'h5', '小程序']
          // data: ['javaScript','html','css','Vue', 'java','springboot','mybatis']
          // data: []
        },
        grid: {
          left: 0,
          right: '2%',
          bottom: '3%',
          top: '10%',
          containLabel: true
        },
        xAxis:  {
          type: 'value'
        },
        yAxis: {
          type: 'category',
          // data: ['react','python','angular','小程序','h5', 'Vue','css','html','javaScript',]
          data: ['javaScript','html','css','Vue', 'java','springboot','mybatis']
          // data: []
        },
        series: [
          {
            type: 'bar',
            label: {
              normal: {
                show: true,
                position: 'insideRight'
              }
            },
            data: [
              {
                value: 0,
                itemStyle: {
                  color: '',
                }
              }
            ],
          }
        ]
      };
      // this.$axios.get(`${this.api}/language/getDataFromDB`).then(res => {
        this.request.get(`/language/getDataFromDB`).then(res => {
      // console.log(res.data.data);
      //将后端传来的数据转换成echarts需要的数据格式
      // debugger
      let language = res.data
      for(let i=0; i < language.length; i++){
        option.yAxis.data[i] = res.data[i].language
        // console.log(res.data.data[i].ability);
        option.series[0].data[i] = {value: res.data[i].ability, itemStyle: {color: res.data[i].color}}
      }
      
      //将数据准备完毕后再渲染图表
      myChart.setOption(option);
    })
      // myChart.setOption(option);
    }
  }
}
$(function() {
  $('.box').touchrotate({
      //初始3D旋转
      rotateX: -15,
      rotateY: 15,
      //数值越小 , 旋转速度越快
      speedX: 2,
      speedY: 2,
      // 旋转的倍数, 越大旋转的圈数越多
      multipleX: 50,
      multipleY: 50,
      // 动画持续的时间, 单位是S
      time: 2,
      //模式 0:表示匀速运动 , 运动中途可以重新开始 , 1表示先加速后减速(动画过程中不可滑动,体验效果差)
      model: 0
    });
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.box {
		height: 400px;
		width: 400px;
		margin: 100px auto;
		position: relative;
		transform: rotateX(0deg) rotateY(0deg);
		transform-style: preserve-3d;
		cursor: move;
	}
	
	.box div {
		position: absolute;
		left: 0;
		right: 0;
		background-size: cover;
		background-position: center;
	}
	.picbtn{
		margin:  0 auto;
		text-align: center;
	}
  .box{
    position: absolute;
    height: 200px;
    width: 200px;
    top: 50%;
    left: 50%;
    margin-left: -100px;
    margin-top: -100px;
    transform-style: preserve-3d;
    background: #eee;
    box-sizing: border-box;
    transform: rotateX(45deg) rotateY(45deg);
    // animation: mymove 20s linear infinite;
    // transform-origin: center center 150px;
  }
  .box li img {
    width: 200px;
    height: 200px;
  }
  .box li{
    position: absolute;
    top: 0;
    left: 0;
    list-style: none;
    width: 200px;
    height: 200px;
  }
  .box li:nth-child(1){
    background: #159DE3;
    transform: translateX(-100px) rotateY(90deg)
  }
    .box li:nth-child(2){
    background: red;
    transform: translateX(100px) rotateY(-90deg)
  }
  .box li:nth-child(3){
    background: orange;
    transform: translateZ(100px) rotateY(0deg)
  }
  .box li:nth-child(4){
    background: green;
    transform: translateZ(-100px) rotateY(0deg)
  }
  .box li:nth-child(5){
    background: pink;
    transform: translateY(-100px) rotateX(90deg);
  }
  .box li:nth-child(6){
    background: blue;
    transform: translateY(100px) rotateX(90deg);
  }
  @keyframes mymove{
    from{
      transform: rotateY(0deg);
    }
    to{
      transform: rotateY(360deg);
    }
  }
  .introduce {
    .head {
      display: flex;
      justify-items: center;
      align-items: center;
      /* background: gray; */
      /* opacity: 0.2; */
      border-bottom: 1px solid white;
      height: 80px !important;
      padding: 0 !important;
    }
    .myself {
      margin: 0 10px;
      display: inline-block;
      font-size: 23px;

    }
    .imgbox{
      width: 60px; height: 60px;
      -webkit-transition-property: -webkit-transform;
      -webkit-transition-duration: 1s;
      -moz-transition-property: -moz-transform;
      -moz-transition-duration: 1s;
      -webkit-animation: rotate 10s linear infinite;
      -moz-animation: rotate 10s linear infinite;
      -o-animation: rotate 10s linear infinite;
      animation: rotate 10s linear infinite;
      img {
        width: 60px;
        height: 60px;
        border-radius: 50%;
      }
    }
    @-webkit-keyframes rotate{from{-webkit-transform: rotate(0deg)}
        to{-webkit-transform: rotate(360deg)}
    }
    @-moz-keyframes rotate{from{-moz-transform: rotate(0deg)}
        to{-moz-transform: rotate(359deg)}
    }
    @-o-keyframes rotate{from{-o-transform: rotate(0deg)}
        to{-o-transform: rotate(359deg)}
    }
    @keyframes rotate{from{transform: rotate(0deg)}
        to{transform: rotate(359deg)}
    }
  }

  p{
    line-height: 30px;
    text-indent: 2em;
    letter-spacing: 1px; 
    font-size: 18px;
    font-weight: bold;
    font-style: italic;
  }
</style>
