<template>
<div id="box">
	<div class="slide">
		<ul id="lb">
			 <li @click="toDetails('message')"><img src="../static/img/msg.png" alt=""></li>
			 <li @click="toDetails('diary')"><img src="../static/img/dr.png" alt=""></li>
			 <li @click="toDetails('pIntroduction')"><img src="../static/img/tx.png" alt=""></li>
			 <!-- <li><img src="../static/img/5.jpg" alt=""></li> -->
			 <!-- <li><img src="../static/img/6.jpg" alt=""></li> -->
		</ul>
	</div>
	<div class="hot">
		<h3 class="title">热门</h3>
	</div>
</div>
</template>

<script>
import $ from 'jquery'
export default {
	name: 'Home',
	data () {
		return {
			api: process.env.BASE_API,
		}
	},
	created () {
		this.init()
		this.$forceUpdate()
	},
	watch: {
		$route: {
			handler(to, from) {
				
				// console.log('$route has changed');
			},
			deep: true,
			// immediate: true
		}
	},
	methods: {
		toDetails (val) {
			this.$router.push({path: '/'+val})
		},
		init () {
			$(function(){
				var box = document.querySelector('#box');
				var slide = document.querySelector('.slide');
				var pad = document.getElementById('lb')
				// var lis = pad.querySelectorAll('li');
				var lis = pad.getElementsByTagName('li');
				var json = [  //  包含了5张图片里面所有的样式
				// {   //  1
				// 	width:400,
				// 	top:20,
				// 	left:100,
				// 	opacity:20,
				// 	z:2,
				// 	id:1
				// },
				// {  // 2
				// 	width:600,
				// 	top:70,
				// 	left:50,
				// 	opacity:60,
				// 	z:3,
				// 	id:2
				// },
				// {   // 3
				// 	width:800,
				// 	top:100,
				// 	left:200,
				// 	opacity:100,
				// 	z:4,
				// 	id:3
				// },
				// {  // 4
				// 	width:600,
				// 	top:70,
				// 	left:550,
				// 	opacity:60,
				// 	z:3,
				// 	id:4
				// },
				// {   //5
				// 	width:400,
				// 	top:20,
				// 	left:650,
				// 	opacity:20,
				// 	z:2,
				// 	id:5
				// }
				{   //  1
					width:300,
					top:20,
					left:0,
					opacity:20,
					z:2,
					id:1
				},
				{  // 2
					width:300,
					top:40,
					left:400,
					opacity:40,
					z:3,
					id:2
				},
				{   // 3
					width:300,
					top:100,
					left:150,
					opacity:100,
					z:4,
					id:3
				},
				// {  // 4
				// 	width:300,
				// 	top:70,
				// 	left:300,
				// 	opacity:60,
				// 	z:3,
				// 	id:4
				// },
			];

			for(var i = 0; i<json.length; i++){
				let item = lis[i]
				lis[i].addEventListener('mouseover', function(){
					for (var j = 0; j < json.length; j++) {
						// lis[j].className = '';
						lis[j].id = ''
					}
					// item.className='active'
					item.id='active'
					clearInterval(timer);
				});
				lis[i].addEventListener('mouseout', function(){
					for (var j = 0; j < json.length; j++) {
						// lis[j].className = '';
						lis[j].id = ''
					}
					run()
				});
			};
			var timer = null;
			var flag = true;

			move();
			run();
			function run(){
			clearInterval(timer);
			timer = setInterval(function(){
			// console.log('run')
			if(flag == true){
			flag = false;
			move(true);
			}
			// console.log(json)
			},500);
			}

			function move(x){
			if(x != undefined){
			if(x){
			json.push(json.shift());
			}else{
			json.unshift(json.pop());
			};
			};

			for(var i = 0; i<json.length; i++){
			animate(lis[i],{
			width: json[i].width,
			top: json[i].top,
			left: json[i].left,
			opacity: json[i].opacity,
			zIndex: json[i].z
			},function(){flag = true;})
			};
			}

			function animate(obj, json, callback){
			// 先停止定时器
			clearInterval(obj.timers);
			obj.timers = setInterval(function(){
				var stoped = true;
				// console.log('sss')
				for(var k in json){
				// var leader = parseInt(getStyle(obj, k));
				var leader = 0;
				if(k == 'opacity'){
				leader = Math.round(getStyle(obj, k)*100) || 100;
				}else {
				// console.log(json[k]);
				leader = parseInt(getStyle(obj, k)) || 0;
				};
			//         console.log(leader);
				// json[k]是目标位置
				var step = (json[k]-leader)/10;
				step = step > 0? Math.ceil(step) : Math.floor(step);
				leader = leader + step;
				if(k == 'opacity'){
				obj.style[k] = leader/100;
				obj.style['filter'] = 'alpha(opacity='+ leader +')';
				}else if(k == 'zIndex'){
				obj.style['zIndex'] = json[k];
				}else{
				obj.style[k] = leader + "px";
				}
				if(leader != json[k]){
				stoped = false;
				}
				};
				if(stoped){
					// console.log('stop')
					clearInterval(obj.timers);
					callback && callback();
				};
			},50);
			};
			//获取属性值
			function getStyle(obj, attr){
			if(obj.currentStyle){
				return obj.currentStyle[attr];
			}else{
				return window.getComputedStyle(obj, null)[attr];
			};
			};
			})
		}
	}
}

</script>

<style lang="less" scoped>
.hot {
	margin-top: 70px;
	.title {
		font-size: 23px;
		font-weight: bold;
		border-bottom: 5px solid #097d88;
		padding-bottom: 5px; 
		color: #097d88;
	}
}
#lb li {
list-style: none;
}
#box {
width: 706px;
}
.slide {
// height: 500px;
height: 300px;
position: relative;
// z-index: -1;
}
.slide ul {
height: 100%;
}
.slide li {
position: absolute;
left:200px;
top:0;
}
#active  img {
	cursor: pointer;
	width: 460px;
	height: 360px;
}
.slide li img{
	// width: 100%;
	// height: 100%;
	cursor: pointer;
	width: 360px;
	height: 260px;
}
// .arraw {
// opacity: 0;
// }
// .arraw a {
// width: 70px;
// height: 110px;
// display: block;
// position: absolute;
// top: 50%;
// margin-top: -55px;
// z-index: 999;
// }
// .next {
// background: url(../static/img/right.png) no-repeat;
// right: -10px;
// }
// .prev {
// background: url(../static/img/left.png) no-repeat;
// left: -10px;
// }
</style>
