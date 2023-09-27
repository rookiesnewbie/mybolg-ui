// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'
import PDialog from '@/components/common/pdialog'
import md5 from 'js-md5'
import VueCookies from 'vue-cookies'
import echarts from 'echarts'
import Router from 'vue-router'

import request from "@/utils/request";

//引入store
import store from './store'

const originalPush = Router.prototype.push
Router.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

// markdown全局注册
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

// use
Vue.use(mavonEditor)


Vue.prototype.$echarts = echarts
Vue.use(VueCookies)
Vue.prototype.$md5 = md5

Vue.prototype.request=request;
// 更改el-button默认size属性为mini
ElementUI.Button.props.size = {
  type: String,
  default: 'mini'
}
ElementUI.Input.props.size = {
  type: String,
  default: 'mini'
}

Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.component('p-dialog', PDialog)
Vue.use(ElementUI)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
