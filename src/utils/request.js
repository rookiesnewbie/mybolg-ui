import axios from 'axios'
import ElementUI from 'element-ui'
import store from '../store'
import { getToken } from './token'

// create an axios instance
const request = axios.create({
  baseURL: process.env.BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
request.interceptors.request.use(
  config => {
    // do something before request is sent
    // let token = this.$cookies.get('access_token')
    // let user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      // config.headers['token'] = user.token
      config.headers['token'] = getToken()
    }
    return config
  },
  error => {
    // do something with request error
    // console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
request.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    let res = response.data;
        // 如果是返回的文件
        if (response.config.responseType === 'blob') {
            return res
        }
        // 兼容服务端返回的字符串数据
        if (typeof res === 'string') {
            res = res ? JSON.parse(res) : res
        }
        if (res.code !== 200){
            ElementUI.Message({
                message: res.msg,
                type: "error"
            })
        }
        return res;
    },
  error => {
      if (error.code === 'ECONNABORTED') {
        // 请求超时
        ElementUI.Message({
            message: "服务器繁忙，请稍后再试",
            type: "error"
        })
          // 这里可以添加处理请求超时的逻辑
      }
    
    if (error.code === 502) {
        // 请求超时
        ElementUI.Message({
            message: "网络错误，请检查网络，稍后再试",
            type: "error"
        })
          // 这里可以添加处理请求超时的逻辑
        }
        // console.log('err' + error) // for debug
        return Promise.reject(error)
    }
)

export default request
