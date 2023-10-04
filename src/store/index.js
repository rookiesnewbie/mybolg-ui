/* eslint-disable no-console,no-param-reassign,prefer-rest-params */

import Vue from 'vue';
import Vuex from 'vuex';
import { login,qqLoginCallback,updateUser} from '../api/account';
import createPersistedState from 'vuex-persistedstate'
import { getToken, setToken, removeToken } from '../utils/token'



Vue.use(Vuex);


//准备actions——用于响应组件中的动作
const actions = {
	
    // 帐号登录, 从后端获取用户数据，并调用mutations来更新状态
    Login({ commit }, loginForm) {
      return new Promise((resolve, reject) => {
        login(loginForm).then(res => { 
        // console.log(res);
          if (res.code === 200) { 
          // cookie中保存token
          setToken(res.data.token)
          // vuex中保存token
          commit('SET_TOKEN', res.data.token) 
          localStorage.setItem('user',JSON.stringify(res.data))
          commit('SET_USER', res.data)
        }
				// 传递给welcome.vue : store.dispatch('Login').then(data)
          resolve(res)	
          }
			 ).catch(error => {
          reject(error)
        })
      })
    },

  // qq登录, 从后端获取用户数据，并调用mutations来更新状态
    qqLogin({ commit }, searchObj ) {
      return new Promise((resolve, reject) => {
        qqLoginCallback(searchObj).then(res => { 
        // console.log(res);
          if (res.code === 200) { 
          // cookie中保存token
          setToken(res.data.userInfo.token)
          // vuex中保存token
          commit('SET_TOKEN', res.data.userInfo.token)
          localStorage.setItem('user', JSON.stringify(res.data.userInfo));//保存用户信息到浏览器
            
          commit('SET_USER', res.data.userInfo)

          console.log('QQ登录被调用，数据以保存');
        }
				// 传递给welcome.vue : store.dispatch('Login').then(data)
          resolve(res)	
          }
			 ).catch(error => {
          reject(error)
        })
      })
  },
    
    // 修改用户信息, 从后端获取用户数据，并调用mutations来更新状态
    updateUser({ commit },accountForm ) {
      return new Promise((resolve, reject) => {
        updateUser(accountForm).then(res => { 
          if (res.code === 200) { 
          localStorage.clear()
          localStorage.setItem('user',JSON.stringify(accountForm))
          commit('UPDATE_USER', accountForm)
        }
				// 传递给welcome.vue : store.dispatch('Login').then(data)
          resolve(res)	
          }
			 ).catch(error => {
          reject(error)
        })
      })
  },
    

    
}

//准备mutations——用于操作数据（state）
const mutations = {
	UPDATE_USER(state,user){
		// console.log('mutations中的updateUser被调用了')
		state.user.id = user.id
    state.user.nickName = user.nickName
    state.user.email = user.email
    state.user.password = user.password
    state.user.role = user.role
    state.user.phone = user.phone
    state.user.qqOpenId = user.qqOpenId
    state.user.avatar = user.avatar
  },

  SET_USER: (state, user) => {
    // console.log(`mutations中的SET_USER被调用了`);
    state.user.id = user.id
    state.user.nickName = user.nickName
    state.user.email = user.email
    state.user.password = user.password
    state.user.role = user.role
    state.user.phone = user.phone
    state.user.qqOpenId = user.qqOpenId
    state.user.avatar = user.avatar
  },

  //保存qq登录用户信息
  SAVE_QQ_USER: (state,qqUser) => { 
    state.qqUser.id = qqUser.id
    state.qqUser.nickName = qqUser.nickName
    state.qqUser.role = qqUser.role
    state.qqUser.email = qqUser.email
    state.qqUser.avatar = qqUser.avatar
  },


  //设置token
  SET_TOKEN: (state, token) => {
      state.token = token
  },

  SET_NEW_ARTICLE: (state, newArticle) => {
    // console.log(666666)
    state.newArticle = newArticle
  },
  

  //退出登录重置user
  RESET_SET_USER: (state) => {
    // console.log(666666)
    state.user.id = null
    state.user.nickName = null
    state.user.email = null
    state.user.password = null
    state.user.role = null
    state.user.phone = null
    state.user.qqOpenId = null
    state.user.avatar = null
  },
  
  REMOVE_TOKEN: (state) => {
    state.token = null
  },

  SET_AVATAR: (state, value) => {
     console.log('上传头像被调用了');
    state.user.avatar = value
  }
}

//准备state——用于存储数据
const state = {
  user: {
    id: null,
    nickName: '',
    email: '',
    password: '',
    role: '',
    phone: '',
    qqOpenId: '',
    avatar: ''
  }, //当前用户信息
  token: getToken(),//当前用户的token
  qqUser: {}, //qq登录用户信息
  newArticle: [], //最新文章
}

const getters = {
	// 定义getter来获取用户数据
  user: state => state.user,
  token: state => state.token,
  qqUser: state => state.qqUser,
  newArticle: state => state.newArticle,
}


//创建并暴露store
export default new Vuex.Store({
	actions,
	mutations,
  state,
  getters,
  plugins: [createPersistedState()]
})