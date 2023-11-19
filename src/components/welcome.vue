<template>
	<div class="welcome">
		<div class="bg-bock">
			<div class="sky">
				<div class="deep_sky"></div>
			</div>

			<div class="c1">
				<div class="cloud"></div>
			</div>

			<div class="c2">
				<div class="cloud"></div>
			</div>

			<div class="c3">
				<div class="cloud"></div>
			</div>


			<div class="house right">
				<div class="fence"></div>
				<div class="wall"></div>
				<div class="roof left"></div>
				<div class="roof right"></div>
				<div class="door"></div>
			</div>

			<div class="house left">
				<div class="fence"></div>
				<div class="wall"></div>
				<div class="roof left"></div>
				<div class="roof right"></div>
				<div class="door"></div>
			</div>

			<div class="tree_back"></div>
			<div class="tree"></div>

			<div class="postbox_a">
				<div class="hole"></div>
			</div>

			<div class="postbox_b">
				<div class="hole"></div>
			</div>

			<div class="windmill">
				<div class="tower"></div>
				<div class="t1"></div>
				<div class="t2"></div>
				<div class="blade">
					<div class="windblade"></div>
					<div class="windblade windblade2"></div>
					<div class="windblade windblade3"></div>
					<div class="windblade windblade4"></div>
				</div>
			</div>

		</div>



		<div class="kePublic">
			<!-- <p class="my-info"><img src="../../static/img/named.png" alt=""></p> -->
			<p class="my-info">李腾的个人博客</p>
			<ul class="menu cf">
				<li v-for="(item, index) in menuList" :key="index">
					<ul class="no-child">
						<li class="menu-name" v-if="item.children" :class="{ active: index === indexes }">{{ item.name }}</li>
						<li class="menu-name" v-else @click="linkTo(item.path, index)" :class="{ active: index === indexes }">
							{{ item.name }}</li>
					</ul>
					<ul class="submenu" v-if="item.children">
						<li class="menu-name" v-for="(obj, idx) in item.children" :key="idx + item.name"
							:style="{ 'background': idx === idxs && indexes === index ? '#96dada' : '' }"
							@click="linkTo(obj.path, index, idx)">{{ obj.name }}</li>
					</ul>
				</li>
				<div class="login" v-if="!lgBtn">
					<!-- <el-button @click="toLogin">登录</el-button> -->
					<span @click="toLogin">登录</span>
					<span>/</span>
					<span @click="registBtn">注册</span>
				</div>
				<div class="set" v-show="lgBtn">
					<img v-popover:popover4 :src="user.avatar != null ? user.avatar : '../../static/img/visity.png'" alt=""
						id="seting">
					<span style="font-size:25px; margin-left: 10px">{{ user.nickName }}</span>
				</div>
			</ul>
		</div>

		<div class="content-box">
			<div class="content">
				<router-view />
			</div>
			<div class="right-content">
				<div class="news">
					<img src="../../static/img/new.png" alt="">
					<div class="new-box">
						<p>个人博客部分功能上线！欢迎各位大佬来踩！</p>
					</div>
				</div>
				<div class="link-box">
					<div class="search-box">
						<el-input type="text" v-model="serchContent" @keyup.enter.native="serachInfo"
							placeholder="请输入要搜索的内容">
							<i slot="suffix" class="el-icon-search search" @click="serachInfo"></i>
						</el-input>
					</div>
					<p class="link">友情链接@</p>
					<div class="link-content">
						<el-tooltip class="item" effect="dark" content="https://blog.csdn.net/weixin_50117748"
							placement="top">
							<img class="tag" src="../../static/img/logo/csdn.png" alt="csdn地址"
								@click="friendsLink('https://blog.csdn.net/weixin_50117748')">

						</el-tooltip>
						<el-tooltip class="item" effect="dark" content="https://github.com/rookiesnewbie" placement="top">
							<img class="tag" src="../../static/img/logo/github.png" alt="Github地址"
								@click="friendsLink('https://github.com/rookiesnewbie')">
						</el-tooltip>

						<el-tooltip class="item" effect="dark" content="https://gitee.com/lisircode" placement="top">
							<img class="tag" src="../../static/img/logo/gitee.png" alt="Gitee地址"
								@click="friendsLink('https://gitee.com/lisircode')">
						</el-tooltip>
						<el-tooltip class="item" effect="dark" content="微信号:lt2049448867" placement="top">
							<img class="tag" src="../../static/img/logo/weixin.png" alt="微信号">
						</el-tooltip>
						<el-tooltip class="item" effect="dark" content="加我QQ" placement="bottom">
							<img class="tag" style="width: 35px; height: 40px;" src="../../static/img/qq.png" alt="加我QQ"
								@click="friendsLink('http://wpa.qq.com/msgrd?v=3&uin=2049448867&site=qq&menu=yes')">
						</el-tooltip>

						<!-- <a href="http://wpa.qq.com/msgrd?v=3&uin=2236736269&site=qq&menu=yes" target="_blank">添加QQ好友</a>
					<a href="https://wx.qq.com/cgi-bin/mmwebwx-bin/webwxaddcontact?lang=zh_CN" target="_blank">添加微信好友</a> -->
					</div>
					<p class="link artic">最新文章</p>
					<div class="link-content newArtic">

						<div>
							<el-tag type="success" class="tagNewArticle" v-for="item in newArticle" :key="item.id"
								@click="toArticleDetail(item.id)">
								<div style="margin-left: 10px;">{{ item.title }}</div>
							</el-tag>
						</div>

					</div>
				</div>
			</div>
		</div>
		<p-dialog v-model="settForm" :title="'上传头像'">
			<!-- <el-form :model="settingForm" :inline="true" ref="setForm" class="set-form">
				<el-form-item label="操作密码：">
					<el-input type="password" v-model="settingForm.psw" class="psw" placeholder="请输入操作密码"></el-input>
				</el-form-item>
			</el-form> -->
			<el-upload
				class="avatar-uploader"
				:action="`${this.api}/user/upload/avatar/${user.id}`"
				:show-file-list="false"
				:on-success="handleAvatarSuccess"
				:before-upload="beforeAvatarUpload">
				<img v-if="imageUrl" :src="imageUrl" class="avatar">
				<i v-else class="el-icon-plus avatar-uploader-icon"></i>
			</el-upload>

		</p-dialog>
		<el-popover ref="popover4" placement="bottom" width="100" popper-class="set-box" trigger="hover">
			<div class="action-cl">
				<p @click="settForm = true">上传头像</p>
				<p @click="siginOut">退出</p>
				<p @click="personalCenter">个人中心</p>
			</div>
		</el-popover>
		<el-footer class="footer">
			<div>
				<span>@版权所有</span>
				<span>Design by:</span>
				<span>李腾&nbsp;</span>
				<span>备案号:</span>
				<span>黔ICP备2023004076号-1</span>
			</div>
		</el-footer>
	</div>
</template>

<script>
import $ from 'jquery'
import ValidCode from "@/components/ValidCode"
import { mapState, mapGetters, mapMutations } from 'vuex'
import { getToken } from "../utils/token"

export default {
	name: 'Welcome',
	components: {
		ValidCode,
	},
	data() {
		return {
			countdown: 60, // 倒计时时间（秒）
			imageUrl: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).avatar : '',
			CurrentUser: {},
			serchContent: '',
			lgBtn: false,
			fgt: false,
			labeWidth: '60px',
			actionTitle: '登录',
			actionType: false,
			btn: false,
			code: true,
			qqCallback: false,
			loginForm: {
				email: '',
				psw: '',
				npsw: '',
				nickname: '',
				validCode: '',
			},
			loginToolbar: [],
			loginDialog: false,
			settingForm: {},
			settForm: false,
			api: process.env.BASE_API,
			idxs: '',
			indexes: 0,
			type: 0, //判断注册与忘记密码的标志,0登录，1注册，2忘记密码
			activeMenu: '1',
			menuList: [
				{
					path: '/',
					name: '首页'
				},
				{
					path: '/',
					name: '技术栈',
					children: [
						{
							path: '/',
							name: 'HTML/css',
						},
						{
							path: '/',
							name: 'javascript',
						},
						{
							path: '/',
							name: 'vue',
						},
						{
							path: '/',
							name: 'java',
						},
						{
							path: '/',
							name: 'springboot',
						},
						{
							path: '/',
							name: 'mybatis/mybatisplus',
						}
					]
				},
				{
					path: '/videosCourse',
					name: '视频教程',

				},
				{
					path: '/',
					name: '生活日常',
					children: [
						{
							path: '/diary',
							name: '随手记',
						},
						{
							path: '/album',
							name: '生活相册',
						},
						{
							path: '/video',
							name: '生活视频',
						}
					]
				},
				{
					path: '/pIntroduction',
					name: '关于博主'
				},
				{
					path: '/message',
					name: '留言板'
				},
				{
					path: '/blog/add',
					name: '发布博客',
				},
				{
					path: '/blogList',
					name: '博客列表',
				},
				{
					path: '/MyResume',
					name: '个人简历',
				},
			],
			pageNum: 0,
			show: false,
			pageSize: 5,
			blogList: [],
			keyWorld: '',
			validCode: '', //验证码
			isButtonDisabled: false, // 获取验证码按钮是否可点击
		}
	},
	computed: {
		buttonText() {
			return this.isButtonDisabled ? `重新发送 (${this.countdown})` : '发送验证码';
		},
		...mapState(['user']),  //获取store的用户信息
		...mapState(['qqUser']),  //获取store的qq用户信息
		...mapState(['newArticle']),  //获取store的最新文章信息

	},

	watch: {
		'actionType': function (nv, ov) {
			this.actionTitle = nv ? '注册' : '登录'
		},

		// // 监视 blogList 数组的变化
		// blogList: function (newBlogList, oldBlogList) {
		// 	console.log('blogList 变化了');
		// 	console.log('新的 blogList:', newBlogList);
		// 	console.log('旧的 blogList:', oldBlogList);
		// }
		// 监听 user 变化
		user: {
			immediate: true, // 立即执行一次
			handler(newValue, oldValue) {
				// 在 user 变化时执行的逻辑
				this.$store.commit('SET_USER', newValue)
			},
			deep: true, // 如果 user 是对象或数组，需要添加 deep: true
		},



	},


	mounted() {
		console.log(this)

		// const _user = localStorage.getItem('user')
		// console.log('nextTick',this.$nextTick)
		if (this.user.nickName) {
			this.lgBtn = true
		} else {
			this.lgBtn = false
		}
		
		// this.$nextTick(() => {
			
		// 	}
		// )
		// console.log(this.user)
		

		//网页爱心
		!function (e, t, a) {
			function r() {
				for (var e = 0; e < s.length; e++) s[e].alpha <= 0 ? (t.body.removeChild(s[e].el), s.splice(e, 1)) : (s[
					e].y--, s[e].scale += .004, s[e].alpha -= .013, s[e].el.style.cssText = "left:" + s[e].x +
					"px;top:" + s[e].y + "px;opacity:" + s[e].alpha + ";transform:scale(" + s[e].scale + "," + s[e]
						.scale + ") rotate(45deg);background:" + s[e].color + ";z-index:99999");
				requestAnimationFrame(r)
			}

			function n() {
				var t = "function" == typeof e.onclick && e.onclick;
				e.onclick = function (e) {
					t && t(), o(e)
				}
			}

			function o(e) {
				var a = t.createElement("div");
				a.className = "heart", s.push({
					el: a,
					x: e.clientX - 5,
					y: e.clientY - 5,
					scale: 1,
					alpha: 1,
					color: c()
				}), t.body.appendChild(a)
			}

			function i(e) {
				var a = t.createElement("style");
				a.type = "text/css";
				try {
					a.appendChild(t.createTextNode(e))
				} catch (t) {
					a.styleSheet.cssText = e
				}
				t.getElementsByTagName("head")[0].appendChild(a)
			}

			// 颜色
			function c() {
				return "rgb(" + ~~(255 * Math.random()) + "," + ~~(255 * Math.random()) + "," + ~~(255 * Math
					.random()) + ")"
			}
			var s = [];
			e.requestAnimationFrame = e.requestAnimationFrame || e.webkitRequestAnimationFrame || e
				.mozRequestAnimationFrame || e.oRequestAnimationFrame || e.msRequestAnimationFrame || function (e) {
					setTimeout(e, 1e3 / 60)
				}, i(
					".heart{width: 10px;height: 10px;position: fixed;background: #f00;transform: rotate(45deg);-webkit-transform: rotate(45deg);-moz-transform: rotate(45deg);}.heart:after,.heart:before{content: '';width: inherit;height: inherit;background: inherit;border-radius: 50%;-webkit-border-radius: 50%;-moz-border-radius: 50%;position: fixed;}.heart:after{top: -5px;}.heart:before{left: -5px;}"
				), n(), r()
		}(window, document);
	},
	created() {

		

		this.getnewArtic()
		// debugger
		// this.$store.dispatch('getUserInfo')
	},

	methods: {
		handleAvatarSuccess(res, file) {
			console.log(res);
			console.log(file);
			this.imageUrl = URL.createObjectURL(file.raw);
			// this.imageUrl = res.data;
			this.user.avatar = res.data;
			console.log(this.user);
			this.$store.commit('SET_AVATAR',res.data);
			this.$message.success(res.msg)
			this.settForm = false;
		},
		beforeAvatarUpload(file) {
			const isPNG = file.type === 'image/png';
			const isLt2M = file.size / 1024 / 1024 < 2;

			if (!isPNG) {
				this.$message.error('上传头像图片只能是 PNG 格式!');
			}
			if (!isLt2M) {
				this.$message.error('上传头像图片大小不能超过 2MB!');
			}
			return isPNG && isLt2M;
		},

		personalCenter() {
			try { this.$router.push({ path: '/myCenter' }) } catch (e) { }
		},
		serachInfo() {
			this.$message.warning('此功能尚未开发。。。。')
		},


		saveUserInfo(info) {

			this.$router.push({ path: '/' })

			let pramas = {
				openId: localStorage.getItem("openid"),
				accessToken: localStorage.getItem("access_token"),
				userName: info.data.nickname,
				url: info.data.figureurl_qq_2,
				total: info.dataText,
			}
			// this.$axios.post(`${this.api}/saveInfo`, pramas).then(res => {})
			this.request.post(`/saveInfo`, pramas).then(res => { })

		},
		siginOut() {
			this.lgBtn = false
			localStorage.clear(); // 清除localStorage中的所有数据
			this.$cookies.remove('access_token')
			this.$cookies.remove('token')
			this.$cookies.remove('uid')
			this.$store.commit('RESET_SET_USER')
			this.$store.commit('REMOVE_TOKEN')
			this.$router.push({ path: '/' })

		},

		//忘记密码
		resetPsw() {
			this.loginForm.npsw = this.$md5(this.loginForm.npsw)
			// this.$axios.get(`${this.api}/user/updataPsw`, { 
			this.request.get(`/user/updataPsw`, {

				params: {
					email: this.loginForm.email,
					password: this.loginForm.npsw,
					validCode: this.loginForm.validCode
				}
			}).then(res => {
				if (res.code == 200) {
					this.$message.success('密码重置成功！')
					this.loginBtn()
				}
			})
		},
		fgtBtn() {
			this.fgt = true
			this.actionType = false
			this.code = false
			this.type = 2
			this.show = true
			this.btn = true
			this.labeWidth = '80px'
			this.resetForm()
		},
		registBtn() {
			this.loginDialog = true
			this.actionType = true
			this.fgt = false
			this.code = false
			this.show = false
			this.type = 1
			this.btn = true
			this.labeWidth = '60px'
			this.isButtonDisabled = false
			this.resetForm()
			this.$router.push("/login")
		},
		loginBtn() {
			this.actionType = false
			this.fgt = false
			this.code = true
			this.show = false
			this.btn = false
			this.labeWidth = '60px'
			this.resetForm()
		},
		resetForm() {
			for (let key in this.loginForm) {
				this.loginForm[key] = ''
			}
		},
		toLogin() {
			this.$router.push("/login")
			this.resetForm()
			this.loginDialog = true
			this.actionType = false
		},

		//注册
		regist() {
			this.loginForm.password = this.$md5(this.loginForm.psw)
			let info = { nickname: this.loginForm.name, email: this.loginForm.email, password: this.loginForm.password, validCode: this.loginForm.validCode }
			// this.$axios.post(`${this.api}/user/regist`, info).then(res => {
			this.request.post(`/user/register`, info).then(res => {
				if (res.code === 200) {

					this.actionType = false
					this.loginBtn()
					this.$message.success('注册成功！')
				}
			})
		},

		//登录
		login() {
			this.loginForm.psw = this.$md5(this.loginForm.psw)
			let info = { email: this.loginForm.email, password: this.loginForm.psw }
			const _this = this

			if (this.loginForm.validCode.toLowerCase() !== this.validCode.toLowerCase()) {
				this.$message.error("验证码错误")
				return
			}
			this.$store.dispatch("Login", info).then((res) => {
				// console.log(res)
				this.loginDialog = false
				this.actionType = false
				this.lgBtn = true
				this.$cookies.set('access_token', res.data.token)
				this.$cookies.set('uid', res.data.id)
				this.setuser()
				this.$message.success(res.msg)
			});
		},

		setConform() {
			let psw = this.$md5(this.settingForm.psw)
			this.$cookies.set('rt', psw)
			this.settForm = false
			this.settingForm.psw = ''

		},
		linkTo(path, index, idx) {
			this.idxs = idx
			this.indexes = index
			try { this.$router.push({ path: path }) } catch (e) { }
		},
		friendsLink(url) {
			document.location.href = url
		},
		uploadPic() {
			this.request.post(`/uploadFile`, { list: this.fileLists }).then(res => {
				this.$message.success('图片上传成功！')
				this.getPictureList()
			})
		},
		handleSuccess(response, file, fileList) {
			this.fileLists = fileList
		},
		getPictureList() {
			// this.$axios.get(`${this.api}/pictureList`).then(res => {
			this.request.get(`/pictureList`).then(res => {

				this.picList = res.data
			})
		},

		//获取最新的文章
		getnewArtic() {
			this.request.get(`/blog/getNewArticle`,
			).then(res => {
				this.blogList = res.data
				this.$store.commit('SET_NEW_ARTICLE', this.blogList)
				this.total = res.data.total
			})
		},

		//获取具体的最新文章信息
		toArticleDetail(id) {
			try {
				this.$router.push({ name: 'blogDetail', params: { blogId: id } })
			} catch (e) { }
		},


	}
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import '../../static/css/bgs.css';

.link-content {
	width: 90%;
	margin: 10px auto;
	border: 1px solid #348e8d;
	min-height: 150px;
	border-radius: 4px;

	img {
		width: 50px;
		height: 32px;
	}
}

.search-box {
	width: 90%;
	margin: 20px auto;
}

.search {
	font-size: 23px;
	cursor: pointer;
}

.action-cl {
	text-align: center;

	p {
		padding: 2px 0;
		margin: 10px;
		border: 1px solid rgb(255, 255, 255);
		width: 80px;
		border-radius: 4px;
		color: #348e8d;
		cursor: pointer;
	}

	p:hover {
		// color: #ffffff;
		width: 90px;
		height: 30px;
		line-height: 30px;
		font-family: Arial, Helvetica, sans-serif;
		font-weight: bold;
	}
}

.other-login {
	margin-left: 110px;

	img {
		cursor: pointer;
	}
}

.login-btn {
	text-align: center;
	font-size: 18px;
	background: #348e8d;
	height: 38px;
	margin-top: 15px;
	border-radius: 4px;
	color: rgb(255, 255, 255);
	cursor: pointer;
}

.link {
	font-size: 16px;
	border-bottom: 1px solid rgb(45, 45, 233);
	margin: 10px 10px;
	padding-bottom: 6px;
	width: 90%;
	margin: auto;
	color: #348e8d;
}

.my-info {
	font-size: 22px;
	color: aqua;
	top: 12px;
	position: absolute;
	left: 136px;
	font-weight: bold;
	font-style: italic;
}

.login {
	position: absolute;
	right: 80px;
	top: 16px;
	cursor: pointer;
	color: rgb(255, 255, 255);

	.el-button {
		padding: 7px 15px;
		background: #ade3e3;
	}
}

.set {
	position: absolute;
	cursor: pointer;
	right: 20px;
	top: 0;
	height: 47px;
	width: auto;
	border-radius: 50%;
	display: flex;
	align-items: center;

	img {
		height: 47px;
		width: 47px;
		border-radius: 50%;
		// animation: circling 5s linear 0s infinite;
	}
}

@keyframes circling {
	from {
		transform: rotate(0deg);
	}

	to {
		transform: rotate(360deg);
	}
}

.news {
	display: flex;

	// align-items: center;
	// overflow: hidden;
	// position: relative;
	.new-box {
		flex: 1;
		// background: red;
		position: relative;
		overflow: hidden;
		margin-right: 10px;
	}

	img {
		width: 23px;
		height: 23px;
		margin: 5px;
		animation-name: breath;
		/* 动画名称 */
		animation-duration: 1s;
		/* 动画时长3秒 */
		animation-timing-function: ease-in-out;
		/* 动画速度曲线：以低速开始和结束 */
		animation-iteration-count: infinite;
		/* 播放次数：无限 */
	}

	@keyframes breath {
		from {
			opacity: 0.1;
		}

		/* 动画开始时的不透明度 */
		20% {
			opacity: 1;
		}

		40% {
			opacity: 0.8;
		}

		60% {
			opacity: 0.6;
		}

		80% {
			opacity: 0.4;
		}

		/* 动画50% 时的不透明度 */
		90% {
			opacity: 0.2;
		}

		to {
			opacity: 0.1;
		}

		/* 动画结束时的不透明度 */
	}

	p {
		position: absolute;
		top: 9px;
		width: 490px;
		animation: mymove 20s ease infinite;
		// animation-delay: 1s;
	}

	@keyframes mymove {
		from {
			left: 279px;
		}

		to {
			left: -472px;
		}

		0% {
			color: rgb(207, 157, 157);
		}

		10% {
			color: rgb(55, 218, 136);
		}

		20% {
			color: rgb(124, 113, 223);
		}

		30% {
			color: rgb(235, 132, 172);
		}

		40% {
			color: rgb(255, 255, 255);
		}

		50% {
			color: rgb(41, 198, 219);
		}

		60% {
			color: rgb(235, 193, 193);
		}

		70% {
			color: rgb(245, 21, 21);
		}

		80% {
			color: rgb(117, 204, 171);
		}

		90% {
			color: rgb(73, 143, 137);
		}

		100% {
			color: rgb(109, 60, 60);
		}
	}
}

.kePublic {
	position: absolute;
	width: 100%;
	z-index: 10;
}

.content-box {
	margin: 47px auto;
	width: 80%;
	// margin: auto;
	display: flex;

}

.right-content {
	margin-top: 10px;
	width: 320px;
	// max-width: 243px;
	min-height: 360px;
	animation: lingt 3s ease infinite;
	box-shadow: 0px 0px 15px white;
	border-radius: 5px;

}

@keyframes lingt {
	0% {
		box-shadow: 0px 0px 0px white;
	}

	/* 动画开始时的不透明度 */
	50% {
		box-shadow: 0px 0px 30px white;
	}

	100% {
		box-shadow: 0px 0px 0px #348e8d;
	}

	/* 动画开始时的不透明度 */
}

.bg-bock {
	height: 200px;
	overflow: hidden;
}

.content {
	padding-right: 52px;
	flex: 1;
	// width: 73%;
	// margin: auto;
}

* {
	margin: 0;
	padding: 0;
	list-style-type: none;
}

a,
img {
	border: 0;
}

/* Clearing floats */
.cf:before,
.cf:after {
	content: " ";
	display: table;
}

.cf:after {
	clear: both;
}

.cf {
	*zoom: 1;
}

/* Main level */
.menu {
	margin: 0px auto;
	width: 800px;
	width: -moz-fit-content;
	width: -webkit-fit-content;
	width: fit-content;
}

.menu>li {
	background: #348e8d;
	float: left;
	position: relative;
	transform: skewX(25deg);
	cursor: pointer;
}

.menu .menu-name {
	display: block;
	text-align: center;
	color: #fff;
	text-transform: uppercase;
	text-decoration: none;
	font-family: Arial, Helvetica;
	font-size: 14px;
}

.defual-style {
	background: #96dada;
}

.menu li:hover {
	background: #96dada;
}

.active {
	background: #96dada;
}

.menu>li>ul>.menu-name {
	// transform:skewX(-25deg);
	padding: 1em 2em;
}

/* Dropdown */
.submenu {
	position: absolute;
	width: 200px;
	left: 50%;
	margin-left: -100px;
	transform: skewX(-25deg);
	transform-origin: left top;
}

.submenu li {
	background-color: #348e8d;
	position: relative;
	overflow: hidden;
}

.submenu>li>ul .menu-name {
	padding: 1em 2em;
}

.submenu>li::after {
	content: '';
	position: absolute;
	top: -125%;
	height: 100%;
	width: 100%;
	box-shadow: 0 0 50px rgba(0, 0, 0, .9);
}

/* Odd stuff */
.submenu>li:nth-child(odd) {
	transform: skewX(-25deg) translateX(0);
}

.submenu>li:nth-child(odd)>a {
	transform: skewX(25deg);
}

.submenu>li:nth-child(odd)::after {
	right: -50%;
	transform: skewX(-25deg) rotate(3deg);
}

/* Even stuff */
.submenu>li:nth-child(even) {
	transform: skewX(25deg) translateX(0);
}

.submenu>li:nth-child(even)>a {
	transform: skewX(-25deg);
}

.submenu>li:nth-child(even)::after {
	left: -50%;
	transform: skewX(25deg) rotate(3deg);
}

/* Show dropdown */
.submenu,
.submenu li {
	opacity: 0;
	visibility: hidden;
}

.submenu li {
	transition: .2s ease transform;
}

.menu>li:hover .submenu,
.menu>li:hover .submenu li {
	opacity: 1;
	visibility: visible;
}

.menu>li:hover .submenu li:nth-child(even) {
	transform: skewX(25deg) translateX(15px);
}

.menu>li:hover .submenu li:nth-child(odd) {
	transform: skewX(-25deg) translateX(-15px);
}</style>
<style lang="less">.search-box {
	.el-input__suffix {
		top: 3px;
	}
}

.el-popover {
	position: absolute;
	background: #ade3e3;
	min-width: 150px;
	border: 1px solid #EBEEF5;
	padding: 12px;
	z-index: 2000;
	color: #606266;
	line-height: 1.4;
	text-align: justify;
	font-size: 14px;
	-webkit-box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
	box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
	word-break: break-all;
}

.login-form .el-form-item {
	margin-top: 10px;
}

.el-textarea__inner,
.el-dialog,
input {
	background-color: #ade3e3;
}

.el-dialog,
.el-pager li {
	background: #ade3e3;
}

.footer {
	height: 48px;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 16px;
	background: #348e8d
}

.psw .el-input__inner {
	border: none;
	background: #ade3e3;
	border-bottom: 1px solid #348e8d;
	border-radius: unset;
}

.login-btn-qq {
	margin-top: 20px;
	text-align: center;
	display: flex;
	align-items: center;
	justify-content: center;

	img {
		cursor: pointer;
		margin-left: 10px;
		width: 20px;
	}
}

.tag {
	margin-top: 5px;
	margin-left: 15px;
	cursor: pointer;
}

.tagNewArticle {
	margin-top: 5px;
	margin-left: 10px;
	margin-bottom: 5px;
	cursor: pointer;
	display: block;
	width: 80%;
	white-space: nowrap;
	/* 防止文字换行 */
	overflow: hidden;
	/* 隐藏超出容器的内容 */
	text-overflow: ellipsis;
	/* 在超出容器时显示省略号 (...) */
}

.login-form .el-form-item {
	margin-top: 10px;
}

.el-textarea__inner,
.el-dialog,
input {
	background-color: #ade3e3;
}

/* 上传头像样式 */
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
	border-color: #fdf9f9;
	margin-left: 400px;
    overflow: hidden;
  }
//   .avatar-uploader .el-upload:hover {
//     border-color: #fdf9f9;
//   }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>